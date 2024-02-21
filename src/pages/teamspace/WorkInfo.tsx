import { FC, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { Resizable } from 're-resizable';
import Terminal from '../workspace/Terminal';
import { cn } from '@/src/utils/style';
interface WorkInfoProps {
  setIsOpen: (isOpen: boolean) => void;
}
const WorkInfo: FC<WorkInfoProps> = ({ setIsOpen }) => {
  const [cancelHovered, setCancelHovered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('terminal');

  return (
    <div className="border-l-2 border-mdark bg-mdark">
      <Resizable
        defaultSize={{
          height: '300px',
          width: '100%',
        }}
        enable={{
          top: true, // 위쪽으로만 리사이징 가능
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <div className="flex items-center justify-between border-b-2 border-mdark bg-ldark">
          <div className="inline-flex items-center justify-center bg-ldark">
            <button
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-50',
                activeTab === 'debug'
                  ? 'border-t-2 border-accent bg-mdark'
                  : 'bg-ldark',
              )}
              onClick={() => setActiveTab('debug')}
            >
              디버그
            </button>
            <button
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-50',
                activeTab === 'terminal'
                  ? 'border-t-2 border-accent bg-mdark'
                  : 'bg-ldark',
              )}
              onClick={() => setActiveTab('terminal')}
            >
              터미널
            </button>
            <button
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-medium text-white disabled:pointer-events-none disabled:opacity-50',
                activeTab === 'search'
                  ? 'border-t-2 border-accent bg-mdark'
                  : 'bg-ldark',
              )}
              onClick={() => setActiveTab('search')}
            >
              검색
            </button>
          </div>
          <div
            className="pr-2"
            onMouseEnter={() => setCancelHovered(true)}
            onMouseLeave={() => setCancelHovered(false)}
          >
            <div className="flex size-3 cursor-pointer items-center justify-center rounded-full bg-[#FF605C]">
              {cancelHovered && (
                <FaXmark
                  className="size-[0.6rem] text-gray-600"
                  onClick={() => setIsOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
        <div className={cn(activeTab === 'debug' ? 'block' : 'hidden')}>
          <div>디버그 탭입니다.</div>
        </div>
        <div className={cn(activeTab === 'terminal' ? 'block' : 'hidden')}>
          <Terminal />
        </div>
        <div className={cn(activeTab === 'search' ? 'block' : 'hidden')}>
          <div>검색 탭입니다.</div>
        </div>
      </Resizable>
    </div>
  );
};

export default WorkInfo;
