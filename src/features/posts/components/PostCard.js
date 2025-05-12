import React from 'react';
import LikeButton from '../../components/userItems/LikeButton.js';
import styled from 'styled-components';

const Card = styled.div`
  background: #1a1a1b;
  border: 1px solid #343536;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: background 0.2s;
  font-size: 1rem;

  &:hover {
    background: #2a2a2b;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.85rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Meta = styled.p`
  font-size: 0.9rem;
  color: #bbb;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Score = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #ff4500;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;


const PostCard = React.memo(({ post }) => {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Meta>Posted by: {post.author}</Meta>
      <Score>Score: {post.score}</Score>
      <LikeButton itemId={post.id} itemType="posts" />
    </Card>
  );
});

export default PostCard;
