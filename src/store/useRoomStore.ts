import { create } from 'domain';

export interface RoomType {
  roomId: string;
  name: string;
  isLocked: boolean;
  type: string;
  available: boolean;
}
export interface RoomStoreState {
  rooms: RoomType[];
  setRooms: (rooms: RoomType[]) => void;
}
export const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  setRooms: (rooms) => {
    set({ rooms });
  },
}));
