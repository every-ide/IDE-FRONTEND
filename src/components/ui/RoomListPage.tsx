import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';
import { useEffect } from 'react';
import useRoomAPI from '@/src/hooks/useRoomApi';
import useRoomStore, { RoomType } from '@/src/store/useRoomStore';
import EmptyStateCommunity from '@/src/components/my/EmptyStateCommunity';
import LoadingEnterRoom from '@/src/pages/together/Room/LoadingEnterRoom';

interface RoomListPageProps {
  filterCondition: (room: RoomType) => boolean;
}

const RoomListPage: React.FC<RoomListPageProps> = ({ filterCondition }) => {
  const { rooms, isLoading, searchKey } = useRoomStore();
  const { fetchSearchRooms } = useRoomAPI();

  useEffect(() => {
    fetchSearchRooms(searchKey);
  }, [searchKey, fetchSearchRooms]);

  if (isLoading) {
    return <LoadingEnterRoom />;
  }

  return (
    <div className="h-[calc(100vh)] bg-mdark">
      <Header />
      <Navbar />
      <div className="h-[calc(100vh-151px)] overflow-x-hidden overflow-y-scroll">
        <div className="container">
          {rooms?.some(filterCondition) ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rooms
                .filter(filterCondition)
                .map((room, index) =>
                  room.available ? <Card key={index} {...room} /> : null,
                )}
            </div>
          ) : (
            <EmptyStateCommunity />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomListPage;
