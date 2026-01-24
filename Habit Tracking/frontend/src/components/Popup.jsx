export function Popup({ open, title, subtitle, children, actions }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">

            <div className="w-full max-w-sm rounded-xl border border-indigo-500/40 bg-[#05070d]
        shadow-[0_0_40px_rgba(99,102,241,0.3)] p-5">

                {/* Header */}
                <div className="mb-4">
                    <p className="text-xs tracking-widest text-indigo-400">
                        SYSTEM PANEL
                    </p>
                    <h2 className="text-lg font-bold text-indigo-200 mt-1">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-1 text-xs text-indigo-400/60">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="mt-6 flex gap-3">
                    {
                        actions.length > 0 && actions.map(action => {
                            return (
                                <button
                                    key={action.label}
                                    onClick={action.onClick}
                                    className={`
                                            flex-1 rounded-lg py-2 text-xs font-semibold tracking-wider transition
                                            ${action.variant === "danger"
                                            ? "border border-red-500/40 text-red-400 hover:bg-red-500/10"
                                            : action.variant === "primary"
                                                ? "bg-indigo-600 text-white"
                                                : "border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
                                        }
                `}
                                >
                                    {action.label}
                                </button>
                            )
                        })
                    }
                    <button
                        className="flex-1 rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white"
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}
