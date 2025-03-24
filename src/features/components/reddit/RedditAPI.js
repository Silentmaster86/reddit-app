export const fetchRedditUserData = async () => {
  let token = localStorage.getItem("reddit_access_token");

  if (!token) {
    console.error("No access token found");
    return null;
  }

  try {
    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Pietkun-Myapp/1.0 (by u/IncomeOk8120)"
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Token expired, redirecting to login...");
        localStorage.removeItem("reddit_access_token");
        return null;
      } 
      throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }

    const userData = await response.json();
    console.log("User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
