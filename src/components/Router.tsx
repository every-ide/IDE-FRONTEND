import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import SignUpPage from '@/pages/signup';
import WorkspacePage from '@/pages/workspace';
import TeamSpacePage from '@/pages/teamspace';
import ContainerPage from '@/pages/my/dashboard/containers';
import SharedContainerPage from '@/pages/my/dashboard/containers/SharedContainers';
import MyContainerPage from '@/pages/my/dashboard/containers/MyContainers';
import RequireAuth from './auth/RequireAuth';
import CheckAuth from './auth/CheckAuth';
import NotFoundPage from './ui/NotFound';
import PersonalInfoForm from '@/components/ui/PersonalInfoForm.tsx';
import TogetherPage from '@/src/pages/together';
import Oauth2RedirectHandler from '@/src/pages/login/oauthRedirect';

export default function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<CheckAuth />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="oauth2/redirect" element={<Oauth2RedirectHandler />} />
      </Route>
      {/* Private Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/my/dashboard/containers">
          <Route index element={<ContainerPage />} />
          <Route path="own" element={<MyContainerPage />} />
          <Route path="shared" element={<SharedContainerPage />} />
        </Route>
        <Route path="/workspace/:workid" element={<WorkspacePage />} />
        <Route path="/my/info" element={<PersonalInfoForm />} />
        <Route path="/together" element={<TogetherPage />} />
        <Route path="/teamspace/:containerName" element={<TeamSpacePage />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
