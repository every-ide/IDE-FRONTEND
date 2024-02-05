import SignUpForm from '@src/components/auth/SignUpForm';
import backgroundImage from '@src/assets/images/universe.jpg';

const SignUpPage = () => {
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
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
