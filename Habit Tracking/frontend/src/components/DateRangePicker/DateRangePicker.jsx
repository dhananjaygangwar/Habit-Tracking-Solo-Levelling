
export default function DateRangePicker({ value, onChange }) {
  return (
    <div>
      <input type="date" value={value.from} onChange={e => onChange({ ...value, from: e.target.value })} />
      <span> → </span>
      <input type="date" value={value.to} onChange={e => onChange({ ...value, to: e.target.value })} />
    </div>
  );
}
