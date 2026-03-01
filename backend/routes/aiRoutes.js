import express from "express";
import { aiInterviewer } from "../controllers/aiController.js";

const router = express.Router();

router.post("/start", aiInterviewer)

export default router;