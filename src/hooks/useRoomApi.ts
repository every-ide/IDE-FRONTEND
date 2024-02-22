import { toast } from 'react-toastify';
import useAxiosPrivate from './useAxiosPrivate';
import useRoomStore from '../store/useRoomStore';

interface IcreateNewRoomProps {
  name: string;
  isLocked: boolean;
  password: string;
  roomType: string;
  maxPeople: number;
  description: string;
  setOpenModal: (arg: boolean) => void;
  reset: () => void;
}

interface IUpdateRoomData {
  name: string;
  isLocked: boolean;
  password: string;
  description: string;
}

const useRoomAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setRooms, setIsLoading } = useRoomStore();

  const createNewRoom = async ({
    name,
    isLocked,
    password,
    roomType,
    maxPeople,
    description,
    setOpenModal,
    reset,
  }: IcreateNewRoomProps) => {
    console.log(
      'name,isLocked,password,roomType,maxPeople,description,: ',
      name,
      isLocked,
      password,
      roomType,
      maxPeople,
      description,
    );
    const response = await axiosPrivate.post(
      `/api/community`,
      JSON.stringify({
        name,
        isLocked,
        password,
        roomType,
        maxPeople,
        description,
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
    }
  };

  const getRooms = async (name?: string) => {
    try {
      let response;
      if (!name) {
        response = await axiosPrivate.get(`/api/communities`);
        console.log('/api/communities: ', response.data);
      } else {
        response = await axiosPrivate.get(`/api/communities?name=${name}`);
        console.log('/api/communities?name=${name}: ', response.data);
      }
      return response.data;
    } catch (error) {
      console.error('Rooms 오류:', error);
    }
  };

  const updateRoomData = async (data: IUpdateRoomData, roomId: string) => {
    console.log('data: ', data);
    const response = await axiosPrivate.patch(
      `/api/community/${roomId}/settings`,
      data,
    );
    console.log('response: 방을 수정했습니다 ', response);
    return response;
  };
  const fetchSearchRooms = async (name = '') => {
    setIsLoading(true); // Assuming you want to indicate loading before the request
    const roomData = await getRooms(name);
    console.log('roomData: ', roomData);
    setRooms(roomData);
    setIsLoading(false);
  };

  return {
    createNewRoom,
    getRooms,
    updateRoomData,
    fetchSearchRooms,
  };
};

export default useRoomAPI;
