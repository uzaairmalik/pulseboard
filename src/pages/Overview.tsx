import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { ChannelDonut, RevenueLineChart } from '../components/Charts';
import { channels, customers, deals, monthly } from '../data/mockData';
import { formatUSD, formatNumber } from '../utils/format';

/// Overview: the four numbers a founder checks first, then revenue
/// trend, acquisition mix, top accounts and the newest pipeline.
/// Every number is computed from mockData — change the data and the
/// dashboard updates; nothing is a hard-coded screenshot value.
export default function Overview({ onGoCustomers }: { onGoCustomers: () => void }) {
  const mrr = customers.filter((c) => c.status !== 'Churned').reduce((s, c) => s + c.mrr, 0);
  const active = customers.filter((c) => c.status === 'Active').length;
  const pipeline = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').reduce((s, d) => s + d.value, 0);
  const won = deals.filter((d) => d.stage === 'Won').length;
  const lost = deals.filter((d) => d.stage === 'Lost').length;
  const winRate = won + lost === 0 ? 0 : Math.round((won / (won + lost)) * 100);
  const last = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const revGrowth = (((last.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1);
  const custGrowth = (((last.customers - prev.customers) / prev.customers) * 100).toFixed(1);
  const top = [...customers].sort((a, b) => b.mrr - a.mrr).slice(0, 5);
  const recentDeals = [...deals].sort((a, b) => b.closeDate.localeCompare(a.closeDate)).slice(0, 5);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid stats">
        <StatCard label="Monthly recurring revenue" value={formatUSD(mrr)} delta={`▲ ${revGrowth}%`} up note="vs last month" />
        <StatCard label="Active customers" value={formatNumber(active)} delta={`▲ ${custGrowth}%`} up note="vs last month" />
        <StatCard label="Open pipeline" value={formatUSD(pipeline)} delta={`${deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost').length} deals`} up note="in flight" />
        <StatCard label="Win rate" value={`${winRate}%`} delta={`${won} won · ${lost} lost`} up note="all time" />
      </div>

      <div className="grid two">
        <div className="card">
          <h2>Revenue trend</h2>
          <p className="muted">Monthly revenue, last 12 months · {formatUSD(last.revenue)} in {last.month}</p>
          <RevenueLineChart data={monthly} />
        </div>
        <div className="card">
          <h2>Where signups come from</h2>
          <p className="muted">Acquisition channels, share of new accounts</p>
          <ChannelDonut data={channels} />
        </div>
      </div>

      <div className="grid two-equal">
        <div className="card">
          <h2>Top accounts by MRR</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Company</th><th>Plan</th><th>MRR</th><th>Health</th></tr></thead>
              <tbody>
                {top.map((c) => (
                  <tr key={c.id}>
                    <td><b>{c.company}</b><br /><span className="muted">{c.name}</span></td>
                    <td><Badge label={c.plan} /></td>
                    <td>{formatUSD(c.mrr)}</td>
                    <td>
                      <div className="progress" style={{ width: 90 }}><div style={{ width: `${c.health}%`, background: c.health < 50 ? '#f43f5e' : '#10b981' }} /></div>
                      <span className="muted">{c.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn ghost sm" onClick={onGoCustomers} style={{ marginTop: 12 }}>View all customers →</button>
        </div>
        <div className="card">
          <h2>Latest deals</h2>
          {recentDeals.map((d) => (
            <div key={d.id} className="row" style={{ justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div><b>{d.title}</b><br /><span className="muted">{d.company} · closes {d.closeDate}</span></div>
              <div style={{ textAlign: 'right' }}>
                <div><b>{formatUSD(d.value)}</b></div>
                <Badge label={d.stage} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
