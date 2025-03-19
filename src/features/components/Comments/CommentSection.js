// src/components/CommentsSection.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import LikeButton from '../userItems/LikeButton';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentsData = await Promise.all(
        snapshot.docs.map(async (documentSnapshot) => {
          const commentData = documentSnapshot.data();
          const authorRef = doc(db, 'users', commentData.authorId);
          const authorSnap = await getDoc(authorRef);
          const authorData = authorSnap.exists() ? authorSnap.data() : { username: 'Unknown' };
          return { id: doc.id, ...commentData, author: authorData };
        })
      );
      setComments(commentsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, [postId]);

  

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.log('User is not authenticated');
    }
    const commentsRef = collection(db, 'comments');
    await addDoc(commentsRef, {
      postId,
      authorId: user.uid,
      content: newComment,
      timestamp: serverTimestamp(),
    });
    setNewComment('');
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString(); // Customize the format as needed
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" disabled={!user}>Comment</button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.author.username}</strong> says:</p>
            <p>{comment.content}</p>
            <p><em>{formatTimestamp(comment.timestamp)}</em></p>
            <LikeButton itemId={comment.id} itemType="comments" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
