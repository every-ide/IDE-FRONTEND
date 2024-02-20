import React, { useEffect, useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'; // useLocation 추가
import { MdOutlineSettings, MdOutlineDelete } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Label } from '../label';
import { Input } from '../input';
import { Controller } from 'react-hook-form';

const NavigationBar: React.FC = () => {
  const [searchkey, setSearchKey] = useState<string>('');
  const location = useLocation(); // 현재 위치 정보를 가져옵니다.

  // 경로가 활성 링크인지 확인하는 함수
  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="flex h-16 justify-between bg-ldark px-4">
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
          멘토
        </Link>
        <Link
          to="/together/mentees"
          className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together/mentees') ? 'border-blue-400' : 'border-transparent'}`}
        >
          멘티
        </Link>
        <Link
          to="/together/my"
          className={`flex h-full items-center border-b-4 px-6 py-2 text-white ${isActiveLink('/together/my') ? 'border-blue-400' : 'border-transparent'}`}
        >
          참여 프로젝트
        </Link>
      </div>
      <div className="flex w-1/4 items-center">
        <div className="flex flex-1">
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
        {/* Other icons */}
        {/* ... */}
      </div>
      {/* <Dialog open={openModal} onOpenChange={setOpenModal}>
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
                    <Label
                      htmlFor="description"
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
          </Dialog> */}
    </nav>
  );
};

export default NavigationBar;
