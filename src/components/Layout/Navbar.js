import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SignOut from "../../features/auth/SignOut.js";
import ThemeSwitcher from "../Shared/ThemeSwitcher.js";
import { useTheme } from "../../context/ThemeContext.js";
import { useSoundBarToggle } from "../../context/SoundBarContext.js";

const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 2px solid #ff4500;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.7rem;
  font-weight: bold;
  color: #ff4500;
  text-decoration: none;
`;

const Hamburger = styled.button`
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 700;

  &:hover {
    color: #ff4500;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Navbar = ({ onToggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, provider } = useSelector((state) => state.auth);
  const { toggleTheme, themeName } = useTheme();
  const { toggleVisible } = useSoundBarToggle();

  return (
    <Nav>
      <NavHeader>
        <Hamburger onClick={onToggleSidebar}>☰</Hamburger>
    
        <Logo to="/">RedditClone</Logo>

        <button
          onClick={toggleVisible}
          title="Toggle SoundBar"
          style={{
            background: "transparent",
            border: "none",
            color: "#ff4500",
            fontSize: "1.4rem",
            cursor: "pointer",
            marginLeft: "1rem"
          }}
            <span role="img" aria-label="Music">🎵</span>
        </button>
      </NavHeader>
    </Nav>
  );
};

export default Navbar;
