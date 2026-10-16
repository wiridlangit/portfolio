import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './RaspberryPiExplorer.css';

const PARTS = [
  { id: 'cpu', name: 'CPU & GPU', short: 'BCM2712', description: 'The Broadcom BCM2712 is the Raspberry Pi 5 system-on-chip, featuring a quad-core 64-bit Arm Cortex-A76 CPU running at up to 2.4 GHz and VideoCore VII graphics.', specs: [['SoC', 'Broadcom BCM2712'], ['CPU', 'Quad-core Arm Cortex-A76'], ['Clock', 'Up to 2.4 GHz'], ['GPU', 'VideoCore VII']] },
  { id: 'ram', name: 'RAM', short: 'LPDDR4X', description: 'Low-power memory used by the operating system, applications, and workloads. Raspberry Pi 5 models are available with different RAM capacities.', specs: [['Memory', 'LPDDR4X SDRAM'], ['Role', 'System memory'], ['Capacity', 'Model dependent']] },
  { id: 'gpio', name: 'GPIO Header', short: '40 pins', description: 'A 40-pin header for connecting sensors, buttons, relays, displays, and other electronics. It supports digital input/output and common serial interfaces.', specs: [['Pins', '40'], ['Logic level', '3.3 V'], ['Interfaces', 'I²C, SPI, UART, PWM']] },
  { id: 'usb', name: 'USB Ports', short: '2 × USB 3.0 + 2 × USB 2.0', description: 'Connect peripherals and external storage. The two blue ports are USB 3.0; the two additional ports support USB 2.0.', specs: [['USB 3.0', '2 ports'], ['USB 2.0', '2 ports'], ['Use', 'Peripherals and storage']] },
  { id: 'ethernet', name: 'Ethernet', short: 'Gigabit Ethernet', description: 'Wired networking for reliable connectivity, local services, and server projects.', specs: [['Interface', 'Gigabit Ethernet'], ['Use', 'Wired networking']] },
  { id: 'hdmi', name: 'HDMI Ports', short: '2 × micro-HDMI', description: 'Two micro-HDMI connectors support dual-display output. Exact resolution and refresh rate depend on the display setup and software.', specs: [['Connectors', '2 × micro-HDMI'], ['Use', 'Dual displays']] },
  { id: 'power', name: 'USB-C Power', short: '5 V input', description: 'The USB-C connector supplies power to the board. A suitable power supply helps maintain stable operation under load.', specs: [['Connector', 'USB-C'], ['Recommended', '27 W Raspberry Pi supply']] },
  { id: 'camera', name: 'Camera / Display', short: 'MIPI connectors', description: 'MIPI camera and display connectors let you attach compatible camera modules and DSI displays using suitable cables.', specs: [['Interfaces', 'MIPI CSI / DSI'], ['Use', 'Camera and display']] },
  { id: 'sd', name: 'microSD Card', short: 'Boot storage', description: 'Removable storage commonly used for the operating system, applications, and project files. This connector is on the underside of the board.', specs: [['Media', 'microSD'], ['Use', 'Boot and storage']] },
  { id: 'wireless', name: 'Wireless', short: 'Wi-Fi + Bluetooth', description: 'Integrated wireless connectivity supports network access and Bluetooth peripherals. Antenna details are represented schematically in this model.', specs: [['Wi-Fi', 'Dual-band 802.11ac'], ['Bluetooth', 'Bluetooth 5.0 / BLE']] },
];

function Part({ id, position, size, selected, onSelect, color = '#8b969e', metal = false, children }) {
  return (
    <mesh position={position} castShadow receiveShadow onClick={(e) => { e.stopPropagation(); onSelect(id); }}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={selected ? '#31baff' : color} metalness={metal ? 0.82 : 0.22} roughness={metal ? 0.28 : 0.58} emissive={selected ? '#087ac5' : '#000000'} emissiveIntensity={selected ? 0.6 : 0} />
      {children}
    </mesh>
  );
}

