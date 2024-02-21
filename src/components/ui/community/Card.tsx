import React, { useEffect, useState } from 'react';
import { GiTeacher } from 'react-icons/gi';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TbUserQuestion } from 'react-icons/tb';
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
  usersCount: number;
  maxPeople: number;
  ownerName: string;
}

interface IUpdateCardProps {
  oldName: string;
  newName: string;
  isLocked: boolean;
  password: string;
}

const CardContainer: React.FC<CardProps> = ({
  roomId,
  name,
  type,
  isLocked,
  usersCount,
  maxPeople,
  ownerName,
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
      password: '',
    },
  });
  useEffect(() => {
    if (openModal) {
      reset();
    }
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
      };
      const response = await updateRoomData(
        {
          ...newData,
        },
        roomId,
      );

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
    <Card variant="container">
      {/* <img
        src="src/assets/images/placeholder.jpg"
        alt="Event Banner"
        className="h-auto w-full object-cover p-4"
      /> */}
      <CardHeader className="pb-4">
        <CardTitle className="ml-1 text-xl">{name}</CardTitle>
        <div className="flex flex-row items-center gap-1">
          {/* 컨테이너 수정 Button & Modal */}
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button variant="icon" className="p-0 text-[#888]">
                <MdOutlineSettings size={20} />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-black">방 수정하기</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleUpdateContainer)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="oldName" className="text-right text-black">
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
                    <Label htmlFor="newName" className="text-right text-black">
                      새 방 이름
                    </Label>
                    <Input
                      id="newName"
                      placeholder="새 방 이름을 입력하세요"
                      className="col-span-3 text-black"
                      {...register('newName', {
                        required: '새 방 이름은 필수 입력 사항입니다.',
                      })}
                    />
                    {errors.newName && (
                      <p className="mt-1 text-xs text-error">
                        {errors.newName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="active" className="text-right text-black">
                      방 잠금
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
                                : '비공개 방에는 비밀번호가 필요합니다.'
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
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center justify-between text-sm text-white dark:text-white ">
          {type === 'QUESTION' ? (
            <div className="flex flex-col">
              <TbUserQuestion className="mr-2 size-11" />
              <span className="size-5 pt-3">QUESTION</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <GiTeacher className="mr-2 size-11" />
              <span className="size-5 pt-3">ANSWER</span>
            </div>
          )}
          <div className="flex flex-col">
            {isLocked ? (
              <FaLock className="mr-2 size-7" />
            ) : (
              <FaLockOpen className="mr-2 size-7" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 text-sm text-white dark:text-white">
          <span>Owner: {ownerName}</span>
          <span className="">
            {usersCount || 1} / {maxPeople}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/together/${roomId}`)}
        >
          가입하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardContainer;
