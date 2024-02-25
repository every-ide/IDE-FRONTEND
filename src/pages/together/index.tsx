import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import { useEffect } from 'react';
import useRoomStore from '@/src/store/useRoomStore';
import useRoomAPI from '@/src/hooks/useRoomApi';
import EmptyStateCommunity from '@/src/components/my/EmptyStateCommunity';
import LoadingEnterRoom from './Room/LoadingEnterRoom';
import Header from '@/src/components/my/Header';
import SEOMetaTag from '@/src/SEO/SEOMetaTag';
import Banner from './Banner';

const TogetherPage = () => {
  const { rooms, isLoading, searchKey } = useRoomStore();
  const { fetchSearchRooms } = useRoomAPI();

  useEffect(() => {
    fetchSearchRooms(searchKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingEnterRoom />; // Modify this as needed
  }

  return (
    <>
      <SEOMetaTag
        title="EVERYIDE - Community"
        description="코딩하다 막힐 때, 막막한 누군가를 도와주고 싶을 때 EveryIde와 함께 커뮤니티를 만들고 실시간으로 지식을 공유하세요!"
        url="https://ide-frontend-wheat.vercel.app/together"
      />
      <div className="h-[calc(100vh)] bg-mdark">
        <Header />
        <Navbar />
        <div className="h-[calc(100vh-9rem)] overflow-x-hidden">
          <Banner />
          <div className="container">
            {rooms ? (
              <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rooms.map((room, index) =>
                  room.available ? <Card key={index} {...room} /> : null,
                )}
              </div>
            ) : (
              <EmptyStateCommunity />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TogetherPage;
