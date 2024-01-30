import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SigninPage from "../pages/Signin";
import SignupPage from "../pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>
  )
);

export default router;
