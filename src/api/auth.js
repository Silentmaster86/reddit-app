// src/api/auth.js

const authAPI = {
  async signInWithEmail(email, password) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
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
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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
      const response = await fetch("http://localhost:5000/api/auth/signout", {
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
