// src/components/CreatePost.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
    alert("You must be logged in to create a post.");
    return;
  }

    try {
    await addDoc(collection(db, `posts/${postId}/comments`), {
      text: commentText,
      authorId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    alert("Failed to add comment. Please try again.");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
