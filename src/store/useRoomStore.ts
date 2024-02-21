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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setRooms: (rooms: RoomType[]) => void;
  addNewRoom: (room: RoomType) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  isLoading: true,
  setRooms: (rooms) => {
    console.log('rooms: ', rooms);
    set({ rooms });
  },
  addNewRoom: (room) => {
    set((state) => ({
      rooms: [...state.rooms, room],
    }));
  },
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));

export default useRoomStore;
