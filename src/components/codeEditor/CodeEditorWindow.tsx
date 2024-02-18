import { useCallback, useEffect, useRef } from 'react';
import { Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import useFileStore from '@/src/store/useFileStore';
import yorkie, { type Text } from 'yorkie-js-sdk';
import createEditorState from './CreateEditorState';

interface ICodeEditorWindowProps {
  fileId: string;
  fileName: string;
  filePath: string;
  content: string;
  language: string;
  selected: boolean;
}

export type YorkieDoc = {
  content: Text;
};

const CodeEditorWindow = ({
  fileId,
  fileName,
  filePath,
  content,
  language,
  selected,
}: ICodeEditorWindowProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const codemirrorViewRef = useRef<EditorView>();
  const { files } = useFileStore();

  const initializeYorkieEditor = useCallback(async () => {
    // 01. Create & Activate yorkie client
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: import.meta.env.VITE_YORKIE_FILE_API_KEY,
    });

    await client.activate();

    // 02. Create new yorkie document
    const doc = new yorkie.Document<YorkieDoc>(`${fileId}-${fileName}`); // Document key: [containerName]-[fileName]

    await client.attach(doc); // 생성한 doc을 client에 attach : 로컬 Document의 변경사항이 원격지의 Document와 동기화됨

    // 03. 해당 key의 Yorkie document에 content가 없으면 새로운 Text 생성, 기존에 저장된 코드 삽입
    doc.update((root) => {
      if (!root.content) {
        root.content = new yorkie.Text();
        // Backend 서버에 저장된 코드 삽입
        root.content.edit(0, 0, content);
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
        syncText();
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
  }, []);

  useEffect(() => {
    initializeYorkieEditor();
  }, [files, initializeYorkieEditor]);

  return (
    <div
      ref={editorRef}
      className="no-scrollbar size-full overflow-y-scroll"
    ></div>
  );
};

export default CodeEditorWindow;
