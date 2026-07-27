const isLinux = process.platform === "linux";
const isWindows = process.platform === "win32";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";
import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import extract from "pdf-text-extract";
import { promisify } from "util";
import Tesseract from "tesseract.js";
import { saveFailedFile, logger } from "../utils/logger.js"
//import pdf from "pdf-poppler";

const extractAsync = promisify(extract);

export const extractText = async (file) => {
  const mime = file.mimetype;

  //console.log("MIME:", mime);

  // PDF
  if (mime === "application/pdf") {
    let text = "";

    //Try pdfjs first
    try {
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(file.buffer),
        useSystemFonts: true,
      });

      const pdf = await loadingTask.promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        //console.log("Page", i, "items:", content.items.length);

        const strings = content.items
          .map((item) => item.str)
          .filter((str) => str && str.trim().length > 0);

        text += strings.join(" ") + "\n";
      }
    } catch (err) {
      //console.warn("PDJFS FAILED:", err.message);
    }

    // Fallback → pdf-text-extract
    let tempPath;

    try {
      tempPath = path.join(os.tmpdir(), `${uuidv4()}.pdf`);
      fs.writeFileSync(tempPath, file.buffer);

      let pages;

      try {
        pages = await extractAsync(tempPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          throw new Error("PDF_TOOL_MISSING: pdftotext not installed");
        }
        throw err;
      }

      const fallbackText = pages.join("\n");

      if (!fallbackText || !fallbackText.trim()) {  //If fails, move to OCR
        throw new Error("pdf-text-extract returned empty text");
      }

      //console.log("✅ Parsed with pdf-text-extract");
      if (tempPath && fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }

      return fallbackText;

    } catch (err) {
      //console.warn("pdftotext failed to parse the file:", err.message);
    }

    //If pdftextextract failes -> Try tesseract OCR
    try {
      //console.log("Using OCR fallback...");

      const ocrText = await extractWithOCR(file.buffer);

      if (!ocrText || !ocrText.trim()) {
        throw new Error("OCR returned empty text");
      }

      return ocrText;
    } catch (err) {
      //console.warn("Tesseract OCR failed:", err.message);

      const savedFile = await saveFailedFile(file);

      logger.error("PDF_PARSE_ERROR", {
        message: err.message,
        file: savedFile.fileName,
        savedAt: "backend/logs/files",
        mime: file.mimetype
      });
      throw new Error(
        "PDF_PARSE_ERROR: Unable to extract text from this PDF"
      );
    }
  }

  // DOCX
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });
      return result.value;
    } catch (err) {
      const savedFile = await saveFailedFile(file);
      logger.error("DOCX_PARSE_ERROR", {
        message: err.message,
        file: savedFile.fileName,
        savedAt: "backend/logs/files",
        mime: file.mimetype
      });
      throw new Error("DOCX_PARSE_ERROR: " + (err?.message || JSON.stringify(err)));
    }
  }

  throw new Error("Unsupported file type");
};

//Tesseract OCR pdf parser
import { execSync } from "child_process";

async function extractWithOCR(buffer) {
  const tempDir = path.join(os.tmpdir(), uuidv4());
  fs.mkdirSync(tempDir);

  const pdfPath = path.join(tempDir, "input.pdf");
  fs.writeFileSync(pdfPath, buffer);

  let text = "";

  try {
    if (isWindows) {
      // =========================
      // WINDOWS → pdf-poppler
      // =========================
      const pdf = (await import("pdf-poppler")).default;
      await pdf.convert(pdfPath, {
        format: "png",
        out_dir: tempDir,
        out_prefix: "page",
        page: null,
        scale: 1024,
      });

    } else if (isLinux) {
      // =========================
      // LINUX → pdftoppm
      // =========================
      execSync(
        `pdftoppm -png -r 300 "${pdfPath}" "${path.join(tempDir, "page")}"`
      );
    }

    // =========================
    // OCR PART (COMMON)
    // =========================
    const files = fs.readdirSync(tempDir).filter((f) => f.endsWith(".png"));

    for (const file of files) {
      const imagePath = path.join(tempDir, file);

      const result = await Tesseract.recognize(imagePath, "eng", {
        langPath: "./tessdata",
        cachePath: "./tessdata",
      });

      text += result.data.text + "\n";
    }

    const cleanText = (text) => {
      return text
        .replace(/[«»]/g, "•")        // fix bullets
        .replace(/§/g, "5")           // fix numbers
        .replace(/linkedin\.\s+/g, "linkedin.") // fix links
        .replace(/\s+/g, " ")         // normalize spaces
        .replace(/\n\s+/g, "\n")      // clean line starts
        .trim();
    };

    return cleanText(text);

  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
/* async function extractWithOCR(buffer) {
  const tempDir = path.join(os.tmpdir(), uuidv4());
  fs.mkdirSync(tempDir);

  const pdfPath = path.join(tempDir, "input.pdf");
  fs.writeFileSync(pdfPath, buffer);

  try {
    // Convert PDF → images
    await pdf.convert(pdfPath, {
      format: "png",
      out_dir: tempDir,
      out_prefix: "page",
      page: null,
      scale: 1024
    });

    const files = fs.readdirSync(tempDir).filter(f => f.endsWith(".png"));

    let text = "";

    for (const file of files) {
      const imagePath = path.join(tempDir, file);

      const result = await Tesseract.recognize(imagePath, "eng", {
        langPath: "./tessdata",   // where models are stored
        cachePath: "./tessdata",  // where cache is saved
      });
      text += result.data.text + "\n";
    }

    const cleanText = (text) => {
      return text
        .replace(/[«»]/g, "•")        // fix bullets
        .replace(/§/g, "5")           // fix numbers
        .replace(/linkedin\.\s+/g, "linkedin.") // fix links
        .replace(/\s+/g, " ")         // normalize spaces
        .replace(/\n\s+/g, "\n")      // clean line starts
        .trim();
    };

    const finalText = cleanText(text);
    return finalText;
  } finally {
    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
} */