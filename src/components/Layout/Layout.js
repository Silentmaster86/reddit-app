// src/components/Layout/Layout.js
import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar.js";
import Footer from "./Footer.js";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 120rem;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
    background-color:rgb(255, 255, 255);
  color: #fff;
  border-radius: 8px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.body || "#1a1a1b"};
  color: ${({ theme }) => theme.text || "#d7dadc"};
  min-height: calc(100vh - 60px - 50px);
  border-radius: 8px;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <ContentArea>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </ContentArea>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
