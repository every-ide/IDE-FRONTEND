import { EditorState, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { showMinimap } from '@replit/codemirror-minimap';
import { indentWithTab } from '@codemirror/commands';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { type Document, Indexable } from 'yorkie-js-sdk';
import { YorkieDoc } from './CodeEditorWindow';

type TcreateEditorState = {
  doc: Document<YorkieDoc, Indexable>;
  updateListenerExtension: Extension;
  language: string;
};

const createEditorState = ({
  doc,
  updateListenerExtension,
  language,
}: TcreateEditorState) => {
  const languageExtension = (language: string) => {
    switch (language) {
      case 'java':
        return java();
      case 'javascript':
        return javascript();
      case 'html':
        return html();
      case 'css':
        return css();
      case 'python':
        return python();
      case 'markdown':
        return markdown();
      default:
        return python();
    }
  };

  const create = () => {
    const dom = document.createElement('div');
    return { dom };
  };

  // init Codemirror Editor State
  const state = EditorState.create({
    doc: doc.getRoot().content.toString(),
    extensions: [
      basicSetup,
      vscodeDark, // theme
      keymap.of([indentWithTab]),
      // minimap scrollbar
      showMinimap.compute(['doc'], () => {
        return {
          create,
          displayText: 'blocks',
          showOverlay: 'always',
        };
      }),
      updateListenerExtension, // yorkie integration
      languageExtension(language), // language support
    ],
  });

  return state;
};

export default createEditorState;
