import express from "express";
import { registerUser, contactUser } from "../controllers/formController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/contact", contactUser);

export default router;
