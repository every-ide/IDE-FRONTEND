import { Link } from 'react-router-dom';
import NotFoundImg from '@src/assets/images/404.png';

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={NotFoundImg} alt="404-error" />
      <p className="text-2xl font-light text-error">Page Not Found</p>
      <p className="mt-4 text-lg font-light text-white">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        to="/"
        className="mt-6 rounded bg-mdark px-4 py-2 font-bold text-white opacity-80 hover:opacity-100"
      >
        메인 페이지로 이동
      </Link>
    </div>
  );
};

export default NotFoundPage;
