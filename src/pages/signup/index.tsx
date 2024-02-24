import React, { Suspense } from 'react';
import SignUpForm from '@/src/components/auth/SignUpForm';
import backgroundImage from '@/src/assets/images/universe.jpg';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
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
          <Suspense fallback={<div>Loading...</div>}>
            <Spline scene="https://prod.spline.design/1eKgnQc9d7UZhhJa/scene.splinecode" />
          </Suspense>
        </div>
        <div className="flex h-full w-[50%] flex-col items-center justify-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