function CameraPreset({ view, controlsRef }) {
  const { camera } = useThree();
  useEffect(() => {
    if (view === 'top') camera.position.set(0, 8, 0.01);
    else if (view === 'bottom') camera.position.set(0, -8, 0.01);
    else camera.position.set(5.7, 5.4, 6.5);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [view, camera, controlsRef]);
  return null;
}

function BoardModel({ selected, onSelect }) {
  const pins = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ x: -1.33 + Math.floor(i / 2) * 0.14, z: -1.52 + (i % 2) * 0.12 })), []);
  return (
    <group rotation={[-0.08, -0.22, 0]}>
      {/* PCB and mounting points */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.12, 3.2]} />
        <meshStandardMaterial color="#08794d" roughness={0.68} metalness={0.12} />
      </mesh>
      {[-2.18, 2.18].flatMap((x) => [-1.35, 1.35].map((z, i) => (
        <mesh key={`${x}-${z}`} position={[x, 0.075, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.025, 32]} />
          <meshStandardMaterial color="#d8b76a" metalness={0.8} roughness={0.25} />
        </mesh>
      )))}
      {/* PCB traces */}
      {Array.from({ length: 10 }, (_, i) => <mesh key={i} position={[-0.7 + i * 0.14, 0.064, -0.15 + (i % 3) * 0.17]} rotation={[0, 0, 0]}><boxGeometry args={[0.72, 0.008, 0.018]} /><meshStandardMaterial color="#c6a85e" metalness={0.7} roughness={0.4} /></mesh>)}
      {/* CPU and memory */}
      <Part id="cpu" position={[-0.35, 0.18, 0.2]} size={[0.92, 0.24, 0.86]} selected={selected === 'cpu'} onSelect={onSelect} color="#202832" metal>
        <mesh position={[0, 0.126, 0]}><boxGeometry args={[0.76, 0.012, 0.7]} /><meshStandardMaterial color="#313d49" metalness={0.45} roughness={0.35} /></mesh>
      </Part>
      <Part id="ram" position={[0.78, 0.13, -0.5]} size={[0.74, 0.16, 0.5]} selected={selected === 'ram'} onSelect={onSelect} color="#171f25" metal />
      <Part id="ram" position={[0.95, 0.13, 0.52]} size={[0.56, 0.15, 0.42]} selected={selected === 'ram'} onSelect={onSelect} color="#1c242b" metal />
      {/* GPIO header and pins: restored to the edge opposite the USB-C power and HDMI ports */}
      <group onClick={(e) => { e.stopPropagation(); onSelect('gpio'); }}>
        <mesh position={[0, 0.13, -1.45]}><boxGeometry args={[2.82, 0.1, 0.32]} /><meshStandardMaterial color={selected === 'gpio' ? '#178bd0' : '#111820'} /></mesh>
        {pins.map((p, i) => <mesh key={i} position={[p.x, 0.27, p.z]}><cylinderGeometry args={[0.025, 0.025, 0.28, 8]} /><meshStandardMaterial color="#d7c17b" metalness={0.8} roughness={0.22} emissive={selected === 'gpio' ? '#146aa0' : '#000000'} emissiveIntensity={0.3} /></mesh>)}
      </group>
      {/* USB stack */}
      <Part id="usb" position={[1.88, 0.29, -0.78]} size={[0.86, 0.48, 0.62]} selected={selected === 'usb'} onSelect={onSelect} color="#b8c2ca" metal />
      <Part id="usb" position={[1.88, 0.29, -0.04]} size={[0.86, 0.48, 0.62]} selected={selected === 'usb'} onSelect={onSelect} color="#a9b4bd" metal />
      {/* Ethernet */}
      <Part id="ethernet" position={[1.85, 0.28, 0.83]} size={[0.76, 0.46, 0.66]} selected={selected === 'ethernet'} onSelect={onSelect} color="#aeb7bf" metal />
      {/* HDMI and power along front edge */}
      <Part id="hdmi" position={[0.25, 0.15, 1.48]} size={[0.52, 0.22, 0.32]} selected={selected === 'hdmi'} onSelect={onSelect} color="#bac3ca" metal />
      <Part id="hdmi" position={[-0.48, 0.15, 1.48]} size={[0.52, 0.22, 0.32]} selected={selected === 'hdmi'} onSelect={onSelect} color="#bac3ca" metal />
      <Part id="power" position={[-1.3, 0.16, 1.47]} size={[0.54, 0.24, 0.3]} selected={selected === 'power'} onSelect={onSelect} color="#aab5bd" metal />
      {/* Camera / display: one continuous, centered connector block with no middle divider */}
      <group position={[-1.9, 0.15, 0.06]} onClick={(e) => { e.stopPropagation(); onSelect('camera'); }}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.19, 0.79]} />
          <meshStandardMaterial color={selected === 'camera' ? '#31baff' : '#d5d2b6'} emissive={selected === 'camera' ? '#087ac5' : '#000000'} emissiveIntensity={selected === 'camera' ? 0.45 : 0} />
        </mesh>
      </group>
      {/* Wireless antenna area */}
      <mesh position={[2.05, 0.08, 1.16]} onClick={(e) => { e.stopPropagation(); onSelect('wireless'); }}><boxGeometry args={[0.36, 0.025, 0.28]} /><meshStandardMaterial color={selected === 'wireless' ? '#31baff' : '#d0b36b'} /></mesh>
      {/* Small ICs and components */}
      {Array.from({ length: 13 }, (_, i) => <mesh key={i} position={[-0.85 + (i % 5) * 0.38, 0.105, -1.12 + Math.floor(i / 5) * 0.62]}><boxGeometry args={[0.2, 0.07, 0.16]} /><meshStandardMaterial color={i % 2 ? '#1d252d' : '#343b40'} metalness={0.35} roughness={0.45} /></mesh>)}
      {/* SD card slot on lower edge, represented on the visible side */}
      <Part id="sd" position={[0.78, -0.12, 1.05]} size={[0.75, 0.06, 0.4]} selected={selected === 'sd'} onSelect={onSelect} color="#bbc1c4" metal />
    </group>
  );
}

