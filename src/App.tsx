import { ToastContainer } from 'react-toastify';
import Router from '@/components/Router';
import 'react-toastify/dist/ReactToastify.css';
import SEOMetaTag from './SEO/SEOMetaTag';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEOMetaTag url="https://ide-frontend-wheat.vercel.app/" />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        theme="dark"
      />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
