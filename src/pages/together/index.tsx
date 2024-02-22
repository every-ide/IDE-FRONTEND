import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';
import { useEffect, useState } from 'react';
import useRoomStore from '@/src/store/useRoomStore';
import useRoomAPI from '@/src/hooks/useRoomApi';

const TogetherPage = () => {
  const { rooms, isLoading, searchKey } = useRoomStore();
  const { fetchSearchRooms } = useRoomAPI();

  useEffect(() => {
    fetchSearchRooms(searchKey);
  }, []);

  if (isLoading) {
    console.log('isLoading: ', isLoading);
    return <div className="loading-indicator">Loading...</div>; // Modify this as needed
  }

  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid h-[calc(100vh-151px)] grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room, index) =>
          room.available ? <Card key={index} {...room} /> : null,
        )}
      </div>
    </div>
  );
};

export default TogetherPage;
