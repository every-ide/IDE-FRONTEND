import { FaXmark } from 'react-icons/fa6';
import type { ChatProps } from './Chat';
import { FC } from 'react';

const ChatTopbar: FC<ChatProps> = ({ setIsOpenChat }) => {
  return (
    <div className="flex h-16 items-center justify-between border-b-2 border-mdark bg-ldark p-4">
      <div className="cursor-pointer text-lg">팀 이름</div>
      <FaXmark
        className="size-5 cursor-pointer transition-all hover:text-gray-400"
        onClick={() => setIsOpenChat(false)}
      />
    </div>
  );
};

export default ChatTopbar;
