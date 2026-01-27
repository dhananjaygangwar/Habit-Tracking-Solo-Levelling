import { QUEST_STATUS, QUEST_TYPE } from "../../../../backend/src/constant";
import Card from "../Card/Card";
import { Section } from "../QuestListSection/QuestListSection";
import SystemTimer from "../SystemTimer/SystemTimer";
import { useState, useEffect } from "react";
import "./questList.css";
import "./questTimer.css"


export default function QuestList({ title, items, onSelect, className = '', style = {} }) {
    return (
        <div>
            <Section title={title} className={className} style={style} >
                {items.map((quest) => (
                    <QuestItem
                        key={quest.id}
                        quest={quest}
                        onClick={() => onSelect(quest)}
                    />
                ))}
            </Section>
        </div>
    );
}

function QuestItem({ quest, onClick }) {
  const completed = quest.status === QUEST_STATUS.COMPLETED;
  console.log("completed", completed, quest.status, quest);
  return (
    <div
      className={`quest-item ${completed ? "completed" : ""}`}
      onClick={onClick}
    >
      <div className="quest-text">
        <span className="quest-title">{quest.title}</span>
        <span className="quest-subtitle">{quest.quest_type}</span>
        {quest.description && (
          <span className="quest-description">{quest.description}</span>
        )}
      </div>

      {/* RIGHT SIDE */}
      { !completed && quest.status !== QUEST_STATUS.FAILED && <div className="quest-right">
        <QuestTimer completeBy={quest.complete_by} />
      </div>
}
    </div>
  );
}


function QuestTimer({ completeBy }) {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, new Date(completeBy) - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, new Date(completeBy) - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, [completeBy]);

  if (!completeBy) return null;

  const danger = timeLeft <= 15 * 60 * 1000; // last 15 minutes
  const expired = timeLeft <= 0;

  return (
    <div
      className={`quest-timer ${danger ? "danger" : ""} ${
        expired ? "expired" : ""
      }`}
    >
      {expired ? "TIME UP" : formatTime(timeLeft)}
    </div>
  );
}

/* helpers */
function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}