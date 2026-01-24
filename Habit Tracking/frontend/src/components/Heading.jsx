export function Heading({ title, subtitle }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-extrabold tracking-widest text-indigo-400">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-xs text-indigo-300/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
