import CodeEditorWindow from '@/components/codeEditor/CodeEditorWindow';
import EditorTab from '@/components/codeEditor/EditorTab';

const Editor = () => {
  return (
    <main className="h-[calc(100vh-96px)] flex-1 overflow-y-auto bg-mdark">
      <EditorTab />
      <CodeEditorWindow fileId="123" />
    </main>
  );
};

export default Editor;
