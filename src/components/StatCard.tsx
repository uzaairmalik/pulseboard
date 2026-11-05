interface Props {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  note: string;
}

export default function StatCard({ label, value, delta, up, note }: Props) {
  return (
    <div className="card">
      <div className="muted">{label}</div>
      <div className="stat-value">{value}</div>
      <div>
        <span className={up ? 'delta up' : 'delta down'}>{delta}</span>{' '}
        <span className="muted">{note}</span>
      </div>
    </div>
  );
}
