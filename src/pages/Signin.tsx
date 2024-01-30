import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const SigninPage = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        logo, service 소개
      </div>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <SignInForm />
        <Link to="/signup">
          <p className="text-neutral-500 hover:border-b-[1px] hover:border-neutral-500">
            회원이 아니신가요?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
