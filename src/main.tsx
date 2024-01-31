import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// TODO: context 또는 전역상태관리 여기서 설정
root.render(
  <Router>
    <App />
  </Router>,
);
