import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/callback?code=your_code_here";

app.post("/api/reddit/token", async (req, res) => {
    console.log("Received request:", req.body); // Add this for debugging
    const { code } = req.body;

    if (!code) {
        console.error("No code provided");
        return res.status(400).json({ error: "Missing authorization code" });
    }
    
    try {
    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

        const response = await axios.post(
            "https://www.reddit.com/api/v1/access_token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDDIT_REDIRECT_URI,
                 }),
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        console.log("Reddit OAuth Response:", response.data);
        res.json(response.data); // Send the token to the frontend
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get access token" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
