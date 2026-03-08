import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const isDev = process.env.NODE_ENV !== "production";
const FROM = isDev
  ? "onboarding@resend.dev"
  : (process.env.SENDER_EMAIL || "ScaleUp Labs <info@scaleuplabs.dev>");

async function send(payload) {
  const { error } = await resend.emails.send(payload);
  if (error) throw new Error(`[Resend] ${error.message}`);
}

/**
 * Send the audit report to the user (PDF attached) and notify the internal team.
 */
export async function sendReportEmail({ lead, totalScore, pdfBuffer, concise }) {
  // ── 1. Email to the user ───────────────────────────────────────────────────
  if (!lead?.email) {
    console.warn("[Email] No lead email — skipping user report email.");
  } else {
    await send({
      from: FROM,
      to: lead.email,
      subject: `Your AI Readiness Audit Report — Score: ${totalScore}/100`,
      attachments: pdfBuffer ? [{
        filename: "ScaleUpLabs-AI-Readiness-Report.pdf",
        content: pdfBuffer,
      }] : [],
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;background:#f8fafc;padding:0;margin:0;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#0f172a;padding:32px 40px;">
      <p style="color:#14b8a6;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 12px">ScaleUp Labs · AI Readiness Audit™</p>
      <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0;line-height:1.3;">Your Audit Report Is Ready</h1>
    </div>
    <div style="padding:32px 40px;">
      <p style="color:#334155;font-size:15px;margin:0 0 6px">Hi <strong>${lead.name}</strong>,</p>
      <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px">
        Your AI Integration Readiness &amp; Leverage Audit is complete.
        Your full report is attached to this email as a PDF.
      </p>
      <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:20px 28px;margin-bottom:24px;">
        <span style="font-size:48px;font-weight:900;color:#0f172a;line-height:1;">${totalScore}</span>
        <span style="font-size:16px;color:#64748b;">/100</span>
      </div>
      <h2 style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:8px;margin:0 0 14px;">Quick Executive Read</h2>
      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 28px;">${concise}</p>
      <p style="color:#64748b;font-size:13px;margin:0;">📎 Your full PDF report is attached to this email.</p>
    </div>
    <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;">
      <span style="font-size:11px;color:#14b8a6;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">ScaleUp Labs</span>
      <a href="https://scaleuplabs.dev/#contact" style="font-size:11px;color:#14b8a6;text-decoration:none;font-weight:600;float:right;">Book a Strategy Session →</a>
    </div>
  </div>
</body>
</html>`,
    });
    console.log(`[Email] ✅ Report sent to ${lead.email}`);
  }

  // ── 2. Internal lead notification ──────────────────────────────────────────
  if (process.env.INTERNAL_NOTIFY_EMAIL) {
    await send({
      from: FROM,
      to: process.env.INTERNAL_NOTIFY_EMAIL,
      subject: `🔔 New Audit Submission — ${lead.name} (${totalScore}/100)`,
      html: `
<div style="font-family:monospace;font-size:13px;padding:24px;">
  <strong>New audit submission received</strong><br/><br/>
  <b>Name:</b>      ${lead.name}<br/>
  <b>Email:</b>     ${lead.email}<br/>
  <b>Job Title:</b> ${lead.jobTitle || "—"}<br/>
  <b>Company:</b>   ${lead.company || "—"}<br/>
  <b>Phone:</b>     ${lead.phone || "—"}<br/>
  <b>Score:</b>     ${totalScore}/100
</div>`,
    });
    console.log(`[Email] ✅ Internal notification sent to ${process.env.INTERNAL_NOTIFY_EMAIL}`);
  }
}
