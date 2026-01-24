export function Table({ columns, data, actions }) {
  return (
    <div className="rounded-xl border border-indigo-500/30 bg-[#05070d]">
      
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto">
        
        {/* Table body wrapper */}
        <div className="min-w-max">

          {/* Header */}
          <div
            className="grid gap-4 border-b border-indigo-500/20 px-4 py-2 text-xs text-indigo-400"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(160px, 1fr)) ${actions?.length ? 'auto' : ''}`
            }}
          >
            {columns.map(col => (
              <span key={col.key}>{col.label}</span>
            ))}
            {actions?.length > 0 && (
              <span className="text-right">ACTIONS</span>
            )}
          </div>

          {/* Rows */}
          <div className="divide-y divide-indigo-500/10">
            {data.map((row, idx) => (
              <div
                key={idx}
                className="grid gap-4 px-4 py-3 text-sm text-indigo-200"
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, minmax(160px, 1fr)) ${actions?.length ? 'auto' : ''}`
                }}
              >
                {columns.map(col => (
                  <span key={col.key} className="text-indigo-300/90">
                    {row[col.key]}
                  </span>
                ))}

                {/* Actions */}
                {actions?.length > 0 && (
                  <div className="flex gap-2">
                    {actions.map(action => (
                      <button
                        key={action.label}
                        onClick={() => action.onClick(row)}
                        className={`px-2 py-1 text-[10px] rounded border transition
                          ${action.variant === "danger"
                            ? "border-red-500/40 text-red-400 hover:bg-red-500/10"
                            : "border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
                          }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
