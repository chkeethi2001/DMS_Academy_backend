import XLSX from "xlsx";
import fs from "fs";

const filePath = "DMSAcademyData.xlsx";


const getDate = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

const saveToExcel = (sheetName, row) => {
  const workbook = fs.existsSync(filePath)
    ? XLSX.readFile(filePath)
    : XLSX.utils.book_new();

  const rows = workbook.Sheets[sheetName]
    ? XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    : [];

  rows.push(row);

  const worksheet = XLSX.utils.json_to_sheet(rows);
  workbook.Sheets[sheetName] = worksheet;
  if (!workbook.SheetNames.includes(sheetName)) workbook.SheetNames.push(sheetName);

  XLSX.writeFile(workbook, filePath);
};

export const registerUser = (req, res) => {
  const { name, email, phone, course, mode } = req.body || {};
  if (!name || !email)
    return res.status(400).json({ message: "Name and email are required" });

  try {
    saveToExcel("Registrations", { name, email, phone, course, mode, date: getDate() });
    res.json({ message: "Registration saved successfully ✅" });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error while saving registration" });
  }
};

export const contactUser = (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message)
    return res.status(400).json({ message: "Name, email and message are required" });

  try {
    saveToExcel("Contacts", { name, email, phone, message, date: getDate() });
    res.json({ message: "Contact saved successfully ✅" });
  } catch (err) {
    console.error("contactUser error:", err);
    res.status(500).json({ message: "Server error while saving contact" });
  }
};
