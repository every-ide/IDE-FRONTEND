import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { MdOutlineDelete, MdOutlineSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import useContainerStore from '@/src/store/useContainerStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm, Controller } from 'react-hook-form';
import useUserStore from '@/src/store/useUserStore';
import { formatDate } from '@/src/utils/formatDate';

interface IContainerBoxProps {
  containerName: string;
  description: string;
  language: string;
  active: boolean;
  createDate: Date;
  lastModifiedDate: Date;
}

export interface IUpdateContainerForm {
  email: string;
  oldName: string;
  newName: string;
  newDescription: string;
  active: boolean;
}

const ContainerBox = ({
  containerName,
  description,
  language,
  active,
  createDate,
  lastModifiedDate,
}: IContainerBoxProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const user = useUserStore((state) => state.user);
  const { deleteContainerData, updateContainerData } = useContainerAPI();
  const { removeContainer, updateContainer } = useContainerStore();

  // 컨테이너 수정 request를 위한 form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateContainerForm>({
    mode: 'onChange',
    defaultValues: {
      email: user?.email,
      oldName: containerName,
      newName: containerName,
      newDescription: description,
      active: active,
    },
  });

  // 컨테이너 열기 버튼 onClick action
  const navigateToUrlInNewTab = (containerName: string) => {
    window.open(
      `http://localhost:5173/workspace/${containerName}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  // 컨테이너 수정 버튼 onClick action
  const handleUpdateContainer = async (data: IUpdateContainerForm) => {
    try {
      if (data.email === undefined) {
        data.email = user!.email;
      }

      const response = await updateContainerData(data);

      if (response.status === 200) {
        // zustand store update
        updateContainer(data);

        toast('컨테이너가 성공적으로 수정되었습니다.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });

        setOpenModal(false);
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

  // 컨테이너 삭제 버튼 onClick action
  const handleDeleteContainer = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setIsDeleting(true);
      try {
        const response = await deleteContainerData(containerName);

        if (response.status === 200) {
          toast('컨테이너가 삭제되었습니다.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });

          removeContainer(containerName);
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
    }

    setIsDeleting(false);
  };

  return (
    <Card variant="container">
      <CardHeader className="pb-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl">{containerName}</CardTitle>
          <div className="flex flex-row items-center gap-1">
            {/* 컨테이너 수정 Button & Modal */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger>
                <div className="p-0 text-[#888] hover:text-accent">
                  <MdOutlineSettings size={20} />
                </div>
              </DialogTrigger>

              <DialogContent className="text-black">
                <DialogHeader>
                  <DialogTitle className="text-black">
                    컨테이너 수정하기
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
                        value={containerName}
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
                        새 컨테이너명
                      </Label>
                      <Input
                        id="newName"
                        defaultValue={containerName}
                        placeholder="알파벳, 숫자, -, _만 포함, 20자 이내"
                        className="col-span-3 text-black"
                        {...register('newName', {
                          required: '컨테이너 이름은 필수 입력입니다.',
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="newDescription"
                        className="text-right text-black"
                      >
                        컨테이너 설명
                      </Label>
                      <Input
                        id="newDescription"
                        defaultValue={description}
                        placeholder="(선택) 컨테이너 설명을 간단히 작성해주세요."
                        className="col-span-3 text-black"
                        {...register('newDescription')}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="active" className="text-right text-black">
                        활성화 여부
                      </Label>
                      <Controller
                        name="active"
                        control={control}
                        defaultValue={active}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                        }) => (
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) =>
                              onChange(checked ? true : false)
                            }
                            onBlur={onBlur}
                            name={name}
                            ref={ref}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <div className="flex flex-col items-end justify-center">
                      {errors['newName'] && (
                        <p className="text-xs text-error">
                          {errors['newName'].message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="border-none"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '업데이트 요청 중...' : '저장하기'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* 컨테이너 삭제 버튼 */}
            <Button
              onClick={handleDeleteContainer}
              variant="icon"
              size="icon"
              className="p-0 text-[#888]"
            >
              <MdOutlineDelete size={20} />
            </Button>
          </div>
        </div>
        <CardDescription className="truncate text-[#888]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pb-2 text-sm text-neutral-300">
        <p>스택 : {language}</p>
        <p>생성일 : {formatDate(new Date(createDate))}</p>
        <p>최종수정일 : {formatDate(new Date(lastModifiedDate))}</p>
      </CardContent>
      <CardFooter className="justify-between">
        {active ? (
          <div className="rounded-lg border border-green-400 bg-green-400/20 px-2 text-xs text-green-400">
            활성
          </div>
        ) : (
          <div className="rounded-lg border border-red-400 bg-red-400/20 px-2 text-xs text-red-400">
            비활성
          </div>
        )}
        <Button
          onClick={() => navigateToUrlInNewTab(containerName)}
          size="sm"
          disabled={isDeleting}
        >
          {isDeleting ? '컨테이너 삭제 중...' : '컨테이너 열기'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContainerBox;
