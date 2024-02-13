import { create } from 'zustand';

interface IContainer {
  name: string;
  description: string;
  active: boolean;
  createDate: Date;
  lastModifiedDate: Date;
  language: string;
}

interface IContainerStore {
  containerList: IContainer[];
  setContainerList: (data: IContainer[]) => void;
  removeContainer: (name: string) => void;
  addContainer: (arg: IContainer) => void;
}

const useContainerStore = create<IContainerStore>((set) => ({
  containerList: [],
  setContainerList: (data) => set({ containerList: data }),
  removeContainer: (name) => {
    set((state) => {
      const newList = state.containerList.filter((c) => c.name !== name);

      return {
        containerList: newList,
      };
    });
  },
  addContainer: (container) => {
    set((state) => {
      return {
        containerList: [...state.containerList, container],
      };
    });
  },
}));

export default useContainerStore;
