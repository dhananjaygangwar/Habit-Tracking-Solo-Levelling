
export default function ComparisonBar({ label, values, danger }) {
    const max = Math.max(...values.map(v => v.value));
    return (
        <div className={`system-compare-bar ${danger ? "danger" : ""}`}>
            <span className="bar-title">{label}</span>

            {values.map(v => (
                <div key={v.name} className="bar-row">
                    <span className="bar-name">{v.name}</span>

                    <div className="bar-track">
                        <div
                            className="bar-fill"
                            style={{ width: `${(v.value / max) * 100}%` }}
                        />
                    </div>

                    <span className="bar-value">{v.value}</span>
                </div>
            ))}
        </div>

    );
}
