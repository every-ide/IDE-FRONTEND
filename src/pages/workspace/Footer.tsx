import { cn } from '@/utils/style';
import { Dispatch, FC, SetStateAction } from 'react';
import { BsFillTerminalFill } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';

interface FooterProps {
  setIsOpenWorkInfo: Dispatch<SetStateAction<boolean>>;
  isOpenWorkInfo: boolean;
}

const Footer: FC<FooterProps> = ({ setIsOpenWorkInfo, isOpenWorkInfo }) => {
  const toggleTerminal = () => {
    setIsOpenWorkInfo((prevState) => !prevState);
  };

  return (
    <footer className="flex h-8  items-center justify-between border-t-2 border-mdark bg-ldark px-2 text-xs">
      {/* setting */}
      <div>
        <FiAlertCircle />
      </div>
      <div className="flex items-center">
        <button onClick={toggleTerminal}>
          <BsFillTerminalFill
            className={cn(
              'className="hover:bg-gray-600',
              isOpenWorkInfo ? 'text-accent' : '',
            )}
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
