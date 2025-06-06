import React from 'react';
import LikeButton from '../../../components/UI/LikeButton.js';
import styled from 'styled-components';

const Card = styled.div`
  display: block;
  background: #1a1a1b;
  border: 1px solid #343536;
  padding: 1.25rem;
  margin-bottom: 0.3rem;
  border-radius: 8px;
  transition: background 0.2s;
  font-size: 1rem;
  line-height: 1.8;

  &:hover {
    background: #2a2a2b;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.7rem;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 0.9rem;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LikeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Meta = styled.p`
  font-size: 0.8rem;
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
      <LikeRow>
        <Score>Score: {post.score}</Score>
        <LikeButton itemId={post.id} itemType="posts" />
      </LikeRow>

    </Card>
  );
});

export default PostCard;
