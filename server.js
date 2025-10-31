import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;

// serve hasil build React
app.use(express.static(path.join(__dirname, "dist")));

// endpoint API
const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.get("/api/performance", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM performance ORDER BY month ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// fallback semua route ke React
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, "0.0.0.0", () =>
  console.log(`✅ AISG Control Center running on port ${port}`)
);
