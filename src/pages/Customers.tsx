import { useEffect, useMemo, useState } from 'react';
import Badge from '../components/Badge';
import { customers } from '../data/mockData';
import { exportCsv } from '../utils/exportCsv';
import { formatDate, formatUSD } from '../utils/format';
import type { Customer } from '../data/types';

type SortKey = 'name' | 'mrr' | 'health' | 'joined';

/// Customers table: live search, status + plan filters, click-to-sort,
/// pagination and one-click CSV export. This is the page clients
/// screenshot first — it has to work on real data, not a static list.
export default function Customers({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const [status, setStatus] = useState('All');
  const [plan, setPlan] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('mrr');
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Keep the table on page 1 whenever a filter changes.
  useEffect(() => { setPage(1); }, [query, status, plan]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = customers.filter((c) => {
      const matchesQ = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || c.status === status;
      const matchesPlan = plan === 'All' || c.plan === plan;
      return matchesQ && matchesStatus && matchesPlan;
    });
    const dir = sortDir;
    list.sort((a, b) => {
      if (sortKey === 'name') return a.company.localeCompare(b.company) * dir;
      if (sortKey === 'mrr') return (a.mrr - b.mrr) * dir;
      if (sortKey === 'health') return (a.health - b.health) * dir;
      return a.joined.localeCompare(b.joined) * dir;
    });
    return list;
  }, [query, status, plan, sortKey, sortDir]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const rows = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else { setSortKey(key); setSortDir(-1); }
  };

  const doExport = () => exportCsv(
    'pulseboard-customers.csv',
    ['ID', 'Name', 'Company', 'Email', 'Country', 'Plan', 'Status', 'MRR (USD)', 'Joined', 'Health'],
    filtered.map((c: Customer) => [c.id, c.name, c.company, c.email, c.country, c.plan, c.status, c.mrr, c.joined, c.health]),
  );

  return (
    <div className="card">
      <div className="toolbar">
        <input className="input" placeholder="Search name, company or email…" value={query} onChange={(e) => onQuery(e.target.value)} style={{ minWidth: 220 }} />
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          {['All', 'Active', 'Trial', 'Past due', 'Churned'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="input" value={plan} onChange={(e) => setPlan(e.target.value)} aria-label="Filter by plan">
          {['All', 'Free', 'Starter', 'Growth', 'Enterprise'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="spacer" />
        <span className="muted">{filtered.length} customers</span>
        <button className="btn" onClick={doExport}>Export CSV</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th onClick={() => toggleSort('name')}>Customer {sortKey === 'name' ? (sortDir === 1 ? '↑' : '↓') : ''}</th>
              <th>Plan</th><th>Status</th>
              <th onClick={() => toggleSort('mrr')}>MRR {sortKey === 'mrr' ? (sortDir === 1 ? '↑' : '↓') : ''}</th>
              <th onClick={() => toggleSort('health')}>Health {sortKey === 'health' ? (sortDir === 1 ? '↑' : '↓') : ''}</th>
              <th onClick={() => toggleSort('joined')}>Joined {sortKey === 'joined' ? (sortDir === 1 ? '↑' : '↓') : ''}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>
                  <span className="row">
                    <span className="avatar">{c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                    <span><b>{c.company}</b><br /><span className="muted">{c.name} · {c.country}</span></span>
                  </span>
                </td>
                <td><Badge label={c.plan} /></td>
                <td><Badge label={c.status} /></td>
                <td>{c.mrr ? formatUSD(c.mrr) : '—'}</td>
                <td>
                  <div className="progress" style={{ width: 80 }}><div style={{ width: `${c.health}%`, background: c.health < 50 ? '#f43f5e' : c.health < 70 ? '#f59e0b' : '#10b981' }} /></div>
                  <span className="muted">{c.health}/100</span>
                </td>
                <td>{formatDate(c.joined)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="muted" style={{ textAlign: 'center', padding: 24 }}>No customers match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="toolbar" style={{ marginTop: 14, marginBottom: 0 }}>
        <button className="btn ghost sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
        <span className="muted">Page {page} of {pages}</span>
        <button className="btn ghost sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </div>
  );
}
