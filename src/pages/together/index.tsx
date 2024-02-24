import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import { useEffect } from 'react';
import useRoomStore from '@/src/store/useRoomStore';
import useRoomAPI from '@/src/hooks/useRoomApi';
import EmptyStateCommunity from '@/src/components/my/EmptyStateCommunity';
import LoadingEnterRoom from './Room/LoadingEnterRoom';
import Header from '@/src/components/my/Header';

const TogetherPage = () => {
  const { rooms, isLoading, searchKey } = useRoomStore();
  const { fetchSearchRooms } = useRoomAPI();

  useEffect(() => {
    fetchSearchRooms(searchKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    console.log('isLoading: ', isLoading);
    return <LoadingEnterRoom />; // Modify this as needed
  }

  return (
    <div className="h-[calc(100vh)] bg-mdark">
      <Header />
      <Navbar />
      <div className="h-[calc(100vh-151px)] overflow-x-hidden overflow-y-scroll">
        {rooms ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map((room, index) =>
              room.available ? <Card key={index} {...room} /> : null,
            )}
          </div>
        ) : (
          <EmptyStateCommunity />
        )}
      </div>
    </div>
  );
};

export default TogetherPage;
