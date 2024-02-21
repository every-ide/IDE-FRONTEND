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

interface IUpdateRoomData {
  name: string;
  isLocked: boolean;
  password: string;
}

const useRoomAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setRooms } = useRoomStore();

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

    const response = await axiosPrivate.post(
      `/api/community`,
      JSON.stringify({
        name,
        isLocked,
        password,
        roomType,
        maxPeople,
      }),
    );
    console.log('response: 룸을 만들었습니다 :', response);

    if (response.status === 200) {
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

      setRooms(response.data);
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

  const searchRooms = async (name?: string, type?: string, group?: boolean) => {
    try {
      const response = await axiosPrivate.get(
        `/api/communities/search?name=${name}&type=${type}&group=${group}`,
      );
      console.log(
        '`/api/communities/search?name=${name}&type=${type}&group=${group}`: ',
        `/api/communities/search?name=${name}&type=${type}&group=${group}`,
      );
      console.log('response: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Rooms 오류:', error);
    }
  };
  const updateRoomData = async (data: IUpdateRoomData, roomId: string) => {
    const response = await axiosPrivate.patch(
      `/api/community/${roomId}/settings`,
      data,
    );
    console.log('response: 방을 수정했습니다 ', response);

    return response;
  };

  return {
    createNewRoom,
    getRooms,
    updateRoomData,
  };
};

export default useRoomAPI;
