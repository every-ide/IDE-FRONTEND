import { useEffect, useRef, useState } from 'react';
import { NodeRendererProps, Tree, TreeApi } from 'react-arborist';
import Node from './data/Node';
import { TbFolderPlus } from 'react-icons/tb';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';
import useFileTreeCRUD from '@/src/hooks/filetreeHook/useFileTreeCRUD';
import useYorkieHook from '@/src/hooks/filetreeHook/useYorkie';
import { useParams } from 'react-router-dom';
import useUserStore from '@/src/store/useUserStore';

const Arborist = () => {
  const [term, setTerm] = useState<string>('');
  const treeRef = useRef<TreeApi<FileNodeType> | null>(null);
  const { initializeYorkieAndSyncWithZustand } = useYorkieHook();
  const { fileTree, onCreate, onRename, onDelete, onMove, getRootProps } =
    useFileTreeCRUD(); // 수정된 부분
  const { workid: containerName } = useParams<{ workid: string }>();
  const { userId } = { ...useUserStore((state) => state.user) };
  useEffect(() => {
    console.log('파일트리 변경됨 : ', fileTree);
  }, [fileTree]);

  useEffect(() => {
    async function initializeYorkie() {
      console.log('containerName: ', containerName);
      await initializeYorkieAndSyncWithZustand(containerName);
    }
    if (containerName && userId) {
      initializeYorkie();
    }
  }, [userId]);
  return (
    <>
      <div className="border-b-2 border-mdark">
        <div className="folderFileActions pl-2">
          <button
            onClick={() => {
              treeRef.current?.createInternal();
            }}
            title="New Folder..."
          >
            <TbFolderPlus />
          </button>
          <button
            onClick={() => {
              treeRef.current?.createLeaf();
              // logTreeData();
            }}
            title="New File..."
          >
            <AiOutlineFileAdd />
          </button>
        </div>
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
      <div className="flex-1 overflow-y-auto" {...getRootProps()}>
        {/* Tree 컴포넌트 height가 충분히 있으면 min-h-2000px -> div 태그 지워도됩니다. */}
        <div className="min-h-[2000px]">
          <Tree
            ref={treeRef}
            data={fileTree}
            onCreate={onCreate}
            onRename={onRename}
            onDelete={onDelete}
            onMove={onMove}
            width={260}
            height={1000}
            indent={24}
            rowHeight={32}
            searchTerm={term}
            searchMatch={(node, term) =>
              node.data.name.toLowerCase().includes(term.toLowerCase())
            }
          >
            {(nodeProps) => (
              <Node {...(nodeProps as NodeRendererProps<FileNodeType>)} />
            )}
          </Tree>
        </div>
      </div>
    </>
  );
};

export default Arborist;
