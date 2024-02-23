import { create } from 'zustand';
import { FileNodeType } from '../types/IDE/FileTree/FileDataTypes';
import { addNodeToTree, removeNodeById } from '../utils/fileTree/fileTreeUtils';
import { data } from '../components/ui/IDE/data/data';
import { YorkieContainer } from '../hooks/filetreeHook/useYorkie';
import { Document, Indexable, JSONObject } from 'yorkie-js-sdk';
export interface FileTreeState {
  doc: Document<YorkieContainer, Indexable>;
  containerName: string;
  containerId: string;
  fileTree: FileNodeType[];
  setFileTree: (fileTree: FileNodeType[]) => void;
  setDocument: (
    document: Document<YorkieContainer, Indexable> /* Specify the type here */,
  ) => void;
  setContainerId: (containerId: string) => void;
  setContainerName: (containerName: string) => void;
  addNode: (newNode: FileNodeType, parentId?: string | null) => void;
  deleteNode: (nodeids: string | null) => void;
}

export const useFileTreeStore = create<FileTreeState>((set) => ({
  doc: new Document<YorkieContainer>(''),
  containerName: '',
  containerId: '',
  fileTree: data.children,
  setDocument: (document) => {
    console.log('document: 도큐먼트하는중,,,', document);
    set({ doc: document });
  },
  setFileTree: (fileTree) => {
    console.log('fileTree: 스토어에 업로드를 해보는중', fileTree);
    set({ fileTree });
  },
  setContainerId: (containerId) => {
    console.log('containerId: 컨테이너id하는중', containerId);
    set({ containerId });
  },
  setContainerName: (containerName) => {
    console.log('containerName: 컨테이너 이름 넣는중,,', containerName);
    set({ containerName });
  },
  addNode: (newNode: FileNodeType, parentId?: string | null) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root: JSONObject<YorkieContainer>) => {
      root.yorkieContainer.children = parentId
        ? addNodeToTree(fileTree, newNode, parentId)
        : [...fileTree, newNode];
    }, 'Add new node');
  },
  deleteNode: (nodeId) => {
    const fileTree = useFileTreeStore.getState().fileTree;
    const doc = useFileTreeStore.getState().doc;
    doc.update((root: JSONObject<YorkieContainer>) => {
      root.yorkieContainer.children = removeNodeById(fileTree, nodeId);
    }, 'Delete node');
  },
}));
