import puppeteer from "puppeteer";
import { buildReportHtml } from "./template.js";

/**
 * Render the audit report as a PDF buffer.
 *
 * @param {object} params - { lead, totalScore, pillarScores, summary, submissionDate }
 * @returns {Buffer} Raw PDF bytes
 */
export async function generatePdf(params) {
    const html = buildReportHtml(params);

    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // required for deployment envs
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}
