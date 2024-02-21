import useAxiosPrivate from './useAxiosPrivate';
import useUserStore from '../store/useUserStore';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

interface ISaveFileContent {
  filePath: string;
  newContent: string;
}

const useFileAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { email } = { ...useUserStore((state) => state.user) };
  const { containerName } = useParams<{ containerName: string }>();

  const saveFileContent = async ({
    filePath,
    newContent,
  }: ISaveFileContent) => {
    try {
      const response = await axiosPrivate.patch('/api/files', {
        email,
        fromPath: `/${containerName}${filePath}`,
        newContent,
      });

      if (response.status === 200) {
        toast('파일이 저장되었습니다.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }

      return response;
    } catch (error) {
      console.error(error);

      toast.error('코드 저장 중 문제가 발생했습니다. 다시 시도해주세요.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    }
  };

  return {
    saveFileContent,
  };
};

export default useFileAPI;
