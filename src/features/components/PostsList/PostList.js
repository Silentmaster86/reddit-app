import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../posts/postsSlice.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./postList.css";

export default function PostList() {
  const dispatch = useDispatch();
  const { status, error, selectedSubreddit } = useSelector((state) => state.posts);
  const posts = useSelector((state) => state.posts.posts);
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const selectedCategory = useSelector((state) => state.posts.category);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;  // Number of posts per page

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedSubreddit]);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when subreddit or search term changes
  }, [selectedSubreddit, searchTerm, selectedCategory]);

  if (status === "loading") return <motion.p animate={{ opacity: [0, 1] }}>Loading...</motion.p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || post.subreddit === selectedCategory)
  );

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <h1>Posts from {selectedSubreddit}</h1>
      <motion.ul className="post-list">
        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          currentPosts.map((post, index) => (
            <motion.li
              key={post.id || post.name}
              className="post-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2>{post.title}</h2>
              <p>Posted by: {post.author}</p>
              <p>Score: {post.score}</p>
              <br/>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </motion.li>
          ))
        )}
      </motion.ul>
      {/* Pagination Controls */}
      <div className="pagination">
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span>
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
    </div>
  );
}
