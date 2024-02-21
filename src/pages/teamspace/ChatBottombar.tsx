import { useRef, useState } from 'react';
import { Message, loggedInUserData } from './data';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { GoPlusCircle } from 'react-icons/go';
import { cn } from '@/src/utils/style';
import { buttonVariants } from '@/src/components/ui/button';
import { FaMicrophone } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { Textarea } from '@/src/components/ui/textarea';

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
}

const ChatBottombar = ({ sendMessage }: ChatBottombarProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + '\n');
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <a
              href="#"
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
            >
              <GoPlusCircle className="size-6" />
            </a>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-2">
            <div className="flex gap-2">
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                )}
              >
                <FaMicrophone className="size-6" />
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="relative w-full"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="flex h-9 w-full resize-none items-center overflow-hidden rounded-full border bg-background text-mdark"
          ></Textarea>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatBottombar;
