import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '@/src/api/axios';
import { toast } from 'react-toastify';
import Oauth from './Oauth';

const SIGNUP_URL = '/api/signup';

type TSignUpForm = {
  email: string;
  name: string;
  password: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpForm>({ mode: 'onChange' });

  const signUpAction = async ({ email, name, password }: TSignUpForm) => {
    // 회원가입 request
    try {
      // signup request (axios)
      const res = await axiosPublic.post(
        SIGNUP_URL,
        JSON.stringify({ email, name, password }),
      );

      if (res.status === 200) {
        // Navigate to personal page
        navigate('/login');

        // Reset Form values
        reset();
        toast('every-ide의 회원이 되신 것을 환영합니다! 👏👏👏', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    } catch (error: any) {
      // 서버 응답 없음
      if (!error?.response) {
        toast.error('No Server Response', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
      // 중복 이메일인 경우
      else if (error.response.status === 400) {
        toast.error('이미 가입된 이메일 주소입니다.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      } else {
        console.log('error :>> ', error);

        toast.error('문제가 발생했습니다.다시 시도해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    }
  };

  return (
    <div className="flex h-[75%] w-[55%] flex-col">
      <div className="pb-5 text-center text-3xl font-black">🚀 Sign Up</div>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(signUpAction)}>
          <div className="mb-5 flex flex-col">
            <AuthInput
              label="이메일"
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
              label="닉네임"
              name="name"
              type="text"
              placeholder="ex) every-ide"
              registerOptions={register('name', {
                required: '닉네임을 입력하세요',
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2글자 이상 입력해주세요',
                },
              })}
              errors={errors}
            />
            <AuthInput
              label="비밀번호"
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
            className="h-[52px] w-full rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent/65 hover:shadow-md hover:shadow-accent active:scale-95 disabled:border-none disabled:text-neutral-500 disabled:shadow-none"
          >
            {isSubmitting ? '회원가입 중...' : '이메일로 가입하기'}
          </button>
        </form>
        <Oauth />

        <Link to="/login">
          <p className="text-center text-neutral-500 hover:underline">
            로그인하기
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
