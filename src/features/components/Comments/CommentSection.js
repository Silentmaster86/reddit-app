import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../../../firebase.js';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDoc, doc, deleteDoc } from 'firebase/firestore';
import LikeButton from '../userItems/LikeButton.js';
import { useAuth } from '../../../hooks/useAuth'; // Import the useAuth hook

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const user = useAuth(); // Use the useAuth hook to get the current user
  const redditUser = useSelector((state) => state.auth.user); // Redux user
  console.log("Reddit User from Redux:", redditUser); // Debugging

  useEffect(() => {
    if (!user) {
      console.log("User not authenticated, skipping Firestore query.");
      return;
    }

    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const commentsData = await Promise.all(
          snapshot.docs.map(async (documentSnapshot) => {
            const commentData = documentSnapshot.data();
            console.log("Fetched Comment Data:", commentData);

            const authorRef = doc(db, 'users', commentData.authorId);
            const authorSnap = await getDoc(authorRef);
            const authorData = authorSnap.exists() ? authorSnap.data() : { username: 'Unknown' };
            return { id: documentSnapshot.id, ...commentData, author: authorData };
          })
        );
        setComments(commentsData);
      } catch (error) {
        console.log('Error fetching comments:', error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [postId, user]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      console.log('Comment cannot be empty');
      return;
    }

    const currentUser = user || redditUser; // Use whichever user is logged in (Firebase or Redux)
    const userId = currentUser?.uid || currentUser?.id;

    if (!userId) {
      console.log('User is not authenticated');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        postId,
        content: newComment,
        authorId: userId,
        timestamp: serverTimestamp(),
      });

      console.log("Comment added successfully!");

      setComments((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          content: newComment,
          authorId: userId,
          timestamp: { toDate: () => new Date() }, // Simulated timestamp
          author: { username: currentUser?.displayName || 'Unknown' }, // Use the user's display name
        },
      ]);

      setNewComment(''); // Clear the input field after submission
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId, authorId) => {
    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    // Check if the user is the comment author
    if (user.uid !== authorId) {
      console.log('You can only delete your own comments');
      return;
    }

    try {
      // Perform the Firestore delete operation
      await deleteDoc(doc(db, 'comments', commentId));
      console.log('Comment deleted successfully');

      // Update local state to remove the deleted comment
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
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
            {user && user.uid === comment.authorId && (
              <button onClick={() => handleDeleteComment(comment.id, comment.authorId)}>
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
