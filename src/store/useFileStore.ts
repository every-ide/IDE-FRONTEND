import { create } from 'zustand';

interface IFile {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface IFileStore {
  files: IFile[];
}

const useFileStore = create<IFileStore>((set) => ({
  files: [],
}));

export default useFileStore;
