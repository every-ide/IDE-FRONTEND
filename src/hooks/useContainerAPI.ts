import { toast } from 'react-toastify';
import useAuthStore from '../store/AuthProvier';
import useContainerStore from '../store/useContainerStore';
import useAxiosPrivate from './useAxiosPrivate';

interface IcreateNewContainerProps {
  containerName: string;
  language: string;
  description: string;
  setOpenModal: (arg: boolean) => void;
  reset: () => void;
}

const useContainerAPI = () => {
  const axiosAuth = useAxiosPrivate();
  const { userId, userEmail } = useAuthStore();
  const { setContainerList, addContainer } = useContainerStore();

  const createNewContainer = async ({
    containerName,
    language,
    description,
    setOpenModal,
    reset,
  }: IcreateNewContainerProps) => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosAuth.post(
      `/api/containers`,
      JSON.stringify({
        email: userEmail,
        name: containerName,
        description,
        language,
      }),
    );

    if (response.status === 200) {
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

      // Zustand store : containerList에 추가
      // -> backend 응답값으로 대체하기!!
      addContainer({
        name: containerName,
        description,
        active: true,
        createDate: new Date(),
        lastModifiedDate: new Date(),
        language,
      });

      // 새 창에서 컨테이너 열기
      window.open(
        `http://localhost:5173/workspace/${containerName}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  const getContainersData = async () => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosAuth.get(`/api/${userId}/containers`);

    if (response.status === 200) {
      setContainerList(response.data);
      return response.data;
    }
  };

  const deleteContainerData = async (containerName: string) => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosAuth.delete('/api/containers', {
      data: {
        email: userEmail,
        name: containerName,
      },
    });

    return response;
  };

  const updateContainerData = async () => {};

  return {
    createNewContainer,
    getContainersData,
    deleteContainerData,
    updateContainerData,
  };
};

export default useContainerAPI;
