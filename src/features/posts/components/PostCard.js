import React from 'react';
import LikeButton from '../../components/userItems/LikeButton.js';
import styled from 'styled-components';

const Card = styled.div`
  background: #1a1a1b;
  border: 1px solid #343536;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: background 0.2s;
  font-size: 1rem;

  &:hover {
    background: #2a2a2b;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #1c1c1c;
`;

const Meta = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

const Score = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #ff4500;
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
