// src/components/Layout/Layout.js
import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";

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

    @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarWrapper = styled.aside`
  padding: 1rem;

    @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #343536;
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
  return (
    <LayoutWrapper>
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
