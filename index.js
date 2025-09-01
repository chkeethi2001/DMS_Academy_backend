import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";           // MongoDB connection
import excelRoutes from "./src/routes/excelRoutes.js"; // Excel routes
import messageRoutes from "./src/routes/messageRoutes.js"; // Contact messages routes
import formRoutes from "./src/routes/formRoutes.js";   // Registration & Contact forms routes
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js"; // Error middleware

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/forms", formRoutes);       // Registration & Contact forms (MongoDB + Excel)
app.use("/api/excel", excelRoutes);      // Excel only routes
app.use("/api/messages", messageRoutes); // Messages only routes

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
