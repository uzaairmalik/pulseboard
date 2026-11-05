import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Deals from './pages/Deals';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import { team as seedTeam } from './data/mockData';
import type { Page, TeamMember } from './data/types';

const titles: Record<Page, { title: string; subtitle: string }> = {
  overview: { title: 'Overview', subtitle: 'Your business at a glance' },
  customers: { title: 'Customers', subtitle: 'Every account, plan and health score' },
  deals: { title: 'Deals & Pipeline', subtitle: 'Open pipeline and win rate' },
  analytics: { title: 'Analytics', subtitle: 'Revenue, growth and channels' },
  team: { title: 'Team & Roles', subtitle: 'Who can see and change what' },
};

export default function App() {
  const [page, setPage] = useState<Page>('overview');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(true);
  // Team roles live here (not in the Team page) so a role change
  // survives navigating away and back.
  const [members, setMembers] = useState<TeamMember[]>(seedTeam);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const handleQuery = (q: string) => {
    setQuery(q);
    if (q.trim() && page !== 'customers') setPage('customers');
  };

  return (
    <div className="layout">
      <Sidebar page={page} onNavigate={(p) => { setPage(p); setQuery(''); }} />
      <main className="main">
        <Topbar
          title={titles[page].title}
          subtitle={titles[page].subtitle}
          query={query}
          onQuery={handleQuery}
          dark={dark}
          onToggleTheme={() => setDark((d) => !d)}
        />
        {page === 'overview' && <Overview onGoCustomers={() => setPage('customers')} />}
        {page === 'customers' && <Customers query={query} onQuery={setQuery} />}
        {page === 'deals' && <Deals />}
        {page === 'analytics' && <Analytics />}
        {page === 'team' && <Team members={members} onChange={setMembers} />}
      </main>
    </div>
  );
}
