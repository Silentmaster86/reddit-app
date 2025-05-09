// src/features/posts/PostDetails.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import CommentsSection from "./CommentSection.js";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const PostCardWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary || "#888"};
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.link || "#0079d3"};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const CenteredMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ error }) => (error ? "#ff4500" : "#ccc")};
  font-size: 1.2rem;
  font-weight: bold;
`;

const CommentsTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const RedditComment = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4p;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffb000;
`;

const Body = styled.p`
  margin: 0;
`;

const SortSelect = styled.select`
  margin-bottom: 1rem;
  background: #272729;
  color: white;
  border: 1px solid #343536;
  padding: 0.5rem;
  border-radius: 4px;
`;

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("top");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/comments/${postId}.json?sort=${sort}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const postData = data[0]?.data?.children[0]?.data || null;
        const commentsData = (data[1]?.data?.children || [])
          .map((child) => child.data)
          .filter((comment) => comment.body);

        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post details.");
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId, sort]);

  if (loading) return <CenteredMessage>Loading post details...</CenteredMessage>;
  if (error) return <CenteredMessage error>{error}</CenteredMessage>;
  if (!post) return <CenteredMessage error>Post not found.</CenteredMessage>;

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PostCardWrapper>
          <Title>{post.title}</Title>
          <Meta>
            Posted by <strong>u/{post.author}</strong> in <strong>r/{post.subreddit}</strong> · {" "}
            {new Date(post.created_utc * 1000).toLocaleDateString()}
          </Meta>
          <Content>{post.selftext || "No content available."}</Content>
        </PostCardWrapper>

        <CommentsTitle>Reddit Comments ({comments.length})</CommentsTitle>
        <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="best">Best</option>
        </SortSelect>

        {comments.length === 0 ? (
          <p>No comments found.</p>
        ) : (
          comments.map((comment) => (
            <RedditComment key={comment.id}>
              <Author>u/{comment.author}</Author>
              <Body>{comment.body}</Body>
            </RedditComment>
          ))
        )}

        {isAuthenticated && (
          <>
            <CommentsTitle>Your Comments</CommentsTitle>
            <CommentsSection postId={postId} />
          </>
        )}

        <BackLink to="/">← Back to Home</BackLink>
      </motion.div>
    </Wrapper>
  );
};

export default PostDetails;
