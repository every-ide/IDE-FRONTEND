import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';
import { useEffect } from 'react';
import useRoomAPI from '@/src/hooks/useRoomApi';
import useRoomStore from '@/src/store/useRoomStore';
import EmptyStateCommunity from '@/src/components/my/EmptyStateCommunity';
import LoadingEnterRoom from './Room/LoadingEnterRoom';

const MyRooms = () => {
  const { rooms, isLoading, searchKey } = useRoomStore();
  const { fetchSearchRooms } = useRoomAPI();

  useEffect(() => {
    fetchSearchRooms(searchKey);
  }, []);

  if (isLoading) {
    console.log('isLoading: ', isLoading);
    return <LoadingEnterRoom />; // Modify this as needed
  }

  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms ? (
          rooms
            .filter((room: any) => room.isJoined === true)
            .map((room, index) =>
              room.available ? <Card key={index} {...room} /> : null,
            )
        ) : (
          <EmptyStateCommunity />
        )}
      </div>
    </div>
  );
};

export default MyRooms;
