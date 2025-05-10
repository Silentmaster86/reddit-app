import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #f6f7f8;
  border-right: 1px solid #ddd;
  min-height: 100vh;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    padding: 1rem;
  }
`;

const SidebarHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Sidebar = ({ onLinkClick }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (open && sidebarRef.current) {
      sidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [open]);
  
  return (
    <SidebarContainer ref={sidebarRef}>
      <SidebarHeader>Subreddits</SidebarHeader>
      <SubredditList onItemClick={onLinkClick} />
    </SidebarContainer>
  );
};

export default Sidebar;
