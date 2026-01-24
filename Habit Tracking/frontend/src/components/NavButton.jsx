
import { NavLink } from "react-router-dom";


export function NavButton({ label, path, danger }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex flex-col items-center justify-center text-[10px] tracking-wider transition
        ${isActive
          ? danger
            ? "text-red-400"
            : "text-indigo-400"
          : danger
            ? "text-red-400/50"
            : "text-indigo-400/60"
        }
        `
      }
    >
      <span className="font-semibold">{label}</span>

      {/* active indicator */}
      <span
        className={`mt-1 h-[2px] w-4 rounded
          ${danger
            ? "bg-red-500"
            : "bg-indigo-500"
          }
        `}
      />
    </NavLink>
  );
}
