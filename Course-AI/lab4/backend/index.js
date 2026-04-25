import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initRAG, askQuestion } from "./rag.js";

import path from "path";
dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize RAG on startup
initRAG().then(() => {
    console.log("RAG initialized and ready.");
}).catch(err => {
    console.error("Failed to initialize RAG:", err);
});

app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: "Question is required" });
    }

    try {
        const answer = await askQuestion(question);
        res.json({ answer });
    } catch (err) {
        console.error("Chat error:", err);
        res.status(500).json({ error: "Failed to process chat" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});