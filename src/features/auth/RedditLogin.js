import React from "react";

const RedditLogin = () => {
  const clientId = "pneFOr8LBmOoMbSGCobIPg";
  const redirectUri = " http://localhost:3000/auth/callback";
  const scope = "identity read submit";
  const responseType = "code";

  const handleLogin = () => {
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${responseType}&state=random_string&redirect_uri=${redirectUri}&duration=temporary&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <h2>Welcome to Reddit Clone</h2>
      <p>Please log in with Reddit to continue.</p>
      <button onClick={handleLogin}>Login with Reddit</button>
    </div>
  );
};

export default RedditLogin;
