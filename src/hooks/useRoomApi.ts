import { toast } from 'react-toastify';
import useAxiosPrivate from './useAxiosPrivate';
import { IUpdateContainerForm } from '../components/my/ContainerBox';
import useRoomStore from '../store/useRoomStore';

interface IcreateNewRoomProps {
  name: string;
  isLocked: boolean;
  password: string;
  roomType: string;
  maxPeople: number;
  setOpenModal: (arg: boolean) => void;
  reset: () => void;
}

const useRoomAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setRooms, addNewRoom } = useRoomStore();

  const createNewRoom = async ({
    name,
    isLocked,
    password,
    roomType,
    maxPeople,
    setOpenModal,
    reset,
  }: IcreateNewRoomProps) => {
    // Test용!!!! (추후 삭제)
    console.log(
      'isLocked,password,roomType,maxPeople,: ',
      isLocked,
      password,
      roomType,
      maxPeople,
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosPrivate.post(`/api/community`, {
      name,
      isLocked,
      password,
      roomType,
      maxPeople,
    });

    if (response.status === 201) {
      toast('새로운 방 생성되었습니다.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });

      // Modal Close & reset
      setOpenModal(false);
      reset();

      addNewRoom(response.data);

      //   // 새 창에서 컨테이너 열기
      //   window.open(
      //     `http://localhost:5173/workspace/${containerName}`,
      //     '_blank',
      //     'noopener,noreferrer',
      //   );
    }
  };

  const getRooms = async () => {
    try {
      const response = await axiosPrivate.get(`/api/communities`);
      console.log('Rooms api 호출:', `/api/communities`);
      console.log('response: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Rooms 오류:', error);
    }
  };

  const updateRoomData = async (data: IUpdateContainerForm) => {
    // Test용!!!! (추후 삭제)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axiosPrivate.patch(
      '/api/api/community/:roomId/settings',
      data,
    );

    return response;
  };

  return {
    createNewRoom,
    getRooms,
    updateRoomData,
  };
};

export default useRoomAPI;
