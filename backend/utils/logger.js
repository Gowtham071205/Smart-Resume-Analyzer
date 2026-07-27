import winston from "winston";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Define log directory
const logDir = path.join("logs");

// Create logs folder if it doesn't exist
await fs.mkdir(logDir, { recursive: true });

const filesDir = path.join(logDir, "files");

//create logs/files if not exist
await fs.mkdir(filesDir, { recursive: true });

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "error.log") }),
  ],
});

async function saveFailedFile(fileData) {
    let fileName = uuidv4();  //generate uuid filename
    fileName = fileName + path.extname(fileData.originalname)

    // Full file path
    const filePath = path.join(filesDir, fileName);

    // Save file
    await fs.writeFile(filePath, fileData.buffer);

    // Return saved data
    const savedFile = {
      fileName: fileName
    };
    return savedFile;
}

//export default logger;
export{
  saveFailedFile,
  logger
}