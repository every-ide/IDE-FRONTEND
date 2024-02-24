import { useCallback, useEffect, useRef } from 'react';
import { Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import useFileStore from '@/src/store/useFileStore';
import yorkie, { type Text, Client, Document, Indexable } from 'yorkie-js-sdk';
import createEditorState from './CreateEditorState';
import useFileAPI from '@/src/hooks/useFileAPI';
import useUserStore from '@/src/store/useUserStore';
import ColorHash from 'color-hash';

interface ICodeEditorWindowProps {
  fileId: string;
  fileName: string;
  filePath: string;
  content: string;
  language: string;
}

export type YorkieDoc = {
  backendSaved: boolean;
  content: Text;
};

type PresenceType = {
  username: string;
  color: string;
};

const CodeEditorWindow = ({
  fileId,
  filePath,
  content,
  language,
}: ICodeEditorWindowProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const codemirrorViewRef = useRef<EditorView>();
  const yorkieClientRef = useRef<Client>();
  const yorkieDocRef = useRef<Document<YorkieDoc, Indexable>>();
  const { setYorkieDoc, setNeedSave, getYorkieDoc } = useFileStore();
  const { saveFileContent } = useFileAPI();
  const { name } = { ...useUserStore((state) => state.user) };
  const colorHash = new ColorHash();

  const initializeYorkieEditor = useCallback(async () => {
    // 01. Create & Activate yorkie client
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: import.meta.env.VITE_YORKIE_FILE_API_KEY,
    });

    await client.activate();
    yorkieClientRef.current = client;

    // 02. Create new yorkie document
    const doc = new yorkie.Document<YorkieDoc, PresenceType>(`${fileId}`); // Document key: [fileId]
    yorkieDocRef.current = doc;

    // 생성한 doc을 client에 attach : 로컬 Document의 변경사항이 원격지의 Document와 동기화됨
    await client.attach(doc, {
      initialPresence: {
        username: name,
        color: colorHash.hex(name),
      },
    });

    // 03. 해당 key의 Yorkie document에 content가 없으면 새로운 Text 생성, 기존에 저장된 코드 삽입
    doc.update((root) => {
      if (!root.content || root.content.toString() === '') {
        root.content = new yorkie.Text();
        // Backend 서버에 저장된 코드 삽입
        root.content.edit(0, 0, content);
        root.backendSaved = true;
      }
    }, 'create content if not exists');

    // 04. Subscribe document event
    // 04-1. Remote-change 이벤트 : 원격 doc의 content값을 codemirror에 전달
    const syncText = () => {
      const text = doc.getRoot().content;
      codemirrorViewRef.current?.dispatch({
        changes: {
          from: 0,
          to: codemirrorViewRef.current?.state.doc.length,
          insert: text.toString(),
        },
        annotations: [Transaction.remote.of(true)],
      });
    };

    doc.subscribe((event) => {
      if (event.type === 'remote-change') {
        const backendSaved = doc.getRoot().backendSaved;

        syncText();

        if (backendSaved) {
          setNeedSave(fileId, false);
        } else {
          setNeedSave(fileId, true);
        }
      }
    });

    // 04-02. local 변경사항을 remote에 broadcast하기 위한 Codemirror updateListener extension 함수 정의
    const updateListenerExtension = EditorView.updateListener.of(
      (viewUpdate) => {
        if (viewUpdate.docChanged) {
          for (const tr of viewUpdate.transactions) {
            const events = [
              'select',
              'input',
              'delete',
              'move',
              'undo',
              'redo',
            ];
            if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
              continue;
            }
            if (tr.annotation(Transaction.remote)) {
              continue;
            }
            let adj = 0;
            tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
              const insertText = inserted.toJSON().join('\n');
              doc.update((root) => {
                root.content.edit(fromA + adj, toA + adj, insertText);
              }, `update content by ${client.getID()}`);
              adj += insertText.length - (toA - fromA);

              // zustand store state change
              doc.update((root) => {
                root.backendSaved = false;
              }, `update backendSaved by ${client.getID()}`);
              setNeedSave(fileId, true);
            });
          }
        }
      },
    );

    // 05. Set codemirror EditorState for initialization
    const state = createEditorState({ doc, updateListenerExtension, language });

    // 06. create new EditorView and store it in codemirrorViewRef
    codemirrorViewRef.current = new EditorView({
      state,
      parent: editorRef.current ? editorRef.current : undefined,
    });

    // 07. zustand fileStore에 yorkieDoc 저장
    setYorkieDoc(fileId, doc);

    // 이미 다른 유저가 편집 중인 경우, yorkie doc의 backendSaved값에 따라 needSave값 Set
    if (!doc.getRoot().backendSaved) {
      setNeedSave(fileId, !doc.getRoot().backendSaved);
    }
  }, []);

  useEffect(() => {
    initializeYorkieEditor();
  }, []);

  useEffect(() => {
    const handleCodeSave = async (event: KeyboardEvent) => {
      if (event.key === 's' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();

        const response = await saveFileContent({
          filePath,
          newContent: getYorkieDoc(fileId)!.getRoot().content.toString(),
        });

        if (response?.status === 200) {
          yorkieDocRef.current!.update((root) => {
            root.backendSaved = true;
          }, `update backendSaved by ${yorkieClientRef.current!.getID()}`);

          setNeedSave(fileId, false);
        }
      }
    };

    window.addEventListener('keydown', handleCodeSave);

    return () => {
      window.removeEventListener('keydown', handleCodeSave);
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className="no-scrollbar size-full overflow-y-scroll"
    ></div>
  );
};

export default CodeEditorWindow;
