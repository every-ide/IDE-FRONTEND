import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaLock, FaLockOpen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import useRoomStore from '@/src/store/useRoomStore';
import useRoomAPI from '@/src/hooks/useRoomApi';
import { Label } from '@radix-ui/react-label';
import { Input } from '../input';
import { Switch } from '../switch';

interface CardProps {
  roomId: string;
  name: string;
  type: string;
  isLocked: boolean;
  usersCnt: number;
  maxPeople: number;
  ownerName: string;
  description: string;
  isJoined: boolean;
}

interface IUpdateCardProps {
  oldName: string;
  newName: string;
  isLocked: boolean;
  password: string;
  description: string;
}

const CardContainer: React.FC<CardProps> = ({
  roomId,
  name,
  type,
  isLocked,
  usersCnt,
  maxPeople,
  ownerName,
  description,
  isJoined,
}) => {
  const navigate = useNavigate();
  const { updateRoomData } = useRoomAPI();
  const { getRooms } = useRoomAPI();
  const { setRooms } = useRoomStore();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(isLocked);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateCardProps>({
    mode: 'onChange',
    defaultValues: {
      oldName: name,
      newName: name,
      isLocked,
      description,
      password: '',
    },
  });
  useEffect(() => {
    if (openModal) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const handleUpdateContainer = async (data: IUpdateCardProps) => {
    if (!data.isLocked) {
      data.password = '';
      console.log('data.password: ', data.password);
    }
    try {
      console.log('data.password: ', data.password);
      const newData = {
        name: data.newName,
        isLocked: data.isLocked,
        password: data.password,
        description: data.description,
      };
      const response = await updateRoomData(
        {
          ...newData,
        },
        roomId,
      );

      console.log('response: ', response);
      if (response.status === 204) {
        // zustand store update;

        toast('컨테이너가 성공적으로 수정되었습니다.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });

        setOpenModal(false);
        const getData = await getRooms();
        console.log('getData: ', getData);
        setRooms(getData);
      }
    } catch (error) {
      console.error(error);

      toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    }
  };

  return (
    <Card variant="container" className="">
      <CardHeader className="pb-4">
        <div className="mb-2 flex">
          {type === 'QUESTION' ? (
            <div className="rounded-lg border border-fuchsia-400 bg-fuchsia-400/20 px-2 py-0.5 text-[10px] text-fuchsia-400">
              멘토 구해요
            </div>
          ) : (
            <div className="rounded-lg border border-indigo-400 bg-indigo-400/20 px-2 py-0.5 text-[10px] text-indigo-400">
              멘티 찾아요
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center justify-between gap-1">
            <CardTitle className="ml-1 text-xl">{name}</CardTitle>
            <div className="flex items-center gap-2">
              {/* 컨테이너 수정 Button & Modal */}
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button
                    variant="icon"
                    className={`p-0 text-[#888] ${isJoined ? '' : 'hidden'} mr-3 `}
                  >
                    <MdOutlineSettings size={20} />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-black">
                      커뮤니티 수정하기
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(handleUpdateContainer)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="oldName"
                          className="text-right text-black"
                        >
                          기존 컨테이너명
                        </Label>
                        <Input
                          id="oldName"
                          value={name}
                          disabled
                          className="col-span-3 text-black"
                          {...register('oldName', {
                            required: '컨테이너 이름은 필수 입력입니다.',
                          })}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="newName"
                          className="text-right text-black"
                        >
                          새 커뮤니티 이름
                        </Label>
                        <Input
                          id="newName"
                          placeholder="새 커뮤니티 이름을 입력하세요"
                          value={name}
                          className="col-span-3 text-black"
                          {...register('newName', {
                            required:
                              '새 커뮤니티 이름은 필수 입력 사항입니다.',
                          })}
                        />
                        {errors.newName && (
                          <p className="mt-1 text-xs text-error">
                            {errors.newName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="description"
                          className="text-right text-black"
                        >
                          설명
                        </Label>
                        <Input
                          id="description"
                          placeholder="설명을 입력하세요"
                          className="col-span-3 text-black"
                          defaultValue={description}
                          {...register('description', {
                            required:
                              '새 커뮤니티 이름은 필수 입력 사항입니다.',
                          })}
                        />
                        {errors.newName && (
                          <p className="mt-1 text-xs text-error">
                            {errors.newName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="active"
                          className="text-right text-black"
                        >
                          커뮤니티 잠금
                        </Label>
                        <Controller
                          name="isLocked"
                          control={control}
                          defaultValue={isLocked}
                          render={({
                            field: { onChange, onBlur, value, name, ref },
                          }) => (
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) => {
                                onChange(checked ? true : false);
                                setValue(checked ? true : false);
                              }}
                              onBlur={onBlur}
                              name={name}
                              ref={ref}
                            />
                          )}
                        />
                      </div>
                      {value && (
                        <div className={`grid grid-cols-4 items-center gap-4`}>
                          <Label
                            htmlFor="password"
                            className="text-right text-black"
                          >
                            비밀번호
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            className="col-span-3 text-black"
                            {...register('password', {
                              validate: (value) =>
                                isLocked
                                  ? value
                                    ? true
                                    : '비공개 커뮤니티에는 비밀번호가 필요합니다.'
                                  : true,
                            })}
                          />
                          {errors.password && (
                            <p className="mt-1 text-xs text-error">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '저장 중...' : '저장하기'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            {isLocked ? (
              <FaLock className="size-5" />
            ) : (
              <FaLockOpen className="size-5" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-xs text-gray-400">
          <div>방장 - {ownerName}</div>
          <div>
            가입인원 / 총인원 - {usersCnt || 1} / {maxPeople}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isJoined ? (
          <Button
            className="w-full"
            onClick={() => navigate(`/together/${roomId}?isLocked=${isLocked}`)}
          >
            입장하기
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => navigate(`/together/${roomId}?isLocked=${isLocked}`)}
          >
            가입하기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardContainer;
