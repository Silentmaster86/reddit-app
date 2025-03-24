import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAuth } from '../../auth/authSlice.js';
import axios from "axios";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("No authorization code found");
        return;
      }

      try {
        console.log("Sending request to backend with code:", code);
        const response = await fetch("http://localhost:5000/api/reddit/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        console.log("Backend Response:", data);

        if (data.access_token) {
          const user = await fetchUserProfile(data.access_token); // Your logic to fetch user info
       
          dispatch(setAuth({
            isAuthenticated: true,
            accessToken: data.access_token,
             user: { uid: user.uid, displayName: user.name }, // Pass the user data here
          }));
            navigate("/");  // Redirect to the home page after successful login
        } else {
          console.error("Error: No access token received", data);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

        // Function to fetch the user's profile from Reddit API
    const fetchUserProfile = async (accessToken) => {
      try {
        const response = await axios.get("https://oauth.reddit.com/api/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.data; // Return the user data to dispatch
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
    };

    fetchAccessToken();
  }, [ dispatch, navigate]);

  return <h2>Processing Reddit Login...</h2>;
};

export default OAuthCallback;
