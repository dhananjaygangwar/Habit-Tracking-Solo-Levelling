export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="h-5 w-5 rounded border border-indigo-500/40 bg-[#0b0f1a]
          peer-checked:bg-indigo-600 peer-checked:border-indigo-400
          shadow-[0_0_10px_rgba(99,102,241,0.4)] transition" />
        <span className="absolute inset-0 hidden peer-checked:flex items-center justify-center text-white text-xs">
          ✓
        </span>
      </div>
      <span className="text-sm text-indigo-200">
        {label}
      </span>
    </label>
  );
}
