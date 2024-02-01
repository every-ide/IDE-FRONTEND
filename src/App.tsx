import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Router from "@components/Router";
import Loader from "@components/ui/Loader";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "./store/AuthProvier";

function App() {
  const [init, setInit] = useState<boolean>(false);
  // user authentication 정보 받아오기
  const isUserValid = useAuthStore((state) => state.isUserValid);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isUserValid} /> : <Loader />}
    </>
  );
}

export default App;
