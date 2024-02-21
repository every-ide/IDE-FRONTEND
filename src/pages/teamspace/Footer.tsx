import { cn } from '@/utils/style';
import { FC } from 'react';
import { BsFillTerminalFill } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';

interface FooterProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const Footer: FC<FooterProps> = ({ isOpen, setIsOpen }) => {
  return (
    <footer className="flex h-8  items-center justify-between border-t-2 border-mdark bg-ldark px-2 text-xs">
      {/* setting */}
      <div>
        <FiAlertCircle />
      </div>
      <div className="flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          <BsFillTerminalFill
            className={cn(
              'className="hover:bg-gray-600',
              isOpen ? 'text-accent' : '',
            )}
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
