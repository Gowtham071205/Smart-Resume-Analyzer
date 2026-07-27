// Logs the analysis count
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

// ensure folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const usageFile = path.join(logDir, "usage.log");

export const logUsage = (meta = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    ...meta,
  };

  fs.appendFileSync(usageFile, JSON.stringify(entry) + "\n");
};