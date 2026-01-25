const express = require("express");
const cors = require("cors");
// Routes
const authRoutes = require("./routes/authRoutes");
//for test db
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

//for test db conn
// app.get("/db-test", async (req, res) => {
//   const result = await pool.query("SELECT NOW()");
//   console.log(result);
//   res.json(result.rows[0]);
// });

module.exports = app;