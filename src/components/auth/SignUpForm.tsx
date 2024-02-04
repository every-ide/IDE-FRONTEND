import { useForm } from 'react-hook-form';
import AuthInput from './AuthInput';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPublic } from '@src/api/axios';
import { toast } from 'react-toastify';

const SIGNUP_URL = '/signup';

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
      // Test용!!!! (추후 삭제)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // login request (axios)
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
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    } catch (error) {
      // 에러
      if (error instanceof Error) {
        console.error(error.message);

        toast.error('문제가 발생했습니다.다시 시도해주세요.', {
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
    <div className="flex h-[75%] w-[55%] flex-col">
      <div className="pb-5 text-center text-3xl font-black">🚀 Sign Up</div>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(signUpAction)}>
          <div className="mb-5 flex flex-col">
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
              label="Nickname"
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
            className="h-[52px] w-full rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent/65 hover:shadow-md hover:shadow-accent active:scale-95 disabled:border-none disabled:text-neutral-500 disabled:shadow-none"
          >
            {isSubmitting ? '회원가입 중...' : '이메일로 가입하기'}
          </button>
        </form>
        <button
          onClick={() => {}}
          className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent/65 hover:shadow-md hover:shadow-accent active:scale-95"
        >
          <FcGoogle size={20} />
          Google 계정으로 계속
        </button>
        <button
          onClick={() => {}}
          className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent/65 hover:shadow-md hover:shadow-accent active:scale-95"
        >
          <AiFillGithub size={24} />
          Github 계정으로 계속
        </button>
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
