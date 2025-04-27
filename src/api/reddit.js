// src/api/reddit.js

const redditAPIBase = "https://oauth.reddit.com";

const tokenEndpoint = 
  process.env.NODE_ENV === "production"
    ? "https://redditclone-backend.onrender.com/api/reddit/token"
    : "http://localhost:5000/api/reddit/token";


export const getLoginUrl = () => {
  const clientId = pneFOr8LBmOoMbSGCobIPg;
  const redirectUri = "https://redditclone-app.netlify.app/auth/callback";

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
