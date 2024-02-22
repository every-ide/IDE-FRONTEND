import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import useRoomStore from '@/src/store/useRoomStore';
import useRoomAPI from '@/src/hooks/useRoomApi';

interface IUpdateCardProps {
  oldName: string;
  newName: string;
  isLocked: boolean;
  password: string;
  description: string;
}

interface IEditRoomInfoFormProps {
  roomId: string;
  name: string;
  isLocked: boolean;
  description: string;
}

const EditRoomInfoForm = ({
  roomId,
  name,
  isLocked,
  description,
}: IEditRoomInfoFormProps) => {
  const { updateRoomData } = useRoomAPI();
  const { getRooms } = useRoomAPI();
  const { setRooms } = useRoomStore();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(isLocked);

  useEffect(() => {
    if (openModal) {
      reset();
    }
  }, [openModal]);

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
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="icon" className="p-0 text-[#888]">
          <MdOutlineSettings size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="text-black">
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
              <Label htmlFor="description" className="text-right text-black">
                설명
              </Label>
              <Input
                id="description"
                placeholder="설명을 입력하세요"
                className="col-span-3 text-black"
                defaultValue={description}
                {...register('description', {
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
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
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
                <Label htmlFor="password" className="text-right text-black">
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
  );
};

export default EditRoomInfoForm;
