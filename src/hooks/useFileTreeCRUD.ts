import { useParams } from 'react-router-dom';
import { useFileTreeStore } from '../store/useFileTreeStore';
import useFileTreeNodeUtils, { updatePath } from '../utils/fileTree/nodeUtils';
import useFileTreeApi from './useFileTreeApi';
import useYorkieHook from './useYorkie';
import { useEffect } from 'react';
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
  RenameHandler,
} from 'react-arborist';
import {
  findMaxFileNumberByPath,
  findNodeById,
} from '../utils/fileTree/findNodeUtils';
import {
  isCorrectName,
  isDuplicateName,
  makePath,
} from '../utils/fileTree/fileTreeUtils';
import { v4 as uuidv4 } from 'uuid';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import { useDropzone } from 'react-dropzone';
import { createFileTree } from '../utils/localFileUpload/fileReadUtils';

const useFileTreeCRUD = () => {
  const { fileTree, deleteNode, addNode, doc } = useFileTreeStore();
  const { updateNodeNameAndPath } = useFileTreeNodeUtils();
  const { initializeYorkieAndSyncWithZustand } = useYorkieHook();
  const { axiosCreateIsFile, axiosRenameIsFile, axiosDeleteIsFile } =
    useFileTreeApi();
  const { workid: containerName } = useParams<{ workid: string }>();
  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    // 파일을 드랍했을 때 실행될 콜백
    onDrop: async (acceptedFiles) => {
      // 여기에서 파일 처리 로직 구현
      const dropData = await createFileTree(acceptedFiles);
      console.log('createFileTree(acceptedFiles);: ', ...dropData);
      const isDuplicate = dropData.some((item) =>
        fileTree.some((node) => node.name === item.name),
      );

      // 중복된 파일이 있으면 경고 메시지를 출력하고 함수를 종료
      if (isDuplicate) {
        alert('중복된 파일이 있어 처리를 중지합니다.');
        return; // 함수 종료
      }

      doc.update((root) => {
        dropData.forEach((item) => root.yorkieContainer.children.push(item));
      });
    },
  });
  useEffect(() => {
    console.log('파일트리 변경됨 : ', fileTree);
  }, [fileTree]);

  useEffect(() => {
    async function initializeYorkie() {
      await initializeYorkieAndSyncWithZustand(containerName);
    }
    if (containerName) {
      initializeYorkie();
    }
  }, []);

  //파일 또는 폴더 생성 클릭 시 동작
  const onCreate: CreateHandler<FileNodeType> = async ({ type, parentId }) => {
    const baseFilename = type === 'internal' ? 'newFolder' : 'newFile';

    const maxNumber = findMaxFileNumberByPath(fileTree, parentId, baseFilename);
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
    if (!isCorrectName(name)) {
      return;
    }
    if (isDuplicateName(fileTree, id, name)) {
      console.log('중복된 이름입니다.');
      return;
    }
    doc.update((root) => {
      root.yorkieContainer.children = updateNodeNameAndPath(fileTree, id, name);
    }, 'Update node name');

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
    deleteNode(ids[0]);
    axiosDeleteIsFile(containerName, deletingNode.path, deletingNode.type);
  };

  const onMove: MoveHandler<FileNodeType> = ({
    dragIds,
    parentId,
    parentNode,
    dragNodes,
    index,
  }) => {
    console.log('index: ', index);
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

  return {
    fileTree,
    onCreate,
    onRename,
    onDelete,
    onMove,
    getRootProps,
  };
};

export default useFileTreeCRUD;
