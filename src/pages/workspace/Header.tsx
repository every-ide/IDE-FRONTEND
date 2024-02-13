import { Button } from '@/src/components/ui/button';
import { FiSave } from 'react-icons/fi';
import { PiPlayDuotone } from 'react-icons/pi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Header = () => {
  const handleSave = () => {};

  return (
    <header className="inline-flex h-8 justify-end border-b-2 border-mdark bg-ldark px-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiSave size={16} onClick={() => {}} />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>저장</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <PiPlayDuotone
              className="ml-4 text-accent"
              size={16}
              onClick={() => {}}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>컴파일 및 실행</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};

export default Header;
