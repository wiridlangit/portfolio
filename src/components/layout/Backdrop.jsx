export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="grid-bg grid-bg-fade absolute inset-0 opacity-60" />

      <div className="animate-drift absolute -top-1/3 -left-1/4 size-[38rem] rounded-full bg-term-accent/10 blur-[120px]" />
      <div className="animate-glow absolute top-1/3 -right-1/4 size-[32rem] rounded-full bg-term-cyan/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-term-accent-dim/10 blur-[120px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,rgba(8,11,10,0.85)_85%,var(--color-term-bg)_100%)]" />

      <div className="scanline absolute inset-x-0 top-0 h-px animate-scan bg-term-accent/10" />
    </div>
  );
}
