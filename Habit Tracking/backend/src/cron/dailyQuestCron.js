const cron = require("node-cron");
const pool = require("../config/db");
const { QUEST_STATUS, QUEST_TYPE } = require("../constant");

cron.schedule("*/1 * * * *", async () => {
    console.log(" Daily quest cron started");

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        //  Mark old pending quests as FAILED
        console.log("Marking quest  as failed")
        const failed = await client.query(`
      UPDATE quest_logs
      SET status = '${QUEST_STATUS.FAILED}'
      WHERE status = '${QUEST_STATUS.PENDING}'
      AND complete_by < NOW()
      RETURNING user_id
    `);

        //  Add penalty quest for failed users  
        console.log("adding punishment quest", failed.rowCount)
        if (failed.rowCount > 0) {
            await client.query(`
        INSERT INTO quest_logs (user_id, quest_id)
        SELECT DISTINCT f.user_id, q.id
        FROM (SELECT unnest($1::uuid[]) AS user_id) f
        JOIN quests q ON q.quest_type = '${QUEST_TYPE.PENALTY}'
        ON CONFLICT DO NOTHING
      `, [failed.rows.map(r => r.user_id)]);
        }


        await client.query("COMMIT");
        console.log(" Punishment / Marking Quest done");

    } catch (err) {
        await client.query("ROLLBACK");
        console.error(" Cron error when adding punishment / marking quest as failed:", err.message);
    } 


    try {
                //  Add daily quests to all users
        console.log("inserting quest_logs")
        await client.query(`INSERT INTO quest_logs (user_id, quest_id, complete_by)
                SELECT
                u.id,
                q.id,
                NOW() + (q.quest_duration * INTERVAL '1 hour') AS complete_by
                FROM users u
                CROSS JOIN quests q
                WHERE q.quest_type = '${QUEST_TYPE.DAILY_QUEST}'
            `);
        
        
        await client.query("COMMIT");
            console.log("New Quest assigned to user")
    } catch (err) {
        await client.query("ROLLBACK");
        console.error(" Cron error when adding new quest logs :", err.message);
    } 

    client.release();
});
