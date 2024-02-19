import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';
import { findNodeById, findParentNodeById } from './findNodeUtils';

export const makePath = (
  nodes: FileNodeType[],
  name: string,
  parentId: string | null,
): string => {
  // 부모 노드의 path를 찾습니다.
  const parentNode = parentId ? findNodeById(nodes, parentId, null).node : null;
  const parentPath = parentNode ? parentNode.path : '';

  // 새로운 path를 생성합니다.
  const newPath = `${parentPath}/${name}`.replace('//', '/');

  console.log('New path:', newPath);
  return newPath;
};

export const isDuplicateName = (
  nodes: FileNodeType[],
  id: string | null,
  name: string,
): boolean => {
  // 현재 노드의 부모 노드를 찾습니다.
  const parentNode = findParentNodeById(nodes, id);

  // 부모 노드가 없다면, 최상위 레벨에서 중복 검사를 합니다.
  if (parentNode === null) {
    return nodes.some((node) => node.name === name);
  }

  if (name == 'newFile') {
    return true;
  }
  // 부모 노드의 자식 노드들 중에서 이름이 중복되는 노드가 있는지 검사합니다.
  return parentNode.children?.some((node) => node.name === name) ?? false;
};

export const addNodeToTree = (
  nodes: FileNodeType[],
  newNode: FileNodeType,
  parentId: string | null,
) => {
  return nodes.reduce((acc: FileNodeType[], node: FileNodeType) => {
    const newNodeArray = [...acc];
    if (node.id === parentId) {
      newNodeArray.push({
        ...node,
        children: node.children ? [...node.children, newNode] : [newNode],
      });
    } else {
      newNodeArray.push({
        ...node,
        children: node.children
          ? addNodeToTree(node.children, newNode, parentId)
          : [],
      });
    }

    return newNodeArray;
  }, []);
};
//트리 노드 삭제하는 함수
export const removeNodeById = (
  nodes: FileNodeType[],
  nodeId: string | null,
) => {
  return nodes.reduce((acc: FileNodeType[], node: FileNodeType) => {
    if (node.id !== nodeId) {
      const newNode = { ...node };
      if (node.children) {
        newNode.children = removeNodeById(node.children, nodeId);
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
};

export const isCorrectName = (inputName: string) => {
  if (inputName === '') {
    alert('한 글자 이상 입력하세요.');
    return false;
  } else {
    const forbiddenChars = ['/', '\\', ':', '*', '?', '"', '<', '>', '|', ' '];
    const containsForbiddenChar = forbiddenChars.some((char) =>
      inputName.includes(char),
    );
    if (inputName === '.' || inputName === '..' || containsForbiddenChar) {
      alert(
        `${inputName}이라는 이름은 파일 또는 폴더 이름으로 올바르지 않습니다. 다른 이름을 입력하세요.`,
      );
      return false;
    }
  }
  return true;
};
