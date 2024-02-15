// Import Zustand and other required libraries
import { create } from 'zustand';
import yorkie from 'yorkie-js-sdk';

// Define the FileNodeType and other utilities (assuming they are already defined)
// import { FileNodeType, addNodeToTree, removeNodeById, findFilePath, findFilePathByName } from '../path/to/your/utils';

// Example FileNodeType and data for demonstration purposes
// const data = [{ id: 'root', name: 'Project', children: [] }];

// Define the FileTreeState interface and the useFileTreeStore
// (implementation details depend on your actual data and utility functions)

let docInstance = null;

export async function setupYorkie() {
  if (docInstance) {
    console.log('Yorkie document is already set up.');
    return docInstance;
  }

  const { fileTree, setFileTree } = useFileTreeStore();

  console.log('Initializing Yorkie client...');
  const client = new yorkie.Client('https://api.yorkie.dev', {
    apiKey: import.meta.env.VITE_YORKIE_API_KEY,
  });

  await client.activate();
  console.log('Yorkie client activated.');

  const doc = new yorkie.Document('everyide');
  await client.attach(doc);
  console.log('Yorkie document attached.');

  // Subscribe to fileTree changes from Zustand store and update Yorkie document
  useFileTreeStore.subscribe((fileTree) => {
    console.log('FileTree changed:', fileTree);
    const sanitizedFileTree = sanitizeState(fileTree);
    doc.update((root) => {
      root.fileTree = sanitizedFileTree;
      console.log(
        'Yorkie document updated with new fileTree:',
        sanitizedFileTree,
      );
    }, 'update file tree from Zustand store');
  });

  // Listen for changes in the Yorkie document and update Zustand store accordingly
  doc.subscribe((event) => {
    console.log('Yorkie document event:', event.type, event);
    if (event.type === 'document-changed') {
      const updatedFileTree = doc.getRoot().fileTree;
      useFileTreeStore.getState().setFileTree(updatedFileTree);
    }
  });

  // Initialize Zustand store with the initial fileTree from Yorkie document, if present
  const initialFileTree = doc.getRoot().fileTree;
  if (initialFileTree) {
    useFileTreeStore.getState().setFileTree(initialFileTree);
  }

  docInstance = doc;
  return docInstance;
}

// Sanitize state by removing functions
function sanitizeState(state) {
  return JSON.parse(
    JSON.stringify(state, (key, value) =>
      typeof value === 'function' ? undefined : value,
    ),
  );
}

// Example Zustand store setup for fileTree management
export const useFileTreeStore = create((set) => ({
  fileTree: [], // Initial state
  setFileTree: (fileTree) => set({ fileTree }),
  // Define other actions such as updateNodeName, addNode, deleteNode, etc.
}));

async function clearYorkieDocument() {
  if (!docInstance) {
    console.warn('Yorkie document is not initialized.');
    return;
  }

  docInstance.update((root) => {
    // Reset the 'fileTree' field to an empty array or initial state
    root.fileTree = [];
    console.log('Yorkie document cleared.');
  }, 'Clear Yorkie document');
}
