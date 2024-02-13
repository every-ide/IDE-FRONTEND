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
import { axiosAuth } from '@/src/api/axios';
import useAuthStore from '@/src/store/AuthProvier';
import { toast } from 'react-toastify';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface IContainerBoxProps {
  containerId: string;
  containerName: string;
  language: string;
  type: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const ContainerBox = ({
  containerId,
  containerName,
  language,
  type,
  createdAt,
  lastUpdatedAt,
}: IContainerBoxProps) => {
  const { userId } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);

  // 컨테이너 열기 버튼 onClick action
  const navigateToUrlInNewTab = (containerId: string) => {
    window.open(
      `http://localhost:5173/workspace/${containerId}`,
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
        // Test용!!!! (추후 삭제)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axiosAuth.delete(
          BASE_URL + `/api/user/${userId}/containers/${containerId}`,
        );

        if (response.status === 200) {
          toast('컨테이너가 삭제되었습니다.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
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
        <CardDescription className="text-[#888]">
          {language} | {type}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0 text-sm">
        <p>created: </p>
        <p>last update:</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          onClick={() => navigateToUrlInNewTab(containerId)}
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
