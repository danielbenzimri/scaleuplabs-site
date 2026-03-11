import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PILLAR_META = [
    { key: "p1", name: "Data Architecture Readiness", explanation: "Measures whether your data infrastructure is structurally capable of supporting reliable, production-grade AI deployment." },
    { key: "p2", name: "Workflow & Automation Maturity", explanation: "Evaluates how well-defined, automated, and integration-ready your operational workflows are for AI augmentation." },
    { key: "p3", name: "AI Leverage Opportunity Density", explanation: "Assesses the volume and repeatability of cognitive work where AI can create measurable efficiency gains." },
    { key: "p4", name: "Systems Integration & Architecture", explanation: "Determines whether your systems architecture can reliably integrate, orchestrate, and scale AI-driven processes." },
    { key: "p5", name: "Economic Leverage & Strategic Impact", explanation: "Quantifies whether AI adoption would produce meaningful financial, scalability, and margin impact." },
];

/**
 * Generate a structured executive summary using GPT-4o.
 *
 * Returns:
 *   { concise: string, sections: [{ heading, intro, bullets[] }] }
 */
export async function generateSummary({ pillarScores, totalScore }) {
    const pillarLines = PILLAR_META
        .map((p) => `${p.name}: ${pillarScores[p.key]}/100 – ${p.explanation}`)
        .join("\n");

    const prompt = `I have the results of an AI Integration Readiness & Leverage Audit™. Each pillar is scored from 0–100.

Overall Score: ${totalScore}/100

Pillar Results:
${pillarLines}

Generate an executive summary structured into exactly these 4 sections:
1. "Where You Stand vs. The Market" — 1–2 sentence intro + 2–4 bullet points about the overall score and posture. Place them in competitive context based on their score (e.g., scores < 60 mean lagging in the bottom third; scores > 75 mean actively deploying). Frame the analysis around their position using strong directional language. Do NOT quote specific external percentages or industry reports.
2. "Your Competitive Assets" — 1 sentence intro + one bullet per strong pillar (score ≥ 65). Frame each strength explicitly as a specific business advantage and economic leverage point, directly tied to their capability signals.
3. "Where Revenue Is Being Left Behind" — 1 sentence intro + one bullet per weak pillar (score < 65). Frame gaps not as technical shortcomings, but as a financial cost, margin drag, or competitive vulnerability. Use strong directional language (e.g., "significant segment of operational cost", "high execution friction") rather than inventing unverified percentages. 
4. "Your Strategic AI Activation Plan" — 1 sentence intro + 3–5 actionable, prioritized business and technical moves to close gaps and capture ROI. The final bullet MUST explicitly state: "Organizations at your maturity stage typically accelerate fastest with a structured execution roadmap. ScaleUp Labs works with teams like yours to design and execute this pathway."

Rules:
- Be precise, authoritative, and board-level professional.
- Reference actual scores in bullets (e.g., "Data Architecture Readiness (40/100):").
- Do NOT invent fake percentages or quote unverified statistics. Ground your analysis in their scores using directional urgency (e.g., "A score of 38/100 indicates infrastructure would likely fail under production AI workloads").
- Keep bullets sharp: max 25-30 words each.
- Do NOT use vague filler language.

Also provide a concise 3–4 sentence paragraph for quick executive review summarizing the business opportunity and key risks.

Respond with valid JSON only (no markdown, no code fences):
{
  "sections": [
    { "heading": "Section title", "intro": "One sentence framing.", "bullets": ["bullet 1", "bullet 2"] }
  ],
  "concise": "A 3–4 sentence executive paragraph."
}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are a senior AI strategy consultant producing board-level diagnostic reports. Be precise, specific, and data-driven focusing on business outcomes and competitive urgency. Use the exact JSON schema requested.",
            },
            { role: "user", content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    return { sections: parsed.sections, concise: parsed.concise };
}
