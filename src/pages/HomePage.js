// src/pages/HomePage.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { fetchPosts } from "../features/posts/postsSlice.js";
import { Link } from "react-router-dom";
import Spinner from "../components/UI/Spinner.js";

const fadeInHighlight = keyframes`
  from { background-color: #fffbdd; }
  to { background-color: transparent; }
`;

const Wrapper = styled.div`
  padding: 2rem;
  color: rgb(151, 155, 155);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AnimatedListWrapper = styled.div`
  animation: ${fadeInHighlight} 1.5s ease;
`;

const PostCard = styled.div`
  background: #1a1a1b;
  border: 1px solid #343536;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #2a2a2b;
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Meta = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: #888;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);
  const topRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
    // Instantly scroll to top of posts (offset for navbar)
    setTimeout(() => {
      const offsetTop = topRef.current?.offsetTop || 0;
      window.scrollTo({ top: offsetTop - 80, behavior: "auto" });
    }, 0);
  }, [dispatch, selectedSubreddit]);

  return (
    <Wrapper ref={topRef}>
      <h1>Welcome to Reddit Clone! 🎉</h1>
      <p>Explore trending posts. Sign in to vote, comment, or post your own.</p>

      {status === "loading" && <Spinner />}
      {status === "succeeded" && posts.length > 0 && (
        <AnimatedListWrapper>
          {posts.slice(0, 10).map((post) => (
            <PostCard key={post.id}>
              <Title>{post.title}</Title>
              <Meta>by u/{post.author}</Meta>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </PostCard>
          ))}
        </AnimatedListWrapper>
      )}
      {status === "failed" && <p>Failed to load posts. Please try again.</p>}
    </Wrapper>
  );
};

export default HomePage;
