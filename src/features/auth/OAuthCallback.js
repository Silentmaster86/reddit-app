// src/features/auth/OAuthCallback.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeCodeForToken, getUserInfo } from "../../api/reddit.js";
import { loginReddit } from "./authSlice.js";

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const exchangeTokenAndFetchUser = async () => {
      const code = searchParams.get("code");

      if (!code) {
        console.error("No authorization code found.");
        navigate("/signin");
        return;
      }

      try {
        // Step 1: Exchange code for access token
        const tokenData = await exchangeCodeForToken(code);

        if (!tokenData?.access_token) {
          throw new Error("Failed to get access token");
        }

        const accessToken = tokenData.access_token;

        // Step 2: Fetch Reddit user info
        const userInfo = await getUserInfo(accessToken);

        if (!userInfo?.id) {
          throw new Error("Failed to fetch Reddit user info");
        }

        // Step 3: Save token to localStorage
        localStorage.setItem("reddit_access_token", accessToken);

        // Step 4: Dispatch to Redux
        dispatch(loginReddit({
  id: userInfo.id,
  name: userInfo.name,
  avatar: userInfo.icon_img,
  accessToken,
}));


        // Step 5: Navigate to home
        navigate("/");
      } catch (error) {
        console.error("OAuthCallback error:", error);
        navigate("/signin");
      }
    };

    exchangeTokenAndFetchUser();
  }, [dispatch, navigate, searchParams]);

  return (
  <div style={{ textAlign: "center", marginTop: "5rem", color: "#ff4500" }}>
    <h2>🔄 Authenticating with Reddit...</h2>
    <p>Please wait while we log you in!</p>
  </div>
);
};

export default OAuthCallback;
