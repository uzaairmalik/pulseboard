import { useMemo, useState } from 'react';
import Badge from '../components/Badge';
import { deals } from '../data/mockData';
import { exportCsv } from '../utils/exportCsv';
import { formatDate, formatUSD } from '../utils/format';

/// Pipeline: stage summary cards (value + count per stage), stage
/// filter, value-sorted table and CSV export. Weighted pipeline
/// (value × probability) is shown because that is the number a sales
/// lead actually plans against, not the raw headline total.
export default function Deals() {
  const [stage, setStage] = useState('All');
  const stages = ['Lead', 'Demo', 'Proposal', 'Negotiation', 'Won', 'Lost'];
  const open = deals.filter((d) => d.stage !== 'Won' && d.stage !== 'Lost');
  const weighted = open.reduce((s, d) => s + (d.value * d.probability) / 100, 0);
  const filtered = useMemo(() => {
    const list = stage === 'All' ? [...deals] : deals.filter((d) => d.stage === stage);
    return list.sort((a, b) => b.value - a.value);
  }, [stage]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid stats">
        <div className="card"><div className="muted">Open pipeline</div><div className="stat-value">{formatUSD(open.reduce((s, d) => s + d.value, 0))}</div><div className="muted">{open.length} open deals</div></div>
        <div className="card"><div className="muted">Weighted pipeline</div><div className="stat-value">{formatUSD(weighted)}</div><div className="muted">value × probability</div></div>
        <div className="card"><div className="muted">Won (all time)</div><div className="stat-value">{formatUSD(deals.filter((d) => d.stage === 'Won').reduce((s, d) => s + d.value, 0))}</div><div className="muted">{deals.filter((d) => d.stage === 'Won').length} deals closed</div></div>
        <div className="card"><div className="muted">Lost</div><div className="stat-value">{formatUSD(deals.filter((d) => d.stage === 'Lost').reduce((s, d) => s + d.value, 0))}</div><div className="muted">{deals.filter((d) => d.stage === 'Lost').length} deals lost</div></div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="row" style={{ flexWrap: 'wrap' }}>
            {['All', ...stages].map((s) => (
              <button key={s} className={stage === s ? 'btn sm' : 'btn ghost sm'} onClick={() => setStage(s)}>{s}</button>
            ))}
          </div>
          <span className="spacer" />
          <button className="btn" onClick={() => exportCsv('pulseboard-deals.csv', ['ID', 'Title', 'Company', 'Value (USD)', 'Stage', 'Owner', 'Close date', 'Probability %'], filtered.map((d) => [d.id, d.title, d.company, d.value, d.stage, d.owner, d.closeDate, d.probability]))}>Export CSV</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Deal</th><th>Value</th><th>Stage</th><th>Probability</th><th>Owner</th><th>Close date</th></tr></thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td><b>{d.title}</b><br /><span className="muted">{d.company}</span></td>
                  <td>{formatUSD(d.value)}</td>
                  <td><Badge label={d.stage} /></td>
                  <td>
                    <div className="progress" style={{ width: 80 }}><div style={{ width: `${d.probability}%` }} /></div>
                    <span className="muted">{d.probability}%</span>
                  </td>
                  <td>{d.owner}</td>
                  <td>{formatDate(d.closeDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
