export function XPBar({ current = 40, max = 100 }) {
  return (
    <div className="mt-3">
      <p className="text-xs text-indigo-300">XP {current}/{max}</p>
      <div className="mt-1 h-2 w-full bg-indigo-900/40 rounded">
        <div
          className="h-2 bg-indigo-500 rounded"
          style={{ width: `${(current / max) * 100}%` }}
        />
      </div>
    </div>
  );
}