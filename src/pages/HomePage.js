// src/pages/HomePage.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchPosts } from "../features/posts/postsSlice.js";
import { Link } from "react-router-dom";
import Spinner from "../components/UI/Spinner.js";

const Wrapper = styled.div`
  padding: 2rem;
  color: rgb(151, 155, 155);
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
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const postListRef = useRef(null);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);

useEffect(() => {
  dispatch(fetchPosts(selectedSubreddit));
}, [dispatch, selectedSubreddit]);

  return (
    <Wrapper>
      <h1>Welcome to Reddit Clone! 🎉</h1>
      <p>Explore trending posts. Sign in to vote, comment, or post your own.</p>

      {status === "loading" && <Spinner />}
      {status === "succeeded" && posts.length > 0 && (
        <div>
          {posts.slice(0, 5).map((post) => (
            <PostCard key={post.id}>
              <h3>{post.title}</h3>
              <p>by u/{post.author}</p>
              <Link to={`/post/${post.id}`}>Read more</Link>
            </PostCard>
          ))}
        </div>
      )}
      {status === "failed" && <p>Failed to load posts. Please try again.</p>}
    </Wrapper>
  );
};

export default HomePage;
