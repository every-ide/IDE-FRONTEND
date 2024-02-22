import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';

interface NodeWithParent {
  node: FileNodeType | null;
}

export const findNodeById = (
  nodes: FileNodeType[],
  nodeId: string | null,
  currentParentId: string | null,
): NodeWithParent => {
  console.log('nodeId: ', nodeId);
  for (const node of nodes) {
    if (node.id === nodeId) {
      return { node };
    }
    if (node.children) {
      const foundNode = findNodeById(node.children, nodeId, node.id);
      if (foundNode.node) {
        return foundNode;
      }
    }
  }
  return { node: null };
};

export const findFilePath = (
  nodes: FileNodeType[],
  targetId: string | null | number,
  path = '',
): string | null | number => {
  for (const node of nodes) {
    const currentPath = path === '' ? '/' + node.name : path + '/' + node.name;

    if (node.id === targetId) {
      return currentPath;
    }

    if (node.children) {
      const foundPath: string | null | number = findFilePath(
        node.children,
        targetId,
        currentPath,
      );
      if (foundPath) return foundPath;
    }
  }
  return null;
};
export const findMaxFileNumberByPath = (
  nodes: FileNodeType[],
  parentId: string,
  baseFilename: string = 'newfile',
): number => {
  let maxNumber = -1; // 기본값 설정
  const regex = new RegExp(`^${baseFilename}(\\((\\d+)\\))?$`);

  // parentId에 해당하는 노드 찾기
  const parentNode = findNodeById(nodes, parentId, null).node;
  if (!parentNode || !parentNode.children) {
    nodes.forEach((node) => {
      const match = node.name.match(regex);
      if (match) {
        const number = match[2] ? parseInt(match[2], 10) : 0;
        if (number > maxNumber) {
          maxNumber = number;
        }
      }
    });
    return maxNumber + 1;
  }

  parentNode.children.forEach((node) => {
    const match = node.name.match(regex);
    if (match) {
      const number = match[2] ? parseInt(match[2], 10) : 0;
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  });

  return maxNumber + 1; // 새 파일에 사용할 수 있는 번호 반환
};

export const findParentNodeById = (
  nodes: FileNodeType[],
  id: string | null,
): FileNodeType | null => {
  const parentPath = findNodeById(nodes, id, '/').node?.path;
  console.log('parentPath:', parentPath);
  const lastSlashIndex = parentPath?.lastIndexOf('/') ?? -1;
  const pathWithoutLastPart =
    lastSlashIndex > -1 ? parentPath?.substring(0, lastSlashIndex) : parentPath;

  if (pathWithoutLastPart === '') {
    return null;
  }
  const parentId = findNodeIdByPath(nodes, pathWithoutLastPart);
  const parentNode = findNodeById(nodes, parentId, '/');

  return parentNode.node;
};

export const findNodeIdByPath = (
  nodes: FileNodeType[],
  path: string,
): string | null => {
  for (const node of nodes) {
    if (findFilePath([node], node.id) === path) {
      return node.id;
    }
    if (node.children) {
      const foundId = findNodeIdByPath(node.children, path);
      if (foundId) return foundId;
    }
  }
  return null;
};

//임시 -> '' 이름으로 노드 경로 찾기
export const findFilePathByName = (
  nodes: FileNodeType[],
  targetName: string,
  path = '',
): string | null => {
  for (const node of nodes) {
    // 현재 노드의 경로 구성
    const currentPath = path === '' ? '/' + node.name : path + '/' + node.name;

    // 현재 노드의 이름이 타겟 이름과 일치하는지 확인
    if (node.name === targetName) {
      return currentPath;
    }

    // 자식 노드가 있는 경우, 재귀적으로 탐색
    if (node.children) {
      const foundPath: string | null = findFilePathByName(
        node.children,
        targetName,
        currentPath,
      );
      if (foundPath) return foundPath;
    }
  }
  return null;
};
