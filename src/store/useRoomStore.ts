import create from 'zustand';

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

export interface RoomStoreState {
  rooms: RoomType[];
  setRooms: (rooms: RoomType[]) => void;
  addNewRoom: (room: RoomType) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  setRooms: (rooms) => {
    set({ rooms });
  },
  addNewRoom: (room) => {
    set((state) => ({
      rooms: [...state.rooms, room],
    }));
  },
}));

export default useRoomStore;
