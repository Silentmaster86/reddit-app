import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pagination from "../../components/UI/Pagination.js"; // You’ll create this component
import "../../styles/postList.css";
import Spinner from "../../components/UI/Spinner.js";

export default function PostList() {
  const dispatch = useDispatch();
  const { status, error, selectedSubreddit, searchTerm, category, posts } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedSubreddit]);

  useEffect(() => {
    setCurrentPage(1); // Reset on filters change
  }, [selectedSubreddit, searchTerm, category]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "all" || post.subreddit === category)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="post-list-wrapper">
      <h1>
        {filteredPosts.length > 0
          ? `Posts from ${selectedSubreddit}`
          : "No posts found for this subreddit"}
      </h1>

      <motion.ul className="post-list">
        {filteredPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          currentPosts.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id} className="post-link">
              <motion.li
                className="post-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2>{post.title}</h2>
                <p>Posted by: {post.author}</p>
                <p>Score: {post.score}</p>
              </motion.li>
            </Link>
          ))
        )}
      </motion.ul>

      {filteredPosts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      )}
    </div>
  );
}
