import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const app = express();

const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/api/performance", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM performance ORDER BY month ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(10000, () => console.log("✅ Server running on port 10000"));
