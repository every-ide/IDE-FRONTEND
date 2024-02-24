import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate, render } from 'react-dom';

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement.hasChildNodes()) {
  hydrate(
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>,
    rootElement,
  );
} else {
  render(
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>,
    rootElement,
  );
}
