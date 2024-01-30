import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Router from "@components/Router";
import Loader from "@components/ui/Loader";

function App() {
  const [init, setInit] = useState<boolean>(false);
  // user authentication 정보 받아오기
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated /> : <Loader />}
    </>
  );
}

export default App;
