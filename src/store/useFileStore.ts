import { create } from 'zustand';

interface IFile {
  id: string;
  name: string;
  content: string;
  language: string;
  isOpen: boolean;
}

interface IFileStore {
  files: IFile[];
  selectedFileId: string | null;
}

const useFileStore = create<IFileStore>((set) => ({
  files: [
    {
      id: '1',
      name: 'sample.js',
      content: 'console.log("hello world!");',
      language: 'javascript',
      isOpen: true,
    },
    {
      id: '2',
      name: 'sample2.js',
      content: 'console.log("hello world22222!");',
      language: 'javascript',
      isOpen: false,
    },
  ],
  selectedFileId: '1',
}));

export default useFileStore;
