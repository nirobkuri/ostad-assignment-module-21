import express from "express";
const router = express.Router();
import * as authController from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Public Routes
router.post("/registration", authController.register);
router.post("/login", authController.login);

// Protected Routes
router.get("/profileRead", authMiddleware, authController.profileRead);
router.get("/allProfiles", authMiddleware, authController.allProfiles);
router.post("/profileUpdate", authMiddleware, authController.profileUpdate);
router.get("/profileDelete", authMiddleware, authController.profileDelete);

export default router;