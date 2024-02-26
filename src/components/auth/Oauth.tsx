import { AiFillGithub } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { IoConstruct } from 'react-icons/io5';

const handleOauthLogin = (provider: string) => {
  const googleLoginURL = `${import.meta.env.VITE_CLIENT_URI}/oauth2/authorization/${provider}?redirect_uri=${import.meta.env.VITE_OAUTH2_REDIRECT_URI}`;
  window.location.href = googleLoginURL;
};

const Oauth = () => {
  return (
    <>
      <button
        onClick={() => handleOauthLogin('kakao')}
        className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px]"
        disabled
      >
        <RiKakaoTalkFill size={20} />
        카카오 계정으로 로그인
        <div className="flex items-center">
          (<IoConstruct size={20} className="text-error" />
          <span className="text-xs">점검중</span>)
        </div>
      </button>
      <button
        onClick={() => handleOauthLogin('github')}
        className="flex h-[52px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-ldark hover:border-[0.5px]"
        disabled
      >
        <AiFillGithub size={24} />
        Github 계정으로 로그인
        <div className="flex items-center">
          (<IoConstruct size={20} className="text-error" />
          <span className="text-xs">점검중</span>)
        </div>
      </button>
    </>
  );
};

export default Oauth;
