import { toast } from 'react-toastify';
import { axiosAuth } from '../api/axios';
import useAuthStore from '../store/AuthProvier';

interface IcreateNewContainerProps {
  containerName: string;
  language: string;
  setOpenModal: (arg: boolean) => void;
  reset: () => void;
}

const useContainerAPI = () => {
  const { userId } = useAuthStore();

  const createNewContainer = async ({
    containerName,
    language,
    setOpenModal,
    reset,
  }: IcreateNewContainerProps) => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosAuth.post(
      `/api/user/${userId}/containers`,
      JSON.stringify({
        containerName,
        language,
      }),
    );

    if (response.status === 200) {
      console.log('containerId: ', response.data.containerId);
      const containerId = response.data.containerId;

      toast('새로운 컨테이너가 생성되었습니다.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });

      // Modal Close & reset
      setOpenModal(false);
      reset();

      // Container list refetching

      // 새 창에서 컨테이너 열기
      window.open(
        `http://localhost:5173/workspace/${containerId}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  const getContainersData = async () => {};

  const deleteContainerData = async () => {};

  const updateContainerData = async () => {};

  return {
    createNewContainer,
    getContainersData,
    deleteContainerData,
    updateContainerData,
  };
};

export default useContainerAPI;
