// src/components/LikeButton.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const LikeButton = ({ itemId, itemType }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const itemRef = doc(db, itemType, itemId);
    const unsubscribe = onSnapshot(itemRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikeCount(data.likes.length);
        setLiked(data.likes.includes(userId));
      }
    });
    return () => unsubscribe();
  }, [itemId, itemType, userId]);

  const handleLike = async () => {
    const itemRef = doc(db, itemType, itemId);
    if (liked) {
      await updateDoc(itemRef, {
        likes: arrayRemove(userId),
      });
    } else {
      await updateDoc(itemRef, {
        likes: arrayUnion(userId),
      });
    }
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default LikeButton;
