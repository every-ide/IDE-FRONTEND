import SignInForm from '@src/components/auth/SignInForm';

const LoginPage = () => {
  return (
    <div className="bg-[url('/public/images/universe.jpg')] bg-cover">
      <div className="flex h-screen w-full flex-row bg-mdark/60">
        <div className="flex h-full w-[50%] flex-col items-center justify-center">
          logo, service 소개
        </div>
        <div className="flex h-full w-[50%] flex-col items-center justify-center">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
