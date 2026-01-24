import { Button } from "./Button";


export function SectionHeader({ title, label, onClick }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm font-bold tracking-widest text-indigo-300">
        {title}
      </p>

      
      <Button onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}