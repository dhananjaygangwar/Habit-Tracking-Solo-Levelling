
import "./comparisonTable.css";

export default function ComparisonTable({ users }) {
    return (
        <table className="system-compare-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    {users.map(u => <th key={u.id}>{u.name}</th>)}
                </tr>
            </thead>
            <tbody>
                <Row label="Level" users={users} field="level" />
                <Row label="XP" users={users} field="xp" />
                <Row label="Tasks Completed" users={users} field="tasksCompleted" />
                <Row label="Tasks Failed" users={users} field="tasksFailed" />
                <Row label="Punishments Assigned" users={users} field="punishmentsAssigned" />
                <Row label="Punishments Failed" users={users} field="punishmentsFailed" />
            </tbody>
        </table>
    );
}

function Row({ label, users, field }) {
    return (
        <tr>
            <td>{label}</td>
            {users.map(u => <td key={u.id}>{u[field]}</td>)}
        </tr>
    );
}
