import CodeEditorWindow from '@src/components/codeEditor/CodeEditorWindow';

const Editor = () => {
  return (
    // TODO: webkit-scroll 대신 코드 미니맵 표시
    <main className="flex-1 overflow-y-auto bg-mdark">
      <div className="min-h-[95vh]">
        <CodeEditorWindow />
        {/* 내용이 많을 경우 스크롤 발생 */}
        <div className=" bg-yellow-200">ggg</div>
      </div>
    </main>
  );
};

export default Editor;
