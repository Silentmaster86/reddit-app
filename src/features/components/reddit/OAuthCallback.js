import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setAccessToken } from '../../auth/authSlice';

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("No authorization code found in URL");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/reddit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        if (data.access_token) {
          console.log("Access Token:", data.access_token);
          localStorage.setItem("reddit_access_token", data.access_token);
          dispatch(setAccessToken(data.access_token));
          navigate("/");
        } else {
          console.error("Error: No access token received", data);
        }  
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, [navigate, dispatch]);

  return <h2>Processing Reddit Login...</h2>;
};

export default OAuthCallback;
