import { useRef, useState, FC } from 'react';
import { Tree, TreeApi } from 'react-arborist';
import { data } from './data/data';
import Node from './data/Node';
import { TbFolderPlus } from 'react-icons/tb';
import { AiOutlineFileAdd } from 'react-icons/ai';
// import { v4 as uuidv4 } from 'uuid';

interface ArboristProps {}

const Arborist: FC<ArboristProps> = () => {
  const [term, setTerm] = useState<string>('');
  const treeRef = useRef<TreeApi<any> | null>(null);

  const logTreeData = () => {
    // 트리 데이터를 가져와서 콘솔에 출력하는 함수
    const data = treeRef.current; // getData 메소드는 예시일 뿐, 실제 API 확인 필요
    const Tree = treeRef;
    console.log('Current tree data:', Tree);
    console.log('Current tree data:', data);
    console.log('Current tree data:', data?.idToIndex);
    // console.log('Current tree data:', data?.);
    // console.log('Current tree data:', data?.);
    // console.log('Current tree data:', data?.);
    // console.log('Current tree data:', data?.);
    // console.log('Current tree data:', data?.);
  };

  // const generateCustomId = (name) => {
  //   // 예: 이름과 현재 시간을 기반으로 ID 생성
  //   return `custom-${name}-${Date.now()}`;
  // };

  // //파일 또는 폴더 생성 클릭 시 동작
  // const onCreate: CreateHandler<FileNodeType> = ({ type, parentId }) => {
  //   const newNode: FileNodeType = {
  //     id: uuidv4(),
  //     name: '',
  //     type: type === 'internal' ? 'DIRECTORY' : 'FILE',
  //     ...(type === 'internal' && { children: [] }),
  //     isDirty: false,
  //     isOpened: true,
  //     filePath: findNodePathByName(''),
  //     parentId: parentId === null ? 'root' : parentId,
  //   };
  //   addNode(newNode, parentId);
  //   return newNode;
  // };

  const createFileFolder = (
    <>
      <button
        onClick={() => {
          treeRef.current?.createInternal();
          logTreeData();
        }}
        title="New Folder..."
      >
        <TbFolderPlus />
      </button>
      <button
        onClick={() => {
          treeRef.current?.createLeaf();
          logTreeData();
        }}
        title="New File..."
      >
        <AiOutlineFileAdd />
      </button>
    </>
  );

  return (
    <>
      <div className="border-b-2 border-mdark">
        <div className="folderFileActions pl-2">{createFileFolder}</div>
        <div className="p-2">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Tree 컴포넌트 height가 충분히 있으면 min-h-2000px -> div 태그 지워도됩니다. */}
        <div className="min-h-[2000px]">
          <Tree
            ref={treeRef}
            initialData={data}
            width={260}
            height={1000}
            indent={24}
            rowHeight={32}
            searchTerm={term}
            searchMatch={(node, term) =>
              node.data.name.toLowerCase().includes(term.toLowerCase())
            }
          >
            {Node}
          </Tree>
        </div>
      </div>
    </>
  );
};

export default Arborist;
