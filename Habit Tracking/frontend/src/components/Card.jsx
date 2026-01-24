export function Card({ children }) {
  return (
    <div className="relative w-full rounded-xl border flex flex-col border-indigo-500/40 bg-[#05070d] p-5
      shadow-[inset_0_0_20px_rgba(99,102,241,0.15),_0_0_30px_rgba(99,102,241,0.25)]">
      
      {/* top accent line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      {children}
    </div>
  );
}
