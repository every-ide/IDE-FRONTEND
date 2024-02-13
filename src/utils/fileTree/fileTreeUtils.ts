import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';

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

//노드 이름 확인하는 함수
export const isCorrectName = (inputName: string) => {
  if (inputName === '') {
    alert('한 글자 이상 입력하세요.');
    return false;
  } else if (inputName === '.' || inputName === '..') {
    alert(
      `${inputName}이라는 이름은 파일 또는 폴더 이름으로 올바르지 않습니다. 다른 이름을 입력하세요.`,
    );
    return false;
  }
  return true;
};

// export const makeNodeId = (
//   fileTree: FileNodeType[],
//   parentId: string | null,
//   type: string,
// ): string => {
//   const nowFileTree = fileTree;
//   const parentNode = findNodeById(nowFileTree, parentId, '/');

//   console.log('parentNode:', parentNode);
//   let childrenCount = 0;
//   const typeId = typeSelector(type);

//   if (parentNode.node && parentNode.node.children) {
//     childrenCount = parentNode.node.children.length;
//   } else {
//     childrenCount = nowFileTree.length;
//   }

//   const newId = idSelector(parentId || '', typeId, childrenCount);

//   if (nowFileTree.find((node) => node.id === newId)) {
//     return makeNodeId(nowFileTree, parentId, type);
//   }
//   return newId;
// };

// const childrenCounter = (
//   nodes: FileNodeType[],
//   fileTree: FileNodeType[],
//   typeId: string,
// ) => {
//   let count = 0;
//   if (typeId === 'd') {
//     nodes.children.forEach((node) => {
//       count++;
//       if (node.type === 'folder' || node.type === 'internal') {
//         count += 1;
//       }
//     });
//   } else {
//     nodes.children.forEach((node) => {
//       count++;
//       if (node.type === 'file') {
//         count += 1;
//       }
//     });
//   }
//   return count;
// };

// const typeSelector = (type: string) => {
//   if (type === 'folder' || type === 'internal') {
//     return 'd';
//   }
//   return 'f';
// };

// const idSelector = (
//   parentId: string,
//   typeId: string,
//   childrenCount: number,
// ) => {
//   if (parentId === '') {
//     return String(childrenCount + 1) + typeId;
//   } else {
//     return parentId + (childrenCount + 1) + typeId;
//   }
// };
