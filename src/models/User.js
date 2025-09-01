import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  course: { type: String },
  mode: { type: String }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
