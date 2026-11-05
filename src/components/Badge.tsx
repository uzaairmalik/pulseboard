/// Status / plan / stage badges. Colour is meaning, not decoration:
/// green = good, amber = needs attention, red = at risk, grey = inactive.
export default function Badge({ label }: { label: string }) {
  const cls =
    label === 'Active' || label === 'Won' || label === 'Enterprise'
      ? 'green'
      : label === 'Trial' || label === 'Proposal' || label === 'Demo' || label === 'Growth'
        ? 'amber'
        : label === 'Churned' || label === 'Lost' || label === 'Past due'
          ? 'red'
          : label === 'Negotiation' || label === 'Lead'
            ? 'indigo'
            : 'grey';
  return <span className={`badge ${cls}`}>{label}</span>;
}
