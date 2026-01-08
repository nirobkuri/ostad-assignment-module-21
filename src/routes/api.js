import express from "express";
import * as authController from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/registration", authController.register);
router.post("/login", authController.login);

// Protected
router.get("/profile", authMiddleware, authController.profileRead);
router.get("/profiles", authMiddleware, authController.allProfiles);
router.put("/profile", authMiddleware, authController.profileUpdate);
router.delete("/profile", authMiddleware, authController.profileDelete);

export default router;
