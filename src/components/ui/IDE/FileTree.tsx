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
import useYorkieHook from '@/src/hooks/useYorkie';
import useFileTreeApi from '@/src/hooks/useFileTreeApi';
import {
  findFileNodeByPath,
  findMaxFileNumberByPath,
  findNodeById,
} from '@/src/utils/fileTree/findNodeUtils';

const Arborist: FC<ArboristProps> = () => {
  const [term, setTerm] = useState<string>('');
  const treeRef = useRef<TreeApi<FileNodeType> | null>(null);
  const { fileTree, deleteNode, addNode, updateNodeName } = useFileTreeStore();
  const { initializeYorkieAndSyncWithZustand } = useYorkieHook();
  const { axiosCreateIsFile, axiosRenameIsFile, axiosDeleteIsFile } =
    useFileTreeApi();
  const { user } = useUserStore();
  const { workid: containerName } = useParams<{ workid: string }>();

  useEffect(() => {
    console.log('파일트리 변경됨 : ', fileTree);
  }, [fileTree]);

  useEffect(() => {
    async function initializeYorkie() {
      console.log('호출!!!');
      await initializeYorkieAndSyncWithZustand(containerName);
    }
    console.log('containerName: ', containerName);
    console.log('user?.userId: ', user?.userId);
    if (containerName) {
      initializeYorkie();
    }
  }, []);

  //파일 또는 폴더 생성 클릭 시 동작
  const onCreate: CreateHandler<FileNodeType> = async ({ type, parentId }) => {
    const baseFilename = type === 'internal' ? 'newFolder' : 'newFile';

    // parentId를 기반으로 최대 파일 번호 찾기
    const maxNumber = findMaxFileNumberByPath(fileTree, parentId, baseFilename);
    console.log('maxNumber: ', maxNumber);
    const newName =
      maxNumber > 0 ? `${baseFilename}(${maxNumber})` : baseFilename;

    const newPath = makePath(fileTree, newName, parentId);
    const newNode: FileNodeType = {
      id: uuidv4(),
      name: newName,
      type: type === 'internal' ? 'directory' : 'file',
      ...(type === 'internal' && { children: [] }),
      path: newPath,
    };

    addNode(newNode, parentId);

    try {
      await axiosCreateIsFile(containerName, newPath, newNode.type);
    } catch (error) {
      console.error('File creation error:', error);
      throw error;
    }
    return newNode;
  };

  const onRename: RenameHandler<FileNodeType> = async ({ id, name, node }) => {
    if (isDuplicateName(fileTree, id, name)) {
      console.log('중복된 이름입니다.');
      return;
    }
    updateNodeName(id, name);
    const oldPath = node.data.path;
    const newPath = oldPath.substring(0, oldPath.lastIndexOf('/')) + `/${name}`;
    try {
      await axiosRenameIsFile(containerName, oldPath, newPath, node.data.type);
    } catch (error) {
      console.error('File renaming error:', error);
      throw error;
    }
  };

  //파일 또는 폴더 삭제 시 동작
  const onDelete: DeleteHandler<FileNodeType> = ({ ids }) => {
    const deletingNode = findNodeById(fileTree, ids[0], null).node;
    console.log('deletingNode: ', deletingNode);
    deleteNode(ids[0]);
    axiosDeleteIsFile(containerName, deletingNode.path, deletingNode.type);
    console.log('deletingNode: ', deletingNode);
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
