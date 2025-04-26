// src/components/Layout/NoSidebarLayout.js
import React from "react";
import styled from "styled-components";
import Footer from "./Footer.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const NoSidebarLayout = ({ children }) => {
  return (
      <Wrapper>
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default NoSidebarLayout;
