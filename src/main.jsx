import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import Router from './router';
import ToastProvider from './context/ToastProvider';

import 'remixicon/fonts/remixicon.css';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  once: true,
  offset: 60,
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <Router />
    </ToastProvider>
  </StrictMode>,
);
