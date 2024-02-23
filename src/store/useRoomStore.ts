import { create } from 'zustand';
import { IContainer } from './useContainerStore';
import { IUpdateContainerForm } from '../components/my/ContainerBox';
import { IUpdateCardProps } from '../components/room/EditRoomInfoForm';

export interface RoomType {
  roomId: string;
  name: string;
  isLocked: boolean;
  type: string;
  available: boolean;
  usersCnt: number;
  maxPeople: number;
  ownerName: string;
  description: string;
  fullRoom: boolean;
  isJoined: boolean;
}

export interface IEnteredRoomDetail {
  room: {
    createDate: Date;
    lastModifiedDate: Date;
    id: string;
    isLocked: boolean;
    name: string;
    password: string;
    type: string;
    available: boolean;
    rootPath: string;
    maxPeople: number;
    containers: IContainer[];
    usersId: number[];
    description: string;
  };
  ownerName: string;
  ownerId: string;
  usersName: string[];
}

export interface RoomStoreState {
  rooms: RoomType[];
  enteredRoom: IEnteredRoomDetail | null;
  isLoading: boolean;
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setRooms: (rooms: RoomType[]) => void;
  setEnteredRoom: (room: IEnteredRoomDetail) => void;
  updateEnteredRoom: (update: Omit<IUpdateCardProps, 'oldName'>) => void;
  addNewRoom: (room: RoomType) => void;
  addContainerToRoom: (container: IContainer) => void;
  updateContainerInRoom: (updatedContainer: IUpdateContainerForm) => void;
  removeContainerFromRoom: (name: string) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  searchKey: '',
  rooms: [],
  enteredRoom: null,
  isLoading: true,
  setRooms: (rooms) => {
    console.log('rooms: ', rooms);
    set({ rooms });
  },
  setSearchKey: (searchKey) => {
    set({ searchKey });
  },
  setEnteredRoom: (room) => set({ enteredRoom: room }),
  updateEnteredRoom: (update) => {
    set((state) => {
      return {
        enteredRoom: {
          ...state.enteredRoom!,
          room: {
            ...state.enteredRoom!.room!,
            name: update.newName,
            description: update.description,
            isLocked: update.isLocked,
            password: update.password,
          },
        },
      };
    });
  },
  addNewRoom: (room) => {
    set((state) => ({
      rooms: [...state.rooms, room],
    }));
  },
  addContainerToRoom: (container) => {
    set((state) => {
      return {
        enteredRoom: {
          ...state.enteredRoom!,
          room: {
            ...state.enteredRoom!.room,
            containers: [...state.enteredRoom!.room.containers, container],
          },
        },
      };
    });
  },
  updateContainerInRoom: (updatedContainer) => {
    set((state) => {
      const updatedList = state.enteredRoom?.room.containers.map((prevC) => {
        if (prevC.name === updatedContainer.oldName) {
          return {
            ...prevC,
            name: updatedContainer.newName,
            description: updatedContainer.newDescription,
            active: updatedContainer.active,
          };
        } else return prevC;
      });

      return {
        enteredRoom: {
          ...state.enteredRoom!,
          room: {
            ...state.enteredRoom!.room,
            containers: updatedList!,
          },
        },
      };
    });
  },
  removeContainerFromRoom: (name) => {
    set((state) => {
      const updatedList = state.enteredRoom?.room.containers.filter(
        (c) => c.name !== name,
      );

      return {
        enteredRoom: {
          ...state.enteredRoom!,
          room: {
            ...state.enteredRoom!.room,
            containers: updatedList!,
          },
        },
      };
    });
  },
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));

export default useRoomStore;
