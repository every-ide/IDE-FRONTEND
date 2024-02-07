const Navigation = () => {
  return (
    <nav className="flex h-8 items-center border-b-2 border-mdark bg-ldark px-1">
      <div className="flex grow items-center">
        <h2 className="cursor-pointer text-base">EveryIDE</h2>
        <ul className="ml-4 flex cursor-pointer items-center gap-2">
          <li className="px-2 py-1 hover:bg-gray-700">파일</li>
          <li className="px-2 py-1 hover:bg-gray-700">편집</li>
          <li className="px-2 py-1 hover:bg-gray-700">프로젝트</li>
          <li className="px-2 py-1 hover:bg-gray-700">컨테이너</li>
          <li className="px-2 py-1 hover:bg-gray-700">창</li>
        </ul>
      </div>
      <div className="ml-auto cursor-pointer">
        <h2>John Doe님</h2>
      </div>
    </nav>
  );
};

export default Navigation;
