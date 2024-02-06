import CodeEditorWindow from '@/components/codeEditor/CodeEditorWindow';
import EditorTab from '@/components/codeEditor/EditorTab';

const Editor = () => {
  return (
    // TODO: webkit-scroll 대신 코드 미니맵 표시
    <main className="bg-mdark flex-1 overflow-y-auto">
      <div className="min-h-[95vh]">
        <EditorTab />
        <CodeEditorWindow fileId="123" />
        {/* 내용이 많을 경우 스크롤 발생 */}
        <div className=" bg-yellow-200">ggg</div>
      </div>
    </main>
  );
};

export default Editor;
