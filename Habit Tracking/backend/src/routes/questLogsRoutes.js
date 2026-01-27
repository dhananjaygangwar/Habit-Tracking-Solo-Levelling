const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");
const { applyXpDelta, QUEST_STATUS } = require("../constant");

router.use(authMiddleware);

// endpoint to get quest logs for the authenticated user with filters like status and date range
router.get("/", async (req, res, next) => {
    const userId = req.userId;
    const { status, startDate, endDate } = req.query;

    let query = `SELECT ql.id as id, q.title as title, ql.status as status , q.quest_type as quest_type, q.description as description, ql.complete_by as complete_by 
    FROM quest_logs ql JOIN quests q ON ql.quest_id = q.id WHERE ql.user_id = $1 AND ql.status != $2 ORDER BY ql.assigned_at DESC`;
    const params = [userId, QUEST_STATUS.FAILED];

    if (status) {
        query += " AND ql.status = $2";
        params.push(status);
    }

    if (startDate && endDate) {
        query += " AND ql.assigned_at BETWEEN $3 AND $4";
        params.push(startDate, endDate);
    }

    try {
        const result = await pool.query(query, params);
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
});

// get failed quests
router.get("/failed", async (req, res, next) => {
    const userId = req.userId;
    try {
        const result = await pool.query(
            `SELECT ql.id as id, q.title as title, ql.status as status , q.quest_type as quest_type, q.description as description, ql.complete_by as complete_by 
             FROM quest_logs ql JOIN quests q ON ql.quest_id = q.id 
             WHERE ql.user_id = $1 AND ql.status = $2 ORDER BY ql.assigned_at DESC`,
            [userId, QUEST_STATUS.FAILED]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
});

// endpoint to update the status of a quest log (e.g., mark as completed)
router.put("/:id", async (req, res, next) => {
    const userId = req.userId;
    const questLogId = req.params.id;
    const { status } = req.body;

    if (status !== QUEST_STATUS.COMPLETED) {
        return res.status(400).json({ message: "Quest can only be marked as completed" });
    }

    const client = await pool.connect();

    try {

        await client.query("BEGIN");
        // Get the quest log to ensure it belongs to the user
        const questLogResult = await client.query(
            `SELECT q.id as quest_id, q.quest_xp as quest_xp, ql.status as status, ql.id as quest_log_id, ql.complete_by as complete_by
                    FROM quests q
                    JOIN quest_logs ql ON q.id = ql.quest_id
                    WHERE ql.id = $1 AND ql.user_id = $2 FOR UPDATE`,
            [questLogId, userId]
        );


        if (questLogResult.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ message: "Quest log not found" });
        }

        let updatedQuestLog = {}

        if (questLogResult.rows[0].status === QUEST_STATUS.COMPLETED) {
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Quest log is already completed" });
        }
        
        console.log("complete by", questLogResult.rows[0].complete_by, "new Date()", new Date());
        if (new Date() > new Date(questLogResult.rows[0].complete_by)) {
            await client.query("ROLLBACK");
            return res.status(400).json({ message: "Cannot complete quest log after its completion deadline" });
        }

        const updateResult = await client.query(
            "UPDATE quest_logs SET status = $1 WHERE id = $2 and user_id = $3 RETURNING *",
            [status, questLogId, userId]
        );
        updatedQuestLog = updateResult.rows[0];
        // Add XP to user
        const questXp = questLogResult.rows[0].quest_xp;
        await applyXpDelta(userId, questXp, client);


        await client.query("COMMIT");
        res.status(200).json(updatedQuestLog);
    } catch (err) {
        await client.query("ROLLBACK");
        next(err);
    } finally {
        client.release();
    }
});
module.exports = router;
