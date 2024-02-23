import { v4 as uuidv4 } from 'uuid';

export async function createFileTree(files: File[]) {
  const root = [];
  // const content = '';

  root.push(fileMetadataToObject(files[0], `/${files[0].name}`));
  console.log('root: ', root);
  // for (const file of files) {
  // const pathParts = file.path.split('/').filter(Boolean);
  // console.log('pathParts: ', pathParts);
  // const currentLevel = { children: root };
  // if (file.path.split('/').length === 1) {
  // root.push(fileMetadataToObject(files[0], `/${files[0].name}`));
  // console.log('root: ', root);
  // continue;
  // }
  // for (let index = 0; index < pathParts.length; index++) {
  //   const part = pathParts[index];
  //   let node = currentLevel.children.find((node) => node.name === part);

  //   if (index === pathParts.length - 1) {
  //     if (!node) {
  //       content = await readFileContent(file); // 비동기적으로 파일 내용 읽기
  //       node = fileMetadataToObject(file); // 파일 메타데이터 생성 시 내용 포함
  //       currentLevel.children.push(node);
  //       console.log('node: ', node);
  //       console.log('content: ', content);
  //     }
  //   } else {
  //     if (!node) {
  //       node = {
  //         id: uuidv4(),
  //         name: part,
  //         type: 'directory',
  //         path: '/' + pathParts.slice(0, index + 1).join('/'),
  //         children: [],
  //       };
  //       currentLevel.children.push(node);
  //     }
  //     currentLevel = node;
  //   }
  // }
  // }

  return root;
}

// fileMetadataToObject 함수 수정. content 인자 추가
export function fileMetadataToObject(file: File, filePath: string) {
  return {
    id: uuidv4(),
    name: file.name,
    type: 'file',
    path: filePath,
    children: [],
  };
}

export function readFileContent(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result); // 파일 내용을 resolve로 반환
      } else {
        reject(new Error('Event target is null.'));
      }
    };

    reader.onerror = (event) => {
      const error = event.target?.error; // Add null check here
      reject(error); // 에러가 발생하면 reject
    };

    reader.readAsText(file); // 파일을 텍스트로 읽기 시작
  });
}
