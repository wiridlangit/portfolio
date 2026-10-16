import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import RaspberryPiExplorer from '../components/RaspberryPiExplorer';

export default function Hardware() {
  useSeo({
    title: 'Server Hardware',
    description:
      'Interactive 3D explorer of the Raspberry Pi 5 that powers this portfolio — rotate the board and inspect each component.',
  });

  return (
    <div className="py-10">
      <Link
        to="/#server-status"
        className="mb-6 inline-flex items-center gap-2 font-mono text-sm text-term-muted transition-colors hover:text-term-accent"
      >
        <span aria-hidden="true">←</span> back to server status
      </Link>
      <RaspberryPiExplorer />
    </div>
  );
}
