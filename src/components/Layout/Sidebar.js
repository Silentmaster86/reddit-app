import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SubredditList from "../../features/posts/SubredditList.js";
import SignOut from "../../features/auth/SignOut.js";
import ThemeSwitcher from "../Shared/ThemeSwitcher.js";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext.js";

const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem 1rem;
`;

const SidebarHeader = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FooterSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const Sidebar = ({ onLinkClick, open }) => {
  const sidebarRef = useRef(null);
  const { toggleTheme, themeName } = useTheme();
  const { isAuthenticated, user, provider } = useSelector((state) => state.auth);

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
