import { useFileTreeStore } from '@/src/store/useFileTreeStore';
import { checkDocumentInitialization } from '@/src/utils/yorkie/yorkieUtils';
import yorkie, { Document, Indexable } from 'yorkie-js-sdk';
import useFileTree from '@/src/hooks/useFileTreeApi';
const API_KEY = import.meta.env.VITE_YORKIE_API_KEY;

const useYorkieHook = () => {
  const { setFileTree, setDocument } = useFileTreeStore();
  const { axiosFileTree } = useFileTree();

  const initializeYorkie = async (containerName: string) => {
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: API_KEY,
    });
    await client.activate();

    const doc = new yorkie.Document(containerName);
    await client.attach(doc);

    return { client, doc };
  };

  const treeInputTest = async (
    doc: Document<unknown, Indexable>,
    containerName,
  ) => {
    const axiosFile = await axiosFileTree(containerName);
    console.log('axiosFile: ', axiosFile);

    doc.update((root) => {
      root.yorkieContainer = axiosFile;
    }, 'Initialize file tree');
  };

  const subscribeToFileTreeChanges = (doc) => {
    const unsubscribe = doc.subscribe((event) => {
      if (event.type === 'remote-change' || event.type === 'local-change') {
        const fileTree = doc.getRoot().yorkieContainer.children.toJS();
        setFileTree(fileTree); // Zustand 스토어의 setFileTree 함수를 호출
      }
    });

    return unsubscribe;
  };

  const initializeYorkieAndSyncWithZustand = async (containerName: string) => {
    const { client, doc } = await initializeYorkie(containerName);

    treeInputTest(doc);
    setDocument(doc);
    subscribeToFileTreeChanges(doc);

    const isInitialized = await checkDocumentInitialization(doc);
    if (!isInitialized) {
      // 초기화 로직 구현
    } else {
      const fileTree = doc.getRoot().yorkieContainer.children.toJS();
      setFileTree(fileTree); // 초기 상태 설정
    }

    return { client, doc };
  };

  return {
    initializeYorkie,
    treeInputTest,
    subscribeToFileTreeChanges,
    initializeYorkieAndSyncWithZustand,
  };
};

export default useYorkieHook;
