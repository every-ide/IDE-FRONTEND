import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';

// 노드의 이름과 그 자식 노드들의 path를 업데이트하는 함수
export function updateNodeNameAndPath(
  nodes: FileNodeType[],
  nodeId: string,
  newName: string,
): FileNodeType[] {
  // 경로 업데이트를 위한 내부 함수
  const updatePath = (node: FileNodeType, newPath: string): FileNodeType => {
    // 자식 노드가 있는 경우, 각 자식에 대해 재귀적으로 업데이트
    const updatedChildren = node.children?.map((child) =>
      updatePath(child, `${newPath}/${child.name}`),
    );

    return {
      ...node,
      path: newPath,
      ...(updatedChildren && { children: updatedChildren }),
    };
  };

  // 전체 트리를 순회하며 대상 노드와 그 자식 노드들의 이름과 경로 업데이트
  return nodes.map((node) => {
    if (node.id === nodeId) {
      // 대상 노드의 새 경로 생성
      const parentPath = node.path.substring(0, node.path.lastIndexOf('/'));
      const newPath = `${parentPath}/${newName}`.replace(/\/\//, '/');

      // 대상 노드와 그 자식 노드들의 경로 업데이트
      return updatePath({ ...node, name: newName }, newPath);
    } else if (node.children) {
      // 대상 노드가 아닐 경우, 자식 노드들에서 재귀적으로 처리
      return {
        ...node,
        children: updateNodeNameAndPath(node.children, nodeId, newName),
      };
    }
    return node; // 변경이 없는 노드는 그대로 반환
  });
}
