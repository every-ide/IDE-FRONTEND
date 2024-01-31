import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        logo, service 소개
      </div>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <SignUpForm />
        <Link to="/signin">
          <p className="text-neutral-500 hover:border-b-[1px] hover:border-neutral-500">
            로그인하기
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
