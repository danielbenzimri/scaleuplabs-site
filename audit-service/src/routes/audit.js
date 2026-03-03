import express from "express";
import { v4 as uuidv4 } from "uuid";
import { generateSummary } from "../services/openai.js";
import { generatePdf } from "../services/pdf.js";
import { sendReportEmail } from "../services/email.js";
import { appendAuditRow } from "../services/sheets.js";

const router = express.Router();

/**
 * POST /api/audit/submit
 *
 * Body:
 * {
 *   lead:       { name, email },
 *   scores:     { p1, p2, p3, p4, p5 },
 *   totalScore: number,
 *   answers:    { [questionId]: 1-5 }   // optional raw answers
 * }
 *
 * Response (synchronous — returned before PDF/email):
 * {
 *   submissionId: string,
 *   concise:      string,
 *   sections:     [{ heading, intro, bullets[] }]
 * }
 */
router.post("/submit", async (req, res) => {
    const { lead, scores, totalScore, answers = {} } = req.body;

    // ── Validate input ────────────────────────────────────────────────────────
    if (!lead?.name || !lead?.email) {
        return res.status(400).json({ error: "lead.name and lead.email are required." });
    }
    if (!scores || totalScore === undefined) {
        return res.status(400).json({ error: "scores and totalScore are required." });
    }

    const submissionId = uuidv4();
    const submissionDate = new Date().toISOString();

    try {
        // ── Step 1: Generate executive summary (synchronous — needed for response + PDF) ──
        console.log(`[${submissionId}] Generating summary…`);
        const summary = await generateSummary({ pillarScores: scores, totalScore });

        // ── Step 2: Return summary to frontend immediately ────────────────────
        res.json({ submissionId, concise: summary.concise, sections: summary.sections });

        // ── Steps 3–6 run asynchronously after the response is sent ──────────
        runPostSubmitPipeline({ submissionId, submissionDate, lead, scores, totalScore, answers, summary })
            .catch((err) => console.error(`[${submissionId}] Pipeline error:`, err));

    } catch (err) {
        console.error(`[${submissionId}] Submit error:`, err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to generate audit summary." });
        }
    }
});

/**
 * Async background pipeline:
 * 1. Generate PDF buffer in-memory
 * 2. Write lead + submission to Google Sheets
 * 3. Send emails with PDF attached
 */
async function runPostSubmitPipeline({ submissionId, submissionDate, lead, scores, totalScore, answers, summary }) {
    const hasZoho = !!(process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD);
    const isValidEmail = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    // 3a. Generate PDF buffer
    console.log(`[${submissionId}] Generating PDF…`);
    const pdfBuffer = await generatePdf({ lead, totalScore, pillarScores: scores, summary, submissionDate });

    // 3b. Write lead + submission to Google Sheets
    console.log(`[${submissionId}] Writing to Google Sheets…`);
    await appendAuditRow({
        lead,
        totalScore,
        pillarScores: scores,
        answers,
        concise: summary.concise,
        submissionDate,
    });

    // 3c. Send emails with PDF attached
    if (!hasZoho) {
        console.warn(`[${submissionId}] ⚠️  Zoho email not configured — skipping email.`);
    } else if (!isValidEmail(lead.email)) {
        console.warn(`[${submissionId}] ⚠️  Invalid lead email "${lead.email}" — skipping email.`);
    } else {
        console.log(`[${submissionId}] Sending emails…`);
        await sendReportEmail({ lead, totalScore, pdfBuffer, concise: summary.concise });
    }

    console.log(`[${submissionId}] ✅ Pipeline complete.`);
}

export default router;
