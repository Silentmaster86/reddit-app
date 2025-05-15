import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import useIsMobile from "../../hooks/useIsMobile.js";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.body || "#1a1a1b"};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarContainer = styled.div`
  width: 300px;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? "0" : "-250px")};
    height: 100vh;
    background: #1a1a1b;
    z-index: 1001;
    transition: left 0.3s ease;
  }

  @media (min-width: 1025px) {
    position: static;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  max-width: fit-content;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;


const BottomBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a1b;
    padding: 0.75rem 1rem;
    justify-content: center;
    z-index: 1002;
    border-top: 1px solid #343536;
  }
`;

const BottomButton = styled.button`
  background: none;
  border: none;
  color: #ff4500;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const isMobile = useIsMobile();
  
  return (
    <LayoutWrapper>
      <Navbar onToggleSidebar={toggleSidebar}/>


      <ContentArea>
         {/* Sidebar (conditionally rendered) */}
          {(!isMobile || sidebarOpen) && (
          <SidebarContainer open={sidebarOpen}>
          <Sidebar open={sidebarOpen} onLinkClick={closeSidebar} />
          </SidebarContainer>
        )}
      {/* Overlay (mobile only) */}
      <Overlay open={sidebarOpen} onClick={closeSidebar} />

        <MainContent>{children}</MainContent>
      </ContentArea>
      {/* Mobile bottom bar */}
      <BottomBar>
        <BottomButton onClick={toggleSidebar} title="Browse Subreddits">
        🧭 Subreddits
        </BottomButton>
        </BottomBar>
        
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
