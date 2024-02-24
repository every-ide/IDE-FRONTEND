import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>,
  );
} else {
  root.render(
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>,
  );
}
