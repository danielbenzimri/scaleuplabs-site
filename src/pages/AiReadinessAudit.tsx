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
        title: "1. Data Architecture Readiness",
        explanation: "Measures whether your data infrastructure is structurally capable of supporting reliable, production-grade AI deployment.",
        weight: 0.25,
        questions: [
            { id: "q1_1", weight: 0.25, label: "Data Infrastructure Maturity", desc: "Is operational data consolidated in a warehouse/lake with governed access and defined ownership?", tooltip: "Is all your company's data stored in one secure, organized place rather than scattered across random spreadsheets and apps?" },
            { id: "q1_2", weight: 0.20, label: "Schema Consistency & Entity Resolution", desc: "Are core entities (users, accounts, transactions) consistently modeled across systems?", tooltip: "Does a 'customer' look the exact same in your billing system, CRM, and support software?" },
            { id: "q1_3", weight: 0.20, label: "Unstructured Data Indexing", desc: "Are documents, logs, tickets, and knowledge assets indexed and programmatically retrievable?", tooltip: "Can a computer instantly search and pull up your PDFs, chat logs, and internal documents?" },
            { id: "q1_4", weight: 0.20, label: "Historical Depth & Lineage", desc: "Is multi-year historical data available with traceable lineage and transformation transparency?", tooltip: "Do you have years of clean data, and do you know exactly where it came from and how it was edited?" },
            { id: "q1_5", weight: 0.15, label: "Governance & Change Management", desc: "Are schema updates version-controlled and communicated across dependent systems?", tooltip: "If a developer changes a database rule, is there a system to make sure it doesn't break other tools?" },
        ]
    },
    {
        id: "p2",
        title: "2. Workflow & Automation Maturity",
        explanation: "Evaluates how well-defined, automated, and integration-ready your operational workflows are for AI augmentation.",
        weight: 0.20,
        questions: [
            { id: "q2_1", weight: 0.30, label: "Core Workflow Automation", desc: "What percentage of high-frequency operational workflows are automated end-to-end?", tooltip: "How many of the boring, repetitive tasks your team does every day run completely on autopilot?" },
            { id: "q2_2", weight: 0.20, label: "Cognitive Task Standardization", desc: "Are decision-heavy workflows standardized with defined inputs, outputs, and rules?", tooltip: "Do your employees follow a strict, documented rulebook to make decisions, or is it based on 'gut feeling'?" },
            { id: "q2_3", weight: 0.20, label: "API & Integration Surface Area", desc: "Do core platforms expose stable APIs/webhooks enabling orchestration?", tooltip: "Can your software literally 'talk' to other software systems directly?" },
            { id: "q2_4", weight: 0.15, label: "Process Observability", desc: "Are workflow failures logged, traceable, and monitored?", tooltip: "When an automated task breaks, do you get an instant alert explaining exactly why it failed?" },
            { id: "q2_5", weight: 0.15, label: "Operational Bottleneck Analysis", desc: "Are manual review stages formally measured and optimized?", tooltip: "Do you analyze where your human employees are slowing down the process the most?" },
        ]
    },
    {
        id: "p3",
        title: "3. AI Leverage Opportunity Density",
        explanation: "Assesses the volume and repeatability of cognitive work where AI can create measurable efficiency gains.",
        weight: 0.25,
        questions: [
            { id: "q3_1", weight: 0.30, label: "Repetitive Analytical Workload", desc: "Is there high-volume, repeatable text or data analysis performed by teams?", tooltip: "Do your employees spend a lot of time reading data and doing the same analysis over and over?" },
            { id: "q3_2", weight: 0.20, label: "Knowledge Processing Intensity", desc: "Do teams routinely process contracts, reports, compliance documents, or technical docs?", tooltip: "Is your team constantly having to manually read and extract information from large documents or contracts?" },
            { id: "q3_3", weight: 0.20, label: "Decision Pattern Repeatability", desc: "Are operational decisions driven by recurring patterns that can be formalized?", tooltip: "When your team makes a decision, is it usually the exact same logical steps every time?" },
            { id: "q3_4", weight: 0.15, label: "Knowledge Concentration Risk", desc: "Is institutional knowledge concentrated within limited senior personnel?", tooltip: "If one specific senior employee left tomorrow, would the company lose critical operational knowledge?" },
            { id: "q3_5", weight: 0.15, label: "Customer Interaction Scalability", desc: "Is customer support, onboarding, or sales assistance resource-intensive and text-heavy?", tooltip: "Is your customer facing team overwhelmed with answering the same text-heavy questions all day?" },
        ]
    },
    {
        id: "p4",
        title: "4. Systems Integration & Architecture",
        explanation: "Determines whether your systems architecture can reliably integrate, orchestrate, and scale AI-driven processes.",
        weight: 0.20,
        questions: [
            { id: "q4_1", weight: 0.30, label: "Cross-System Data Synchronization", desc: "Are CRM, ERP, product systems, billing, and analytics consistently synchronized?", tooltip: "If a customer updates their address in your CRM, does it instantly update in your billing system too?" },
            { id: "q4_2", weight: 0.20, label: "Event-Driven Capability", desc: "Do systems emit events that can trigger downstream automation reliably?", tooltip: "When X happens, does your system automatically trigger Y to happen without human input?" },
            { id: "q4_3", weight: 0.20, label: "Pipeline Reliability & Monitoring", desc: "Are ETL/ELT pipelines monitored with defined SLAs and alerting?", tooltip: "Do you have alarms set up if data magically stops flowing between your databases?" },
            { id: "q4_4", weight: 0.15, label: "Centralized Logging & Telemetry", desc: "Are logs aggregated and queryable for operational intelligence use cases?", tooltip: "If something breaks, are all the system logs in one easy place so engineers can figure out what went wrong?" },
            { id: "q4_5", weight: 0.15, label: "Release Stability & Dependency Control", desc: "Can system updates occur without breaking integration contracts?", tooltip: "Can you update one piece of software without accidentally bringing down the entire company's network?" },
        ]
    },
    {
        id: "p5",
        title: "5. Economic Leverage & Strategic Impact",
        explanation: "Quantifies whether AI adoption would produce meaningful financial, scalability, and margin impact.",
        weight: 0.10,
        questions: [
            { id: "q5_1", weight: 0.30, label: "Labor Cost Concentration", desc: "Are significant payroll resources allocated to repetitive operational functions?", tooltip: "Are you paying humans high salaries to do boring, repetitive clicking and typing?" },
            { id: "q5_2", weight: 0.20, label: "Error & Compliance Risk Exposure", desc: "Do human errors create financial, regulatory, or reputational exposure?", tooltip: "If a human makes a typo, could it result in a huge fine or embarrassing customer problem?" },
            { id: "q5_3", weight: 0.20, label: "Scaling Cost Sensitivity", desc: "Does revenue growth require proportional operational headcount growth?", tooltip: "If you get 10x more customers next month, do you have to hire 10x more employees to handle them?" },
            { id: "q5_4", weight: 0.15, label: "Cycle-Time Revenue Impact", desc: "Do delays in workflows materially impact revenue realization?", tooltip: "If a task takes too long, does it literally stop you from making money that day?" },
            { id: "q5_5", weight: 0.15, label: "Margin Optimization Pressure", desc: "Is efficiency improvement strategically necessary to maintain competitive margins?", tooltip: "Are your competitors using automation to lower their prices so much that you have to adapt to survive?" },
        ]
    },
];

