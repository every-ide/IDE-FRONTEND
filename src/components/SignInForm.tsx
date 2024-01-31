import React from "react";
import AuthInput from "./AuthInput";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

type TSignInForm = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>({ mode: "onChange" });

  const signInAction = async () => {
    // 로그인 request
    console.log("login action");
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
            className="w-full h-[52px] bg-lightdark hover:border-[0.5px] hover:border-accentBlue hover:shadow-md hover:shadow-accentBlue rounded-xl"
          >
            이메일로 로그인
          </button>
        </form>
        <button
          onClick={() => {}}
          className="w-full h-[52px] flex flex-row justify-center items-center gap-2 bg-lightdark hover:border-[0.5px] hover:border-accentBlue hover:shadow-md hover:shadow-accentBlue rounded-xl"
        >
          <FcGoogle size={20} />
          Google 계정으로 로그인
        </button>
        <button
          onClick={() => {}}
          className="w-full h-[52px] flex flex-row justify-center items-center gap-2 bg-lightdark hover:border-[0.5px] hover:border-accentBlue hover:shadow-md hover:shadow-accentBlue rounded-xl"
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
