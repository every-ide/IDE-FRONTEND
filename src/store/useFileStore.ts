import { create } from 'zustand';

interface IFile {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isOpen: boolean;
  needSave: boolean;
}

interface IFileStore {
  files: IFile[];
  selectedFileId: string | undefined;
  selectFile: (id: string) => void;
  openFile: (
    id: string,
    path: string,
    name: string,
    content: string,
    language: string,
  ) => void;
  closeFile: (id: string) => void;
  updateFileNameAndPath: (id: string, path: string, name?: string) => void;
}

const useFileStore = create<IFileStore>((set) => ({
  files: [
    {
      id: 'abc',
      path: '/public/index.html',
      name: 'index.html',
      content: '<div>Hello World!</div>',
      language: 'html',
      isOpen: true,
      needSave: false,
    },
    {
      id: 'def',
      path: '/README.md',
      name: 'README.md',
      content: '### Hello!',
      language: 'markdown',
      isOpen: false,
      needSave: false,
    },
  ],
  selectedFileId: '/public/index.html',
  selectFile: (id) => set({ selectedFileId: id }),
  openFile: (id, path, name, content, language) => {
    set((state) => {
      // 이미 열려있는 파일인 경우
      const existingFile = state.files.find((file) => file.id === id);

      if (existingFile) {
        return {
          ...state,
          selectedFileId: id,
        };
      }

      const newOpenFile = {
        id,
        path,
        name,
        content,
        language,
        isOpen: true,
        needSave: false,
      };

      return {
        files: [...state.files, newOpenFile],
        selectedFileId: id,
      };
    });
  },
  closeFile: (id) =>
    set((state) => {
      return {
        files: state.files.filter((file) => file.id !== id),
        selectedFileId:
          state.selectedFileId === id
            ? state.files[0].id
            : state.selectedFileId,
      };
    }),
  updateFileNameAndPath: (id, path, name) => {
    set((state) => {
      const updatedFile = state.files.filter((file) => file.id === id)[0];

      // 변경된 파일이 files 목록에 포함되어 있으면, store의 파일 정보 업데이트
      if (updatedFile) {
        // 폴더 이름 UPDATE시 : path만 변경
        if (name === undefined) {
          updatedFile.path = path;
        }
        // 파일 이름 UPDATE시 : name, path 모두 변경
        else {
          updatedFile.path = path;
          updatedFile.name = name;
        }

        return {
          files: state.files.map((file) => {
            if (file.id === id) {
              return updatedFile;
            } else {
              return file;
            }
          }),
        };
      }

      return {
        ...state,
      };
    });
  },
}));

export default useFileStore;
