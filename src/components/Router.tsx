import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "@pages/login";
import SignUpPage from "@pages/signup";
import WorkspacePage from "@pages/workspace";
import ContainerPage from "@pages/my/dashboard/containers";
import SharedContainerPage from "@pages/my/dashboard/containers/SharedContainers";
import MyContainerPage from "@pages/my/dashboard/containers/MyContainers";
import PersistLogin from "./auth/PersistLogin";
import RequireAuth from "./auth/RequireAuth";
import CheckAuth from "./auth/CheckAuth";
import useAuthStore from "@src/store/AuthProvier";
import LinkPage from "./LinkPage";

export default function Router() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.userId);
  const isUserValid = useAuthStore((state) => state.isUserValid);

  return (
    <Routes>
      <Route path="/" element={<CheckAuth />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="linkpage" element={<LinkPage />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/my/dashboard/containers" element={<ContainerPage />} />
          <Route
            path="/my/dashboard/containers/own"
            element={<MyContainerPage />}
          />
          <Route
            path="/my/dashboard/containers/shared"
            element={<SharedContainerPage />}
          />
          <Route path="/workspace/:workid" element={<WorkspacePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
