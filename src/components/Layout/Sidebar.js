import React from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const SidebarContainer = styled.aside`
  width: 300px;
  min-width: 250px;
  background-color: #f6f7f8;
  border-right: 1px solid #ddd;
  min-height: 100vh;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>Subreddits</SidebarHeader>
      <SubredditList />
    </SidebarContainer>
  );
};

export default Sidebar;
