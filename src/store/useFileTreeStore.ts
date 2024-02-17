import { create } from 'zustand';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import { addNodeToTree, removeNodeById } from '../utils/fileTree/fileTreeUtils';
import {
  findFilePath,
  findFilePathByName,
} from '../utils/fileTree/findNodeUtils';
import { data } from '../components/ui/IDE/data/data';
import { updateNodeNameAndPath } from '../utils/fileTree/nodeUtils';
import {
  globalDocRef,
  initializeYorkieAndSyncWithZustand,
} from '../api/fileTree/setYorkie';
import useFileTreeApi from '../hooks/useFileTreeApi';
export interface FileTreeState {
  document: any;
  containerName: string;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  updateNodeName: (nodeId: string, newName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
  findNodePath: (nodeid: string | number | null) => string | null | number;
  findNodePathByName: (nodename: string) => string | null;
  setFileTreeFromApi: (containerName: string) => void;
  initializeAndSync: (containerName: string) => void;
  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  document: globalDocRef,
  containerName: data.name,
  fileTree: data.children,
  setFileTree: (fileTree) => {
    set({ fileTree });
  },

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
  setFileTreeFromApi: async (containerName) => {
    const { axiosFileTree } = useFileTreeApi();
    const data = axiosFileTree(containerName);
    if (data) {
      set({ fileTree: data.children, containerName: data.name });
    }
  },
  initializeAndSync: async (containerName) => {
    console.log('containerName: ', containerName);
    await initializeYorkieAndSyncWithZustand(containerName, (tree) => {
      console.log('tree: ', tree);
      set({ fileTree: tree });
    });
  },

  // handleWebSocketFileEvent: (fileData: FileSocketReceivedType) => {
  //   set((state) => ({
  //     fileTree: processWebSocketFileEvent(state.fileTree, fileData),
  //   }));
  // },
}));
