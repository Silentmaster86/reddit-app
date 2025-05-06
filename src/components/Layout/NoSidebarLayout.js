// src/components/Layout/NoSidebarLayout.js
import React from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background: #030303;
  color: white;
`;

const NoSidebarLayout = ({ children }) => {
  return (
    <Layout>
        <Sidebar />
      <Main>{children}</Main>
      <Footer />
    </Layout>
  );
};

export default NoSidebarLayout;
