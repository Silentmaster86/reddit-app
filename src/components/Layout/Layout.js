import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";

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
  width: 250px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? "0" : "-250px")};
    height: 100vh;
    width: 250px;
    background: #1a1a1b;
    z-index: 1001;
    transition: left 0.3s ease;
  }

  @media (min-width: 769px) {
    position: static;
    width: 250px;
  }
`;

const Overlay = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <LayoutWrapper>
      <Navbar onToggleSidebar={toggleSidebar}/>


      <ContentArea>
      {/* Content area with sidebar and main */}
        <SidebarContainer>
          <Sidebar open={sidebarOpen} onLinkClick={closeSidebar} />
        </SidebarContainer>
      {/* Overlay (mobile only) */}
      <Overlay open={sidebarOpen} onClick={closeSidebar} />

        <MainContent>{children}</MainContent>
      </ContentArea>

      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
