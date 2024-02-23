import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button, TButtonSize, TButtonVariant } from '../ui/button';
import { FaJava, FaPython } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { MdAddCircleOutline } from 'react-icons/md';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import { toast } from 'react-toastify';
import useUserStore from '@/src/store/useUserStore';
import { AxiosError } from 'axios';

type TCreateContainerFormProps = {
  buttonVariant: TButtonVariant;
  buttonSize: TButtonSize;
  buttonClassName: string;
  roomId?: string;
};

type TNewContainerForm = {
  containerName: string;
  language: string;
  description: string;
};

const CreateContainerForm = ({
  buttonVariant,
  buttonSize,
  buttonClassName,
  roomId,
}: TCreateContainerFormProps) => {
  const { createNewContainer } = useContainerAPI();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUserStore();

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TNewContainerForm>({ mode: 'onChange' });

  const newContainerAction = useCallback(
    async ({ containerName, language, description }: TNewContainerForm) => {
      try {
        const response = await createNewContainer({
          containerName,
          language,
          description,
          roomId,
        });

        if (response.status === 200) {
          toast('새로운 컨테이너가 생성되었습니다.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });

          // Modal Close & reset
          setOpenModal(false);
          reset();

          if (!roomId) {
            // 새 창에서 개인 컨테이너 열기
            window.open(
              `${import.meta.env.VITE_CLIENT_URI}/workspace/${response.data.name}/${response.data.id}`,
              '_blank',
              'noopener,noreferrer',
            );
          } else {
            // 새 창에서 그룹 컨테이너 열기
            window.open(
              `${import.meta.env.VITE_CLIENT_URI}/teamspace/${response.data.name}/${response.data.id}?roomId=${roomId}`,
              '_blank',
              'noopener,noreferrer',
            );
          }
        }
      } catch (error) {
        console.error(error);
        const err = error as AxiosError;
        if (err.response?.status === 409) {
          toast.error(`이미 사용중인 컨테이너 이름입니다.`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
        } else if (err.response?.status === 400) {
          toast.error(`존재하지 않는 경로입니다. 관리자에게 문의해주세요.`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
        } else {
          toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });
        }
      }
    },
    [roomId, user],
  );

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={buttonClassName}
        >
          <MdAddCircleOutline size={20} className="text-accent" />
          컨테이너 생성
        </Button>
      </DialogTrigger>

      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle className="text-black">컨테이너 생성하기</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(newContainerAction)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="containerName" className="text-right text-black">
                컨테이너 이름
              </Label>
              <Input
                id="containerName"
                placeholder="알파벳, 숫자, -, _만 포함, 20자 이내"
                className="col-span-3 text-black"
                {...register('containerName', {
                  required: '컨테이너 이름은 필수 입력입니다.',
                  maxLength: {
                    value: 20,
                    message: '컨테이너 이름은 20자 이내로 작성해주세요.',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9-_\s]+$/,
                    message:
                      '알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함할 수 있습니다.',
                  },
                  validate: {
                    noSpace: (v) =>
                      !/\s/.test(v) ||
                      '컨테이너 이름에 공백을 포함할 수 없습니다.',
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-black">
                컨테이너 설명
              </Label>
              <Input
                id="description"
                placeholder="(선택) 컨테이너 설명을 간단히 작성해주세요."
                className="col-span-3 text-black"
                {...register('description')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right text-black">
                언어
              </Label>
              <Controller
                name="language"
                control={control}
                rules={{ required: '언어 선택은 필수입니다.' }}
                render={({ field: { ref, ...restField } }) => (
                  <Select
                    {...restField}
                    onValueChange={(value) => {
                      restField.onChange(value);
                    }}
                  >
                    <SelectTrigger className="col-span-3 text-black">
                      <SelectValue id="language" placeholder="언어" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">
                        <div className="inline-flex items-center gap-2">
                          <FaPython />
                          Python
                        </div>
                      </SelectItem>
                      <SelectItem value="java">
                        <div className="inline-flex items-center gap-2">
                          <FaJava />
                          Java
                        </div>
                      </SelectItem>
                      <SelectItem value="javascript">
                        <div className="inline-flex items-center gap-2">
                          <SiJavascript />
                          JavaScript
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex flex-col items-end justify-center">
              {errors['containerName'] && (
                <p className="text-xs text-error">
                  {errors['containerName'].message}
                </p>
              )}
              {errors['language'] && (
                <p className="text-xs text-error">
                  {errors['language'].message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="border-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? '컨테이너 생성 중입니다...' : '생성하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContainerForm;
