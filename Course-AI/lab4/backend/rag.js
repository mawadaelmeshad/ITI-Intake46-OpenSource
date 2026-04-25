import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });

// Simple in-memory storage
let documents = [];
let embeddingsCache = [];

export async function initRAG() {
    console.log("Using Simple In-Memory RAG (No Docker/DB needed)...");
    
    const dataPath = path.join(process.cwd(), "backend", "data.json");
    if (!fs.existsSync(dataPath)) {
        throw new Error("data.json not found!");
    }

    const rawData = fs.readFileSync(dataPath, "utf8");
    const lines = rawData.trim().split("\n");
    
    // Parse documents
    documents = lines.map(line => {
        const parsed = JSON.parse(line);
        return parsed.messages
            .map(m => {
                let text = `${m.role}: ${m.content || ""}`;
                if (m.tool_calls) {
                    text += ` (Calls tool: ${m.tool_calls[0].function.name} with ${m.tool_calls[0].function.arguments})`;
                }
                return text;
            })
            .join("\n");
    });

    const embedModel = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "text-embedding-3-small"
    });

    console.log(`Generating embeddings locally for ${documents.length} lines...`);
    embeddingsCache = await embedModel.embedDocuments(documents);
    console.log("Memory Store is ready!");
}

// Simple cosine similarity calculation
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function askQuestion(question) {
    if (embeddingsCache.length === 0) await initRAG();

    const embedModel = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "text-embedding-3-small"
    });

    const queryVector = await embedModel.embedQuery(question);

    // Manual search for the best match
    let scores = embeddingsCache.map((vec, idx) => ({
        idx,
        score: cosineSimilarity(queryVector, vec)
    }));

    // Sort by score and take top 2
    scores.sort((a, b) => b.score - a.score);
    const topContext = scores.slice(0, 2).map(s => documents[s.idx]).join("\n---\n");

    const chatModel = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-4o-mini",
    });

    const prompt = `You are a helpful assistant. Answer ONLY based on the context below.
    If the answer is not found in the context, say: "I don't have information about that in my knowledge base."
    Do NOT use any outside knowledge.
    
    Context (retrieved from knowledge base):
    ${topContext}
    
    Question: ${question}`;

    try {
        const response = await chatModel.invoke(prompt);
        return response.content;
    } catch (err) {
        console.error("===== CHAT MODEL ERROR =====");
        console.error("Message:", err.message);
        console.error("Status:", err.status);
        console.error("Code:", err.code);
        console.error("============================");
        throw err;
    }
}
