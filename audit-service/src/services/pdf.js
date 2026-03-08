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

    const isDev = process.env.NODE_ENV !== "production";
    const executablePath = isDev
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : await chromium.executablePath();

    const browser = await puppeteer.launch({
        args: isDev ? [] : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: isDev ? true : chromium.headless,
        timeout: 60000,
    });

    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "load" });

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
