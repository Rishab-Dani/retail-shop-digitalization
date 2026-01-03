import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { installFetchDebug } from './utils/fetchDebug'

// Install fetch debug helper in development to log invalid/non-JSON responses
if (process.env.NODE_ENV !== 'production') {
  installFetchDebug();
}

// Ensure common placeholder elements exist so injected scripts don't fail on any page
import { installDomPlaceholders } from './utils/domPlaceholders';
installDomPlaceholders();

// Global handlers to suppress noisy injected script errors (e.g., share-modal.js from extensions)
// and to make JSON parse rejections easier to inspect without uncaught traces.
if (typeof window !== 'undefined') {
  window.addEventListener('error', (ev) => {
    try {
      const src = ev?.filename || ev?.fileName || '';
      if (src && src.includes('share-modal.js')) {
        console.warn('Suppressed external script error from', src, ev.message || ev.error);
        ev.preventDefault();
      }
    } catch (e) {
      // swallow
    }
  });

  window.addEventListener('unhandledrejection', (ev) => {
    try {
      const reason = ev?.reason;
      const msg = (reason && reason.message) || String(reason || '');
      if (msg.includes('Unexpected non-whitespace character after JSON') || msg.includes('Unexpected token')) {
        console.warn('Suppressed unhandled JSON parse rejection:', msg);
        ev.preventDefault();
      }
    } catch (e) {
      // swallow
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
