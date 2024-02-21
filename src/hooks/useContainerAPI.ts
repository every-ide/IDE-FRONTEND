import useContainerStore from '../store/useContainerStore';
import useAxiosPrivate from './useAxiosPrivate';
import useUserStore from '../store/useUserStore';
import { IUpdateContainerForm } from '../components/my/ContainerBox';
import useRoomStore from '../store/useRoomStore';

interface IcreateNewContainerProps {
  containerName: string;
  language: string;
  description: string;
  roomId?: string;
}

const useContainerAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { email, userId } = { ...useUserStore((state) => state.user) };
  const { setContainerList, addContainer } = useContainerStore();
  const { addContainerToRoom } = useRoomStore();

  const createNewContainer = async ({
    containerName,
    language,
    description,
    roomId,
  }: IcreateNewContainerProps) => {
    const requestBody = {
      email,
      name: containerName,
      description,
      language,
    };

    if (roomId !== undefined) {
      requestBody.email = roomId;
    } else {
      requestBody.email = email;
    }

    const response = await axiosPrivate.post(
      `/api/containers`,
      JSON.stringify(requestBody),
    );

    // Zustand store : containerList에 추가
    if (response.status === 200) {
      if (roomId !== undefined) {
        addContainerToRoom(response.data);
      } else {
        addContainer(response.data);
      }
    }

    return response;
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
