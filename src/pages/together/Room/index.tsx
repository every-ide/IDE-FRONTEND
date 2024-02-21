import ContainerBox from '@/src/components/my/ContainerBox';
import CreateContainerForm from '@/src/components/my/CreateContainerForm';
import EmptyState from '@/src/components/my/EmptyState';
import Header from '@/src/components/my/Header';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import useRoomStore from '@/src/store/useRoomStore';
import { AxiosError } from 'axios';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RoomDetailPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms, enteredRoom, setEnteredRoom } = useRoomStore();
  const isLocked = useRef<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const openRoom = rooms.find((room) => room.roomId === roomId);
    if (openRoom !== undefined) {
      isLocked.current = openRoom?.isLocked;
    }
  }, [rooms, roomId]);

  // 초기 Room Detail data 요청
  const getRoomDetail = useCallback(async () => {
    // Start Loading...
    setIsLoading(true);

    try {
      // Test용!!!! (추후 삭제)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axiosPrivate.get(
        `/api/community/${roomId}?password=${password}`,
      );
      if (response.status === 200) {
        setEnteredRoom(response.data);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 400) {
        toast.error('잘못된 비밀번호입니다. 다시 입력해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      } else if (err.status === 408) {
        toast.error('그룹 방 정보를 불러올 수 없습니다. 다시 접속해주세요.', {
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

  // Private 방 : password submit event
  const enterPassword = (e: FormEvent) => {
    e.preventDefault();

    isLocked.current = false;
    getRoomDetail();
  };

  useEffect(() => {
    if (!isLocked.current) {
      getRoomDetail();
    }
  }, [isLocked.current]);

  const handleLeaveRoom = useCallback(async () => {
    if (window.confirm('정말 그룹을 탈퇴하시겠습니까?')) {
      try {
        const response = await axiosPrivate.get(
          `/api/community/${roomId}/leave`,
        );
        if (response.status === 200) {
          toast('그룹에서 탈퇴되었습니다.', {
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

  return (
    <div className="h-dvh bg-mdark">
      <Header />
      {isLocked.current ? (
        <div className="flex h-[calc(100vh-87px)] w-full flex-col items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-4xl">🔐</p>
            <p className="text-2xl font-black">ENTER YOUR PASSWORD</p>
            <p>비밀번호를 입력해주세요.</p>
          </div>
          <form onSubmit={enterPassword}>
            <div className="flex flex-row gap-4">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="text-black"
              />
              <Button type="submit">입장</Button>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div className="flex h-[calc(100vh-87px)] flex-row border-t-2 border-ldark">
          <div className="flex size-full flex-col justify-center text-center text-2xl font-black">
            L o a d i n g . . . 👾
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-87px)] flex-row border-t-2 border-ldark">
          <div className="flex w-[40%] flex-col p-3 py-7 pl-6">
            <div className="flex h-full flex-col items-center rounded-lg border-2 border-ldark p-6">
              <div className="flex w-full flex-row justify-between text-left text-2xl font-bold">
                <p className="inline-flex justify-center gap-3">
                  <span className="text-4xl">🛸</span> Welcome to{' '}
                  {enteredRoom?.room.name}!
                </p>
                <Button
                  onClick={handleLeaveRoom}
                  variant="outline"
                  size="sm"
                  className="w-[30%]"
                >
                  그룹 탈퇴
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[60%] p-3 py-7 pr-6">
            <div className="flex h-full flex-col gap-1 rounded-lg border-2 border-ldark p-6">
              <h1 className="text-2xl font-bold">
                <p className="inline-flex justify-center gap-3">
                  <span className="text-4xl">🛰️</span> {enteredRoom?.room.name}
                  의 컨테이너
                </p>
              </h1>
              <div className="flex flex-row justify-end gap-2 border-b-2 border-ldark pb-3">
                <CreateContainerForm
                  buttonVariant="outline"
                  buttonSize="default"
                  buttonClassName="gap-1 active:scale-95 bg-mdark"
                  roomId={roomId}
                />
                <Button
                  onClick={() => {}}
                  variant="outline"
                  className="bg-mdark active:scale-95"
                >
                  내 컨테이너 불러오기
                </Button>
              </div>
              <div className="h-full overflow-x-hidden overflow-y-scroll">
                {enteredRoom?.room.containers.length ? (
                  <div className="grid grid-cols-1 gap-x-5 gap-y-10 pt-4 sm:grid-cols-2">
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
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailPage;
