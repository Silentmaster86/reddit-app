// src/api/reddit.js

const redditAPIBase = "https://oauth.reddit.com";

const tokenEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://redit-app.netlify.app/api/reddit/token" // <-- replace with deployed backend URL
    : "http://localhost:5000/api/reddit/token";

export const getLoginUrl = () => {
  const clientId = process.env.REACT_APP_REDDIT_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REACT_APP_REDDIT_REDIRECT_URI || "http://localhost:3000/auth/callback");

  const state = Math.random().toString(36).substring(7); // random string for security

  return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=temporary&scope=identity read submit`;
};

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.access_token ? data : null;
  } catch (err) {
    console.error("❌ Failed to exchange code for token:", err);
    return null;
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await fetch(`${redditAPIBase}/api/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error("❌ Failed to fetch Reddit user info:", err);
    return null;
  }
};
