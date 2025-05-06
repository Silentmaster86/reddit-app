// src/pages/HomePage.js
import React from "react";
import styled from "styled-components";
import PostList from "../features/posts/PostList.js";

const Wrapper = styled.div`
  padding: 2rem;
  color: rgb(151, 155, 155);
`;

const HomePage = () => {
  return (
    <Wrapper>
      <PostList />
    </Wrapper>
  );
};

export default HomePage;
