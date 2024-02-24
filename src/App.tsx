import { ToastContainer } from 'react-toastify';
import Router from '@/components/Router';
import 'react-toastify/dist/ReactToastify.css';
import SEOMetaTag from './SEO/SEOMetaTag';

function App() {
  return (
    <>
      <SEOMetaTag url="https://ide-frontend-wheat.vercel.app/" />
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
