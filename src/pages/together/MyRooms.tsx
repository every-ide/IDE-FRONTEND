import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';
import { useEffect } from 'react';
import useRoomAPI from '@/src/hooks/useRoomApi';
import useRoomStore from '@/src/store/useRoomStore';

const MyRooms = () => {
  const { rooms, isLoading } = useRoomStore();
  const { getRooms, fetchData } = useRoomAPI();

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    console.log('isLoading: ', isLoading);
    return <div className="loading-indicator">Loading...</div>; // Modify this as needed
  }

  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms
          .filter((room: any) => room.type === 'ANSWER')
          .map((room, index) =>
            room.available ? <Card key={index} {...room} /> : null,
          )}
      </div>
    </div>
  );
};

export default MyRooms;
