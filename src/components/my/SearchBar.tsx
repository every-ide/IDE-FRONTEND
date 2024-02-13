import { useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaJava, FaPython, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { MdAddCircleOutline } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SiJavascript } from 'react-icons/si';
import { useForm, Controller } from 'react-hook-form';
import { axiosAuth } from '@/src/api/axios';
import useAuthStore from '@/src/store/AuthProvier';
import { toast } from 'react-toastify';
import useContainerAPI from '@/src/hooks/useContainerAPI';

type TNewContainerForm = {
  containerName: string;
  language: string;
  description: string;
};

const SearchBar = () => {
  const [searchkey, setSearchKey] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { pathname } = useLocation();
  const { userId } = useAuthStore();
  const { createNewContainer } = useContainerAPI();

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TNewContainerForm>({ mode: 'onChange' });

  const newContainerAction = async ({
    containerName,
    language,
  }: TNewContainerForm) => {
    try {
      createNewContainer({ containerName, language, setOpenModal, reset });
    } catch (error) {
      console.error(error);

      toast.error('문제가 발생했습니다.다시 시도해주세요.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="relative">
      <div
        className="
      flex
      w-full
      justify-start
      px-8
      py-4
      md:justify-center
      md:px-0
    "
      >
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Enter to search..."
          className="w-[55%] rounded-xl bg-ldark p-3 pr-16 text-accent caret-accent focus:border-[0.5px] focus:border-accent/65 focus:shadow-md focus:shadow-accent focus:outline-none md:w-[35%]"
        />
        <button
          onClick={() => setSearchKey('')}
          className="translate-x-[-65px] text-gray-400 hover:text-gray-500 active:scale-90"
        >
          <RiDeleteBack2Line size={22} />
        </button>
        <button className="translate-x-[-55px] text-accent hover:text-accent/65 active:scale-90">
          <FaSearch size={18} />
        </button>
      </div>
      {/* 새 컨테이너 추가 버튼 & Modal */}
      {!pathname.includes('/shared') && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="absolute right-8 top-[18px] gap-1 rounded-lg px-4 font-semibold active:scale-95"
            >
              <MdAddCircleOutline size={20} className="text-accent" />새
              컨테이너
            </Button>
          </DialogTrigger>

          <DialogContent className="text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                컨테이너 생성하기
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(newContainerAction)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="containerName"
                    className="text-right text-black"
                  >
                    컨테이너 이름
                  </Label>
                  <Input
                    id="containerName"
                    placeholder="알파벳, 숫자, -, _만 포함, 20자 이내"
                    className="col-span-3 text-black"
                    {...register('containerName', {
                      required: '컨테이너 이름은 필수 입력입니다.',
                    })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="containerName"
                    className="text-right text-black"
                  >
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
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
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
                {errors['containerName'] && (
                  <p className="inline-flex items-center text-right text-xs text-error">
                    {errors['containerName'].message}
                  </p>
                )}
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
      )}
    </div>
  );
};

export default SearchBar;
