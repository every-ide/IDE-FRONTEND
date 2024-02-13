import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';

const events = [
  {
    banner: 'https://source.unsplash.com/random/400x200?event',
    title: '새로운 디자인하는 RSC 2020',
    dateRange: '2020.09.07 - 2020.11.14',
    location: '온라인',
    totalParticipants: 1899,
    currentlyJoined: 109,
    likes: 24,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?conference',
    title: '실습 새로운 디자인하는 RSC2020',
    dateRange: '2020.12.09 - 2021.01.16',
    location: '서울 강남구 삼성동',
    totalParticipants: 429,
    currentlyJoined: 201,
    likes: 10,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?music',
    title: '2020 전통 문화 페스티벌',
    dateRange: '2020.08.08 - 2021.02.26',
    location: '용 산구',
    totalParticipants: 1799,
    currentlyJoined: 361,
    likes: 7,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?music',
    title: '2020 전통 문화 페스티벌',
    dateRange: '2020.08.08 - 2021.02.26',
    location: '용 산구',
    totalParticipants: 1799,
    currentlyJoined: 361,
    likes: 7,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?music',
    title: '2020 전통 문화 페스티벌',
    dateRange: '2020.08.08 - 2021.02.26',
    location: '용 산구',
    totalParticipants: 1799,
    currentlyJoined: 361,
    likes: 7,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?music',
    title: '2020 전통 문화 페스티벌',
    dateRange: '2020.08.08 - 2021.02.26',
    location: '용 산구',
    totalParticipants: 1799,
    currentlyJoined: 361,
    likes: 7,
  },
  {
    banner: 'https://source.unsplash.com/random/400x200?music',
    title: '2020 전통 문화 페스티벌',
    dateRange: '2020.08.08 - 2021.02.26',
    location: '용 산구',
    totalParticipants: 1799,
    currentlyJoined: 361,
    likes: 7,
  },
  // ... more event objects
];

const TogetherPage = () => {
  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, index) => (
          <Card key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default TogetherPage;
