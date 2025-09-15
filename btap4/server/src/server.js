import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import apiRouter from "./routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Trang chủ EJS (demo)
app.get("/", (req, res) => {
  res.render("index", { title: "Express + EJS + MongoDB" });
});

// API routes
app.use("/api", apiRouter);

// Start server
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });
