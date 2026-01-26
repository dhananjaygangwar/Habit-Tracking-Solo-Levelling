import { QUEST_STATUS, QUEST_TYPE } from "../../../../backend/src/constant";
import Card from "../Card/Card";
import { Section } from "../QuestListSection/QuestListSection";
import SystemTimer from "../SystemTimer/SystemTimer";
import "./questList.css";


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
    return (
        <div
            className={`quest-item ${quest.status == QUEST_STATUS.COMPLETED ? "completed" : ""}`}
            onClick={onClick}
        >
            <div className="quest-text">
                <span className="quest-title">{quest.name}</span>

                <span className="quest-subtitle">
                    {quest.quest_type}
                </span>

                {quest.description && (
                    <span className="quest-description">
                        {quest.description}
                    </span>
                )}
                {
                    quest.complete_by && (
                        <SystemTimer
                            deadline={new Date(quest.complete_by)}
                            onExpire={() => {
                                console.log("LOCKED → APPLY PUNISHMENTS");
                            }}
                        ></SystemTimer>
                    )
                }
            </div>

            <div className="quest-checkbox">
                {quest.status == QUEST_STATUS.COMPLETED && <span className="checkmark" />}
            </div>
        </div>
    );
}
