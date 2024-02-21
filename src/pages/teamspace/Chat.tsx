import { FC, useState } from 'react';
import ChatTopbar from './ChatTopbar';
import ChatList from './ChatList';
import { Message, userData } from './data';

export interface ChatProps {
  setIsOpenChat: (isOpenChat: boolean) => void;
}

const Chat: FC<ChatProps> = ({ setIsOpenChat }) => {
  const [selectedUser, setSelectedUser] = useState(userData[0]);
  console.log('selectedUser', selectedUser);
  return (
    <section className="h-[100%] w-80 rounded-s-2xl border-l-2  border-mdark bg-ldark ">
      <ChatTopbar setIsOpenChat={setIsOpenChat} />
      <ChatList messages={selectedUser.messages} selectedUser={selectedUser} />
    </section>
  );
};

export default Chat;
