import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { buildReportHtml } from "./template.js";

/**
 * Render the audit report as a PDF buffer.
 * Uses @sparticuz/chromium — a Chromium build optimised for serverless/Cloud Run.
 *
 * @param {object} params - { lead, totalScore, pillarScores, summary, submissionDate }
 * @returns {Buffer} Raw PDF bytes
 */
export async function generatePdf(params) {
    const html = buildReportHtml(params);

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
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
