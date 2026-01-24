export function StatusBadge({ status }) {
  const map = {
    DONE: "text-green-400 border-green-400/40",
    FAILED: "text-red-400 border-red-400/40",
    PENDING: "text-yellow-400 border-yellow-400/40",
  };

  return (
    <span className={`text-[10px] px-2 py-1 border rounded ${map[status]}`}>
      {status}
    </span>
  );
}