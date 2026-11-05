interface Props {
  title: string;
  subtitle: string;
  query: string;
  onQuery: (q: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Topbar({ title, subtitle, query, onQuery, dark, onToggleTheme }: Props) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <span className="muted">{subtitle}</span>
      <input
        className="search"
        placeholder="Search customers…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Search customers"
      />
      <button className="btn ghost" onClick={onToggleTheme} title="Toggle light / dark theme">
        {dark ? '☀ Light' : '◐ Dark'}
      </button>
      <span className="avatar" title="Uzair Malik — Admin">UM</span>
    </header>
  );
}
