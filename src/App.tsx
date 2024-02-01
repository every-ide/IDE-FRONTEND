import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Router from "@components/Router";
import Loader from "@components/ui/Loader";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      <ToastContainer />
      {init ? <Router /> : <Loader />}
    </>
  );
}

export default App;
