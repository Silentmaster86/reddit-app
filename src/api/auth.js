// src/api/auth.js

// Set the correct backend URL depending on environment
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://redditclone-backend.onrender.com" // ✅ your Render backend
    : "http://localhost:5000"; // ✅ local dev backend

const authAPI = {
  async signInWithEmail(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-in failed");

      return data;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  },

  async signUpWithEmail(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-up failed");

      return data;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  },

  async signOut() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Sign-out failed");

      return true;
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  },
};

export default authAPI;
