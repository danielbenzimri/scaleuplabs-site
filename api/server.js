import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── POST /api/generate-summary ────────────────────────────────────────────────
// Body: { pillarScores: { p1: number, p2: number, p3: number, p4: number, p5: number }, totalScore: number }
app.post("/api/generate-summary", async (req, res) => {
    const { pillarScores, totalScore } = req.body;

    if (!pillarScores || totalScore === undefined) {
        return res.status(400).json({ error: "Missing pillarScores or totalScore" });
    }

    const pillarDescriptions = [
        {
            key: "p1",
            name: "Data Architecture Readiness",
            explanation:
                "Measures whether your data infrastructure is structurally capable of supporting reliable, production-grade AI deployment.",
        },
        {
            key: "p2",
            name: "Workflow & Automation Maturity",
            explanation:
                "Evaluates how well-defined, automated, and integration-ready your operational workflows are for AI augmentation.",
        },
        {
            key: "p3",
            name: "AI Leverage Opportunity Density",
            explanation:
                "Assesses the volume and repeatability of cognitive work where AI can create measurable efficiency gains.",
        },
        {
            key: "p4",
            name: "Systems Integration & Architecture",
            explanation:
                "Determines whether your systems architecture can reliably integrate, orchestrate, and scale AI-driven processes.",
        },
        {
            key: "p5",
            name: "Economic Leverage & Strategic Impact",
            explanation:
                "Quantifies whether AI adoption would produce meaningful financial, scalability, and margin impact.",
        },
    ];

    const pillarLines = pillarDescriptions
        .map((p) => `${p.name}: ${pillarScores[p.key]}/100 – ${p.explanation}`)
        .join("\n");

    const prompt = `I have the results of an AI Integration Readiness & Leverage Audit™. Each pillar is scored from 0–100.

Overall Score: ${totalScore}/100

Pillar Results:
${pillarLines}

Generate an executive summary structured into exactly these 4 sections:
1. "Overall Maturity & AI Readiness" — 1–2 sentence intro + 2–4 bullet points about the overall score and posture
2. "Key Strengths" — 1 sentence intro + one bullet per strong pillar (score ≥ 65), each bullet naming the pillar and why it's an asset
3. "Critical Gaps & Weaknesses" — 1 sentence intro + one bullet per weak pillar (score < 65), each bullet naming the pillar and what risk it creates
4. "Strategic Recommendations" — 1 sentence intro + 3–5 prioritised, actionable bullet points to close the gaps

Rules:
- Be precise, data-driven, and board-level professional
- Reference actual scores in bullets (e.g. "Data Architecture Readiness: 40/100")
- Keep bullets sharp: max 20 words each
- Do NOT use vague filler language

Also provide a concise 3–4 sentence paragraph for quick executive review.

Respond with valid JSON only (no markdown, no code fences):
{
  "sections": [
    { "heading": "Section title", "intro": "One sentence framing.", "bullets": ["bullet 1", "bullet 2"] }
  ],
  "concise": "A 3–4 sentence executive paragraph."
}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a senior AI strategy consultant producing board-level diagnostic reports. Be precise, specific, and data-driven. Use the exact JSON schema requested.",
                },
                { role: "user", content: prompt },
            ],
            temperature: 0.3,
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0].message.content;
        const parsed = JSON.parse(raw);

        return res.json({ sections: parsed.sections, concise: parsed.concise });
    } catch (err) {
        console.error("[OpenAI Error]", err);
        return res.status(500).json({ error: "Failed to generate summary from OpenAI." });
    }
});

app.listen(PORT, () => {
    console.log(`[API] Server running on http://localhost:${PORT}`);
});
