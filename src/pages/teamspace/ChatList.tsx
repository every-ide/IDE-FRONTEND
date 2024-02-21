import { useEffect, useRef, useState } from 'react';
import type { Message, UserData } from './data';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/src/utils/style';
import ChatBottombar from './ChatBottombar';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useParams } from 'react-router-dom';

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
}

const ChatList = ({ messages, selectedUser }: ChatProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messagesState, setMessages] = useState<Message[]>(messages ?? []);
  const { webSocketService, isConnected } = useWebSocketStore();
  const { containerId } = useParams<{ containerId: string }>();

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
    if (webSocketService && isConnected) {
      console.log('메시지 publish', webSocketService, isConnected);
      webSocketService.client.publish({
        destination: `/app/container/${containerId}/chat`,
        body: JSON.stringify({
          email: 'testmail@example.com',
          content: '임시용 content입니다.',
        }),
      });
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    // dependencies -> messages
  }, []);
  console.log('message state: ', messagesState);
  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex size-full flex-col overflow-y-auto overflow-x-hidden p-1"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 whitespace-pre-wrap p-4',
                message.name !== selectedUser.name
                  ? 'items-end'
                  : 'items-start',
              )}
            >
              <div className="flex items-center gap-3">
                {message.name === selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}

                <span className=" max-w-xs rounded-md bg-accent p-3">
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} />
    </div>
  );
};

export default ChatList;
