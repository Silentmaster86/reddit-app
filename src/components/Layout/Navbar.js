import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 10;
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
  gap: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 700;

  &:hover {
    color: #ff4500;
  }
`;

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Nav>
      <Logo to="/">RedditClone</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/signout">Logout</NavLink>
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
