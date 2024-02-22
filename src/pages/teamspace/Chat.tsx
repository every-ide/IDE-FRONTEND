import { FC } from 'react';
import ChatTopbar from './ChatTopbar';
import ChatList from './ChatList';
import type { messageListProps } from '.';

export interface ChatProps {
  setIsOpenChat: (isOpenChat: boolean) => void;
  messageList?: messageListProps[];
}

const Chat: FC<ChatProps> = ({ setIsOpenChat, messageList }) => {
  return (
    <section className="h-[100%] w-80 rounded-s-2xl border-l-2  border-mdark bg-ldark ">
      <ChatTopbar setIsOpenChat={setIsOpenChat} />
      <ChatList messageList={messageList} />
    </section>
  );
};

export default Chat;
