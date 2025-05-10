import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";

const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const SidebarHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Sidebar = ({ onLinkClick, open }) => {
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
