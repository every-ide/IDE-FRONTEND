import { toast } from 'react-toastify';
import useContainerStore from '../store/useContainerStore';
import useAxiosPrivate from './useAxiosPrivate';
import useUserStore from '../store/useUserStore';
import { IUpdateContainerForm } from '../components/my/ContainerBox';

interface IcreateNewContainerProps {
  containerName: string;
  language: string;
  description: string;
  setOpenModal: (arg: boolean) => void;
  reset: () => void;
}

const useContainerAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { email, userId } = { ...useUserStore((state) => state.user) };
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

    const response = await axiosPrivate.post(
      `/api/containers`,
      JSON.stringify({
        email,
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
      addContainer(response.data);

      // 새 창에서 컨테이너 열기
      window.open(
        `http://localhost:5173/workspace/${response.data.name}/${response.data.id}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  const getContainersData = async () => {
    const response = await axiosPrivate.get(`/api/${userId}/containers`);

    if (response.status === 200) {
      setContainerList(response.data);
      return response.data;
    }
  };

  const deleteContainerData = async (containerName: string) => {
    const response = await axiosPrivate.delete('/api/containers', {
      data: {
        email,
        name: containerName,
      },
    });

    return response;
  };

  const updateContainerData = async (data: IUpdateContainerForm) => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosPrivate.patch('/api/containers', data);

    return response;
  };

  return {
    createNewContainer,
    getContainersData,
    deleteContainerData,
    updateContainerData,
  };
};

export default useContainerAPI;
