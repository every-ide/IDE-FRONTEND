import { useFileTreeStore } from '@/src/store/useFileTreeStore';
import yorkie, { Document, Indexable } from 'yorkie-js-sdk';
import useFileTree from '@/src/hooks/filetreeHook/useFileTreeApi';
import { useParams } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_YORKIE_API_KEY;

interface FileTreeNode {
  id: string;
  name: string;
  path: string;
  type: string;
  children: FileTreeNode[]; // 디렉토리일 경우 자식 노드 포함, 파일일 경우 없음
}

export interface YorkieContainer {
  yorkieContainer: FileTreeNode;
}

const useYorkieHook = () => {
  const { setFileTree, setDocument, setContainerId, setContainerName } =
    useFileTreeStore();
  const { axiosFileTree } = useFileTree();

  const { containerId: projectId } = useParams<{ containerId: string }>();

  const initializeYorkieAndSyncWithZustand = async (projectName: string) => {
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: API_KEY,
    });
    await client.activate();

    const axiosFile = (await axiosFileTree(projectName)) as FileTreeNode;
    const doc = new yorkie.Document<YorkieContainer>(
      `${projectName}-${projectId}`,
    );

    // Zustand 스토어에 yorkie 문서와 컨테이너 아이디를 설정
    setContainerId(projectId as string);
    setDocument(doc);
    setContainerName(projectName);
    await client.attach(doc);

    // 파일트리 변경을 구독하고, 초기화 여부를 확인
    subscribeToFileTreeChanges(doc);
    const isInitialized = await checkDocumentInitialization(doc);
    if (!isInitialized) {
      await initializeDataToYorkie(doc, axiosFile);
    }
    const fileTree = doc.getRoot().yorkieContainer.children.toJS();
    console.log('fileTreeqbbdhjb!!!BH!BHJ!B!H!JH!BH!: ', fileTree);
    setFileTree(fileTree); // 초기 상태 설정

    return { client, doc };
  };

  const initializeDataToYorkie = async (
    doc: Document<YorkieContainer, Indexable>,
    axiosTree: FileTreeNode, // Specify the type of axiosTree parameter
  ) => {
    doc.update((root) => {
      root.yorkieContainer = axiosTree;
    }, 'Initialize file tree');
  };

  const subscribeToFileTreeChanges = (
    doc: Document<YorkieContainer, Indexable>,
  ) => {
    const unsubscribe = doc.subscribe((event) => {
      if (event.type === 'remote-change' || event.type === 'local-change') {
        console.log(
          '파일트리 변경됨 : ',
          doc.getRoot().yorkieContainer.children.toJS(),
        );
        const fileTree = doc.getRoot().yorkieContainer.children.toJS();
        setFileTree(fileTree); // Zustand 스토어의 setFileTree 함수를 호출
      }
    });

    return unsubscribe;
  };

  const checkDocumentInitialization = async (
    doc: Document<YorkieContainer, Indexable>,
  ) => {
    const root = doc.getRoot();
    // 문서의 root에 yorkieContainer가 존재하는지 확인
    if (root.yorkieContainer) {
      console.log('이 문서는 이미 초기화되었습니다.');
      return true;
    } else {
      console.log('이 문서는 새로 생성되었습니다.');
      return false;
    }
  };

  return {
    initializeYorkieAndSyncWithZustand,
  };
};

export default useYorkieHook;
