// src/components/Layout/NoSidebarLayout.js
import React from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 260px;
  padding: 1rem;
  background: #1a1a1b;
  border-right: 1px solid #343536;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4); // 🔥 Adds depth
  z-index: 2;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background: #030303;
  color: white;
  z-index: 1;
`;


const NoSidebarLayout = ({ children }) => {
  return (
    <Layout>
      <Sidebar>
        <SubredditList />
      </Sidebar>
      <Main>{children}</Main>
    </Layout>
  );
};

export default NoSidebarLayout;
