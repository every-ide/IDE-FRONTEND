import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

const CodeEditorWindow = () => {
  const editorRef = useRef(null);

  return (
    <div>
      <textarea id="codemirror" ref={editorRef}></textarea>
    </div>
  );
};

export default CodeEditorWindow;
