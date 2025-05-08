// src/components/Layout/Layout.js
import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";
import SoundBar from "./SoundBar.js";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.body || "#1a1a1b"};
  margin-top: 1rem;
  border-radius: 15px;
`;

const SidebarWrapper = styled.aside`
  padding: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 100%;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <SoundBar />
      <ContentArea>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <MainContent>{children}</MainContent>
      </ContentArea>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
