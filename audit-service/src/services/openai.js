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
        .map((p) => `${p.name}: ${pillarScores[p.key]}% – ${p.explanation}`)
        .join("\n");

    // Identify the weakest pillar to make it the narrative villain
    const weakestPillar = PILLAR_META.reduce((min, p) =>
        pillarScores[p.key] < pillarScores[min.key] ? p : min
    );
    const weakestScore = pillarScores[weakestPillar.key];

    const prompt = `I have the results of an AI Integration Readiness & Leverage Audit™. Each pillar is scored from 0–100%.

Overall Score: ${totalScore}%

Pillar Results:
${pillarLines}

Weakest pillar (the primary blocker): ${weakestPillar.name} at ${weakestScore}%

You are an experienced AI operator and builder — not a generic consultant. You have shipped AI systems into production dozens of times. You know exactly where projects fail and why. Write like someone who has seen this pattern before and is being direct with the reader.

Generate an executive summary structured into exactly these 4 sections:

1. "Where You Stand vs. The Market" — 1–2 sentence intro + 2–4 bullets. Be direct about their competitive position. Make them feel the risk of inaction — executives move on loss and risk, not potential. Use language like "will cause AI initiatives to fail in production", "wasted investment", "internal loss of trust". Reference the overall score and name the weakest pillar as the core blocker upfront.

2. "Your Competitive Assets" — 1 sentence intro + one bullet per strong pillar (score ≥ 65). Frame each as a specific, immediate business advantage. Include ROI framing: e.g., "At your current maturity, organizations typically leave 20–40% of potential AI ROI unrealized due to infrastructure gaps — your strong [pillar] means you can capture that upside faster."

3. "Where Revenue Is Being Left Behind" — 1 sentence intro + one bullet per weak pillar (score < 65). Make the weakest pillar the villain — it should dominate this section. Frame gaps as financial cost, failed deployments, and competitive loss. Example tone: "Your [weakest pillar] (${weakestScore}%) is the single point of failure that will block AI from reaching production — not because of ambition, but because the foundation isn't there yet."

4. "What We'd Do Next" — 1 sentence intro + 3–5 prioritized, specific moves. Sound like a builder advising a peer, not a consultant writing a PDF. The final bullet MUST be: "In practice, teams at your stage hit a wall when moving from prototype to production. This is exactly where we focus at ScaleUp Labs — turning strong AI potential into systems that actually run. If you want, we can map exactly where your [weakest pillar name] is limiting you and what to fix first. Takes 15 minutes."

Rules:
- Write like an operator who has done this 50 times, not a generic AI consultant.
- Reference actual scores using percentage format (e.g., "Data Architecture Readiness (40%)").
- Do NOT invent fake statistics. Use directional urgency grounded in their scores (e.g., "A score of 38% means infrastructure would fail under real production AI workloads").
- Keep bullets sharp: max 25–30 words each.
- Zero filler language. Every sentence must earn its place.
- Make the weakest pillar the central villain of the narrative.

Also provide a concise 3–4 sentence "Quick Executive Read" paragraph. Lead with their score and a sharp verdict (e.g., "74% — Strong Potential, Blocked by Data"). Name the core blocker, the economic upside if fixed, and end with urgency.

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
                content: "You are an experienced AI operator and builder who has shipped AI systems into production dozens of times. You write diagnostic reports that are direct, specific, and make executives feel the real cost of inaction — not generic consulting output. You speak like someone who has seen these failure patterns before. Be precise, sharp, and credible. Use the exact JSON schema requested.",
            },
            { role: "user", content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    return { sections: parsed.sections, concise: parsed.concise };
}
