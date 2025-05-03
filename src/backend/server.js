// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// ✅ Update these to match your frontend URLs
const allowedOrigins = [
  "https://redditclone-app.netlify.app",
  "http://localhost:3000"
];

// ✅ CORS middleware that handles browser preflight correctly
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked for origin: " + origin));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://redditclone-app.netlify.app/auth/callback"
    : "http://localhost:3000/auth/callback";

app.post("/api/reddit/token", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDDIT_REDIRECT_URI,
    });

    const response = await axios.post(
      "https://www.reddit.com/api/v1/access_token",
      params.toString(),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Reddit OAuth Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
