import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SignOut from "../../features/auth/SignOut.js";
import ThemeSwitcher from "../Shared/ThemeSwitcher.js";
import { useTheme } from "../../context/ThemeContext.js";
import { useSoundBarToggle } from "../../context/SoundBarContext.js";
import { FaMusic } from "react-icons/fa";


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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, provider } = useSelector((state) => state.auth);
  const { toggleTheme, themeName } = useTheme();

  return (
    <Nav>
      <NavHeader>
        <Logo to="/">RedditClone</Logo>

        <button
          onClick={toggleVisible}
          style={{
          background: "transparent",
          border: "none",
          color: "#ff4500",
          fontSize: "1.4rem",
          cursor: "pointer",
          marginLeft: "1rem"
      }}
    title={isCompact ? "Expand SoundBar" : "Collapse SoundBar"}
  >
    <FaMusic />
  </button>
    
        <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>☰</Hamburger>
      </NavHeader>

      <NavLinks open={menuOpen}>
        <NavLink to="/">Home</NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <SignOut />
            {provider === "reddit" && user?.avatar && (
              <UserInfo>
                <Avatar src={user.avatar} alt="avatar" />
                <span>{user.name}</span>
              </UserInfo>
            )}
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}

        <ThemeSwitcher toggleTheme={toggleTheme} currentTheme={themeName} />
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
