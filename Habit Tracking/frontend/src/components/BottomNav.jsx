import { NavButton } from "./NavButton";

export function BottomNav() {
    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Habits", path: "/habits" },
        { label: "Punish", path: "/punishments" },
        { label: "Stats", path: "/stats" },
        { label: "Admin", path: "/admin", danger: true },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-500/20 bg-[#05070d]">
            <div className="flex justify-around items-center h-14">
                {navItems.map(item => (
                    <NavButton key={item.path} {...item} />
                ))}
            </div>
        </div>
    );
}
