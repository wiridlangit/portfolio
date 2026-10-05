import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Backdrop from './Backdrop';
import Navbar from './Navbar';
import Footer from './Footer';
import SectionRail from './SectionRail';
import BootSequence from '../BootSequence';

const containerClass = 'container mx-auto w-full max-w-6xl px-5 sm:px-8';

export default function Layout({ children }) {
  const [booted, setBooted] = useState(false);
  const finishBoot = useCallback(() => setBooted(true), []);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return (
    <>
      <BootSequence onDone={finishBoot} />

      <div className="flex min-h-screen flex-col">
        <Backdrop />

        <div className={containerClass}>
          <Navbar />
        </div>

        <main
          className={`flex-1 transition-opacity duration-700 ${booted ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className={containerClass}>{children}</div>
        </main>

        <div className={containerClass}>
          <Footer />
        </div>

        <SectionRail />
      </div>
    </>
  );
}
