import PlanChecklist from "../../components/PlanChecklist/PlanChecklist";
import { useState, useMemo, useEffect } from "react";
import QuestList from "../../components/QuestList/QuestList";
import XPBar from "../../components/XPBar/XPBar";
import SystemTimer from "../../components/SystemTimer/SystemTimer";
import instance from "../../../axisInstance";
import { QUEST_STATUS, QUEST_TYPE } from "../../../../backend/src/constant";

export default function Dashboard() {

    const [quests, setQuests] = useState([])

    const { completedQuests, pendingQuests, punishmentQuests } = useMemo(() => {
        const result = {
            completedQuests: [],
            pendingQuests: [],
            punishmentQuests: [],
        };

        quests.forEach((quest) => {
            if (quest.quest_type?.toLowerCase() === QUEST_TYPE.PENALTY) {
                result.punishmentQuests.push(quest);
            } else if (quest.status == QUEST_STATUS.COMPLETED) {
                result.completedQuests.push(quest);
            } else {
                result.pendingQuests.push(quest);
            }
        });

        return result;

    }, [quests]);


    useEffect(() => {

        instance.get("/quest-logs").then(res => {
            console.log(res.data);
            setQuests([...res.data])
        }).catch(err => {
            console.log("Error", err)
            alert(err.response.data.message)
        })

    }, [])


    const onQuestClick = async (quest) => {
        const newStatus =
            quest.status === QUEST_STATUS.PENDING ? QUEST_STATUS.COMPLETED : QUEST_STATUS.PENDING;

        // 1️⃣ Optimistic UI update
        setQuests(prev =>
            prev.map(item =>
                item.id === quest.id
                    ? { ...item, status: newStatus }
                    : item
            )
        );

        // 2️⃣ API call
        try {
            await instance.patch(`quest-logs/${quest.id}`, {
                status: newStatus,
            });
        } catch (err) {
            console.error("Error", err);
            alert(err.response?.data?.message || "Something went wrong");

            // 3️⃣ Rollback on failure
            setQuests(prev =>
                prev.map(item =>
                    item.id === quest.id
                        ? { ...item, status: quest.status }
                        : item
                )
            );
        }
    };

    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 301);


    return (
        <>

            <XPBar level={20} currentXP={600} requiredXP={1000} />
            <br />

            <SystemTimer
                deadline={deadline.getTime()}
                onExpire={() => {
                    console.log("LOCKED → APPLY PUNISHMENTS");
                }}
            />
            <br />

            <QuestList
                title="Plan"
                items={pendingQuests}
                onSelect={onQuestClick}
            />

            <br />

            <QuestList
                title="Completed"
                items={completedQuests}
                onSelect={onQuestClick}
            />

            <br />
            <QuestList
                title="Punishments"
                items={punishmentQuests}
                onSelect={onQuestClick}
            />

            <br />
            <br />
        </>
    )

}