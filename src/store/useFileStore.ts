import { create } from 'zustand';
import { type Document, Indexable } from 'yorkie-js-sdk';
import { YorkieDoc } from '@/components/codeEditor/CodeEditorWindow';

export interface IFile {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  needSave: boolean;
  yorkieDoc: Document<YorkieDoc, Indexable> | null;
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
  setYorkieDoc: (fileId: string, doc: Document<YorkieDoc, Indexable>) => void;
  getYorkieDoc: (fileId: string) => Document<YorkieDoc, Indexable> | null;
  setNeedSave: (fileId: string, val: boolean) => void;
}

const useFileStore = create<IFileStore>((set) => ({
  files: [],
  selectedFileId: undefined,
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
        needSave: false,
        yorkieDoc: null,
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
  setYorkieDoc: (fileId, doc) => {
    set((state) => {
      return {
        files: state.files.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              yorkieDoc: doc,
            };
          } else {
            return file;
          }
        }),
      };
    });
  },
  getYorkieDoc: (fileId) => {
    const state: IFileStore = useFileStore.getState();

    const selectedFile = state.files.filter((file) => file.id === fileId)[0];

    return selectedFile.yorkieDoc;
  },
  setNeedSave: (fileId, val) => {
    set((state) => {
      return {
        files: state.files.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              needSave: val,
            };
          } else {
            return file;
          }
        }),
      };
    });
  },
}));

export default useFileStore;
