import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import api from "./src/routes/api.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Database
connectDB();

// Routes
app.use("/api", api);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
