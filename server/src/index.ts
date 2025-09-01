import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";
import crypto from "crypto";
import { cache } from "./cache.js";
import { ToneRequest, ToneResponse } from "./types.js";
import { MistralClient } from "@mistralai/mistralai";
dotenv.config();
const app = express();
app.use(express.json({ limit: "1mb" }));


const corsOrigins = (process.env.CORS_ORIGINS || "*")
.split(',')
.map(s => s.trim());

app.use(
cors({
origin: (origin, cb) => {
if (!origin || corsOrigins.includes("*") || corsOrigins.includes(origin)) {
return cb(null, true);
}
return cb(new Error("CORS not allowed"));
},
credentials: false,
})
);

const PORT = Number(process.env.PORT || 8787);
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;


if (!MISTRAL_API_KEY) {
console.warn("[WARN] MISTRAL_API_KEY is not set. The /api/tone route will fail until configured.");
}


// Map 3×3 coordinates to tone descriptors used in the system prompt
function toneDescriptors(row: number, col: number) {
const formalities = ["highly formal", "neutral formality", "casual"] as const;
const warmths = ["neutral", "friendly", "warm and approachable"] as const;


// Optional extra dimension: directness based on distance from center
const centerDist = Math.abs(row - 1) + Math.abs(col - 1);
const directness = centerDist >= 2 ? "concise and direct" : centerDist === 1 ? "balanced" : "slightly descriptive";


return { formality: formalities[row], warmth: warmths[col], directness };
}

function cacheKey(req: ToneRequest) {
const h = crypto.createHash("sha256");
h.update(JSON.stringify(req));
return h.digest("hex");
}

async function callMistral(prompt: string, sourceText: string) {
// Mistral Chat Completions style API
const url = "https://api.mistral.ai/v1/chat/completions";
const headers = {
"Authorization": `Bearer ${MISTRAL_API_KEY}`,
"Content-Type": "application/json",
};


const body = {
model: "mistral-small",
temperature: 0.3,
messages: [
{ role: "system", content: prompt },
{ role: "user", content: sourceText }
]
};


const resp = await axios.post(url, body, { headers, timeout: 15000 });
const text = resp.data?.choices?.[0]?.message?.content?.trim();
if (!text) throw new Error("Invalid response from Mistral");
return text;
}

// Health check
app.get("/api/health", (_req, res) => {
res.json({ ok: true, service: "tone-picker-server" });
});

app.post("/api/tone", async (req, res) => {
const { text, row, col } = req.body as ToneRequest;
const out: ToneResponse = { ok: false };


try {
if (typeof text !== "string" || text.trim().length === 0) {
throw new Error("'text' is required");
}
if (![0,1,2].includes(row) || ![0,1,2].includes(col)) {
throw new Error("'row' and 'col' must be integers 0..2");
}


const key = cacheKey({ text, row, col });
const cached = cache.get(key);
if (cached) {
return res.json({ ok: true, text: cached, cached: true } satisfies ToneResponse);
}

const { formality, warmth, directness } = toneDescriptors(row, col);


const systemPrompt = `You are a rewriting assistant. Rewrite the user's text preserving meaning while adjusting:\n- Formality: ${formality}.\n- Tone: ${warmth}.\n- Style: ${directness}.\nConstraints: Keep the language clear and natural. Maintain original facts. Do not add new information. Return only the rewritten text.`;


// Simple retry with backoff
let attempt = 0; let lastErr: unknown;
while (attempt < 3) {
try {
const rewritten = await callMistral(systemPrompt, text);
cache.set(key, rewritten);
return res.json({ ok: true, text: rewritten } satisfies ToneResponse);
} catch (err) {
lastErr = err; attempt++;
await new Promise(r => setTimeout(r, 400 * attempt));
}
}
throw lastErr instanceof Error ? lastErr : new Error("Unknown error");
} catch (e: any) {
out.error = e?.message || "Unexpected server error";
res.status(400).json(out);
}
});

app.use((err: any, _req: any, res: any, _next: any) => {
console.error("[Server Error]", err);
res.status(500).json({ ok: false, error: "Internal server error" } as ToneResponse);
});


app.listen(PORT, () => {
console.log(`Tone Picker server listening on http://localhost:${PORT}`);
});
