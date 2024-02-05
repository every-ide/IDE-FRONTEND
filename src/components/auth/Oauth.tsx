import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

const handleOauthLogin = (provider: string) => {
  const googleLoginURL = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${provider}?redirect_uri=${import.meta.env.VITE_OAUTH2_REDIRECT_URI}`;
  window.location.href = googleLoginURL;
};

const Oauth = () => {
  return (
    <>
      <button
        onClick={() => handleOauthLogin('google')}
        className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent"
      >
        <FcGoogle size={20} />
        Google 계정으로 로그인
      </button>
      <button
        onClick={() => handleOauthLogin('github')}
        className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px] hover:border-accent hover:shadow-md hover:shadow-accent"
      >
        <AiFillGithub size={24} />
        Github 계정으로 로그인
      </button>
    </>
  );
};

export default Oauth;
