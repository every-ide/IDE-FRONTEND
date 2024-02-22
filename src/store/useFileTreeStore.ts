import { create } from 'zustand';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import { addNodeToTree, removeNodeById } from '../utils/fileTree/fileTreeUtils';
import { data } from '../components/ui/IDE/data/data';
export interface FileTreeState {
  doc: any;
  containerName: string;
  containerId: string;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  setDocument: (document: any /* Specify the type here */) => void;
  setContainerId: (containerId: string) => void;
  setContainerName: (containerName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  doc: null,
  containerName: '',
  containerId: '',
  fileTree: data.children,
  setDocument: (document) => {
    set({ doc: document });
  },
  setFileTree: (fileTree) => {
    set({ fileTree });
  },
  setContainerId: (containerId) => {
    set({ containerId });
  },
  setContainerName: (containerName) => {
    set({ containerName });
  },
  addNode: (newNode: FileNodeType, parentId?: string | null) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root: any) => {
      root.yorkieContainer.children = parentId
        ? addNodeToTree(fileTree, newNode, parentId)
        : [...fileTree, newNode];
      console.log('root.yorkieContainer: ', root.yorkieContainer.toJS());
    }, 'Add new node');
  },
  deleteNode: (nodeId) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root: any) => {
      root.yorkieContainer.children = removeNodeById(fileTree, nodeId);
    }, 'Delete node');
  },
}));
