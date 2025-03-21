// src/components/CommentsSection.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDoc, doc, deleteDoc } from 'firebase/firestore';
import LikeButton from '../userItems/LikeButton';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {

    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const commentsData = await Promise.all(
          snapshot.docs.map(async (documentSnapshot) => {
            const commentData = documentSnapshot.data();

            // Log the authorId to ensure it exists
            console.log('Author ID:', commentData.authorId);

            const authorRef = doc(db, 'users', commentData.authorId);
            const authorSnap = await getDoc(authorRef);
      
            // Ensure authorData is always an object
            const authorData = authorSnap.exists() ? authorSnap.data() : { username: 'Unknown' };

            return { id: documentSnapshot.id, ...commentData, author: authorData };
          })
        );
        setComments(commentsData);
      } catch (error) {
        setLoading(false);
      }
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
    return;
  }

  if (!newComment.trim()) {
    console.log('Comment cannot be empty');
    return;
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

    const handleDeleteComment = async (commentId, authorId) => {
    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    if (user.uid !== authorId) {
      console.log('You can only delete your own comments');
      return;
    }

    try {
      await deleteDoc(doc(db, 'comments', commentId));
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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
        {!user && <p>Please sign in to post a comment.</p>}
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.author.username}</strong> says:</p>
            <p>{comment.content}</p>
            <p><em>{formatTimestamp(comment.timestamp)}</em></p>
            <LikeButton itemId={comment.id} itemType="comments" />
            <span>  </span>
            {user && user.uid === comment.authorId && (
              <button onClick={() => handleDeleteComment(comment.id, comment.authorId)}>
             🗑️</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
