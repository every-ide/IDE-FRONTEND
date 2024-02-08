import yorkie from 'yorkie-js-sdk';

interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

async function main() {
  const client = new yorkie.Client('https://api.yorkie.dev', {
    apiKey: process.env.YORKIE_API_KEY,
  });
  await client.activate();

  const doc = new yorkie.Document<TreeNode>('everyide');
  await client.attach(doc);

  // 파일 트리 구조 초기화
  doc.update((root) => {
    if (!root.nodes) {
      root.nodes = {
        id: 'root',
        name: 'Root',
        type: 'folder',
        children: [],
      };
    }
  }, '파일 트리 초기화');
}

function addNode(
  doc: yorkie.Document<TreeNode>,
  parentNodeId: string,
  newNode: TreeNode,
) {
  doc.update((root) => {
    const findNode = (node: TreeNode, id: string): TreeNode | null => {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        for (const child of node.children) {
          const result = findNode(child, id);
          if (result) return result;
        }
      }
      return null;
    };

    if (parentNodeId === 'root') {
      root.nodes.children?.push(newNode);
    } else {
      const parentNode = findNode(root.nodes, parentNodeId);
      if (parentNode && parentNode.type === 'folder' && parentNode.children) {
        parentNode.children.push(newNode);
      }
    }
  }, `노드 추가: ${newNode.name}`);
}

function updateNode(
  doc: yorkie.Document<TreeNode>,
  nodeId: string,
  newName: string,
) {
  doc.update((root) => {
    const findAndUpdateNode = (node: TreeNode): boolean => {
      if (node.id === nodeId) {
        node.name = newName;
        return true;
      }
      return node.children?.some(findAndUpdateNode) ?? false;
    };

    findAndUpdateNode(root.nodes);
  }, `노드 수정: ${newName}`);
}

function deleteNode(doc: yorkie.Document<TreeNode>, nodeId: string) {
  doc.update((root) => {
    const findAndDeleteNode = (
      node: TreeNode,
      parentNode?: TreeNode,
    ): boolean => {
      if (node.children) {
        node.children = node.children.filter((child) => {
          if (child.id === nodeId) {
            return false;
          }
          return !findAndDeleteNode(child, node);
        });
        return false;
      }
      return false;
    };

    if (root.nodes.id !== nodeId) {
      findAndDeleteNode(root.nodes);
    }
  }, `노드 삭제: ${nodeId}`);
}

function readNodes(doc: yorkie.Document<TreeNode>) {
  const root = doc.getRoot();
  console.log(JSON.stringify(root.nodes, null, 2));
}

export { main, addNode, updateNode, deleteNode, readNodes };
