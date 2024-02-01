import { Link } from "react-router-dom";
import NotFoundImg from "@src/assets/images/404.png";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img src={NotFoundImg} alt="404-error" />
      <p className="text-2xl font-light text-error">Page Not Found</p>
      <p className="text-md font-light text-white mt-4">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        to="/"
        className="mt-6 bg-mdark opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
      >
        메인 페이지로 이동
      </Link>
    </div>
  );
};

export default NotFoundPage;
