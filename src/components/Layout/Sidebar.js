import React from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const SidebarContainer = styled.aside`
  width: 350px;
  padding: 1rem;
  background-color: #f6f7f8;
  border-right: 1px solid #ddd;
  min-height: 100vh;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SubredditList />
    </SidebarContainer>
  );
};

export default Sidebar;