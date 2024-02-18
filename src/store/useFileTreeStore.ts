import { create } from 'zustand';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import { addNodeToTree, removeNodeById } from '../utils/fileTree/fileTreeUtils';
import { data } from '../components/ui/IDE/data/data';
import { updateNodeNameAndPath } from '../utils/fileTree/nodeUtils';
export interface FileTreeState {
  doc: any;
  containerName: string;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  setDocument: (document: any) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  doc: null,
  containerName: data.name,
  fileTree: data.children,
  setDocument: (document) => {
    set({ doc: document });
  },
  setFileTree: (fileTree) => {
    set({ fileTree });
  },

  updateNodeName: (nodeId, newName) => {
    {
      const fileTree = useFileTreeStore.getState().fileTree;
      const doc = useFileTreeStore.getState().doc;
      doc.update((root) => {
        root.yorkieContainer.children = updateNodeNameAndPath(
          fileTree,
          nodeId,
          newName,
        );
      }, 'Update node name');
    }
  },
  addNode: (newNode: FileNodeType, parentId?: string | null) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root) => {
      root.yorkieContainer.children = parentId
        ? addNodeToTree(fileTree, newNode, parentId)
        : [...fileTree, newNode];
      console.log('root.yorkieContainer: ', root.yorkieContainer.toJS());
    }, 'Add new node');
  },
  deleteNode: (nodeId) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root) => {
      root.yorkieContainer.children = removeNodeById(fileTree, nodeId);
    }, 'Delete node');
  },

  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => {
  //   set((state) => ({
  //     fileTree: processWebSocketFileEvent(state.fileTree, fileData),
  //   }));
  // },
}));
