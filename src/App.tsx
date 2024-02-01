import { ToastContainer } from "react-toastify";
import Router from "@components/Router";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
