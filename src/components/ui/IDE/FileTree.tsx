import { useRef, useState, FC } from 'react';
import { Tree, TreeApi } from 'react-arborist';
import { data } from './data/data';
import Node from './data/Node';
import { TbFolderPlus } from 'react-icons/tb';
import { AiOutlineFileAdd } from 'react-icons/ai';

interface ArboristProps {}

const Arborist: FC<ArboristProps> = () => {
  const [term, setTerm] = useState<string>('');
  const treeRef = useRef<TreeApi<any> | null>(null);

  const createFileFolder = (
    <>
      <button
        onClick={() => treeRef.current?.createInternal()}
        title="New Folder..."
      >
        <TbFolderPlus />
      </button>
      <button onClick={() => treeRef.current?.createLeaf()} title="New File...">
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
