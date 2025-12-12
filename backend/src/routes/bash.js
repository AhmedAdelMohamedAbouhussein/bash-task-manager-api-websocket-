// routes/monitor.js
import express from "express";

import { startMonitoring, stopMonitoring } from "../controllers/execBash.js";

const router = express.Router();

router.get("/start", startMonitoring);
router.get("/stop", stopMonitoring);

export default router;
