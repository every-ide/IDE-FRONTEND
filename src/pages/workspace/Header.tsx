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
import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const createFileRunCommand = (filePath: string) => {
  const language = filePath.split('.').pop()?.toLowerCase();
  const splittedFilePath = filePath.split('/');
  const fileName = splittedFilePath.pop();
  const path = splittedFilePath.length > 1 ? splittedFilePath.join('/') : '/';

  switch (language) {
    case 'js':
      return { path, command: `node ${fileName}` };
    case 'java':
      return { path, command: `javac ${fileName}` };
    case 'py':
      return { path, command: `python ${fileName}` };
    default:
      return 'not supported';
  }
};

const Header = () => {
  const { files, selectedFileId, getYorkieDoc, setNeedSave } = useFileStore();
  const { saveFileContent } = useFileAPI();
  const { webSocketService, isConnected } = useWebSocketStore();
  const { containerId } = useParams<{ containerId: string }>();

  // 코드 저장 버튼 onClick
  const handleSave = useCallback(async () => {
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
  }, [files, selectedFileId]);

  // 코드 컴파일 및 실행 버튼 onClick
  const handleCompile = useCallback(async () => {
    if (selectedFileId && webSocketService && isConnected) {
      const targetFile = files.find((file) => file.id === selectedFileId);
      const targetFilePath = targetFile?.path;
      const command = createFileRunCommand(targetFilePath!);

      // 지원하지 않는 파일 확장자
      if (command === 'not supported') {
        toast.error(
          '해당 파일은 실행할 수 없습니다. (지원 확장자: java ,js ,py)',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          },
        );

        return;
      }

      // 컴파일 전 저장이 필요한 경우
      // if (targetFile?.needSave) {
      //   const response = await saveFileContent({
      //     filePath: targetFilePath!,
      //     newContent: targetFile.yorkieDoc!.getRoot().content.toString(),
      //   });
      //   if (response?.status === 200) {
      //     targetFile.yorkieDoc!.update((root) => (root.backendSaved = true));
      //     setNeedSave(selectedFileId, false);
      //   }
      // }

      webSocketService.client.publish({
        destination: `/app/container/${containerId}/terminal`,
        body: JSON.stringify(command),
      });
    }
  }, [files, selectedFileId, webSocketService, containerId, isConnected]);

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
              onClick={handleCompile}
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
