export async function checkDocumentInitialization(doc) {
  const root = doc.getRoot();
  // 문서의 root에 yorkieContainer가 존재하는지 확인
  if (root) {
    console.log('이 문서는 이미 초기화되었습니다.');
    return true;
  } else {
    console.log('이 문서는 새로 생성되었습니다.');
    return false;
  }
}

export function updateYorkieFileTree(doc, fileTree) {
  doc.update((root) => {
    root = fileTree;
  }, 'Update file tree');
}

// export function addFile(doc, directoryPath, fileName) {
//     doc.update((root) => {
//       const directory = findDirectoryByPath(root.fileTree, directoryPath);
//       if (directory) {
//         directory.children.push({
//           id: `f${Date.now()}`, // 간단한 ID 생성 예
//           name: fileName,
//           type: 'file',
//           path: `${directoryPath}/${fileName}`,
//         });
//       }
//     }, `Add file ${fileName}`);
//   }

//   // directoryPath에 따라 디렉토리를 찾는 함수를 구현해야 합니다.
// export function findNodeById(fileTree, directoryPath) {
//     // 디렉토리 찾기 로직 구현
//   }

// export function deleteFile(doc, filePath) {
//     doc.update((root) => {
//       const directory = findDirectoryByPath(root.fileTree, filePath);
//       if (directory) {
//         const index = directory.children.findIndex((file) => file.path === filePath);
//         if (index !== -1) {
//           directory.children.splice(index, 1);
//         }
//       }
//     }, `Delete file ${filePath}`);
//   }

// export function renameFile(doc, filePath, newFileName) {
//     doc.update((root) => {
//       const file = findFileByPath(root.fileTree, filePath);
//       if (file) {
//         file.name = newFileName;
//         file.path = `${filePath.substring(0, filePath.lastIndexOf('/'))}/${newFileName}`;
//       }
//     }, `Rename file ${filePath} to ${newFileName}`);
//   }
