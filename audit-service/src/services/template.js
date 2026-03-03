/**
 * Build the HTML string used by Puppeteer to render the PDF report.
 * All styles are inlined — Puppeteer needs no external resources.
 */
export function buildReportHtml({ lead, totalScore, pillarScores, summary, submissionDate }) {
    const tier = getReadinessTier(totalScore);
    const date = new Date(submissionDate).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });

    const integrationPillars = [
        { label: "Data Architecture Readiness", score: pillarScores.p1 },
        { label: "Workflow & Automation Maturity", score: pillarScores.p2 },
        { label: "Systems Integration & Architecture", score: pillarScores.p4 },
    ];
    const leveragePillars = [
        { label: "AI Leverage Opportunity Density", score: pillarScores.p3 },
        { label: "Economic Leverage & Strategic Impact", score: pillarScores.p5 },
    ];

    const barColor = (s) => s >= 70 ? "#0d9488" : s < 50 ? "#ef4444" : "#f59e0b";
    const scoreColor = (s) => s >= 70 ? "#0d9488" : s < 50 ? "#ef4444" : "#d97706";

    const pillarRow = ({ label, score }) => `
        <div class="pillar-row">
            <div class="pillar-label">${label}</div>
            <div class="pillar-bar-track">
                <div class="pillar-bar-fill" style="width:${score}%;background:${barColor(score)}"></div>
            </div>
            <div class="pillar-score" style="color:${scoreColor(score)}">${score}<span class="denom">/100</span></div>
        </div>`;

    const sectionHtml = summary.sections.map((s) => `
        <div class="section">
            <div class="section-heading">${s.heading}</div>
            <div class="section-intro">${s.intro}</div>
            <ul class="bullets">
                ${s.bullets.map((b) => `<li>${b}</li>`).join("")}
            </ul>
        </div>`).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #fff;
    font-size: 13px;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ─── COVER PAGE ─────────────────────────────────────────────────── */
  .cover {
    background: #0f172a;
    padding: 64px 64px 52px;
    page-break-after: always;
    min-height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .cover-top {}

  .cover-logo {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #14b8a6;
    margin-bottom: 56px;
  }

  .cover-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 16px;
  }

  .cover-title {
    font-size: 36px;
    font-weight: 900;
    line-height: 1.15;
    color: #fff;
    margin-bottom: 8px;
  }

  .cover-title .accent { color: #14b8a6; }

  .cover-sub {
    font-size: 14px;
    color: #64748b;
    margin-top: 12px;
    margin-bottom: 56px;
  }

  .cover-divider {
    height: 1px;
    background: #1e293b;
    margin-bottom: 40px;
  }

  .cover-score-block {
    display: flex;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 16px;
  }

  .cover-score-num {
    font-size: 88px;
    font-weight: 900;
    line-height: 1;
    color: #fff;
    letter-spacing: -4px;
  }

  .cover-score-right { padding-bottom: 10px; }

  .cover-score-denom {
    font-size: 20px;
    color: #475569;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .cover-tier {
    display: inline-block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${tier.color};
    background: ${tier.color}1a;
    border: 1px solid ${tier.color}55;
    padding: 4px 12px;
    border-radius: 4px;
  }

  .cover-bottom {
    border-top: 1px solid #1e3a5f;
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cover-meta { font-size: 12px; color: #475569; }
  .cover-meta strong { color: #94a3b8; }

  .cover-accent-bar {
    width: 60px;
    height: 4px;
    background: #14b8a6;
    border-radius: 2px;
    margin-top: 20px;
    margin-bottom: 32px;
  }

  /* ─── CONTENT PAGES ───────────────────────────────────────────────── */
  .page {
    padding: 52px 64px;
    page-break-after: always;
  }

  .page:last-child { page-break-after: auto; }

  /* Section header */
  .section-title {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #14b8a6;
    margin-bottom: 6px;
  }

  .section-rule {
    height: 2px;
    background: linear-gradient(to right, #14b8a6, #e2e8f0);
    margin-bottom: 28px;
    border-radius: 1px;
  }

  h2 {
    font-size: 22px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 4px;
    line-height: 1.2;
  }

  /* ─── QUICK READ BOX ─────────────────────────────────────────────── */
  .concise-box {
    background: #f0fdfa;
    border-left: 4px solid #14b8a6;
    border-radius: 0 8px 8px 0;
    padding: 20px 24px;
    font-size: 13px;
    line-height: 1.75;
    color: #0f172a;
    margin-top: 24px;
    page-break-inside: avoid;
  }

  /* ─── PILLAR BREAKDOWN ───────────────────────────────────────────── */
  .group-block {
    margin-bottom: 28px;
    page-break-inside: avoid;
  }

  .group-label {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 14px;
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
  }

  .group-label.ir { color: #0d9488; background: #f0fdfa; border: 1px solid #99f6e4; }
  .group-label.la { color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; }

  .pillar-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
    page-break-inside: avoid;
  }

  .pillar-label {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    width: 230px;
    flex-shrink: 0;
    line-height: 1.3;
  }

  .pillar-bar-track {
    flex: 1;
    height: 10px;
    background: #f1f5f9;
    border-radius: 99px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }

  .pillar-bar-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.3s;
  }

  .pillar-score {
    font-size: 13px;
    font-weight: 800;
    width: 60px;
    text-align: right;
    flex-shrink: 0;
  }

  .denom { font-size: 10px; font-weight: 500; color: #94a3b8; }

  /* ─── EXECUTIVE SUMMARY SECTIONS ─────────────────────────────────── */
  .section {
    margin-bottom: 28px;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .section-heading {
    font-size: 13px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 5px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
  }

  .section-intro {
    font-size: 12px;
    color: #64748b;
    margin: 6px 0 10px;
    font-style: italic;
  }

  .bullets {
    list-style: none;
    padding: 0;
  }

  .bullets li {
    font-size: 12px;
    color: #1e293b;
    line-height: 1.65;
    padding: 4px 0 4px 20px;
    position: relative;
    page-break-inside: avoid;
  }

  .bullets li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 11px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #14b8a6;
  }

  /* ─── FOOTER ─────────────────────────────────────────────────────── */
  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-brand {
    font-size: 10px;
    font-weight: 700;
    color: #14b8a6;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .footer-cta {
    font-size: 11px;
    color: #64748b;
  }

  .footer-cta a {
    color: #14b8a6;
    text-decoration: none;
    font-weight: 700;
  }

  .page-num {
    font-size: 10px;
    color: #94a3b8;
  }
</style>
</head>
<body>

  <!-- ═══ COVER PAGE ═══════════════════════════════════════════════════ -->
  <div class="cover">
    <div class="cover-top">
      <div class="cover-logo">ScaleUp Labs · Diagnostic Intelligence</div>
      <div class="cover-eyebrow">Confidential Report</div>
      <div class="cover-title">AI Integration Readiness<br>&amp; <span class="accent">Leverage Audit™</span></div>
      <div class="cover-accent-bar"></div>
      <div class="cover-divider"></div>
      <div class="cover-score-block">
        <div class="cover-score-num">${totalScore}</div>
        <div class="cover-score-right">
          <div class="cover-score-denom">/ 100</div>
          <div class="cover-tier">${tier.label}</div>
        </div>
      </div>
      <div class="cover-sub">Overall AI Maturity Score across 5 weighted diagnostic pillars</div>
    </div>
    <div class="cover-bottom">
      <div class="cover-meta">Prepared for: <strong>${lead.name}</strong></div>
      <div class="cover-meta">${date}</div>
    </div>
  </div>

  <!-- ═══ PAGE 2 — QUICK READ + PILLAR BREAKDOWN ══════════════════════ -->
  <div class="page">

    <!-- Quick Read -->
    <div class="section-title">Executive Overview</div>
    <div class="section-rule"></div>
    <h2>Quick Read</h2>
    <div class="concise-box">${summary.concise}</div>

    <!-- Pillar Breakdown -->
    <div style="margin-top: 40px;">
      <div class="section-title">Diagnostic Results</div>
      <div class="section-rule"></div>
      <h2>Pillar Breakdown</h2>

      <div class="group-block" style="margin-top: 20px;">
        <div class="group-label ir">▸ Integration Readiness</div>
        ${integrationPillars.map(pillarRow).join("")}
      </div>

      <div class="group-block">
        <div class="group-label la">▸ Leverage Audit</div>
        ${leveragePillars.map(pillarRow).join("")}
      </div>
    </div>

    <div class="footer">
      <div class="footer-brand">ScaleUp Labs</div>
      <div class="page-num">Page 2</div>
      <div class="footer-cta"><a href="https://scaleuplabs.dev/#contact">Book a Strategy Session →</a></div>
    </div>
  </div>

  <!-- ═══ PAGE 3 — FULL EXECUTIVE SUMMARY ═════════════════════════════ -->
  <div class="page">
    <div class="section-title">Full Analysis</div>
    <div class="section-rule"></div>
    <h2>Executive Summary</h2>

    <div style="margin-top: 24px;">
      ${sectionHtml}
    </div>

    <div class="footer">
      <div class="footer-brand">ScaleUp Labs</div>
      <div class="page-num">Page 3</div>
      <div class="footer-cta"><a href="https://scaleuplabs.dev/#contact">Book a Strategy Session →</a></div>
    </div>
  </div>

</body>
</html>`;
}

function getReadinessTier(score) {
    if (score >= 80) return { label: "Elite Readiness", color: "#0d9488" };
    if (score >= 60) return { label: "Production Capable", color: "#14b8a6" };
    if (score >= 40) return { label: "Emerging Capability", color: "#f59e0b" };
    return { label: "Critical Risk Profile", color: "#ef4444" };
}
