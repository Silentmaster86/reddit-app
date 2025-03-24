import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubreddit, setSubreddits } from "../features/posts/postsSlice.js";
import axios from "axios";
import "./subredditList.css";

export default function SubredditList() {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);
  const subreddits = useSelector((state) => state.posts.subreddits);
  useEffect(() => {
    async function fetchSubreddits() {
      try {
        const response = await axios.get("https://www.reddit.com/postId/popular.json");
        console.log("API response:", response.data); // Check the response structure
        dispatch(setSubreddits(response.data.data.children.map((sub) => sub.data)));
        console.log(response.data.data.children); // To check if data is coming properly
      } catch (error) {
        console.error("Failed to load subreddits", error);
      }
    }

    fetchSubreddits();
  }, [dispatch]);

  return (
    <div className="subreddit-list">
      <h2>Popular Subreddits</h2>
      <ul>
        {subreddits.length === 0 ? (
          <p>Loading subreddits...</p>
        ) : (
          subreddits.map((sub) => (
          <li
            key={sub.id}
            className={selectedSubreddit === sub.display_name ? "active" : ""}
            onClick={() => dispatch(setSelectedSubreddit(sub.display_name))}
          >
            <img src={sub.icon_img || "/default-icon.png"} alt={sub.display_name} className="subreddit-icon" />
            {sub.display_name_prefixed}
          </li>
        )))}
      </ul>
    </div>
  );
}