const MATURITY_LEVELS = [
    { value: 1, label: "Low Maturity / Undefined" },
    { value: 2, label: "Emerging / Ad-hoc" },
    { value: 3, label: "Defined / Developing" },
    { value: 4, label: "Managed / Significant" },
    { value: 5, label: "Advanced / Optimized" },
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
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
        <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <a href="/" className="text-slate-400 hover:text-white transition flex items-center gap-2 text-sm font-medium">
                <span>←</span> ScaleUp Labs
            </a>
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Diagnostic Toolkit</span>
        </nav>

        <header className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                AI Integration Readiness & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Leverage Audit™</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                High-Authority Diagnostic Framework for Technology-Driven Companies. Stop guessing if you're ready for AI—measure your structural maturity and economic leverage.
            </p>

            <button
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-1 hover:shadow-blue-900/60"
            >
                Start the Diagnostic Board
            </button>
            <p className="text-sm text-slate-500 mt-6">Takes ~5 minutes. Requires technical architecture knowledge.</p>
        </header>

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10 grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-6">What We Measure</h2>
                <ul className="space-y-5 text-slate-400 mt-6">
                    <li className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-4 items-start">
                        <div className="flex items-start gap-2.5">
                            <span className="text-blue-500 font-medium text-base">1.</span>
                            <strong className="text-slate-200 text-base leading-snug">Data Architecture Readiness:</strong>
                        </div>
                        <div className="text-slate-400 text-sm md:text-base ml-6 md:ml-0 md:pt-0">Can your data support AI?</div>
                    </li>
                    <li className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-4 items-start">
                        <div className="flex items-start gap-2.5">
                            <span className="text-blue-500 font-medium text-base">2.</span>
                            <strong className="text-slate-200 text-base leading-snug">Workflow & Automation:</strong>
                        </div>
                        <div className="text-slate-400 text-sm md:text-base ml-6 md:ml-0 md:pt-0">Are your processes integration-ready?</div>
                    </li>
                    <li className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-4 items-start">
                        <div className="flex items-start gap-2.5">
                            <span className="text-blue-500 font-medium text-base">3.</span>
                            <strong className="text-slate-200 text-base leading-snug">AI Leverage Opportunity:</strong>
                        </div>
                        <div className="text-slate-400 text-sm md:text-base ml-6 md:ml-0 md:pt-0">Where is the cognitive repetition?</div>
                    </li>
                    <li className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-4 items-start">
                        <div className="flex items-start gap-2.5">
                            <span className="text-blue-500 font-medium text-base">4.</span>
                            <strong className="text-slate-200 text-base leading-snug">Systems Integration:</strong>
                        </div>
                        <div className="text-slate-400 text-sm md:text-base ml-6 md:ml-0 md:pt-0">Can you architect for scale?</div>
                    </li>
                    <li className="grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-4 items-start">
                        <div className="flex items-start gap-2.5">
                            <span className="text-blue-500 font-medium text-base">5.</span>
                            <strong className="text-slate-200 text-base leading-snug">Economic & Strategic Impact:</strong>
                        </div>
                        <div className="text-slate-400 text-sm md:text-base ml-6 md:ml-0 md:pt-0">What is the ROI density?</div>
                    </li>
                </ul>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">The Output</h3>
                <p className="text-slate-400 mb-6">
                    A definitive 0-100 maturity score across 5 crucial pillars, revealing exactly where your infrastructure creates AI leverage—and where you risk technical debt.
                </p>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Instant visual scorecard
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Strategic gap analysis
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Executive readiness report
                    </div>
                </div>
            </div>
        </section>
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
                            <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 w-8">{progress}%</span>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12 text-sm text-slate-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 items-center">
                        <div className="font-bold text-slate-800 uppercase tracking-widest text-xs">
                            Maturity Scale:
                        </div>
                        {MATURITY_LEVELS.map((level) => (
                            <div key={level.value} className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-md bg-slate-50 flex items-center justify-center font-black text-slate-600 border border-slate-200/80 text-xs shadow-sm shadow-slate-200/50">{level.value}</span>
                                <span className="font-semibold text-slate-600">{level.label}</span>
                            </div>
                        ))}
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
                                            <div className="group inline-flex items-center gap-2 mb-1 relative cursor-help">
                                                <h3 className="text-base font-bold text-slate-800 border-b border-dashed border-slate-300 pb-[1px]">{q.label}</h3>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-blue-500 transition-colors"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                                                <div className="absolute left-0 bottom-full mb-3 w-72 p-4 bg-slate-800 border-slate-700 text-white text-sm rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                                    <strong className="block text-blue-400 mb-1 text-xs tracking-wider uppercase">In simple terms:</strong>
                                                    <span className="leading-relaxed block">{q.tooltip}</span>
                                                    <div className="absolute left-8 top-full border-[6px] border-transparent border-t-slate-800"></div>
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
                                                            ? "border-blue-600 bg-blue-50 text-blue-900 shadow-sm scale-105"
                                                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-500 hover:bg-slate-50"
                                                            }`}
                                                        title={level.label}
                                                    >
                                                        <span className={`text-lg font-black ${selected ? "text-blue-600" : "text-slate-400"}`}>{level.value}</span>
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
                            ? "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-1 hover:shadow-blue-500/30 cursor-pointer"
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
const LeadPage = ({ onComplete }: { onComplete: (info: { name: string; email: string }) => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 font-sans">
            <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Audit Compilation Complete</h2>
                <p className="text-slate-400 mb-8 text-sm">
                    Enter your details to generate your scorecard, pillar breakdown, and actionable readiness map.
                </p>
                <div className="space-y-4 mb-8">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Work Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    disabled={!name || !email}
                    onClick={() => onComplete({ name, email })}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all ${name && email ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-slate-700 text-slate-500 cursor-not-allowed"
                        }`}
                >
                    View Full Dashboard
                </button>
            </div>
        </div >
    );
};

