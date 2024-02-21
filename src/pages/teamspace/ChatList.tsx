import { useEffect, useRef } from 'react';
import type { Message, UserData } from './data';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/src/utils/style';

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
}

const ChatList = ({ messages, selectedUser }: ChatProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
    // dependencies -> messages
  }, []);
  return (
    // <div className="flex size-full flex-col overflow-y-auto overflow-x-hidden">
    <div
      ref={messagesContainerRef}
      className="flex size-full flex-col overflow-y-auto overflow-x-hidden"
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
              message.name !== selectedUser.name ? 'items-end' : 'items-start',
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
              <span className=" max-w-xs rounded-md bg-accent p-3">
                {message.message}
              </span>
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

    // </div>
  );
};

export default ChatList;
