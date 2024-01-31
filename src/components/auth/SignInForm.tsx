import AuthInput from "./AuthInput";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "@src/store/AuthProvier";
import { axiosApi } from "@src/api/axios";

const LOGIN_URL = "/login";

type TSignInForm = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const setIsUserValid = useAuthStore((state) => state.setIsUserValid);
  const setUserId = useAuthStore((state) => state.setUserId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInForm>({ mode: "onChange" });

  const signInAction = async ({ email, password }: TSignInForm) => {
    // 로그인 request
    try {
      // Test용!!!! (추후 삭제)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // login request (axios)
      const res = await axiosApi.post(
        LOGIN_URL,
        JSON.stringify({ email, password })
      );

      // Response data
      const accessToken = res?.data?.accessToken;
      const userId = res?.data?.userId;

      // login 성공 : auth 전역 상태 설정
      setIsUserValid(true);
      setUserId(userId);

      // localstorage에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);

      // Navigate to personal page
      navigate("/my/dashboard/containers");

      // Reset Form values
      reset();
      toast("로그인 성공! 👏👏👏", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (error: any) {
      // 로그인 에러
      if (!error?.response) {
        toast.error("No Server Response", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
      } else if (error.response?.status === 400) {
        toast.error("일치하는 유저 정보가 없습니다.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="w-[55%] h-[70%] flex flex-col">
      <div className="text-3xl font-bold text-center pb-9">🪐 Sign In</div>
      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(signInAction)}>
          <div className="flex flex-col gap-1 mb-7">
            <AuthInput
              label="Email"
              name="email"
              type="text"
              placeholder="ex) abc@defg.com"
              registerOptions={register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
              errors={errors}
            />
            <AuthInput
              label="Password"
              name="password"
              type="password"
              placeholder="패스워드 입력"
              registerOptions={register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자리 이상 입력해주세요",
                },
              })}
              errors={errors}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[52px] bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent rounded-xl disabled:shadow-none disabled:border-none disabled:text-neutral-500"
          >
            {isSubmitting ? "로그인 중..." : "이메일로 로그인"}
          </button>
        </form>
        <button
          onClick={() => {}}
          className="w-full h-[52px] flex flex-row justify-center items-center gap-2 bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent rounded-xl"
        >
          <FcGoogle size={20} />
          Google 계정으로 로그인
        </button>
        <button
          onClick={() => {}}
          className="w-full h-[52px] flex flex-row justify-center items-center gap-2 bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent rounded-xl"
        >
          <AiFillGithub size={24} />
          Github 계정으로 로그인
        </button>
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
