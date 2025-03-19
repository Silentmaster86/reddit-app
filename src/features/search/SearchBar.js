import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSelectedSubreddit, fetchPosts } from "../posts/postsSlice";
import "./searchBar.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSubredditChange = (e) => {
    const subreddit = e.target.value;
    dispatch(setSelectedSubreddit(subreddit));
    dispatch(fetchPosts(subreddit));  // Fetch new posts for the selected subreddit
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <select value={selectedSubreddit} onChange={handleSubredditChange}>
        <option value="javascript">Javascript</option>
        <option value="reactjs">Reactjs</option>
        <option value="webdev">Webdev</option>
        <option value="programming">Programming</option>
      </select>
    </div>
  );
}
