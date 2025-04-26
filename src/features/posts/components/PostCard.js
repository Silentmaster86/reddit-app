import React from 'react';
import LikeButton from '../../components/userItems/LikeButton.js';
import "./PostCard.css"

const PostCard = React.memo(({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>Posted by: {post.author}</p>
      <p>Score: {post.score}</p>
      <LikeButton itemId={post.id} itemType="posts" />=
    </div>
  );
});

export default PostCard;
