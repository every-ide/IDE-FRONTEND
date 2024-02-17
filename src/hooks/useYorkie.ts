import { useFileTreeStore } from '@/src/store/useFileTreeStore';
import { checkDocumentInitialization } from '@/src/utils/yorkie/yorkieUtils';
import yorkie, { Document, Indexable } from 'yorkie-js-sdk';
export const globalDocRef = null;

const API_KEY = import.meta.env.VITE_YORKIE_API_KEY;

const useYorkieHook = () => {
  const { setFileTree, setDocument } = useFileTreeStore();

  const initializeYorkie = async (containerName: string) => {
    const client = new yorkie.Client('https://api.yorkie.dev', {
      apiKey: API_KEY,
    });
    await client.activate();

    const doc = new yorkie.Document(containerName);
    await client.attach(doc);

    return { client, doc };
  };

  const treeInputTest = (doc: Document<unknown, Indexable>) => {
    doc.update((root) => {
      root.yorkieContainer = {
        name: '1-container',
        children: [
          {
            id: 'r1d',
            name: 'public',
            type: 'directory',
            path: '/public',
            children: [
              {
                id: 'r1d1f',
                name: 'index.html',
                type: 'file',
                path: '/public/index.html',
              },
            ],
          },
          // 추가 디렉토리와 파일을 여기에 정의합니다.
        ],
      };
    }, 'Initialize file tree');
  };

  const subscribeToFileTreeChanges = (doc) => {
    const unsubscribe = doc.subscribe((event) => {
      console.log('event: ', event);
      if (event.type === 'remote-change' || event.type === 'local-change') {
        console.log('업뎃중,,,,,');
        const fileTree = doc.getRoot().yorkieContainer;
        setFileTree(fileTree.children);
      }
    });

    return unsubscribe;
  };

  const initializeYorkieAndSyncWithZustand = async (containerName: string) => {
    const { client, doc } = await initializeYorkie(containerName);

    // treeInputTest(doc);
    setDocument(doc);
    doc.subscribe((event) => {
      if (event.type === 'remote-change' || event.type === 'local-change') {
        const fileTree = doc.getRoot().yorkieContainer.children;
        console.log('fileTree: ', fileTree);
        setFileTree(fileTree); // Zustand 스토어의 setFileTree 함수를 호출
      }
    });

    const isInitialized = await checkDocumentInitialization(doc);
    if (!isInitialized) {
      // 초기화 로직 구현
    } else {
      const fileTree = doc.getRoot().yorkieContainer.children;
      console.log('fileTree: ', fileTree);
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

// export async function initializeYorkie(containerName: string) {
//   const client = new yorkie.Client('https://api.yorkie.dev', {
//     apiKey: API_KEY,
//   });
//   await client.activate();

//   const doc = new yorkie.Document(containerName);
//   await client.attach(doc);

//   return { client, doc };
// }

// export function treeInputTest(doc: Document<unknown, Indexable>) {
//   doc.update((root) => {
//     root.yorkieContainer = {
//       name: '1-container',
//       children: [
//         {
//           id: 'r1d',
//           name: 'public',
//           type: 'directory',
//           path: '/public',
//           children: [
//             {
//               id: 'r1d1f',
//               name: 'index.html',
//               type: 'file',
//               path: '/public/index.html',
//             },
//           ],
//         },
//         // 추가 디렉토리와 파일을 여기에 정의합니다.
//       ],
//     };
//   }, 'Initialize file tree');
// }

// export function subscribeToFileTreeChanges(doc) {
//   const unsubscribe = doc.subscribe((event) => {
//     console.log('event: ', event);
//     if (event.type === 'remote-change' || event.type === 'local-change') {
//       console.log('업뎃중,,,,,');
//       const fileTree = doc.getRoot().yorkieContainer;
//       useFileTreeStore.getState().setFileTree(fileTree.children);
//     }
//   });

//   return unsubscribe;
// }

// export async function initializeYorkieAndSyncWithZustand(
//   containerName: string,
//   setFileTree: (fileTree: unknown) => void,
// ) {
//   const { client, doc } = await initializeYorkie(containerName);

//   // treeInputTest(doc);
//   globalDocRef = doc;
//   doc.subscribe((event) => {
//     if (event.type === 'remote-change' || event.type === 'local-change') {
//       const fileTree = doc.getRoot().yorkieContainer.children;
//       console.log('fileTree: ', fileTree);
//       setFileTree(fileTree); // Zustand 스토어의 setFileTree 함수를 호출
//     }
//   });

//   const isInitialized = await checkDocumentInitialization(doc);
//   if (!isInitialized) {
//     // 초기화 로직 구현
//   } else {
//     const fileTree = doc.getRoot().yorkieContainer.children;
//     console.log('fileTree: ', fileTree);
//     setFileTree(fileTree); // 초기 상태 설정
//   }

//   return { client, doc };
// }
