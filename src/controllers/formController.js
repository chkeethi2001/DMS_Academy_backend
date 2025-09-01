import axios from "axios";
import User from "../models/User.js";
import Message from "../models/Message.js";

// Your Google Apps Script Web App URL
const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzTinpNWkQicqn9GlvyRG7YcEGyxecCL1Rics30IiWEhS0hShS0CQ6IC7bq4vYIWz7HYw/exec";

// Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, course, mode } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email required" });

    const user = await User.create({ name, email, phone, course, mode });

    // Send to Google Sheets
    try {
      await axios.post(SHEET_WEBAPP_URL, { type: "register", ...req.body });
    } catch (sheetErr) {
      console.error("Google Sheets error:", sheetErr.message);
    }

    res.status(201).json({ message: "Registration saved ✅", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Contact
export const contactUser = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, email, message required" });

    const msg = await Message.create({ name, email, phone, message });

    // Send to Google Sheets
    try {
      await axios.post(SHEET_WEBAPP_URL, { type: "contact", ...req.body });
    } catch (sheetErr) {
      console.error("Google Sheets error:", sheetErr.message);
    }

    res.status(201).json({ message: "Contact saved ✅", data: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
