import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect("mongodb://127.0.0.1:27017/mern-products");
console.log("✅ MongoDB connected");

app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("🚀 Backend chạy ở http://localhost:5000"));
