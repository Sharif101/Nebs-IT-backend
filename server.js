// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noticeRoutes from "./routes/noticeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Nebsit Backend Running...");
});

// routes
app.use("/api/notices", noticeRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
