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
  memteesRooms: RoomType[];
  mentorsRooms: RoomType[];
  myRooms: RoomType[];
  setRooms: (rooms: RoomType[]) => void;
  setMemteesRooms: (rooms: RoomType[]) => void;
  setMentorsRooms: (rooms: RoomType[]) => void;
}
export const useRoomStore = create<RoomStoreState>((set) => ({
  rooms: [],
  setRooms: (rooms) => {
    set({ rooms });
  },
}));
