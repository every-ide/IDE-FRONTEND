import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'; // useLocation 추가
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Label } from '../label';
import { Input } from '../input';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import useRoomAPI from '@/src/hooks/useRoomApi';
import useRoomStore from '@/src/store/useRoomStore';
import { GiTeacher } from 'react-icons/gi';
import { TbUserQuestion } from 'react-icons/tb';
import { Switch } from '../switch';
import { FaRotate } from 'react-icons/fa6';

type TNewRoomForm = {
  name: string;
  isLocked: boolean;
  password: string;
  roomType: string;
  maxPeople: number;
  description: string;
};

const NavigationBar: React.FC = () => {
  const location = useLocation(); // 현재 위치 정보를 가져옵니다.
  const { getRooms, fetchSearchRooms } = useRoomAPI();
  const { setRooms, setIsLoading, searchKey, setSearchKey } = useRoomStore();
  const [openModal, setOpenModal] = useState(false);
  const { createNewRoom } = useRoomAPI();
  const [isLocked, setIsLocked] = useState(false);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TNewRoomForm>({ mode: 'onChange' });

  useEffect(() => {
    if (openModal) {
      reset();
      setIsLocked(false);
    }
  }, [openModal]);
  const newRoomAction = async ({
    name,
    isLocked = false,
    password = '',
    roomType,
    maxPeople,
    description = '',
  }: TNewRoomForm) => {
    console.log('name: ', name);
    console.log(
      'isLocked,password,roomType,maxPeople,: ',
      isLocked,
      password,
      roomType,
      maxPeople,
      description,
    );
    if (!isLocked) {
      password = '';
    }
    try {
      await createNewRoom({
        name,
        isLocked,
        password,
        roomType,
        maxPeople,
        description,
        setOpenModal,
        reset,
      });
      setIsLoading(true);
      const roomData = await getRooms();
      setRooms(roomData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      toast.error('문제가 발생했습니다.다시 시도해주세요.');
    }
  };
  ``;
  const handleSearch = () => {
    fetchSearchRooms(searchKey);
  };
  const handleReset = () => {
    fetchSearchRooms('');
    setSearchKey('');
  };
  // 경로가 활성 링크인지 확인하는 함수
  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="flex h-16  bg-ldark">
      <div className="container flex justify-between">
        <div className="flex items-center">
          <Link
            to="/together"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together') ? 'border-blue-400' : 'border-transparent'}`}
          >
            전체
          </Link>
          <Link
            to="/together/mentors"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together/mentors') ? 'border-blue-400' : 'border-transparent'}`}
          >
            질문 받아요
          </Link>
          <Link
            to="/together/mentees"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together/mentees') ? 'border-blue-400' : 'border-transparent'}`}
          >
            질문 있어요
          </Link>
          <Link
            to="/together/my"
            className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together/my') ? 'border-blue-400' : 'border-transparent'}`}
          >
            참여중인 커뮤니티
          </Link>
        </div>
        <div className="flex items-center">
          <div className="mr-8 flex items-center">
            <div className="flex flex-1 items-center justify-between rounded-lg bg-mdark max-lg:hidden">
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="검색어를 입력하세요..."
                className="rounded-xl bg-mdark p-3 outline-none "
              />
              {searchKey && (
                <Button
                  className="border-none pr-4 text-accent hover:text-accent/65 active:scale-90"
                  onClick={() => {
                    handleReset();
                  }}
                >
                  <FaRotate size={18} />
                </Button>
              )}
              <Button
                className="border-none pr-4 text-accent hover:text-accent/65 active:scale-90"
                onClick={handleSearch}
              >
                <FaSearch size={18} />
              </Button>
            </div>
          </div>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="gap-1 rounded-lg bg-mdark px-4 font-semibold active:scale-95 max-md:hidden"
              >
                <MdAddCircleOutline size={20} className="text-accent" />
                커뮤니티 생성하기
              </Button>
            </DialogTrigger>

            <DialogContent className="text-black">
              <DialogHeader>
                <DialogTitle className="text-black">
                  커뮤니티 생성하기
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(newRoomAction)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="name"
                      className="text-right text-xs text-black"
                    >
                      커뮤니티 이름
                    </Label>
                    <Input
                      id="name"
                      placeholder="알파벳, 숫자, -, _만 포함, 20자 이내"
                      className="col-span-3 text-black"
                      {...register('name', {
                        required: '커뮤니티 이름은 필수 입력입니다.',
                        maxLength: {
                          value: 20,
                          message: '커뮤니티 이름은 20자 이내로 작성해주세요.',
                        },
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="description"
                      className="text-right text-xs text-black"
                    >
                      커뮤니티 설명
                    </Label>
                    <Input
                      id="description"
                      placeholder="설명을 해주세요 (100자 이내)"
                      className="col-span-3 text-black"
                      {...register('description', {
                        maxLength: {
                          value: 100,
                          message: '설명은 100자 이내로 작성해주세요.',
                        },
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="isLocked"
                      className="text-right text-xs text-black"
                    >
                      커뮤니티 잠금
                    </Label>
                    <Controller
                      name="isLocked"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="isLocked"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            setIsLocked(checked); // 로컬 상태 업데이트
                            field.onChange(checked); // 폼 상태 업데이트
                          }}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  </div>
                  {isLocked && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="password"
                        className="text-right text-black"
                      >
                        비밀번호
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        className="col-span-3 text-black"
                        {...register('password', {
                          required: '비밀번호는 필수 입력입니다.',
                          minLength: {
                            value: 6,
                            message: '비밀번호는 6자 이상으로 설정해주세요.',
                          },
                        })}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="roomType"
                      className="text-right text-xs text-black"
                    >
                      커뮤니티 종류
                    </Label>
                    <Controller
                      name="roomType"
                      control={control}
                      rules={{ required: '커뮤니티 종류 선택은 필수입니다.' }}
                      render={({ field: { ...restField } }) => (
                        <Select
                          {...restField}
                          onValueChange={(value) => {
                            restField.onChange(value);
                          }}
                        >
                          <SelectTrigger className="col-span-3 text-black">
                            <SelectValue
                              id="roomType"
                              placeholder="커뮤니티 종류"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="QUESTION">
                              <div className="inline-flex items-center gap-2">
                                <TbUserQuestion />
                                질문있어요
                              </div>
                            </SelectItem>
                            <SelectItem value="ANSWER">
                              <div className="inline-flex items-center gap-2">
                                <GiTeacher />
                                질문받아요
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="maxPeople"
                      className="text-right text-xs text-black"
                    >
                      최대 인원
                    </Label>
                    <Input
                      id="maxPeople"
                      type="number"
                      placeholder="최대 인원을 입력해주세요."
                      className="col-span-3 text-black"
                      min="2" // HTML validation to not allow numbers less than 2
                      {...register('maxPeople', {
                        valueAsNumber: true,
                        min: {
                          value: 2,
                          message: '최소 2명 이상이어야 합니다.', // Validation message for numbers less than 2
                        },
                        max: {
                          value: 30,
                          message: '최대 100명까지 가능합니다.', // Validation message for numbers more than 100
                        },
                      })}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <div className="flex flex-col items-end justify-center">
                    {errors['name'] && (
                      <p className="text-xs text-error">
                        {errors['name'].message}
                      </p>
                    )}
                    {errors['roomType'] && (
                      <p className="text-xs text-error">
                        {errors['roomType'].message}
                      </p>
                    )}
                    {errors['maxPeople'] && (
                      <p className="text-xs text-error">
                        {errors['maxPeople'].message}
                      </p>
                    )}
                    {errors['password'] && (
                      <p className="text-xs text-error">
                        {errors['password'].message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '커뮤니티 생성 중입니다...' : '생성하기'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
