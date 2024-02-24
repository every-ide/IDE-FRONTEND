import ContainerBox from '@/src/components/my/ContainerBox';
import CreateContainerForm from '@/src/components/my/CreateContainerForm';
import EmptyState from '@/src/components/my/EmptyState';
import Header from '@/src/components/my/Header';
import { Button } from '@/src/components/ui/button';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useRoomStore from '@/src/store/useRoomStore';
import { AxiosError } from 'axios';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingEnterRoom from './LoadingEnterRoom';
import EnterPassword from './EnterPassword';
import BringMyContainerForm from '@/src/components/room/BringMyContainerForm';
import Avatar from 'boring-avatars';
import { formatDate } from '@/src/utils/formatDate';
import { Badge } from '@/src/components/ui/badge';
import EditRoomInfoForm from '@/src/components/room/EditRoomInfoForm';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { MdOutlineDelete } from 'react-icons/md';
import useUserStore from '@/src/store/useUserStore';
import { Helmet } from 'react-helmet-async';

const RoomDetailPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { userId } = { ...useUserStore((state) => state.user) };
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const isLocked = useRef<boolean>(
    searchParams.get('isLocked') === 'true' ? true : false,
  );
  const { enteredRoom, setEnteredRoom } = useRoomStore();
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 초기 Room Detail data 요청
  const getRoomDetail = useCallback(async () => {
    // Start Loading...
    setIsLoading(true);

    try {
      const response = await axiosPrivate.get(
        `/api/community/${roomId}?password=${password}`,
      );
      if (response.status === 200) {
        setEnteredRoom(response.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response!.status === 400) {
        toast.error('잘못된 비밀번호입니다. 다시 입력해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
        isLocked.current = true;
      } else if (err.response!.status === 408 || err.response?.status === 500) {
        toast.error('커뮤니티 정보를 불러올 수 없습니다. 다시 접속해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
        navigate('/together');
      }
    }

    // Finish Loading...
    setIsLoading(false);
  }, [password, roomId]);

  // Private 커뮤니티 : password submit event
  const enterPassword = (e: FormEvent) => {
    e.preventDefault();

    isLocked.current = false;
    setPassword('');
    getRoomDetail();
  };

  useEffect(() => {
    if (!isLocked.current) {
      getRoomDetail();
    }
  }, []);

  const handleLeaveRoom = useCallback(async () => {
    if (window.confirm('정말 커뮤니티를 탈퇴하시겠습니까?')) {
      try {
        const response = await axiosPrivate.patch(
          `/api/community/${roomId}/leave`,
        );
        if (response.status === 200) {
          toast('커뮤니티에서 탈퇴되었습니다.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
          navigate('/together');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [roomId]);

  const handleDeleteRoom = useCallback(async () => {
    if (enteredRoom?.ownerId !== userId) {
      toast.error('삭제 권한이 없습니다. (권한: 커뮤니티장)', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    } else {
      if (window.confirm('정말 커뮤니티를 삭제하시겠습니까?')) {
        try {
          const response = await axiosPrivate.delete(
            `/api/community/${roomId}`,
          );

          if (response.status === 200) {
            toast('커뮤니티가 삭제되었습니다.', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              theme: 'dark',
            });
            navigate('/together');
          }
        } catch (error) {
          toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
        }
      }
    }
  }, [userId, roomId, enteredRoom]);

  return (
    <>
      <Helmet>
        <title>EVERYIDE - Community</title>
      </Helmet>
      <div className="h-dvh bg-mdark">
        <Header />
        {isLocked.current ? (
          // 비밀번호 입력
          <EnterPassword
            enterPassword={enterPassword}
            password={password}
            setPassword={setPassword}
          />
        ) : isLoading ? (
          // While fetching data from server
          <LoadingEnterRoom />
        ) : (
          // Room Detail Page
          <div className="flex h-[calc(100vh-87px)] flex-row border-t-2 border-ldark">
            <div className="container flex">
              <div className="flex w-[35%] flex-col p-3 py-7 pl-6">
                <div className="flex h-full flex-col items-center rounded-lg border-2 border-ldark p-6">
                  <div className="flex w-full flex-row justify-between border-b-2 border-ldark pb-6 text-left text-2xl font-bold">
                    <p className="inline-flex justify-center gap-3 text-nowrap">
                      <span className="text-4xl">🛸</span> Welcome to{' '}
                      {enteredRoom?.room.name}!
                    </p>
                    <Button
                      onClick={handleLeaveRoom}
                      variant="outline"
                      size="sm"
                      className="w-[25%]"
                    >
                      커뮤니티 탈퇴
                    </Button>
                  </div>
                  <div className="flex size-full flex-col py-4">
                    <div className="mb-2 flex flex-col border-b border-ldark p-3">
                      <div className="flex w-full flex-row items-center gap-4">
                        <p className="text-xl font-bold">커뮤니티 정보</p>
                        <EditRoomInfoForm
                          roomId={roomId!}
                          name={
                            enteredRoom?.room.name ? enteredRoom?.room.name : ''
                          }
                          isLocked={
                            searchParams.get('isLocked') === 'true'
                              ? true
                              : false
                          }
                          description={
                            enteredRoom?.room.description
                              ? enteredRoom?.room.description
                              : ''
                          }
                        />
                        {/* 커뮤니티 삭제 */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                onClick={handleDeleteRoom}
                                variant="icon"
                                size="icon"
                                className="p-0 text-[#888]"
                              >
                                <MdOutlineDelete size={20} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>커뮤니티 삭제</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex flex-col gap-2 p-3 text-sm font-light">
                        <div className="inline-flex items-center gap-3">
                          <Badge variant="custom1">커뮤니티장</Badge>
                          <p>{enteredRoom?.ownerName}</p>
                        </div>
                        <div className="inline-flex items-center gap-3">
                          <Badge variant="custom1">생성일</Badge>
                          <p>
                            {enteredRoom?.room.createDate
                              ? formatDate(
                                  new Date(enteredRoom?.room.createDate),
                                )
                              : '-'}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-3">
                          <Badge variant="custom1">최대인원</Badge>
                          <p>
                            {enteredRoom?.room.maxPeople
                              ? enteredRoom?.room.maxPeople
                              : ''}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-3">
                          <Badge variant="custom1">가입인원</Badge>
                          <p>{enteredRoom?.usersName.length}명</p>
                        </div>
                        <div className="inline-flex items-center gap-3">
                          <Badge variant="custom1">소개</Badge>
                          <p>
                            {enteredRoom?.room.description !== null
                              ? enteredRoom?.room.description
                              : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      <p className="text-xl font-bold">참여 유저</p>
                      <div className="grid grid-cols-1 gap-y-5 overflow-y-scroll pt-5 md:grid-cols-2 lg:grid-cols-3">
                        {enteredRoom?.usersName.map((user) => (
                          <div
                            key={user}
                            className="flex flex-col items-center gap-3"
                          >
                            <Avatar
                              name={user}
                              size={60}
                              variant="beam"
                              colors={[
                                '#92A1C6',
                                '#146A7C',
                                '#F0AB3D',
                                '#C271B4',
                                '#C20D90',
                              ]}
                            />
                            <p>{user}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[65%] p-3 py-7 pr-6">
                <div className="flex h-full flex-col gap-1 rounded-lg border-2 border-ldark p-6">
                  <div className="flex flex-row justify-between border-b-2 border-ldark pb-6">
                    <h1 className="text-2xl font-bold">
                      <p className="inline-flex justify-center gap-3 text-nowrap">
                        <span className="text-4xl">🛰️</span>{' '}
                        {enteredRoom?.room.name}의 컨테이너
                      </p>
                    </h1>
                    <div className="flex flex-row gap-2">
                      <CreateContainerForm
                        buttonVariant="outline"
                        buttonSize="default"
                        buttonClassName="gap-1 active:scale-95 bg-mdark"
                        roomId={roomId}
                      />
                      <BringMyContainerForm />
                    </div>
                  </div>

                  <div className="overflow-x-hidden overflow-y-scroll">
                    {enteredRoom?.room.containers.length ? (
                      <div className="grid grid-cols-1 gap-5 px-4 pb-1 pt-4 sm:grid-cols-2">
                        {enteredRoom.room.containers.map((c) => (
                          <ContainerBox
                            key={c.id}
                            containerId={c.id}
                            containerName={c.name}
                            description={c.description}
                            language={c.language}
                            active={c.active}
                            createDate={c.createDate}
                            lastModifiedDate={c.lastModifiedDate}
                            roomName={enteredRoom.room.name}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyState className="h-[calc(100vh-300px)]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomDetailPage;
