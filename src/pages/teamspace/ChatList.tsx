import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/src/utils/style';
import ChatBottombar from './ChatBottombar';
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useParams } from 'react-router-dom';
import useUserStore from '@/src/store/useUserStore';
import { messageListProps } from '.';
import Avatar from 'boring-avatars';

interface ChatProps {
  messageList?: messageListProps[];
}

const ChatList = ({ messageList }: ChatProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { webSocketService, isConnected } = useWebSocketStore();
  const { containerId } = useParams<{ containerId: string }>();
  const { user } = useUserStore();

  const sendMessage = (newMessage: string) => {
    if (webSocketService && isConnected) {
      webSocketService.client.publish({
        destination: `/app/container/${containerId}/chat`,
        body: JSON.stringify({
          userId: user?.userId,
          content: newMessage,
        }),
      });
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messageList]);
  return (
    <div className="flex h-[calc(100%-4rem)] w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex size-full flex-col overflow-y-auto overflow-x-hidden p-1"
      >
        <AnimatePresence>
          {messageList?.map((message, index) => (
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
                  duration: messageList.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 whitespace-pre-wrap p-4',
                message.userId === user?.userId ? 'items-end' : 'items-start',
              )}
            >
              <div className="flex items-end gap-1">
                {message.userId !== user?.userId && (
                  <Avatar
                    // name={message.userId}
                    size={60}
                    variant="beam"
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F0AB3D',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
                )}
                <div className="flex flex-col">
                  <small className="text-gray-400">{message.name}</small>
                  <span className="max-w-xs rounded-md bg-mdark p-3">
                    {message.content}
                  </span>
                </div>

                {message.userId === user?.userId && (
                  <Avatar
                    // name={message.userId}
                    size={40}
                    variant="beam"
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F0AB3D',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
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
