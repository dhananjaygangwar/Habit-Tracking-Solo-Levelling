export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-indigo-500/40 px-5 py-2 text-sm font-semibold text-indigo-300
      hover:bg-indigo-500/10 active:scale-95 transition"
    >
      {children}
    </button>
  );
}
