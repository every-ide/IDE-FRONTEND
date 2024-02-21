import { create } from 'zustand';
import { IContainer } from './useContainerStore';

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
}

const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  enteredRoom: null,
  setRooms: (rooms) => {
    set({ rooms });
  },
  setEnteredRoom: (room) => set({ enteredRoom: room }),
  addNewRoom: (room) => {
    set((state) => ({
      rooms: [...state.rooms, room],
    }));
  },
}));

export default useRoomStore;