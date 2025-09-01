import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Router from './router.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'
import "remixicon/fonts/remixicon.css";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container mx-auto px-4'>
      <PreLoader />
      <Navbar />
      <Router />
      <Footer />
    </div>
  </StrictMode>,
)
