// src/features/posts/PostDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import CommentsSection from "./CommentSection.js"; // ✅ Make sure the path is correct!

const Wrapper = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #1a1a1b;
  color: #d7dadc;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: #818384;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  color: #0079d3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4500;
  font-weight: bold;
`;

const Loading = styled.p`
  color: #ccc;
`;

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const postData = data[0]?.data?.children[0]?.data || null;
        const commentsData = (data[1]?.data?.children || [])
          .map(child => child.data)
          .filter(comment => comment.body);

        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post details.");
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (loading) return <Loading>Loading post details...</Loading>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!post) return <ErrorMessage>Post not found.</ErrorMessage>;

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{post.title}</Title>
        <Meta>
          Posted by <strong>{post.author}</strong> on{" "}
          {new Date(post.created_utc * 1000).toLocaleDateString()}
        </Meta>

        <Content>
          {post.selftext ? post.selftext : "No content available."}
        </Content>

        <h2>Comments ({comments.length})</h2>

        <CommentsSection postId={postId} />

        <BackLink to="/">← Back to Home</BackLink>
      </motion.div>
    </Wrapper>
  );
};

export default PostDetails;
