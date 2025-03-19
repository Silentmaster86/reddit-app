import React from 'react';
import { useSelector } from 'react-redux';
import './postModal.css';

export default function PostModal({ postId, onClose }) {
  const post = useSelector((state) =>
    state.posts.items.find((p) => p.id === postId)
  );

  if (!post) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{post.title}</h2>
        <p>{post.selftext}</p>
        <p><strong>Author:</strong> {post.author}</p>
        <p><strong>Score:</strong> {post.score}</p>
      </div>
    </div>
  );
}