export default function RaspberryPiExplorer() {
  const [selectedId, setSelectedId] = useState('cpu');
  const [view, setView] = useState('3d');
  const controlsRef = useRef(null);
  const selected = PARTS.find((part) => part.id === selectedId) || PARTS[0];
  const chooseView = (nextView) => setView(nextView);

  return (
    <section className="pi5-explorer">
      <div className="pi5-heading">
        <span className="pi5-eyebrow">INTERACTIVE HARDWARE</span>
        <h2>Raspberry Pi <em>5</em></h2>
        <p>Explore the board in 3D. Select a component to learn what it does.</p>
        <br></br>
        <p>This AI-generated 3D model is for illustrative purposes only and may not accurately represent the board's actual design and dimensions!</p>
      </div>
      <div className="pi5-view-switch" aria-label="Camera view">
        {[['3d', '3D View'], ['top', 'Top View'], ['bottom', 'Bottom View']].map(([key, label]) => <button key={key} className={view === key ? 'active' : ''} onClick={() => chooseView(key)}>{label}</button>)}
      </div>
      <div className="pi5-layout">
        <nav className="pi5-parts" aria-label="Raspberry Pi components">
          <div className="pi5-panel-label">COMPONENTS</div>
          {PARTS.map((part, i) => <button key={part.id} className={selectedId === part.id ? 'selected' : ''} onClick={() => setSelectedId(part.id)}><span className="pi5-part-index">{String(i + 1).padStart(2, '0')}</span><span>{part.name}</span><span className="pi5-chevron">↗</span></button>)}
        </nav>
        <div className="pi5-canvas-wrap">
          <Canvas shadows camera={{ position: [5.7, 5.4, 6.5], fov: 37 }} dpr={[1, 1.7]}>
            <color attach="background" args={['#07111b']} />
            <ambientLight intensity={1.25} />
            <directionalLight position={[5, 8, 5]} intensity={2.3} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <pointLight position={[-4, 3, -3]} intensity={70} color="#168bd0" />
            <CameraPreset view={view} controlsRef={controlsRef} />
            <BoardModel selected={selectedId} onSelect={setSelectedId} />
            <ContactShadows position={[0, -0.35, 0]} opacity={0.42} scale={8} blur={2.8} far={4} />
            <Environment preset="city" />
            <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.07} minDistance={4.5} maxDistance={11} maxPolarAngle={Math.PI} />
          </Canvas>
          <div className="pi5-canvas-hint"><span className="pi5-live-dot" /> DRAG TO ROTATE <i>·</i> SCROLL TO ZOOM</div>
          <div className="pi5-selected-chip"><span className="pi5-chip-dot" /> SELECTED: {selected.name.toUpperCase()}</div>
        </div>
        <aside className="pi5-info">
          <div className="pi5-panel-label">COMPONENT DETAILS</div>
          <div className="pi5-info-top"><span className="pi5-info-number">/{String(PARTS.findIndex((p) => p.id === selectedId) + 1).padStart(2, '0')}</span><span className="pi5-info-tag">RASPBERRY PI 5</span></div>
          <h3>{selected.name}</h3>
          <p className="pi5-info-short">{selected.short}</p>
          <p className="pi5-description">{selected.description}</p>
          <div className="pi5-specs">{selected.specs.map(([label, value]) => <div key={label} className="pi5-spec-row"><span>{label}</span><strong>{value}</strong></div>)}</div>
          <div className="pi5-info-footer"><span className="pi5-live-dot" /> CLICK ANY COMPONENT TO EXPLORE</div>
        </aside>
      </div>
      <div className="pi5-footer"><span>DESIGNED FOR INTERACTIVE EXPLORATION</span><span>REACT THREE FIBER <b>×</b> THREE.JS</span></div>
    </section>
  );
}
