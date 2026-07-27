import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
import { ensureTesseractModel } from "./utils/tesseractEnsureModel.js";
import reportRoutes from "./routes/reportRoutes.js";

await ensureTesseractModel(); //Make sure the tesseract model exist in /tessdata

const app = express();

// Middleware
app.use(cors()); //enable cors for dev server
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true
}));
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);
app.use("/api/report", reportRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Server start
const PORT = process.env.PORT;

/* app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});