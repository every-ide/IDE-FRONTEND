import { useRef, useState, FC, useEffect } from 'react';
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
  NodeRendererProps,
  RenameHandler,
  Tree,
  TreeApi,
} from 'react-arborist';
import Node from './data/Node';
import { TbFolderPlus } from 'react-icons/tb';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';
import { useFileTreeStore } from '@/src/store/useFileTreeStore';
import { v4 as uuidv4 } from 'uuid';
import { isDuplicateName, makePath } from '@/src/utils/fileTree/fileTreeUtils';
import { updatePath } from '@/src/utils/fileTree/nodeUtils';
import useUserStore from '@/src/store/useUserStore';
import { useParams } from 'react-router-dom';
import { run } from '@/src/api/fileTree/setYorkie';

interface ArboristProps {}

const Arborist: FC<ArboristProps> = () => {
  const [term, setTerm] = useState<string>('');
  const treeRef = useRef<TreeApi<FileNodeType> | null>(null);
  const { fileTree, deleteNode, addNode, updateNodeName, setFileTreeFromApi } =
    useFileTreeStore();
  const { user } = useUserStore();
  const { workid: projectId } = useParams<{ workid: string }>();

  useEffect(() => {
    // userId가 있는지 체크해야 id가 null값일 때 request가 안날라가요!
    if (user?.userId && projectId) {
      setFileTreeFromApi(projectId);
    }
    const unsubscribe = useFileTreeStore.subscribe((state) => {
      console.log('FileTree 변경됨:', state.fileTree);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    console.log('호출!!!');
    run();
  }, []);

  //파일 또는 폴더 생성 클릭 시 동작
  const onCreate: CreateHandler<FileNodeType> = ({ type, parentId }) => {
    const newPath = makePath(fileTree, '', parentId);
    const newNode: FileNodeType = {
      id: uuidv4(),
      name: '',
      type: type === 'internal' ? 'directory' : 'file',
      ...(type === 'internal' && { children: [] }),
      path: newPath,
    };
    addNode(newNode, parentId);
    return newNode;
  };

  const onRename: RenameHandler<FileNodeType> = ({ id, name }) => {
    if (isDuplicateName(fileTree, id, name)) {
      console.log('중복된 이름입니다.');
      return;
    }
    updateNodeName(id, name);
  };

  //파일 또는 폴더 삭제 시 동작
  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    deleteNode(ids[0]);
  };

  const onMove: MoveHandler<FileNodeType> = ({
    dragIds,
    parentId,
    parentNode,
    dragNodes,
  }) => {
    let newDragNodeData: FileNodeType = {} as FileNodeType;
    const dragNodeData = dragNodes[0].data;
    const parentNodeData = parentNode?.data;

    if (parentNodeData?.type === 'file') return;
    const newPath = parentNode
      ? `${parentNode.data.path}/${dragNodeData.name}`
      : '';

    if (dragNodeData.children) {
      newDragNodeData = updatePath(dragNodeData, newPath);
    } else {
      newDragNodeData = { ...dragNodeData, path: newPath };
    }
    console.log('newDragNodeData: ', newDragNodeData);

    if (!parentNode) {
      if (!fileTree.some((node) => node.name === dragNodeData.name)) {
        deleteNode(dragIds[0]);
        addNode(newDragNodeData);
        return;
      }
    } else {
      if (
        !parentNodeData?.children?.some(
          (node) => node.name === dragNodeData.name,
        )
      ) {
        deleteNode(dragIds[0]);
        addNode(newDragNodeData, parentId);
        return;
      }
    }

    alert('중복된 이름입니다.');
  };
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
      <div className="flex-1 overflow-y-auto">
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
