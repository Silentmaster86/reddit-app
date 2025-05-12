// src/pages/HomePage.js import React, { useEffect, useRef } from "react"; import { useDispatch, useSelector } from "react-redux"; import styled, { keyframes } from "styled-components"; import { fetchPosts } from "../features/posts/postsSlice.js"; import { Link } from "react-router-dom"; import Spinner from "../components/UI/Spinner.js";

const fadeInHighlight = keyframesfrom { background-color: #fffbdd; } to { background-color: transparent; };

const Wrapper = styled.div` padding: 2rem; color: rgb(151, 155, 155);

@media (max-width: 768px) { padding: 1rem; } `;

const AnimatedListWrapper = styled.divanimation: ${fadeInHighlight} 1.5s ease;;

const PostCard = styled.div` background: #1a1a1b; border: 1px solid #343536; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; transition: background 0.2s;

&:hover { background: #2a2a2b; } `;

const Title = styled.h3` font-size: 1.2rem; color: #fff;

@media (max-width: 768px) { font-size: 1rem; } `;

const Meta = styled.pfont-size: 0.9rem; color: #ccc; margin-bottom: 0.5rem;;

const HomePage = () => { const dispatch = useDispatch(); const { posts, status } = useSelector((state) => state.posts); const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit); const { isAuthenticated, provider, user } = useSelector((state) => state.auth); const topRef = useRef(null);

useEffect(() => { dispatch(fetchPosts(selectedSubreddit)); setTimeout(() => { const offsetTop = topRef.current?.offsetTop || 0; window.scrollTo({ top: offsetTop - 80, behavior: "auto" }); }, 0); }, [dispatch, selectedSubreddit]);

return ( <Wrapper ref={topRef}> {!isAuthenticated && ( <> <h1>Welcome to Reddit Clone! 🎉</h1> <p>Explore trending posts. Sign in to vote, comment, or post your own.</p> </> )}

{isAuthenticated && provider === "reddit" && (
    <>
      <h1>Welcome back, {user?.name || "Reddit user"}! 👋</h1>
      <p>You’re logged in via Reddit. You can browse, comment, and upvote directly on Reddit!</p>
    </>
  )}

  {isAuthenticated && provider === "firebase" && (
    <>
      <h1>Welcome back, {user?.name || user?.email || "user"}! 🔥</h1>
      <p>You’re logged in with email. You can vote, comment, and enjoy all features locally.</p>
    </>
  )}

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

); };

export default HomePage;

