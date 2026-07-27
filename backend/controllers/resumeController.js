import { extractText } from "../utils/parser.js";
import { logger } from "../utils/logger.js";
import { analyzeResume } from "../services/aiService.js";
import { v4 as uuidv4 } from "uuid";
import { logUsage } from "../utils/usageLogger.js";
import {fileTypeFromBuffer} from 'file-type';

const jobs = new Map();

export const createResume = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const jobId = uuidv4();

  // Initial job state
  jobs.set(jobId, {
    status: "uploading",
    progress: 10,
    result: null,
  });

  // RETURN STATUS IMMEDIATELY
  res.status(202).json({ jobId });

  //============ CHECK FILE TYPE USING file-type, IF FILE TYPE NOT SUPPORTED THEN EXIT FUNCTION ======================
  const filetype = await fileTypeFromBuffer(file.buffer);
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if(!filetype || !allowedTypes.includes(filetype.mime))
  {
    jobs.set(jobId, {
      status: "failed",
      progress: 0,
      error: "Unsupported File Type",   //If unsupported filetype, then frontend "Unsupported filetype" error will appear
    });
    return;
  }
  //=====================================================================

  // BACKGROUND PROCESS (no await here)
  processResume(jobId, file);
};

const processResume = async (jobId, file) => {
  try {
    // Step 1 -> Parsing
    jobs.set(jobId, {
      status: "parsing",
      progress: 40,
    });

    const text = await extractText(file);

    // Step 2 -> AI Analysis
    jobs.set(jobId, {
      status: "analyzing",
      progress: 70,
    });

    const filePath = file.path;

    //const analysis = await analyzeResume(text, file);
    const analysis = await analyzeResume(text, {
      file: file.originalname,
      savedAt: filePath,
      mime: file.mimetype
    });

    //after a successful analysis log the usage number
    logUsage({
      fileType: file.mimetype,
      size: file.size,
    });

    // Step 3 -> Done
    jobs.set(jobId, {
      status: "completed",
      progress: 100,
      result: analysis,
    });

  } catch (err) {
    console.error("PROCESS ERROR:", err);

    logger.error({
      message: err.message,
      stack: err.stack,
    });

    jobs.set(jobId, {
      status: "failed",
      progress: 100,
      error: err.message,
    });
  }
};

export const getStatus = (req, res) => {
  const job = jobs.get(req.params.jobId);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
};