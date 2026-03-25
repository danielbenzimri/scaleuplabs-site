import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Constants & Types ────────────────────────────────────────────────────────
interface FormData {
    [key: string]: number; // Maps question ID to its 1-5 score
}

type AppState = "landing" | "form" | "lead" | "results";

const PILLARS = [
    {
        id: "p1",
        title: "1. Your Data Foundation",
        explanation: "Measures whether your data infrastructure is structurally capable of supporting reliable, production-grade AI deployment.",
        weight: 0.25,
        questions: [
            { id: "q1_1", weight: 0.25, label: "Centralized Data Storage", desc: "Is all your data stored in one organized, secure place — rather than scattered across spreadsheets and different apps?", tooltip: "Think of it as: do you have one 'single source of truth' for your data, or is it all over the place?", elaborate: "A centralized data warehouse or data lake with role-based access controls and clear data ownership — so AI models can reliably access clean, consistent data." },
            { id: "q1_2", weight: 0.20, label: "Consistent Data Across Tools", desc: "Does the same information (like a customer's name or ID) look the same across all your tools and systems?", tooltip: "For example, is a 'customer' defined the same way in your invoicing tool, your support desk, and your database?", elaborate: "Schema consistency and entity resolution — ensuring the same real-world object (a customer, a product) is modeled identically across all integrated systems." },
            { id: "q1_3", weight: 0.20, label: "Searchable Documents & Files", desc: "Can you instantly search through your documents, emails, and internal files to find what you need?", tooltip: "If someone asks 'find all contracts from 2022', can a system pull them up in seconds — or does someone have to dig through folders manually?", elaborate: "Unstructured data indexing using full-text search or vector embeddings — enabling programmatic retrieval of documents, logs, and knowledge assets at scale." },
            { id: "q1_4", weight: 0.20, label: "Reliable Historical Data", desc: "Do you have years of clean historical data, and can you trace where it came from and how it changed over time?", tooltip: "Old, reliable data is fuel for AI. Do you know where your data comes from and can you trust it?", elaborate: "Multi-year historical data with traceable data lineage — knowing exactly where data originated and how it was transformed, which is critical for training and auditing AI models." },
            { id: "q1_5", weight: 0.15, label: "Safe Data Updates", desc: "When someone changes how data is structured, is there a process to make sure nothing else breaks?", tooltip: "If a developer updates a database field, is there a system to notify other teams so their tools don't stop working?", elaborate: "Schema version control and change management — a structured process for evolving data structures without breaking the systems and pipelines that depend on them." },
        ]
    },
    {
        id: "p2",
        title: "2. How Automated Are Your Workflows",
        explanation: "Evaluates how well-defined, automated, and integration-ready your operational workflows are for AI augmentation.",
        weight: 0.20,
        questions: [
            { id: "q2_1", weight: 0.30, label: "Automated Repetitive Tasks", desc: "How much of your day-to-day operations runs on autopilot — without anyone needing to manually trigger or complete steps?", tooltip: "For example: does a new order automatically generate an invoice and notify your team — or does someone have to do each step manually?", elaborate: "End-to-end workflow automation coverage — the percentage of high-frequency operational processes that execute without human intervention, from trigger to completion." },
            { id: "q2_2", weight: 0.20, label: "Documented Decision Processes", desc: "Do your team's decisions follow a clear, documented process — or does each person handle it their own way?", tooltip: "For example: when handling a complaint or approving a request, is there a written process everyone follows — or does it depend on who's handling it?", elaborate: "Cognitive task standardization — decision-heavy workflows documented with defined inputs, outputs, and explicit business rules, making them reproducible and automatable." },
            { id: "q2_3", weight: 0.20, label: "Tools That Talk to Each Other", desc: "Can your tools and systems connect and share data with each other automatically?", tooltip: "For example, when a form is submitted, can it automatically update your database and send a notification — without anyone copy-pasting?", elaborate: "API and webhook integration surface — the extent to which your core platforms expose stable interfaces that allow systems to exchange data and trigger actions automatically." },
            { id: "q2_4", weight: 0.15, label: "Instant Failure Alerts", desc: "When an automated process fails, does your team get notified right away with details about what went wrong?", tooltip: "Or do you only find out something broke when a customer complains?", elaborate: "Process observability — real-time logging and monitoring of automated workflows, with structured alerting so failures are detected and diagnosed before they impact users." },
            { id: "q2_5", weight: 0.15, label: "Tracking Where Time Is Lost", desc: "Do you actively track where your team spends the most manual effort — and work to reduce it?", tooltip: "Do you know which step in your process slows everything down, and are you actively trying to fix it?", elaborate: "Operational bottleneck analysis — formally measuring cycle times and manual touchpoints across workflows to identify and prioritize automation opportunities." },
        ]
    },
    {
        id: "p3",
        title: "3. Where AI Can Help You Most",
        explanation: "Assesses the volume and repeatability of cognitive work where AI can create measurable efficiency gains.",
        weight: 0.25,
        questions: [
            { id: "q3_1", weight: 0.30, label: "Repeated Analysis by Your Team", desc: "Does your team spend significant time doing the same type of analysis or data review repeatedly?", tooltip: "For example: reading reports, categorizing data, or summarizing information — the same way, every day?", elaborate: "High-volume, repeatable analytical workloads — structured tasks like data categorization, summarization, or pattern recognition performed repeatedly by humans, making them strong candidates for AI augmentation." },
            { id: "q3_2", weight: 0.20, label: "Heavy Document & Report Reading", desc: "Does your team regularly read and process large amounts of documents, reports, or written content?", tooltip: "Things like contracts, forms, compliance documents, or technical manuals — where humans spend hours extracting key information?", elaborate: "Knowledge processing intensity — the volume of unstructured content (contracts, reports, forms) your team manually reviews, extractable by Document AI and intelligent OCR pipelines." },
            { id: "q3_3", weight: 0.20, label: "Predictable Decision-Making", desc: "Do your team's day-to-day decisions follow predictable, repeatable logic most of the time?", tooltip: "If the same situation comes up 100 times, do people handle it the same way — or does it vary every time?", elaborate: "Decision pattern repeatability — when decisions consistently follow the same logical steps based on defined inputs, they can be formalized into business rules or used to train machine learning models." },
            { id: "q3_4", weight: 0.15, label: "Knowledge Trapped in Key People", desc: "Is critical know-how locked in the heads of a few key people — and not written down anywhere?", tooltip: "If a senior person left tomorrow, would important processes or knowledge disappear with them?", elaborate: "Institutional knowledge concentration risk — undocumented operational logic held by a small number of individuals, creating single points of failure and blocking AI knowledge base development." },
            { id: "q3_5", weight: 0.15, label: "Overloaded Customer-Facing Team", desc: "Is your team handling a high volume of repetitive customer questions, onboarding, or support requests?", tooltip: "Are your people overwhelmed answering the same questions over and over — and struggling to keep up as you grow?", elaborate: "Customer interaction scalability constraints — high-volume, text-heavy support and onboarding workflows that don't scale with headcount, making them strong targets for conversational AI and automation." },
        ]
    },
    {
        id: "p4",
        title: "4. How Well Your Systems Connect",
        explanation: "Determines whether your systems architecture can reliably integrate, orchestrate, and scale AI-driven processes.",
        weight: 0.20,
        questions: [
            { id: "q4_1", weight: 0.30, label: "Data Stays in Sync Across Tools", desc: "When data is updated in one tool, does it automatically update in all the other tools that depend on it?", tooltip: "For example: if you change a record in one place, does it instantly reflect everywhere else — or does someone have to manually update each system?", elaborate: "Cross-system data synchronization — automated data consistency across platforms using event-driven triggers or scheduled ETL/ELT pipelines, so every system always reflects the latest state." },
            { id: "q4_2", weight: 0.20, label: "Automatic Actions on Triggers", desc: "Can your systems automatically kick off actions when something happens — without a person having to press a button?", tooltip: "For example: a new sign-up triggers a welcome email, a payment triggers an invoice — all on their own?", elaborate: "Event-driven architecture — systems that publish and respond to real-time events (e.g. webhooks, message queues), enabling reliable downstream automation without manual intervention." },
            { id: "q4_3", weight: 0.20, label: "Alerts When Data Stops Flowing", desc: "Do you get alerted if data stops flowing between your systems — before it causes a problem?", tooltip: "If your nightly data sync quietly fails, would anyone know? Or would you only find out days later when reports are wrong?", elaborate: "Data pipeline reliability monitoring — ETL/ELT pipelines tracked against defined SLAs, with automated alerting when data transfers fail or fall behind schedule." },
            { id: "q4_4", weight: 0.15, label: "Easy Diagnosis When Things Break", desc: "When something goes wrong in your systems, can your team quickly find out what happened and why?", tooltip: "Are all error logs and system activity recorded in one place — making it easy to diagnose issues fast?", elaborate: "Centralized log aggregation and telemetry — all system events and errors collected in one queryable location, enabling fast root cause analysis and operational intelligence." },
            { id: "q4_5", weight: 0.15, label: "Safe System Updates", desc: "Can your team update or release one part of the system without breaking everything else?", tooltip: "Or does every software update carry the risk of taking down other tools that depend on it?", elaborate: "Release stability and dependency management — a disciplined deployment process with versioned APIs and integration contracts, so changes in one service don't cascade and break dependent systems." },
        ]
    },
    {
        id: "p5",
        title: "5. The Business Case for AI",
        explanation: "Quantifies whether AI adoption would produce meaningful financial, scalability, and margin impact.",
        weight: 0.10,
        questions: [
            { id: "q5_1", weight: 0.30, label: "Staff Time Spent on Manual Work", desc: "Are a large portion of your staff hours spent on repetitive, manual tasks that don't require human judgment?", tooltip: "Are you paying people to do work that a machine could handle — like data entry, copy-pasting, or routine approvals?", elaborate: "Labor cost concentration — a high share of payroll allocated to low-complexity, repeatable tasks that have high automation substitution potential, representing direct cost savings from AI deployment." },
            { id: "q5_2", weight: 0.20, label: "Risk of Costly Human Mistakes", desc: "Could a simple human mistake in your operations lead to financial loss, regulatory issues, or damage to your reputation?", tooltip: "For example: a wrong number entered manually could trigger a compliance violation or an embarrassing customer error.", elaborate: "Error and compliance risk exposure — the degree to which manual data entry or human judgment creates financial, regulatory, or reputational liability that automated validation and AI checks could eliminate." },
            { id: "q5_3", weight: 0.20, label: "Growth Requires More Hiring", desc: "When your business grows, do your operational costs grow at the same rate — forcing you to keep hiring?", tooltip: "If you doubled your customers tomorrow, would you also need to double your team to keep up?", elaborate: "Linear operational scaling sensitivity — when revenue growth requires proportional headcount growth, it signals manual process bottlenecks that AI and automation can decouple, enabling non-linear scale." },
            { id: "q5_4", weight: 0.15, label: "Slow Processes Delay Revenue", desc: "Does slow turnaround in your processes directly delay when you can collect payment or close deals?", tooltip: "For example: if approvals or fulfillment take too long, does it hold up your revenue?", elaborate: "Cycle-time revenue impact — workflow latency (slow approvals, fulfillment delays, manual handoffs) that directly defers revenue recognition, where AI-driven process acceleration has measurable financial ROI." },
            { id: "q5_5", weight: 0.15, label: "Efficiency Is a Competitive Must", desc: "Is becoming more efficient a competitive necessity — not just a nice-to-have?", tooltip: "Are rivals cutting costs through automation, forcing you to do the same just to stay competitive on price?", elaborate: "Margin optimization pressure — competitive dynamics forcing operational efficiency improvements to maintain unit economics, where AI adoption is a strategic necessity rather than an optional enhancement." },
        ]
    },
];

