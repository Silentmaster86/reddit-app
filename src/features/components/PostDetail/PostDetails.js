import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import CommentsSection from "../Comments/CommentSection";
import "./postDetails.css";

export default function PostDetails() {
  const { postId } = useParams();
  console.log(postId);  // Check if postId is logged correctly
  const [post, setPost ]  = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data[0]?.data?.children?.length) {
          throw new Error("Post not found.");
        }

        // Extract the post data and comments
        const postData = data[0]?.data?.children[0]?.data || null;
        const commentsData = data[1]?.data?.children
          .map((child) => child.data)
          .filter((comment) => comment.body) || [];

        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch comments.");
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-details">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {post.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p>{post.selftext || "No content available."}</p>
        <p>
          <strong>Author:</strong> {post.author}
        </p>
        <p>
          <strong>Created:</strong> {new Date(post.created_utc * 1000).toLocaleDateString()}
        </p>
        <div className="comments">
          <h3>Comments:</h3>
          <ul>
            {comments.length === 0 ? (
              <p>No comments available.</p>
            ) : (
              comments.map((comment) => (
                 <li key={comment.id || comment.name} className="comment">
                  <p><strong>{comment.author}</strong>: {comment.body}</p>
                  <p>↑ {comment.ups}</p>
                </li>
              )))}
            <CommentsSection postId={post.id} />
            </ul>
          </div>
      </motion.div>
      <br/>
      <Link to="/" className="back-button">← Back to Posts</Link>
    </div>
  );
}
