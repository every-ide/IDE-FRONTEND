import { create } from 'zustand';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import {
  addNodeToTree,
  isDuplicateName,
  removeNodeById,
} from '../utils/fileTree/fileTreeUtils';
import {
  findFilePath,
  findFilePathByName,
} from '../utils/fileTree/findNodeUtils';
import { data } from '../components/ui/IDE/data/data';
import { updateNodeNameAndPath } from '../utils/fileTree/nodeUpdate';
export interface FileTreeState {
  file: FileNodeType | null;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
  findNodePath: (nodeid: string | number | null) => string | null | number;
  findNodePathByName: (nodename: string) => string | null;
  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => void;
  isNewNode: boolean;
  setIsNewNode: (boolean: boolean) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  file: null,
  containerName: data.name,
  fileTree: data.children,
  setFileTree: (fileTree) => set({ fileTree }),
  updateNodeName: (nodeId, newName) =>
    set((state) => ({
      fileTree: updateNodeNameAndPath(state.fileTree, nodeId, newName),
    })),

  addNode: (newNode: FileNodeType, parentId?: string | null) =>
    set((state) => {
      return {
        fileTree: parentId
          ? addNodeToTree(state.fileTree, newNode, parentId)
          : [...state.fileTree, newNode],
      };
    }),

  deleteNode: (nodeId) =>
    set((state) => ({
      fileTree: removeNodeById(state.fileTree, nodeId),
    })),

  findNodePath: (nodeid: string | number | null) => {
    const state: FileTreeState = useFileTreeStore.getState();
    return findFilePath(state.fileTree, nodeid);
  },
  findNodePathByName: (nodename: string) => {
    const state: FileTreeState = useFileTreeStore.getState();
    return findFilePathByName(state.fileTree, nodename);
  },

  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => {
  //   set((state) => ({
  //     fileTree: processWebSocketFileEvent(state.fileTree, fileData),
  //   }));
  // },
  isNewNode: false,
  setIsNewNode: (isNewNode) => set({ isNewNode }),
}));

// // fileTree 변경사항을 구독
// useFileTreeStore.subscribe((fileTree: any) => {
//   console.log('FileTree 변경됨:', fileTree);
// });