const MATURITY_LEVELS = [
    { value: 1, label: "Not in place" },
    { value: 2, label: "Just getting started" },
    { value: 3, label: "Partially in place" },
    { value: 4, label: "Mostly in place" },
    { value: 5, label: "Fully in place" },
];

function calculateScores(data: FormData) {
    const pillarScores: Record<string, number> = {};
    let totalScore = 0;

    PILLARS.forEach((pillar, idx) => {
        let rawScore = 0;
        pillar.questions.forEach((q) => {
            // 1-5 scale mapped to a roughly 20-100 scale internally, 
            // but the requirement says: "Each question scored 1 to 5. Scores multiplied by weights to get a 0-100 score per pillar."
            // Max raw sum if all are 5: 5 * 0.30 + 5 * 0.20 ... = 5.
            // Easiest mapping: map 1->20, 2->40, 3->60, 4->80, 5->100
            const answer = data[q.id] || 1;
            const scaledAnswer = answer * 20; // 20 to 100
            rawScore += scaledAnswer * q.weight;
        });
        // This gives a score 20-100 for the pillar.
        pillarScores[`p${idx + 1}`] = Math.round(rawScore);
        totalScore += rawScore * pillar.weight;
    });

    totalScore = Math.round(totalScore);

    return { pillarScores, totalScore };
}

