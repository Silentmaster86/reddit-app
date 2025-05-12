// src/components/Layout/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SignOut from "../../features/auth/SignOut.js";
import ThemeSwitcher from "../Shared/ThemeSwitcher.js";
import { useTheme } from "../../context/ThemeContext.js";

const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 2px solid #ff4500; /* 🔥 Orange Reddit border */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;


const Logo = styled(Link)`
  font-size: 1.7rem;
  font-weight: bold;
  color: #ff4500;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 700;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4500;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const { toggleTheme, themeName } = useTheme();

const Navbar = () => {
  const { isAuthenticated, user, provider } = useSelector((state) => state.auth);

  return (
    <ThemeSwitcher toggleTheme={toggleTheme} currentTheme={themeName} />
    <Nav>
      <Logo to="/">RedditClone</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>

{isAuthenticated ? (
  <>
    <NavLink to="/profile">Profile</NavLink>

    <SignOut /> {/* ✅ use the real logout button here */}

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
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
