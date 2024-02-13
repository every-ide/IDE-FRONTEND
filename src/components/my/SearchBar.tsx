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

type TNewContainerForm = {
  containerName: string;
  language: string;
};

const SearchBar = () => {
  const [searchkey, setSearchKey] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { pathname } = useLocation();
  const { userId } = useAuthStore();

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
    console.log('form data: ', { containerName, language });

    try {
      // Test용!!!! (추후 삭제)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axiosAuth.post(
        `/api/user/${userId}/containers`,
        JSON.stringify({
          containerName,
          language,
        }),
      );

      if (response.status === 200) {
        console.log('containerId: ', response.data.containerId);
        const containerId = response.data.containerId;

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

        // Container list refetching

        // 새 창에서 컨테이너 열기
        window.open(
          `http://localhost:5173/workspace/${containerId}`,
          '_blank',
          'noopener,noreferrer',
        );
      }
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
    <div className="flex h-16 items-center justify-end bg-ldark px-8">
      <div className="flex w-1/3 items-center justify-end">
        <input
          type="text"
          value={searchkey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Enter to search..."
          className="flex-1 rounded-xl bg-mdark p-3 pr-16 text-accent caret-accent focus:border-[0.5px] focus:border-accent/65 focus:shadow-sm focus:shadow-accent focus:outline-none"
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
      <div>
        {!pathname.includes('/shared') && (
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="gap-1 rounded-lg bg-mdark px-4 font-semibold active:scale-95"
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
                      {...register('containerName')}
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
      {/* 새 컨테이너 추가 버튼 & Modal */}
    </div>
  );
};

export default SearchBar;
