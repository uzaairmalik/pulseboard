import { ChannelDonut, RevenueBarChart, RevenueLineChart } from '../components/Charts';
import { channels, monthly } from '../data/mockData';
import { formatUSD, formatNumber } from '../utils/format';

/// Analytics: monthly revenue vs expenses (profit is computed, not
/// typed in), growth table and channel mix. The insight bullets are
/// derived from the same data, so they stay true if the data changes.
export default function Analytics() {
  const best = [...monthly].sort((a, b) => b.revenue - a.revenue)[0];
  const totalRevenue = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalProfit = monthly.reduce((s, m) => s + (m.revenue - m.expenses), 0);
  const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);
  const growth = (((monthly[monthly.length - 1].revenue - monthly[0].revenue) / monthly[0].revenue) * 100).toFixed(0);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="grid two">
        <div className="card">
          <h2>Revenue vs expenses</h2>
          <p className="muted">12-month profit margin: <b>{margin}%</b> · total profit {formatUSD(totalProfit)}</p>
          <RevenueLineChart data={monthly} />
        </div>
        <div className="card">
          <h2>Monthly revenue</h2>
          <p className="muted">Bar view — best month: <b>{best.month} ({formatUSD(best.revenue)})</b></p>
          <RevenueBarChart data={monthly} />
        </div>
      </div>
      <div className="grid two-equal">
        <div className="card">
          <h2>Monthly breakdown</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Month</th><th>Revenue</th><th>Expenses</th><th>Profit</th><th>Customers</th></tr></thead>
              <tbody>
                {monthly.map((m) => (
                  <tr key={m.month}>
                    <td><b>{m.month}</b></td>
                    <td>{formatUSD(m.revenue)}</td>
                    <td>{formatUSD(m.expenses)}</td>
                    <td style={{ color: '#10b981', fontWeight: 700 }}>{formatUSD(m.revenue - m.expenses)}</td>
                    <td>{formatNumber(m.customers)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <h2>What the numbers say</h2>
          <ul style={{ lineHeight: 1.9, paddingLeft: 18 }}>
            <li>Revenue grew <b>{growth}%</b> over the last 12 months (Dec → Nov).</li>
            <li>Best month was <b>{best.month}</b> at {formatUSD(best.revenue)}.</li>
            <li>Profit margin is <b>{margin}%</b> across the year — expenses grew slower than revenue.</li>
            <li>Customers grew from {monthly[0].customers} to {monthly[monthly.length - 1].customers} in the same period.</li>
            <li>Organic search is the largest acquisition channel ({channels[0].share}%).</li>
          </ul>
          <h3 style={{ marginTop: 18 }}>Acquisition channels</h3>
          <ChannelDonut data={channels} />
        </div>
      </div>
    </div>
  );
}