// ─── Results Page ─────────────────────────────────────────────────────────────
const ResultsPage = ({ formData, leadInfo }: { formData: FormData, leadInfo: any }) => {
    const { pillarScores, totalScore } = calculateScores(formData);

    const getReadinessTier = (score: number) => {
        if (score >= 80) return { label: "Elite Readiness", desc: "Highly leveraged for advanced AI integration and scaled automation.", color: "text-emerald-400" };
        if (score >= 60) return { label: "Production Capable", desc: "Solid functional baseline; specific architectural gaps remain.", color: "text-blue-400" };
        if (score >= 40) return { label: "Emerging Capability", desc: "Significant technical debt handling. Focus on data fundamentals first.", color: "text-amber-400" };
        return { label: "Critical Risk Profile", desc: "Foundations are missing. AI initiatives will likely fail or scale poorly.", color: "text-red-400" };
    };

    const tier = getReadinessTier(totalScore);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            <div className="bg-slate-900 text-white pt-16 pb-32 px-6 shadow-xl border-b-[8px] border-blue-600">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-slate-300">
                            Official Audit Result
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">AI Integration Readiness & Leverage</h1>
                        {leadInfo?.name && (
                            <p className="text-slate-400 text-lg">Prepared for <span className="capitalize">{leadInfo.name}</span></p>
                        )}
                    </div>

                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl text-center w-full md:w-auto md:min-w-[280px]">
                        <div className="text-6xl md:text-7xl font-black text-white leading-none mb-2">
                            {totalScore}
                        </div>
                        <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">/ 100</div>
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

                        <div className="space-y-8 flex-1">
                            {PILLARS.map((p, i) => {
                                const score = pillarScores[`p${i + 1}`];
                                const isStrong = score >= 75;
                                const isWarning = score < 50;
                                return (
                                    <div key={p.id}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-slate-800 text-sm md:text-base">{p.title}</span>
                                            <span className={`font-bold ${isStrong ? "text-emerald-600" : isWarning ? "text-red-500" : "text-blue-600"}`}>
                                                {score}/100
                                            </span>
                                        </div>
                                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${isStrong ? "bg-emerald-500" : isWarning ? "bg-red-500" : "bg-blue-500"}`}
                                                style={{ width: `${score}%` }}
                                            ></div>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-600">
                                            <span className="font-bold text-slate-700 mr-2">Why it matters:</span>
                                            {p.explanation}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Block: Executive Summary snapshot */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200 flex flex-col h-full">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            Executive Summary
                        </h2>

                        <div className="flex-1">
                            <p className="text-lg leading-relaxed text-slate-700 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-8 font-medium">
                                {getExecutiveSummary(totalScore)}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-4">Looking to optimize your capability?</h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                            We help technology-driven companies identify architectural gaps and successfully deploy production-grade AI infrastructure.
                        </p>
                        <a href="https://scaleuplabs.dev/#contact" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-1">
                            Book a Capability Mapping Session
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
