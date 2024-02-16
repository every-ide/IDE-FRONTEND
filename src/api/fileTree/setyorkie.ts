import { useFileTreeStore } from '@/src/store/useFileTreeStore';
import { checkDocumentInitialization } from '@/src/utils/yorkie/yorkieUtils';
import yorkie, { Document, Indexable } from 'yorkie-js-sdk';
export let globalDocRef = null;

export async function initializeYorkie(containerName: string) {
  const client = new yorkie.Client('https://api.yorkie.dev', {
    apiKey: 'cn25p6lafcg8gj9hpmu0',
  });
  await client.activate();

  const doc = new yorkie.Document(containerName);
  await client.attach(doc);

  return { client, doc };
}

export function initializeFileTree(doc: Document<unknown, Indexable>) {
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
            {
              id: 'r1df',
              name: 'inde.html',
              type: 'file',
              path: '/public/inde.html',
            },
          ],
        },
        // 추가 디렉토리와 파일을 여기에 정의합니다.
      ],
    };
  }, 'Initialize file tree');
}

export function subscribeToFileTreeChanges(doc) {
  const unsubscribe = doc.subscribe((event) => {
    console.log('event: ', event);
    if (event.type === 'remote-change' || event.type === 'local-change') {
      console.log('업뎃중,,,,,');
      const fileTree = doc.getRoot().yorkieContainer;
      useFileTreeStore.getState().setFileTree(fileTree.children);
    }
  });

  return unsubscribe;
}

export async function initializeYorkieAndSyncWithZustand(containerName) {
  const { client, doc } = await initializeYorkie(containerName);
  globalDocRef = doc;

  const isInitialized = await checkDocumentInitialization(doc);
  if (!isInitialized) {
    // 문서가 새로 생성되었거나 초기화가 필요한 경우
    initializeFileTree(doc);
  } else {
    const fileTree = doc.getRoot().yorkieContainer;
    useFileTreeStore.getState().setFileTree(fileTree.children);
  }

  subscribeToFileTreeChanges(doc);
  return { client, doc };
}

export async function run() {
  await initializeYorkieAndSyncWithZustand('1-container');
}
