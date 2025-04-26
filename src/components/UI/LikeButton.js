import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.js';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const LikeButton = ({ itemId, itemType }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setUserId] = useState(null); // Store user ID after authentication
  const [loading, setLoading] = useState(true); // Handle loading state

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); // Update userId when authenticated
      } else {
        setUserId(null); // Clear userId if not authenticated
      }
    });

    return () => unsubscribeAuth(); // Clean up onAuthStateChanged listener
  }, []);

  useEffect(() => {
    if (!userId) return; // Skip if user is not authenticated

    const itemRef = doc(db, itemType, itemId);
    const unsubscribe = onSnapshot(itemRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const likesArray = Array.isArray(data?.likes) ? data.likes : [];
        setLikeCount(likesArray.length);
        setLiked(userId ? likesArray.includes(userId) : false);
      } else {
        setLikeCount(0);
        setLiked(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [itemId, itemType, userId]);

  const handleLike = async () => {
    if (!userId) {
      console.log('User not authenticated');
      return; // Prevent liking if user is not logged in
    }

    try {
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
    } catch (error) {
      console.error('Error updating like:', error); // Error handling
    }
  };

  if (loading) return <button>Loading...</button>; // Display loading state while fetching data

  return (
    <button onClick={handleLike} disabled={!userId}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default LikeButton;
