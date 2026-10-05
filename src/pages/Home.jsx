import useSeo from '../hooks/useSeo';
import { profile, listProyek, certificates } from '../data';
import Hero from '../components/sections/Hero';
import Publications from '../components/sections/Publications';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Tools from '../components/sections/Tools';
import Projects from '../components/sections/Projects';
import Certificates from '../components/sections/Certificates';
import Contact from '../components/sections/Contact';

export default function Home() {
  useSeo({
    description: `Portfolio of ${profile.name}, an ${profile.role} from ${profile.location} working on ${profile.focus.join(', ')}. ${listProyek.length} projects and ${certificates.length} certificates.`,
  });

  return (
    <>
      <Hero />
      <Publications />
      <About />
      <Experience />
      <Tools />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}