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
}));

export default useContainerStore;
