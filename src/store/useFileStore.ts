import { create } from 'zustand';

interface IFile {
  id: string;
  name: string;
  content: string;
  language: string;
  isOpen: boolean;
  needSave: boolean;
}

interface IFileStore {
  files: IFile[];
  selectedFileId: string | null;
  selectFile: (id: string) => void;
  openFile: (
    id: string,
    name: string,
    content: string,
    language: string,
  ) => void;
  closeFile: (id: string) => void;
}

const useFileStore = create<IFileStore>((set) => ({
  files: [
    {
      id: '1',
      name: 'sample.js',
      content: 'console.log("hello world!");',
      language: 'javascript',
      isOpen: true,
      needSave: false,
    },
    {
      id: '2',
      name: 'sample2.js',
      content: 'console.log("hello world22222!");',
      language: 'javascript',
      isOpen: false,
      needSave: false,
    },
  ],
  selectedFileId: '1',
  selectFile: (id) => set({ selectedFileId: id }),
  openFile: (id, name, content, language) => {
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
          state.selectedFileId === id ? null : state.selectedFileId,
      };
    }),
}));

export default useFileStore;
