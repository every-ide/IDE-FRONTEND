import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { showMinimap } from '@replit/codemirror-minimap';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface ICodeEditorWindowProps {
  filePath: string;
  content: string;
  language: string;
  selected: boolean;
}

const create = (v: EditorView) => {
  const dom = document.createElement('div');
  return { dom };
};

const updateListenerExtension = EditorView.updateListener.of(
  (v: ViewUpdate) => {
    //변경된 코드
    console.log('code change:::', v.state.doc.toString());
  },
);

const CodeEditorWindow = ({
  filePath,
  content,
  language,
  selected,
}: ICodeEditorWindowProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const initialText = 'console.log("hello world");';

  useEffect(() => {
    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        vscodeDark,
        showMinimap.compute(['doc'], (state) => {
          return {
            create,
            displayText: 'blocks',
            showOverlay: 'always',
          };
        }),
        updateListenerExtension,
        javascript(),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });
  }, []);

  return (
    <div
      className="no-scrollbar size-full overflow-y-scroll"
      ref={editorRef}
    ></div>
  );
};

export default CodeEditorWindow;
