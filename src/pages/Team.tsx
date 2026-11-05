import { useState } from 'react';
import Badge from '../components/Badge';
import { formatDate } from '../utils/format';
import type { Role, TeamMember } from '../data/types';

/// Team & roles: change a member's role in place, and invite a new
/// member (added as Invited). The permission table underneath is the
/// part clients ask about — it states, in plain words, what each role
/// can and cannot do. Changes live in App state, so they survive
/// navigating to another page and back.
const permissions: Record<Role, string> = {
  Admin: 'Everything: billing, roles, all customers & deals, settings.',
  Manager: 'Customers & deals: create, edit and export. No billing, no role changes.',
  Agent: 'Assigned customers & deals: view and update. No exports, no invites.',
};

export default function Team({ members, onChange }: { members: TeamMember[]; onChange: (m: TeamMember[]) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Agent');
  const [note, setNote] = useState('');

  const setRoleFor = (id: string, next: Role) => {
    onChange(members.map((m) => (m.id === id ? { ...m, role: next } : m)));
  };

  const invite = () => {
    if (!name.trim() || !email.includes('@')) {
      setNote('Enter a name and a valid email to invite someone.');
      return;
    }
    const member: TeamMember = {
      id: `T-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Invited',
      lastLogin: '—',
    };
    onChange([...members, member]);
    setName('');
    setEmail('');
    setNote(`Invite sent to ${member.email} as ${role}.`);
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h2>Invite a team member</h2>
        <div className="toolbar" style={{ marginBottom: 0 }}>
          <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="input" value={role} onChange={(e) => setRole(e.target.value as Role)} aria-label="Role for new member">
            <option>Admin</option><option>Manager</option><option>Agent</option>
          </select>
          <button className="btn" onClick={invite}>Send invite</button>
          {note && <span className="muted">{note}</span>}
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Last login</th></tr></thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <span className="row">
                      <span className="avatar">{m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                      <span><b>{m.name}</b><br /><span className="muted">{m.email}</span></span>
                    </span>
                  </td>
                  <td>
                    <select className="input" value={m.role} onChange={(e) => setRoleFor(m.id, e.target.value as Role)} aria-label={`Role for ${m.name}`}>
                      <option>Admin</option><option>Manager</option><option>Agent</option>
                    </select>
                  </td>
                  <td><Badge label={m.status} /></td>
                  <td>{m.lastLogin === '—' ? '—' : formatDate(m.lastLogin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2>What each role can do</h2>
        {(Object.keys(permissions) as Role[]).map((r) => (
          <p key={r}><Badge label={r} /> — {permissions[r]}</p>
        ))}
        <p className="muted">Demo note: role changes are stored in app state only. In production they would be saved to the backend and enforced by the API, not just hidden in the UI.</p>
      </div>
    </div>
  );
}
