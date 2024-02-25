import { ToastContainer } from 'react-toastify';
import Router from '@/components/Router';
import 'react-toastify/dist/ReactToastify.css';
import SEOMetaTag from './SEO/SEOMetaTag';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEOMetaTag url="https://ide-frontend-wheat.vercel.app/" />
      <ToastContainer />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
