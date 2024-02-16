import { create } from 'zustand';

interface IFile {
  path: string;
  name: string;
  content: string;
  language: string;
  isOpen: boolean;
  needSave: boolean;
}

interface IFileStore {
  files: IFile[];
  selectedFilePath: string | undefined;
  selectFile: (id: string) => void;
  openFile: (
    path: string,
    name: string,
    content: string,
    language: string,
  ) => void;
  closeFile: (id: string) => void;
}

const useFileStore = create<IFileStore>((set) => ({
  files: [
    {
      path: '/public/index.html',
      name: 'index.html',
      content: '<div>Hello World!</div>',
      language: 'html',
      isOpen: true,
      needSave: false,
    },
    {
      path: '/README.md',
      name: 'README.md',
      content: '### Hello!',
      language: 'markdown',
      isOpen: false,
      needSave: false,
    },
  ],
  selectedFilePath: '/public/index.html',
  selectFile: (path) => set({ selectedFilePath: path }),
  openFile: (path, name, content, language) => {
    set((state) => {
      // 이미 열려있는 파일인 경우
      const existingFile = state.files.find((file) => file.path === path);

      if (existingFile) {
        return {
          ...state,
          selectedFilePath: path,
        };
      }

      const newOpenFile = {
        path,
        name,
        content,
        language,
        isOpen: true,
        needSave: false,
      };

      return {
        files: [...state.files, newOpenFile],
        selectedFilePath: path,
      };
    });
  },
  closeFile: (path) =>
    set((state) => {
      return {
        files: state.files.filter((file) => file.path !== path),
        selectedFilePath:
          state.selectedFilePath === path
            ? state.files[0].path
            : state.selectedFilePath,
      };
    }),
}));

export default useFileStore;
