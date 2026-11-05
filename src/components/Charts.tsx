import type { Channel, MonthPoint } from '../data/types';

/// Hand-rolled SVG charts — no chart library dependency, so the build
/// stays light and the chart maths is visible in the code (a client
/// can see exactly how a value maps to a pixel).
function linePoints(values: number[], w: number, h: number, pad: number): string {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (values.length - 1);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function RevenueLineChart({ data }: { data: MonthPoint[] }) {
  const values = data.map((d) => d.revenue);
  const w = 640;
  const h = 220;
  const pts = linePoints(values, w, h, 20);
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label="Revenue trend chart">
        <polygon points={`20,${h - 20} ${pts} ${w - 20},${h - 20}`} fill="rgba(99,102,241,0.12)" />
        <polyline points={pts} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {values.map((v, i) => {
          const x = 20 + (i * (w - 40)) / (values.length - 1);
          const max = Math.max(...values);
          const min = Math.min(...values);
          const y = h - 20 - ((v - min) / (max - min || 1)) * (h - 40);
          return <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />;
        })}
      </svg>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        {data.map((d) => (
          <span key={d.month} className="muted" style={{ fontSize: 11 }}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export function RevenueBarChart({ data }: { data: MonthPoint[] }) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="row" style={{ alignItems: 'flex-end', height: 180, gap: 8 }}>
      {data.map((d) => (
        <div key={d.month} style={{ flex: 1, textAlign: 'center' }}>
          <div
            title={`${d.month}: $${d.revenue.toLocaleString()}`}
            style={{
              height: `${Math.max(6, (d.revenue / max) * 140)}px`,
              background: 'linear-gradient(180deg, #6366f1, #818cf8)',
              borderRadius: '6px 6px 0 0',
            }}
          />
          <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
}

export function ChannelDonut({ data }: { data: Channel[] }) {
  // Donut via stacked circle strokes: each segment is a dash on a circle.
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 20 }}>
      <svg width="170" height="170" viewBox="0 0 170 170" role="img" aria-label="Acquisition channels">
        <circle cx="85" cy="85" r={R} fill="none" stroke="#1e293b" strokeWidth="22" />
        {data.map((c) => {
          const len = (c.share / 100) * C;
          const el = (
            <circle
              key={c.name}
              cx="85"
              cy="85"
              r={R}
              fill="none"
              stroke={c.color}
              strokeWidth="22"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 85 85)"
            />
          );
          offset += len;
          return el;
        })}
        <text x="85" y="82" textAnchor="middle" fill="currentColor" fontSize="22" fontWeight="800">100%</text>
        <text x="85" y="102" textAnchor="middle" fill="#94a3b8" fontSize="11">of signups</text>
      </svg>
      <div className="legend">
        {data.map((c) => (
          <span key={c.name}>
            <span className="dot" style={{ background: c.color }} />
            {c.name} — <b>{c.share}%</b>
          </span>
        ))}
      </div>
    </div>
  );
}
