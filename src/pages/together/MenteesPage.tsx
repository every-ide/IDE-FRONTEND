import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';
import { useEffect, useState } from 'react';
import useRoomAPI from '@/src/hooks/useRoomApi';
import useRoomStore from '@/src/store/useRoomStore';

const MenteesPage = () => {
  const { rooms, setRooms } = useRoomStore();
  const { getRooms } = useRoomAPI();
  useEffect(() => {
    async function fetchData() {
      const roomData = await getRooms();
      console.log('roomData: ', roomData);

      setRooms(roomData.filter((room: any) => room.type === 'QUESTION'));
    }
    fetchData();
  }, []);

  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room, index) =>
          room.available ? <Card key={index} {...room} /> : null,
        )}
      </div>
    </div>
  );
};

export default MenteesPage;
