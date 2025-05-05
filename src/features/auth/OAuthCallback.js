// src/features/auth/OAuthCallback.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeCodeForToken, getUserInfo } from "../../api/reddit.js";
import { loginReddit } from "./authSlice.js";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
  color: #ff4500;
`;

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const exchangeTokenAndFetchUser = async () => {
      const code = searchParams.get("code");

      if (!code) {
        console.error("❌ No authorization code found.");
        navigate("/signin");
        return;
      }

      try {
        // Step 1: Get token
        const tokenData = await exchangeCodeForToken(code);
        const accessToken = tokenData?.access_token;

        if (!accessToken) throw new Error("Access token missing");

        // Step 2: Get user info
        const userInfo = await getUserInfo(accessToken);
        if (!userInfo?.id) throw new Error("User info missing");

        // Step 3: Save access token (optional)
        localStorage.setItem("reddit_access_token", accessToken);

        // Step 4: Dispatch to Redux
        dispatch(loginReddit({
          accessToken,
          user: {
            id: userInfo.id,
            name: userInfo.name,
            avatar: userInfo.icon_img,
          }
        }));


        navigate("/");
      } catch (error) {
        console.error("❌ OAuthCallback error:", error);
        alert("Reddit login failed. Please try again.");
        navigate("/signin");
      }
    };

    exchangeTokenAndFetchUser();
  }, [dispatch, navigate, searchParams]);

  return (
    <Wrapper>
      <h2>🔄 Authenticating with Reddit...</h2>
      <p>Please wait while we log you in.</p>
    </Wrapper>
  );
};

export default OAuthCallback;
