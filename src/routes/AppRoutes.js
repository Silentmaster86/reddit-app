import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute.js";
import Layout from "../components/Layout/Layout.js";
import Spinner from "../components/UI/Spinner.js";

// Lazy-loaded pages
const HomePage = React.lazy(() => import("../pages/HomePage.js"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage.js"));
const SignInPage = React.lazy(() => import("../pages/SignInPage.js"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage.js"));
const OAuthCallback = React.lazy(() => import("../features/auth/OAuthCallback.js"));
const NotFound = React.lazy(() => import("../pages/NotFound.js"));
const PostDetails = React.lazy(() => import("../features/posts/PostDetails.js"));

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
<Route
  path="/"
  element={
    <Layout>
      <HomePage />
    </Layout>
  }
/>
<Route
  path="/post/:postId"
  element={
    <Layout>
      <PostDetails />
    </Layout>
  }
/>
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Layout>
        <ProfilePage />
      </Layout>
    </PrivateRoute>
  }
/>

        <Route path="/signin" element={!isAuthenticated ? <SignInPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />


      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
