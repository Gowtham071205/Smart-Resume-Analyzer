import express from "express";
import multer from "multer";
import { createResume } from "../controllers/resumeController.js";
import { getStatus } from "../controllers/resumeController.js";

const router = express.Router();

// Memory storage (no file saved)
const upload = multer({
     storage: multer.memoryStorage(),
     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

router.post("/", upload.single("resume"), createResume);
router.get("/:jobId/status", getStatus);

export default router;