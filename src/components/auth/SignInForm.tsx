import AuthInput from './AuthInput';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '@src/store/AuthProvier';
import { axiosPublic } from '@src/api/axios';
import Oauth from './Oauth';

const LOGIN_URL = '/auth';

type TSignInForm = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const setUserId = useAuthStore((state) => state.setUserId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInForm>({ mode: 'onChange' });

  const signInAction = async ({ email, password }: TSignInForm) => {
    // 로그인 request
    try {
      // login request (axios)
      const res = await axiosPublic.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
      );

      // Response data
      const accessToken = res?.data?.accessToken;
      const userId = res?.data?.userId;

      // login 성공 : auth 전역 상태 설정
      // setIsUserValid(true);
      setUserId(userId);
      // setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);

      // 유저의 마지막 path로 Navigate (없을 시 '/')
      navigate('/my/dashboard/containers', { replace: true });

      // Reset Form values
      reset();
      toast('로그인 성공! 👏👏👏', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    } catch (error: any) {
      // 로그인 에러
      if (!error?.response) {
        toast.error('No Server Response', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      } else if (error.response?.status === 400) {
        toast.error('일치하는 유저 정보가 없습니다.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    }
  };

  return (
    <div className="flex h-[70%] w-[55%] flex-col">
      <div className="pb-9 text-center text-3xl font-bold">🪐 Sign In</div>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(signInAction)}>
          <div className="mb-7 flex flex-col gap-1">
            <AuthInput
              label="Email"
              name="email"
              type="text"
              placeholder="ex) abc@defg.com"
              registerOptions={register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              errors={errors}
            />
            <AuthInput
              label="Password"
              name="password"
              type="password"
              placeholder="패스워드 입력"
              registerOptions={register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자리 이상 입력해주세요',
                },
              })}
              errors={errors}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[52px] w-full rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent disabled:border-none disabled:text-neutral-500 disabled:shadow-none"
          >
            {isSubmitting ? '로그인 중...' : '이메일로 로그인'}
          </button>
        </form>
        <Oauth />
        <Link to="/signup">
          <div className="text-center text-neutral-500 hover:underline">
            회원이 아니신가요?
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
