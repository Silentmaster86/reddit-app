require("dotenv").config();
import express, { json } from "express";
import cors from "cors";
import { post } from "axios";

const app = express();
app.use(cors());
app.use(json());
app.use(cors({ origin: "*" }));

const CLIENT_ID = process.env.REACT_APP_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/callback";

app.post("/api/reddit/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Missing authorization code" });
    }

    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    try {
        const response = await post(
            "https://www.reddit.com/api/v1/access_token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        res.json(response.data); // Send the token to the frontend
    } catch (error) {
        console.error("Error fetching access token:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get access token" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
