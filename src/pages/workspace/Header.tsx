import { FiSave } from 'react-icons/fi';
import { PiPlayDuotone } from 'react-icons/pi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useFileStore from '@/src/store/useFileStore';
import useFileAPI from '@/src/hooks/useFileAPI';

const Header = () => {
  const { files, selectedFileId, getYorkieDoc, setNeedSave } = useFileStore();
  const { saveFileContent } = useFileAPI();

  const handleSave = async () => {
    if (selectedFileId) {
      const savingFile = files.filter((file) => file.id === selectedFileId)[0];
      const savingFilePath = savingFile.path;
      const newContent = getYorkieDoc(selectedFileId)!
        .getRoot()
        .content.toString();

      const response = await saveFileContent({
        filePath: savingFilePath,
        newContent,
      });

      if (response?.status === 200) {
        savingFile.yorkieDoc!.update((root) => {
          root.backendSaved = true;
        });

        setNeedSave(selectedFileId, false);
      }
    }
  };

  return (
    <header className="inline-flex h-8 justify-end border-b-2 border-mdark bg-ldark px-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiSave size={16} onClick={handleSave} />
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
