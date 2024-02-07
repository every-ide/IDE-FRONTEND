import SignInForm from '@/src/components/auth/SignInForm';
import backgroundImage from '@/src/assets/images/universe.jpg';

const LoginPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      }}
    >
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
