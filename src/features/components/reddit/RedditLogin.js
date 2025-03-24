import React from "react";

const CLIENT_ID = "pneFOr8LBmOoMbSGCobIPg"; // Replace with your Reddit Client ID
const REDIRECT_URI = "http://localhost:3000/auth/callback"; // Match with Reddit settings
const SCOPE = "identity read"; // Scopes define what you can access
const STATE = "random_string"; // Prevent CSRF attacks

const RedditLogin = () => {
  const handleLogin = () => {
    const state = Math.random().toString(36).substring(7); // Generate random state
    sessionStorage.setItem("oauth_state", state); // Store state in session storage

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=${SCOPE}`;
    window.location.href = authUrl; // Redirect user to Reddit login
  };

  return <button onClick={handleLogin}>Login with Reddit</button>;
};

export default RedditLogin;
