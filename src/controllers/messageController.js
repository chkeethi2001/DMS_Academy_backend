import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }
    const msg = await Message.create({ name, email, phone, message });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
};
