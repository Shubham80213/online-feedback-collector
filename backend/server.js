const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new Database(path.join(__dirname, "feedback.db"));

db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
        comments TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Feedback API is running!"
    });
});

app.post("/api/feedback", (req, res) => {
    const { name, email, rating, comments } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof comments !== "string" || !comments.trim() ||
        !Number.isInteger(Number(rating)) ||
        Number(rating) < 1 || Number(rating) > 5
    ) {
        return res.status(400).json({
            message: "Please enter valid feedback details."
        });
    }

    try {
        const result = db.prepare(`
            INSERT INTO feedback (name, email, rating, comments)
            VALUES (?, ?, ?, ?)
        `).run(name.trim(), email.trim(), Number(rating), comments.trim());

        res.status(201).json({
            message: "Feedback saved successfully!",
            id: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error." });
    }
});

app.get("/api/feedback", (req, res) => {
    const rows = db.prepare(`
        SELECT id, name, email, rating, comments, created_at
        FROM feedback ORDER BY id DESC
    `).all();

    res.json(rows);
});

app.get("/api/stats", (req, res) => {
    const stats = db.prepare(`
        SELECT COUNT(*) AS totalFeedback,
               ROUND(AVG(rating), 2) AS averageRating,
               SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) AS fiveStarCount
        FROM feedback
    `).get();

    res.json({
        totalFeedback: stats.totalFeedback,
        averageRating: stats.averageRating || 0,
        fiveStarCount: stats.fiveStarCount || 0
    });
});

app.listen(PORT, () => {
    console.log(`Feedback API running at http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});