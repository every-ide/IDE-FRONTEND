import { create } from 'zustand';
import { IContainer } from './useContainerStore';
import { IUpdateContainerForm } from '../components/my/ContainerBox';

export interface RoomType {
  roomId: string;
  name: string;
  isLocked: boolean;
  type: string;
  available: boolean;
  usersCount: number;
  maxPeople: number;
  ownerName: string;
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
  };
  ownerId: number;
  usersName: string[];
}

export interface RoomStoreState {
  rooms: RoomType[];
  enteredRoom: IEnteredRoomDetail | null;
  setRooms: (rooms: RoomType[]) => void;
  setEnteredRoom: (room: IEnteredRoomDetail) => void;
  addNewRoom: (room: RoomType) => void;
  addContainerToRoom: (container: IContainer) => void;
  updateContainerInRoom: (updatedContainer: IUpdateContainerForm) => void;
  removeContainerFromRoom: (name: string) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  enteredRoom: null,
  setRooms: (rooms) => {
    console.log('rooms: ', rooms);
    set({ rooms });
  },
  setEnteredRoom: (room) => set({ enteredRoom: room }),
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
}));

export default useRoomStore;
