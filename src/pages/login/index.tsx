import SignInForm from "@src/components/auth/SignInForm";

const LoginPage = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-mdark">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        logo, service 소개
      </div>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <SignInForm />
      </div>
    </div>
  );
};

export default LoginPage;
