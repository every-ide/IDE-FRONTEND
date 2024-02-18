import { v4 as uuidv4 } from 'uuid';

export async function createFileTree(files) {
  const root = [];
  let content = '';

  for (const file of files) {
    const pathParts = file.path.split('/').filter(Boolean);
    console.log('pathParts: ', pathParts);
    let currentLevel = { children: root };
    if (file.path.split('/').length === 1) {
      root.push(fileMetadataToObject(file, `/${file.name}`));
      console.log('root: ', root);
      continue;
    }
    for (let index = 0; index < pathParts.length; index++) {
      const part = pathParts[index];
      let node = currentLevel.children.find((node) => node.name === part);

      if (index === pathParts.length - 1) {
        if (!node) {
          content = await readFileContent(file); // 비동기적으로 파일 내용 읽기
          node = fileMetadataToObject(file); // 파일 메타데이터 생성 시 내용 포함
          currentLevel.children.push(node);
        }
      } else {
        if (!node) {
          node = {
            id: uuidv4(),
            name: part,
            type: 'directory',
            path: '/' + pathParts.slice(0, index + 1).join('/'),
            children: [],
          };
          currentLevel.children.push(node);
        }
        currentLevel = node;
      }
    }
  }

  return root;
}

// fileMetadataToObject 함수 수정. content 인자 추가
export function fileMetadataToObject(file, filePath?) {
  return {
    id: uuidv4(),
    name: file.name,
    type: 'file',
    path: filePath || file.path,
    children: [],
  };
}

export function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result); // 파일 내용을 resolve로 반환
    };

    reader.onerror = (event) => {
      reject(event.target.error); // 에러가 발생하면 reject
    };

    reader.readAsText(file); // 파일을 텍스트로 읽기 시작
  });
}
