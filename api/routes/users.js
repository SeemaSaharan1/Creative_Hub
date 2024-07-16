import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/users.js"; // Assuming you have a controller function for fetching user profile

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);

export default router;
