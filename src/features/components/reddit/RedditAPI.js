export const fetchRedditUserData = async () => {
  const token = localStorage.getItem("reddit_access_token");

  if (!token) {
    console.error("No access token found");
    return null;
  }

  try {
    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Pietkun-Myapp/1.0 (by u/IncomeOk8120"
      }
    });

    if (!response.ok) {
    console.error("Failed to fetch user data:", response.status, response.statusText);
    return null;
  }

    const userData = await response.json();
    console.log("User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
