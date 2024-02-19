import { create } from 'zustand';
import { IUpdateContainerForm } from '../components/my/ContainerBox';

interface IContainer {
  id: string;
  name: string;
  description: string;
  active: boolean;
  createDate: Date;
  lastModifiedDate: Date;
  language: string;
}

interface IContainerStore {
  containerList: IContainer[] | null;
  setContainerList: (data: IContainer[]) => void;
  removeContainer: (name: string) => void;
  addContainer: (arg: IContainer) => void;
  updateContainer: (arg: IUpdateContainerForm) => void;
}

const useContainerStore = create<IContainerStore>((set) => ({
  containerList: null,
  setContainerList: (data) => set({ containerList: data }),
  removeContainer: (name) => {
    set((state) => {
      const newList = state.containerList?.filter((c) => c.name !== name);

      return {
        containerList: newList,
      };
    });
  },
  addContainer: (container) => {
    set((state) => {
      return {
        containerList: state.containerList
          ? [...state.containerList, container]
          : [container],
      };
    });
  },
  updateContainer: (container) => {
    set((state) => {
      const updatedList = state.containerList?.map((c) => {
        if (c.name === container.oldName) {
          return {
            ...c,
            name: container.newName,
            description: container.newDescription,
            active: container.active,
          };
        } else {
          return c;
        }
      });

      return { containerList: updatedList };
    });
  },
}));

export default useContainerStore;
