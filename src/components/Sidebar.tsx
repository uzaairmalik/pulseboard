import type { Page } from '../data/types';

interface Props {
  page: Page;
  onNavigate: (p: Page) => void;
}

const items: { id: Page; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'customers', label: 'Customers', icon: '◉' },
  { id: 'deals', label: 'Deals & Pipeline', icon: '◆' },
  { id: 'analytics', label: 'Analytics', icon: '↗' },
  { id: 'team', label: 'Team & Roles', icon: '⚙' },
];

export default function Sidebar({ page, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        Pulse<span>Board</span>
      </div>
      <div className="nav-label">Workspace</div>
      {items.map((it) => (
        <button
          key={it.id}
          className={page === it.id ? 'nav-item active' : 'nav-item'}
          onClick={() => onNavigate(it.id)}
        >
          <span aria-hidden>{it.icon}</span> {it.label}
        </button>
      ))}
      <div className="nav-label">Account</div>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontWeight: 800 }}>Growth plan</div>
        <div className="muted">24 accounts in this demo</div>
        <div className="progress" style={{ marginTop: 8 }}>
          <div style={{ width: '78%' }} />
        </div>
      </div>
      <p className="kbd" style={{ padding: '12px 10px' }}>
        Demo build — data is local mock data, no backend connected.
      </p>
    </aside>
  );
}
