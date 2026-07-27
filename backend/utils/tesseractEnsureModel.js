import fs from "fs";
import path from "path";
import https from "https";

const TESSDATA_DIR = path.resolve(process.cwd(), "tessdata");
const MODEL_PATH = path.join(TESSDATA_DIR, "eng.traineddata");

const MODEL_URL =
  "https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata";

// Ensure tessdata directory exists
const ensureDir = (dir) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error("Failed to create directory:", dir, err);
    throw err;
  }
};

// Download with redirect handling
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {

      // Handle redirects
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        return resolve(downloadFile(response.headers.location, dest));
      }

      if (response.statusCode !== 200) {
        return reject(
          new Error(`Download failed with status ${response.statusCode}`)
        );
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        resolve();
      });

      file.on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on("error", reject);
  });
};

export const ensureTesseractModel = async () => {
  // ALWAYS ensure folder exists first
  ensureDir(TESSDATA_DIR);

  // Check if model exists and is valid
  if (fs.existsSync(MODEL_PATH)) {
    const stats = fs.statSync(MODEL_PATH);

    if (stats.size > 1_000_000) {
      console.log("✅ Tesseract model already exists");
      return;
    } else {
      console.warn("⚠️ Corrupted model detected, re-downloading...");
      fs.unlinkSync(MODEL_PATH);
    }
  }

  console.log("Downloading Tesseract English model...");

  try {
    await downloadFile(MODEL_URL, MODEL_PATH);
    console.log("✅ Model downloaded successfully");
  } catch (err) {
    if (fs.existsSync(MODEL_PATH)) {
      fs.unlinkSync(MODEL_PATH);
    }
    throw err;
  }
};