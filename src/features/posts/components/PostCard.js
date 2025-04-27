import React from 'react';
import LikeButton from '../../components/userItems/LikeButton.js';
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
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
