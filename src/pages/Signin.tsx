import SignInForm from "../components/SignInForm";

const SigninPage = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        logo, service 소개
      </div>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
};

export default SigninPage;
