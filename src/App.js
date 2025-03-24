import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './features/posts/postsSlice.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load components
const PostList = React.lazy(() => import('./features/components/PostsList/PostList.js'));
const PostDetails = React.lazy(() => import('./features/components/PostDetail/PostDetails.js'));
const SearchBar = React.lazy(() => import('./features/search/SearchBar.js'));
const CategoryFilter = React.lazy(() => import('./features/components/Category/CategoryFilter.js'));
const UserProfile = React.lazy(() => import('./features/components/user/UserProfile.js'));
const SignUp = React.lazy(() => import('./features/components/login/SignUp.js'));
const SignIn = React.lazy(() => import('./features/components/login/SignIn.js'));
const SignOut = React.lazy(() => import('./features/components/login/SignOut.js'));
const AuthObserver = React.lazy(() => import('./Authobserver.js'));
const RedditLogin = React.lazy(() => import('./features/components/reddit/RedditLogin.js'));
const OAuthCallback = React.lazy(() => import('./features/components/reddit/OAuthCallback.js'));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Router>
      <header className="navbar">
        <Link to="/" className="logo">Reddit Clone</Link>
        <div className="lead">
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <SignOut />
            </>
          ) : (
            <>
              <Link className="link" to="/signin">Sign In</Link>
              <Link className="link" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
        <div className="search-container">
          <AuthObserver />
          <SearchBar />
          <CategoryFilter />
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <PostList /> : <RedditLogin />} />
            <Route path="/post/:postId" element={<PostDetails />} />
            <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/signin" element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/signin" />} />
            <Route path="/auth/callback" element={<OAuthCallback code={new URLSearchParams(window.location.search).get('code')} />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;

