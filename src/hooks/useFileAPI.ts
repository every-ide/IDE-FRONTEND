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
  const roomId = new URLSearchParams(location.search).get('roomId');

  const saveFileContent = async ({
    filePath,
    newContent,
  }: ISaveFileContent) => {
    const requestData = {
      email: roomId ? roomId : email,
      fromPath: `/${containerName}${filePath}`,
      newContent,
    };

    try {
      const response = await axiosPrivate.patch('/files', requestData);

      return response;
    } catch (error) {
      console.error(error);

      toast.error('코드 저장 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return {
    saveFileContent,
  };
};

export default useFileAPI;
