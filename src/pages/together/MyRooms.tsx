import Navbar from '@/src/components/ui/community/Navbar';
import Card from '@/src/components/ui/community/Card';
import Header from '@/src/components/my/Header';

const events = [
  {
    roomId: '100c2816-ca8d-4f26-b92a-11c9f7536502',
    name: '자바가뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: '1b6e17c5-a2b8-494e-8cdb-21b14d02c183',
    name: '내가누군줄아니?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: '2932298a-2e03-4ca5-ad74-f50e89946145',
    name: '파이썬이뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: '36b35eac-836e-445d-871a-3434eb9e810d',
    name: '스프링이뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: '460a7830-ba6d-4689-8d44-a8a4dc3ce1e0',
    name: 'IDE가뭐에요?',
    isLocked: true,
    type: 'TEACH',
    available: true,
  },
  {
    roomId: '7089e8b0-2742-484a-b012-53a1ed8e9707',
    name: '프론트가뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: '86bf94b9-d666-4cc0-9b9c-7de34bdf13b6',
    name: 'IDE가뭐에요123?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: 'acb31d9f-f211-4e35-b8d6-6520a162ccd2',
    name: 'IDE가뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: 'beb17517-bec1-4380-a92f-3a450f392c1b',
    name: '리엑트가뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: 'ca3cb0dd-fd18-4a14-97a0-6cb6b3231b69',
    name: '공부하기싫다',
    isLocked: true,
    type: 'QUESTION',
    available: true,
  },
  {
    roomId: 'd158bb76-c721-4c05-a6a0-87e3a7a67f8f',
    name: 'IDE가뭐에요?',
    isLocked: true,
    type: 'QUESTION',
    available: false,
  },
];

const MyRoomsPage = () => {
  return (
    <div className="bg-mdark">
      <Header />
      <Navbar />
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, index) =>
          event.available ? <Card key={index} {...event} /> : null,
        )}
      </div>
    </div>
  );
};

export default MyRoomsPage;
