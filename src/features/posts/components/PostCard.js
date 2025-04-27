import React from 'react';
import LikeButton from '../../components/userItems/LikeButton.js';
import styled from "styled-components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #878a8c;
`;

const PostContent = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1c1c1c;
`;

const Meta = styled.div`
  font-size: 0.8rem;
  color: #7c7c7c;
  margin-bottom: 1rem;
`;

const PostText = styled.p`
  font-size: 1rem;
  color: #333;
`;

const PostCard = ({ title, author, text, votes }) => {
  return (
    <Card>
      <VoteSection>
        <FaArrowUp style={{ cursor: "pointer" }} />
        <div>{votes}</div>
        <FaArrowDown style={{ cursor: "pointer" }} />
      </VoteSection>
      <PostContent>
        <Title>{title}</Title>
        <Meta>Posted by u/{author}</Meta>
        <PostText>{text}</PostText>
      </PostContent>
    </Card>
  );
};

export default PostCard;