const getExecutiveSummary = (score: number) => {
    if (score >= 80) return "Your infrastructure is structurally primed for advanced AI integration. To capitalize on this, the next step is to transition from high-level readiness to localized execution. This requires isolating your most resource-heavy cognitive workflows and mapping them directly to AI models. Because deploying autonomous systems securely demands precise alignment with your unique business logic and edge cases, a deeper contextual analysis of your specific operational environment is the logical next phase.";
    if (score >= 60) return "You have established a functional baseline, but specific architectural standardization is still required. Your immediate priority should be resolving data pipeline bottlenecks and fully documenting your manual decision workflows. While this audit highlights your general standing, generic AI tools often fail when interacting with undocumented internal logic. To safely bridge this gap, a more granular, case-by-case mapping of your unique operational data is necessary.";
    if (score >= 40) return "Your current infrastructure poses significant friction to successful AI adoption, primarily due to technical debt and manually-bound processes. The critical next step is core platform consolidation—specifically unifying your data sources and stabilizing integration APIs. Unlocking true automation will require moving beyond a surface-level overview to thoroughly diagnose the distinct legacy systems and undocumented workflows unique to your company.";
    return "Your organization currently lacks the foundational prerequisites for AI leverage. Attempting integrated AI deployments now will likely amplify existing technical debt. Your immediate, mandatory focus must be on foundational digitization: structuring your core data and standardizing basic internal workflows. To plot a realistic modernization roadmap, a significantly deeper look into your specific daily operations and localized constraints is essential.";
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = ({ onStart }: { onStart: () => void }) => (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans flex flex-col">
        <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <a href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
                <span>←</span> ScaleUp Labs
            </a>
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Diagnostic Toolkit</span>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center py-8 px-6">
            <header className="max-w-3xl w-full text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                    Are You Really Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Leverage AI?</span>
                </h1>
                <p className="text-base md:text-lg text-slate-300 mb-2 max-w-2xl mx-auto font-semibold">
                    Free 5-minute assessment from an AI expert.
                </p>
                <p className="text-sm md:text-base text-slate-400 mb-6 max-w-2xl mx-auto">
                    Measure your structural maturity and economic leverage with our AI Integration Readiness Audit™.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={onStart}
                        className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg shadow-teal-900/40 transition-all hover:-translate-y-1 hover:shadow-teal-900/60"
                    >
                        Start Free Assessment
                    </button>
                    <a
                        href="https://www.cal.eu/scaleuplabs/30min?user=scaleuplabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-teal-600 text-teal-400 hover:bg-teal-900/30 font-bold text-lg px-8 py-3.5 rounded-xl transition-all hover:-translate-y-1"
                    >
                        Book a Free Consultation
                    </a>
                </div>
                <p className="text-xs text-slate-500 mt-4">Takes ~5 minutes. Requires technical architecture knowledge.</p>
            </header>

            <section className="w-full max-w-4xl border-t border-white/10 pt-8 text-left">

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

                    {/* LEFT — What We Measure (3/5 width) */}
                    <div className="lg:col-span-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-7 shadow-xl relative overflow-hidden">
                        <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-teal-500/8 blur-[90px] rounded-full pointer-events-none"></div>

                        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">Framework</p>
                        <h3 className="text-2xl font-bold text-white mb-6">What We Measure</h3>

                        {/* Integration Readiness group */}
                        <div className="mb-4">
                            <div className="flex items-center gap-1.5 mb-3">
                                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-teal-400">Integration Readiness</span>
                            </div>
                            <div className="space-y-3 pl-1">
                                {[
                                    { n: "1", label: "Data Architecture Readiness", sub: "Structural capability to support AI" },
                                    { n: "2", label: "Workflow & Automation Maturity", sub: "Operational readiness for AI augmentation" },
                                    { n: "4", label: "Systems Integration & Architecture", sub: "Technical readiness for reliable AI" },
                                ].map(item => (
                                    <div key={item.n} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center text-xs font-black shrink-0">{item.n}</span>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                                            <span className="text-xs text-slate-500 block leading-tight">{item.sub}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-700/40 my-4"></div>

                        {/* Leverage Audit group */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-3">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">Leverage Audit</span>
                            </div>
                            <div className="space-y-3 pl-1">
                                {[
                                    { n: "3", label: "AI Leverage Opportunity Density", sub: "Where AI creates measurable efficiency gains" },
                                    { n: "5", label: "Economic Leverage & Strategic Impact", sub: "Financial and strategic return potential" },
                                ].map(item => (
                                    <div key={item.n} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-black shrink-0">{item.n}</span>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-200">{item.label}</span>
                                            <span className="text-xs text-slate-500 block leading-tight">{item.sub}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — The Output (2/5 width) */}
                    <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-[-20%] right-[-20%] w-56 h-56 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-3">Output</p>
                            <h3 className="text-lg font-bold text-white mb-5">The Scorecard</h3>

                            {/* Score ring display */}
                            <div className="flex items-center gap-5 mb-5 bg-slate-900/50 border border-slate-700/40 rounded-xl p-4">
                                {/* SVG arc ring */}
                                <div className="shrink-0 relative w-16 h-16">
                                    <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                                        {/* Track */}
                                        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="5" />
                                        {/* Arc — about 270° filled to suggest a range */}
                                        <circle
                                            cx="32" cy="32" r="26"
                                            fill="none"
                                            stroke="#14b8a6"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            strokeDasharray="123 40"
                                            style={{ filter: "drop-shadow(0 0 6px rgba(20,184,166,0.6))" }}
                                        />
                                    </svg>
                                    {/* Centre label */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-[11px] font-black text-white leading-none">0–100</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200 leading-snug">Maturity Score</p>
                                    <p className="text-xs text-slate-500 leading-snug mt-1">Across 5 weighted pillars</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed mb-5">
                                A structured score across five diagnostic pillars, with a clear breakdown of your AI readiness and infrastructure gaps.
                            </p>
                        </div>

                        {/* Deliverables */}
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2.5 rounded-lg border border-slate-700/50">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)] shrink-0"></div>
                                Instant visual scorecard
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2.5 rounded-lg border border-slate-700/50">
                                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_6px_rgba(20,184,166,0.8)] shrink-0"></div>
                                Strategic gap analysis
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2.5 rounded-lg border border-slate-700/50">
                                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_6px_rgba(20,184,166,0.8)] shrink-0"></div>
                                Executive readiness report
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    </div>
);

// ─── Form Page ────────────────────────────────────────────────────────────────
const FormPage = ({ formData, setFormData, onSubmit }: { formData: FormData, setFormData: (d: FormData) => void, onSubmit: () => void }) => {
    const totalQuestions = PILLARS.reduce((acc, p) => acc + p.questions.length, 0);
    const answered = Object.keys(formData).length;
    const progress = Math.round((answered / totalQuestions) * 100);
    const canSubmit = answered === totalQuestions;

    const handleSelect = (qId: string, val: number) => {
        setFormData({ ...formData, [qId]: val });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
            {/* Sticky Progress Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-6 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">AI Integration Audit</span>
                    <div className="flex items-center gap-4">
                        <div className="w-24 md:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 w-8">{progress}%</span>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12 text-sm text-slate-600">
                    <div className="flex flex-col gap-3">
                        <div className="font-bold text-slate-800 uppercase tracking-widest text-xs">
                            Maturity Scale:
                        </div>
                        {/* Desktop: horizontal with arrows */}
                        <div className="hidden sm:flex items-center gap-2">
                            {MATURITY_LEVELS.map((level, i) => (
                                <div key={level.value} className="flex items-center gap-2">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center font-black text-slate-600 border border-slate-200/80 text-xs shadow-sm shadow-slate-200/50">{level.value}</span>
                                        <span className="text-xs text-slate-500 whitespace-nowrap">{level.label}</span>
                                    </div>
                                    {i < MATURITY_LEVELS.length - 1 && (
                                        <span className="text-slate-300 mb-4">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Mobile: compact grid */}
                        <div className="grid grid-cols-5 gap-1 sm:hidden">
                            {MATURITY_LEVELS.map((level) => (
                                <div key={level.value} className="flex flex-col items-center gap-1 text-center">
                                    <span className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center font-black text-slate-600 border border-slate-200/80 text-xs shadow-sm shadow-slate-200/50">{level.value}</span>
                                    <span className="text-[10px] text-slate-500 leading-tight">{level.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {PILLARS.map((pillar) => (
                    <div key={pillar.id} className="mb-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-900 border-b-2 border-slate-800 px-6 py-5 md:px-8 md:py-6">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{pillar.title}</h2>
                            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">{pillar.explanation}</p>
                        </div>
                        <div className="p-6 md:p-8">
                            {pillar.questions.map((q, i) => (
                                <div key={q.id} className={`${i < pillar.questions.length - 1 ? "mb-5 pb-5 border-b border-slate-100" : ""}`}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                                        <div className="flex-1">
                                            <div className="inline-flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-bold text-slate-800 border-b border-dashed border-slate-300 pb-[1px]">{q.label}</h3>
                                                {/* Simple terms tooltip */}
                                                <div className="group relative cursor-help">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-teal-500 transition-colors"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                                                    <div className="absolute left-0 bottom-full mb-3 w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                                        <strong className="block text-teal-400 mb-1 text-xs tracking-wider uppercase">In other words:</strong>
                                                        <span className="leading-relaxed block">{q.tooltip}</span>
                                                        <div className="absolute left-4 top-full border-[6px] border-transparent border-t-slate-800"></div>
                                                    </div>
                                                </div>
                                                {/* Elaborate tooltip */}
                                                <div className="group relative cursor-help">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-violet-500 transition-colors"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                                    <div className="absolute left-0 bottom-full mb-3 w-80 p-4 bg-slate-900 text-white text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                                        <strong className="block text-violet-400 mb-1 text-xs tracking-wider uppercase">Technical term:</strong>
                                                        <span className="leading-relaxed block text-slate-300">{q.elaborate}</span>
                                                        <div className="absolute left-4 top-full border-[6px] border-transparent border-t-slate-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 leading-snug pr-0 md:pr-8">{q.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {MATURITY_LEVELS.map((level) => {
                                                const selected = formData[q.id] === level.value;
                                                return (
                                                    <button
                                                        key={level.value}
                                                        onClick={() => handleSelect(q.id, level.value)}
                                                        className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl border-2 transition-all ${selected
                                                            ? "border-teal-600 bg-teal-50 text-teal-900 shadow-sm scale-105"
                                                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:bg-slate-50"
                                                            }`}
                                                        title={level.label}
                                                    >
                                                        <span className={`text-lg font-black ${selected ? "text-teal-600" : "text-slate-400"}`}>{level.value}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                ))}

                <div className="text-center pt-8">
                    <button
                        onClick={onSubmit}
                        disabled={!canSubmit}
                        className={`px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${canSubmit
                            ? "bg-teal-600 text-white hover:bg-teal-500 hover:-translate-y-1 hover:shadow-blue-500/30 cursor-pointer"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        Calculate Audit Score
                    </button>
                    {!canSubmit && <p className="text-sm text-slate-500 mt-4">Complete all {totalQuestions} questions to calculate.</p>}
                </div >
            </div >
        </div >
    );
};

// ─── Lead Capture ─────────────────────────────────────────────────────────────
const LeadPage = ({ onComplete }: { onComplete: (info: { name: string; email: string; jobTitle: string; company: string; phone: string }) => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValid = name.trim() && email.trim() && emailValid;

    const errors = {
        name: touched.name && !name.trim() ? "Name is required" : null,
        email: touched.email && !email.trim() ? "Email is required" : touched.email && !emailValid ? "Enter a valid email address" : null,
    };

    const inputClass = (field: string) =>
        `w-full bg-slate-900/50 border text-white rounded-xl px-4 py-3 focus:outline-none transition-colors ${errors[field as keyof typeof errors]
            ? "border-red-500 focus:border-red-400"
            : "border-slate-600 focus:border-teal-500"
        }`;

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 font-sans">
            <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Audit Compilation Complete</h2>
                <p className="text-slate-400 mb-8 text-sm">
                    Enter your details to generate your scorecard, pillar breakdown, and actionable readiness map.
                </p>
                <div className="space-y-4 mb-8 text-left">
                    <div>
                        <input
                            type="text"
                            placeholder="Your Name *"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, name: true }))}
                            className={inputClass("name")}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Work Email *"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => setTouched(t => ({ ...t, email: true }))}
                            className={inputClass("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
                    </div>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                </div>
                <button
                    onClick={() => {
                        setTouched({ name: true, email: true });
                        if (isValid) onComplete({ name, email, jobTitle, company, phone });
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all ${isValid ? "bg-teal-600 text-white hover:bg-teal-500" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
                >
                    View Full Dashboard
                </button>
            </div>
        </div>
    );
};

// ─── Results Page ─────────────────────────────────────────────────────────────
const ResultsPage = ({ formData, leadInfo }: { formData: FormData, leadInfo: any }) => {
    const { pillarScores, totalScore } = calculateScores(formData);
    const [llmSummary, setLlmSummary] = useState<{ sections: { heading: string; intro: string; bullets: string[] }[]; concise: string } | null>(null);
    const [llmLoading, setLlmLoading] = useState(true);
    const [llmError, setLlmError] = useState<string | null>(null);

    React.useEffect(() => {
        const generate = async () => {
            setLlmLoading(true);
            setLlmError(null);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || "";
                const res = await fetch(`${apiUrl}/api/audit/submit`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lead: { name: leadInfo?.name, email: leadInfo?.email, jobTitle: leadInfo?.jobTitle, company: leadInfo?.company, phone: leadInfo?.phone },
                        scores: pillarScores,
                        totalScore,
                        answers: formData,
                    }),
                });
                if (!res.ok) throw new Error(`API error ${res.status}`);
                const data = await res.json();
                setLlmSummary(data);
            } catch (err: any) {
                setLlmError(err?.message || "Failed to generate summary.");
            } finally {
                setLlmLoading(false);
            }
        };
        generate();
    }, []);

    const getReadinessTier = (score: number) => {
        if (score >= 80) return {
            label: "Elite Readiness",
            desc: "All three Integration Readiness pillars (Data Architecture, Workflow Maturity, Systems Architecture) are production-grade, and both Leverage Audit pillars (AI Opportunity Density, Economic Impact) confirm strong ROI potential. The organisation is positioned to deploy and scale AI with minimal structural friction.",
            color: "text-cyan-400"
        };
        if (score >= 60) return {
            label: "Production Capable",
            desc: "The Leverage Audit pillars confirm meaningful AI opportunity and economic upside. However, one or more Integration Readiness pillars — Data Architecture, Workflow Maturity, or Systems Architecture — carry structural gaps that must be resolved before AI initiatives can move to reliable production.",
            color: "text-teal-400"
        };
        if (score >= 40) return {
            label: "Emerging Capability",
            desc: "Significant deficiencies exist across the Integration Readiness pillars (Data Architecture, Workflow Maturity, Systems Architecture), limiting the organisation's ability to deploy AI reliably. Even where the Leverage Audit pillars show economic potential, foundational infrastructure must be addressed first.",
            color: "text-amber-400"
        };
        return {
            label: "Critical Risk Profile",
            desc: "Critical gaps span both pillar groups. The Integration Readiness infrastructure is insufficient for any production AI workload, and the Leverage Audit signals limited or unclear economic return. AI initiatives launched in this state carry a high risk of failure or cost overrun.",
            color: "text-red-400"
        };
    };

    const tier = getReadinessTier(totalScore);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            <div className="bg-slate-900 text-white pt-16 pb-32 px-6 shadow-xl border-b-[8px] border-teal-600">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-slate-300">
                            Official Audit Result
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">AI Integration Readiness & Leverage</h1>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center w-full md:w-auto md:min-w-[280px]">
                        <div className="text-6xl md:text-7xl font-black text-white leading-none mb-2">
                            {totalScore}<span className="text-3xl font-bold text-slate-400">%</span>
                        </div>
                        <div className={`text-lg font-bold ${tier.color}`}>
                            {tier.label}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-16">
                <div className="flex flex-col gap-8 mb-8">
                    {/* Top Block: Strategic Interpretation & Pillar Breakdown */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200 flex flex-col h-full">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Strategic Interpretation</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{tier.desc}</p>
                        </div>

                        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 shrink-0 border-b border-slate-100 pb-2">Pillar Breakdown Analysis</h3>

                        <div className="flex flex-col gap-10 flex-1">
                            {/* ── Group 1: Integration Readiness ── */}
                            {(() => {
                                const group = [
                                    { pillar: PILLARS[0], scoreKey: "p1" },
                                    { pillar: PILLARS[1], scoreKey: "p2" },
                                    { pillar: PILLARS[3], scoreKey: "p4" },
                                ];
                                const groupAvg = Math.round(group.reduce((sum, g) => sum + pillarScores[g.scoreKey], 0) / group.length);
                                const isGroupStrong = groupAvg >= 75;
                                const isGroupWeak = groupAvg < 50;
                                return (
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Integration Readiness</span>
                                            </div>
                                            <span className={`text-xl font-black tabular-nums px-3 py-1 rounded-lg border-2 ${isGroupStrong ? "text-cyan-600 border-cyan-300 bg-cyan-50" : isGroupWeak ? "text-red-500 border-red-300 bg-red-50" : "text-teal-600 border-teal-300 bg-teal-50"}`}>{groupAvg}%</span>
                                        </div>
                                        <div className="space-y-8">
                                            {group.map(({ pillar, scoreKey }) => {
                                                const score = pillarScores[scoreKey];
                                                const isStrong = score >= 75;
                                                const isWarning = score < 50;
                                                return (
                                                    <div key={pillar.id}>
                                                        <div className="flex justify-between items-end mb-2">
                                                            <span className="font-bold text-slate-800 text-sm md:text-base">{pillar.title}</span>
                                                            <span className={`font-bold ${isStrong ? "text-cyan-600" : isWarning ? "text-red-500" : "text-teal-600"}`}>{score}%</span>
                                                        </div>
                                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                                                            <div className={`h-full rounded-full transition-all duration-1000 ${isStrong ? "bg-cyan-500" : isWarning ? "bg-red-500" : "bg-teal-500"}`} style={{ width: `${score}%` }}></div>
                                                        </div>
                                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-600">
                                                            <span className="font-bold text-slate-700 mr-2">Why it matters:</span>
                                                            {pillar.explanation}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* ── Divider ── */}
                            <div className="border-t-2 border-dashed border-slate-100"></div>

                            {/* ── Group 2: Leverage Audit ── */}
                            {(() => {
                                const group = [
                                    { pillar: PILLARS[2], scoreKey: "p3" },
                                    { pillar: PILLARS[4], scoreKey: "p5" },
                                ];
                                const groupAvg = Math.round(group.reduce((sum, g) => sum + pillarScores[g.scoreKey], 0) / group.length);
                                const isGroupStrong = groupAvg >= 75;
                                const isGroupWeak = groupAvg < 50;
                                return (
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Leverage Audit</span>
                                            </div>
                                            <span className={`text-xl font-black tabular-nums px-3 py-1 rounded-lg border-2 ${isGroupStrong ? "text-cyan-600 border-cyan-300 bg-cyan-50" : isGroupWeak ? "text-red-500 border-red-300 bg-red-50" : "text-teal-600 border-teal-300 bg-teal-50"}`}>{groupAvg}%</span>
                                        </div>
                                        <div className="space-y-8">
                                            {group.map(({ pillar, scoreKey }) => {
                                                const score = pillarScores[scoreKey];
                                                const isStrong = score >= 75;
                                                const isWarning = score < 50;
                                                return (
                                                    <div key={pillar.id}>
                                                        <div className="flex justify-between items-end mb-2">
                                                            <span className="font-bold text-slate-800 text-sm md:text-base">{pillar.title}</span>
                                                            <span className={`font-bold ${isStrong ? "text-cyan-600" : isWarning ? "text-red-500" : "text-teal-600"}`}>{score}%</span>
                                                        </div>
                                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                                                            <div className={`h-full rounded-full transition-all duration-1000 ${isStrong ? "bg-cyan-500" : isWarning ? "bg-red-500" : "bg-teal-500"}`} style={{ width: `${score}%` }}></div>
                                                        </div>
                                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-600">
                                                            <span className="font-bold text-slate-700 mr-2">Why it matters:</span>
                                                            {pillar.explanation}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Executive Summary — LLM Generated */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200 flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                            </div>
                            AI-Generated Executive Summary
                            {llmLoading && (
                                <span className="ml-2 text-xs font-normal text-slate-400 flex items-center gap-1.5">
                                    <svg className="animate-spin w-3.5 h-3.5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Generating…
                                </span>
                            )}
                        </h2>

                        {llmLoading && (
                            <div className="space-y-4 animate-pulse">
                                {/* Concise skeleton */}
                                <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100">
                                    <div className="h-3 bg-slate-200 rounded w-1/4 mb-4"></div>
                                    <div className="space-y-2.5">
                                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                                        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                        <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                                    </div>
                                </div>
                                {/* Detailed skeleton */}
                                <div className="space-y-2.5 mt-6">
                                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                                    <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                                </div>
                            </div>
                        )}

                        {llmError && (
                            <div className="flex flex-col gap-6">
                                <div className="bg-teal-50/60 border border-teal-100 p-6 rounded-2xl">
                                    <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-3">Quick Executive Read</p>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-4xl font-black tabular-nums ${totalScore >= 80 ? "text-cyan-500" : totalScore >= 60 ? "text-teal-500" : totalScore >= 40 ? "text-amber-500" : "text-red-500"}`}>{totalScore}%</span>
                                        <p className="text-lg font-extrabold text-slate-800">
                                            Are You Really Ready to Leverage AI?{" "}
                                            <span className={totalScore >= 80 ? "text-cyan-500" : totalScore >= 60 ? "text-teal-500" : totalScore >= 40 ? "text-amber-500" : "text-red-500"}>
                                                {totalScore >= 80 ? "Yes." : totalScore >= 60 ? "Almost." : totalScore >= 40 ? "Not yet." : "No."}
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{getExecutiveSummary(totalScore)}</p>
                                </div>
                            </div>
                        )}

                        {llmSummary && !llmLoading && (
                            <div className="flex flex-col gap-6">
                                {/* Concise quick-read */}
                                <div className="bg-teal-50/60 border border-teal-100 p-6 rounded-2xl">
                                    <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-3">Quick Executive Read</p>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-4xl font-black tabular-nums ${totalScore >= 80 ? "text-cyan-500" : totalScore >= 60 ? "text-teal-500" : totalScore >= 40 ? "text-amber-500" : "text-red-500"}`}>{totalScore}%</span>
                                        <p className="text-lg font-extrabold text-slate-800">
                                            Are You Really Ready to Leverage AI?{" "}
                                            <span className={totalScore >= 80 ? "text-cyan-500" : totalScore >= 60 ? "text-teal-500" : totalScore >= 40 ? "text-amber-500" : "text-red-500"}>
                                                {totalScore >= 80 ? "Yes." : totalScore >= 60 ? "Almost." : totalScore >= 40 ? "Not yet." : "No."}
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed mt-3">{llmSummary.concise}</p>
                                </div>

                                {/* Structured sections */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Full Executive Summary</p>
                                    <div className="space-y-8">
                                        {llmSummary.sections.map((section, i) => (
                                            <div key={i} className="border-l-4 border-teal-400 pl-5 py-1">
                                                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">{section.heading}</h4>
                                                <ul className="space-y-3">
                                                    {section.bullets.slice(0, 2).map((bullet, j) => (
                                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-500/20 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-teal-500/20 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Looking to optimize your capability?</h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                            We help technology-driven companies identify architectural gaps and successfully deploy production-grade AI infrastructure.
                        </p>
                        <a href="https://www.cal.eu/scaleuplabs/30min?user=scaleuplabs" target="_blank" rel="noreferrer" className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-900/40 transition-all hover:-translate-y-1">
                            Book a Free Consultation
                        </a>
                    </div>
                </div>
            </div >
        </div >
    );
};

// ─── Main Orchestrator ────────────────────────────────────────────────────────
export default function AiReadinessAudit() {
    const [state, setState] = useState<AppState>("landing");
    const [formData, setFormData] = useState<FormData>({});
    const [leadInfo, setLeadInfo] = useState<any>(null);

    if (state === "landing") return <LandingPage onStart={() => setState("form")} />;
    if (state === "form") return <FormPage formData={formData} setFormData={setFormData} onSubmit={() => setState("lead")} />;
    if (state === "lead") return <LeadPage onComplete={(info) => { setLeadInfo(info); setState("results"); }} />;
    if (state === "results") return <ResultsPage formData={formData} leadInfo={leadInfo} />;

    return null;
}
