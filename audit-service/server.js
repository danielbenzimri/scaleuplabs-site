import "dotenv/config";
import express from "express";
import cors from "cors";
import auditRouter from "./src/routes/audit.js";

const app = express();
const PORT = process.env.PORT || 3002;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/audit", auditRouter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
    console.log(`[audit-service] Running on http://localhost:${PORT}`);
});
