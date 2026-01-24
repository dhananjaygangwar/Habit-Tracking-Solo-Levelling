export function TextField({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-xs text-indigo-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full rounded-lg bg-[#0b0f1a] border border-indigo-500/30 px-4 py-3 text-sm text-indigo-200
        placeholder-indigo-400/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
