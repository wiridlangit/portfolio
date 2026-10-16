import { useEffect, useState } from 'react';
import { SectionHeading, TerminalCard } from '../ui/Terminal';

const API_URL = 'https://api.jiwangga.com/api/v1/status';
const POLL_INTERVAL = 30000;

const aos = {
  'data-aos': 'fade-up',
  'data-aos-duration': '800',
  'data-aos-once': 'true',
};

const statusStyles = {
  operational: {
    label: 'Operational',
    className: 'border-term-accent-dim/60 bg-term-accent/10 text-term-accent',
    dot: 'bg-term-accent',
  },
  degraded: {
    label: 'Degraded Performance',
    className: 'border-term-amber/40 bg-term-amber/10 text-term-amber',
    dot: 'bg-term-amber',
  },
  down: {
    label: 'Down',
    className: 'border-rose-400/40 bg-rose-400/10 text-rose-400',
    dot: 'bg-rose-400',
  },
  unreachable: {
    label: 'Unreachable',
    className: 'border-rose-400/40 bg-rose-400/10 text-rose-400',
    dot: 'bg-rose-400',
  },
  unknown: {
    label: 'Unknown',
    className: 'border-term-border-bright bg-term-elevated text-term-muted',
    dot: 'bg-term-muted',
  },
};

const metricDefs = [
  { key: 'cpu_usage_percent', label: 'cpu', icon: 'ri-cpu-line', color: 'bg-term-cyan' },
  { key: 'memory_usage_percent', label: 'memory', icon: 'ri-database-2-line', color: 'bg-term-accent' },
  { key: 'disk_usage_percent', label: 'disk', icon: 'ri-hard-drive-2-line', color: 'bg-term-amber' },
];

function StatusPill({ style, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs ${style.className} ${className}`}
    >
      <span className="relative flex size-2">
        <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${style.dot}`} />
        <span className={`relative inline-flex size-2 rounded-full ${style.dot}`} />
      </span>
      {style.label}
    </span>
  );
}

function Metric({ label, icon, value, color }) {
  const clamped = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div className="rounded-lg border border-term-border bg-term-bg/40 p-4">
      <div className="flex items-center gap-2 font-mono text-xs text-term-faint">
        <span className="text-term-accent/70" aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-2 font-mono text-2xl text-term-text">
        {value === undefined || value === null ? '––' : value.toFixed(1)}
        <span className="text-base text-term-muted">%</span>
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-term-elevated">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

function formatAbsolute(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatRelative(iso) {
  if (!iso) return '—';
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.round(minutes / 60)}h ago`;
}

export default function ServerStatus() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    
async function fetchStatus() {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    if (!active) return;

    console.log('[ServerStatus] API response:', json);

    setData(json);
    setFailed(false);
  } catch (error) {
    console.error('[ServerStatus] Fetch failed:', error);

    if (active) setFailed(true);
  } finally {
    if (active) setLoading(false);
  }
}


    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const statusKey = failed ? 'unreachable' : (data?.status ?? 'unknown');
  const style = statusStyles[statusKey] ?? statusStyles.unknown;
  const metrics = data?.metrics;

  return (
    <section id="server-status" className="py-16" aria-labelledby="server-status-heading">
      <SectionHeading
        command="curl api.jiwangga.com/api/v1/status"
        title="Server Status"
        description="Live health check of my self-hosted server, refreshed automatically."
        align="left"
        {...aos}
        className="mb-10"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <TerminalCard
          label="~/status/overview"
          icon="ri-server-line"
          className="lg:col-span-2"
          {...aos}
        >
          {loading ? (
            <p className="animate-blink py-8 text-center font-mono text-sm text-term-faint">
              fetching status...
            </p>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <StatusPill style={style} />
                <p className="font-mono text-xs text-term-faint">
                  updated {data?.timestamp ? formatRelative(data.timestamp) : '—'}
                </p>
              </div>

              {failed ? (
                <p className="font-mono text-sm text-term-muted">
                  Could not reach the status endpoint. Retrying automatically every{' '}
                  {POLL_INTERVAL / 1000}s...
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {metricDefs.map((metric) => (
                    <Metric
                      key={metric.key}
                      label={metric.label}
                      icon={metric.icon}
                      value={metrics?.[metric.key]}
                      color={metric.color}
                    />
                  ))}
                  <div className="rounded-lg border border-term-border bg-term-bg/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-term-faint">
                      <span className="text-term-accent/70" aria-hidden="true">
                        ri-temp-hot-line
                      </span>
                      cpu temp
                    </div>
                    <p className="mt-2 font-mono text-2xl text-term-text">
                      {metrics?.cpu_temperature_celsius?.toFixed(1) ?? '––'}
                      <span className="text-base text-term-muted">°C</span>
                    </p>
                    <p className="mt-3 font-mono text-xs text-term-faint">raspberry pi 5</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </TerminalCard>

        <TerminalCard label="~/status/device" icon="ri-computer-line" {...aos}>
          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-xs text-term-faint">status</dt>
              <dd className="mt-1">
                <StatusPill style={style} />
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-term-faint">device</dt>
              <dd className="mt-1 text-sm text-term-text">{data?.device ?? '—'}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-term-faint">last updated</dt>
              <dd className="mt-1 font-mono text-sm text-term-text">
                {formatAbsolute(data?.timestamp)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-term-faint">refresh</dt>
              <dd className="mt-1 font-mono text-sm text-term-text">every {POLL_INTERVAL / 1000}s</dd>
            </div>
          </dl>
        </TerminalCard>
      </div>

      <h2 id="server-status-heading" className="sr-only">
        Server Status
      </h2>
    </section>
  );
}
