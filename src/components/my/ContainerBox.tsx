import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { MdOutlineDelete, MdOutlineSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import useContainerStore from '@/src/store/useContainerStore';

interface IContainerBoxProps {
  containerName: string;
  description: string;
  language: string;
  createDate: Date;
  lastModifiedDate: Date;
}

const ContainerBox = ({
  containerName,
  description,
  language,
  createDate,
  lastModifiedDate,
}: IContainerBoxProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteContainerData } = useContainerAPI();
  const { removeContainer } = useContainerStore();

  // 컨테이너 열기 버튼 onClick action
  const navigateToUrlInNewTab = (containerName: string) => {
    window.open(
      `http://localhost:5173/workspace/${containerName}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  // 컨테이너 수정 버튼 onClick action

  // 컨테이너 삭제 버튼 onClick action
  const handleDeleteContainer = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setIsDeleting(true);
      try {
        const response = await deleteContainerData(containerName);

        if (response.status === 200) {
          toast('컨테이너가 삭제되었습니다.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });

          removeContainer(containerName);
        }
      } catch (error) {
        console.error(error);

        toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    }

    setIsDeleting(false);
  };

  return (
    <Card variant="container">
      <CardHeader className="pb-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl">{containerName}</CardTitle>
          <div className="flex flex-row gap-1">
            <Button
              onClick={() => {}}
              variant="icon"
              size="icon"
              className="p-0 text-[#888]"
            >
              <MdOutlineSettings size={20} />
            </Button>
            <Button
              onClick={handleDeleteContainer}
              variant="icon"
              size="icon"
              className="p-0 text-[#888]"
            >
              <MdOutlineDelete size={20} />
            </Button>
          </div>
        </div>
        <CardDescription className="truncate text-[#888]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pb-2 text-sm">
        <p>스택: {language}</p>
        <p>생성일: </p>
        <p>최종수정일:</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => navigateToUrlInNewTab(containerName)}
          size="sm"
          disabled={isDeleting}
        >
          {isDeleting ? '컨테이너 삭제 중...' : '컨테이너 열기'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContainerBox;
