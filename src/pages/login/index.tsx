import SignInForm from '@/src/components/auth/SignInForm';
import backgroundImage from '@/src/assets/images/universe.jpg';
import React, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
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
          <Suspense fallback={<div>Loading...</div>}>
            <Spline scene="https://prod.spline.design/NmJmzNfySFXEeW2C/scene.splinecode" />
          </Suspense>
        </div>
        <div className="flex h-full w-[50%] flex-col items-center justify-center">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
