/**
 * Writes one audit row to a Google Sheet via a Google Apps Script Web App.
 *
 * Setup (one-time):
 *   1. Create a Google Sheet
 *   2. Extensions → Apps Script → paste the doPost script → Deploy as Web App
 *   3. Set GOOGLE_SHEET_URL in .env to the deployed Web App URL
 *
 * No Google Cloud project, no service account, no credentials needed.
 */

function getTier(score) {
    if (score >= 80) return "Elite Readiness";
    if (score >= 60) return "Production Capable";
    if (score >= 40) return "Emerging Capability";
    return "Critical Risk Profile";
}

export async function appendAuditRow({ lead, totalScore, pillarScores, answers, concise, submissionDate }) {
    const url = process.env.GOOGLE_SHEET_URL;

    if (!url || url.includes("your_script")) {
        console.warn("[Sheets] GOOGLE_SHEET_URL not configured — skipping Google Sheets write.");
        return;
    }

    const date = new Date(submissionDate).toLocaleString("en-US", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
    });

    const payload = {
        date,
        name: lead.name,
        email: lead.email,
        totalScore,
        tier: getTier(totalScore),
        p1: pillarScores.p1 ?? "",
        p2: pillarScores.p2 ?? "",
        p3: pillarScores.p3 ?? "",
        p4: pillarScores.p4 ?? "",
        p5: pillarScores.p5 ?? "",
        concise: concise ?? "",
        answers: answers ? JSON.stringify(answers) : "",
    };

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow", // Apps Script redirects on success
    });

    const text = await res.text();

    if (!res.ok) {
        throw new Error(`[Sheets] HTTP ${res.status}: ${text}`);
    }

    if (text.startsWith("Error:")) {
        throw new Error(`[Sheets] Apps Script Error: ${text}`);
    }

    console.log(`[Sheets] ✅ Row written for ${lead.email} (score: ${totalScore})`);
}
