import { Router } from "express";
import { registerUser, contactUser } from "../controllers/excelController.js";
import axios from "axios";

const router = Router();

// Excel-based routes
router.post("/register", registerUser);
router.post("/contact", contactUser);

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwluYza-heuwxoc8M1GnZ3dDSLHlvE0s91zDUh6U_iVs1IAfJ2aXN_MtTFG3OJ8c1wstg/exec";

// Unified route for Contact + Register via Google Script
router.post("/forms", async (req, res) => {
  try {
    const { type, ...rest } = req.body;

    if (!type) {
      return res.status(400).json({ success: false, error: "Form type is required" });
    }

    // Forward request to Google Apps Script
    const response = await axios.post(
      GOOGLE_SCRIPT_URL,
      { type, ...rest },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("Error saving form:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
