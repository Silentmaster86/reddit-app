// src/features/posts/CommentSection.js

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth.js";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from "../../components/UI/LikeButton.js";
import { Trash2 } from "lucide-react";

const Wrapper = styled.div`
  margin-top: 2rem;
  padding: 0 1rem;

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  border-radius: 6px;
  resize: vertical;
  min-height: 100px;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  background: #0079d3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;

  &:hover {
    background: #1484d6;
  }
`;

const CommentList = styled.div`
  margin-top: 2rem;
`;

const SingleComment = styled(motion.div)`
  padding: 1rem;
  background: #1a1a1b;
  border: 1px solid #343536;
  border-radius: 6px;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  color: #d7dadc;
  display: flex;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
`;

const CommentTime = styled.div`
  font-size: 0.8rem;
  color: #818384;
`;

const animationVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (isNew) => ({
    opacity: 1,
    y: 0,
    backgroundColor: isNew ? "#0079d3" : "#1a1a1b",
    transition: { duration: 0.5 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [justPostedId, setJustPostedId] = useState(null);
  const user = useAuth();
  const redditUser = useSelector((state) => state.auth.user);
  const provider = useSelector((state) => state.auth.provider);

  const fetchRedditComments = async () => {
    try {
      const res = await fetch(`https://www.reddit.com/comments/${postId}.json`);
      const json = await res.json();
      const redditComments = json[1].data.children.map((c) => c.data);
      setComments(redditComments);
    } catch (err) {
      console.error("Reddit comment fetch failed", err);
    }
  };

  useEffect(() => {
    if (!postId) return;

    if (provider === "reddit") {
      fetchRedditComments();
    } else if (provider === "firebase") {
      const commentsQuery = query(
        collection(db, "comments"),
        where("postId", "==", postId)
      );

      const unsubscribe = onSnapshot(commentsQuery, async (snapshot) => {
        const fetchedComments = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const commentData = docSnap.data();
            const authorSnap = await getDoc(doc(db, "users", commentData.authorId));
            const author = authorSnap.exists() ? authorSnap.data() : { username: "Unknown" };
            return { id: docSnap.id, ...commentData, author };
          })
        );
        setComments(fetchedComments);
      });

      return () => unsubscribe();
    }
  }, [postId, provider]);

  const handleDelete = async (commentId) => {
    if (provider === "firebase") {
      if (!window.confirm("Delete this comment?")) return;
      try {
        await deleteDoc(doc(db, "comments", commentId));
      } catch (err) {
        console.error("Failed to delete Firebase comment", err);
      }
    } else {
      alert("❌ Reddit comments can only be deleted on reddit.com");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (provider === "reddit") {
      const accessToken = redditUser?.accessToken;
      if (!accessToken) return alert("You must be logged in with Reddit to comment.");

      try {
        const response = await fetch("https://oauth.reddit.com/api/comment", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            api_type: "json",
            thing_id: `t3_${postId}`,
            text: newComment,
          }),
        });

        const data = await response.json();
        if (data?.json?.errors?.length) throw new Error(data.json.errors[0][1]);

        setNewComment("");
        fetchRedditComments();
      } catch (err) {
        console.error("❌ Reddit comment failed:", err);
        alert("Failed to post comment on Reddit.");
      }
      return;
    }

    const currentUser = user;
    const userId = currentUser?.uid;

    if (!userId) return alert("You must be logged in to comment.");

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        postId,
        content: newComment,
        authorId: userId,
        timestamp: serverTimestamp(),
      });
      setJustPostedId(docRef.id);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment to Firebase:", err);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleString();
  };

  return (
    <Wrapper>
      {(provider === "reddit" || provider === "firebase") && (
        <CommentForm onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <SubmitButton type="submit">Post Comment</SubmitButton>
        </CommentForm>
      )}

      <CommentList>
        <AnimatePresence>
          {comments.map((comment) => (
            <SingleComment
              key={comment.id}
              variants={animationVariant}
              custom={comment.id === justPostedId}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <CommentAuthor>
                {comment.author?.username || comment.author || "Anonymous"}
                {(comment.authorId === user?.uid || comment.author === redditUser?.name) && (
                  <Trash2
                    size={16}
                    style={{ cursor: "pointer" }}
                    title="Delete comment"
                    onClick={() => handleDelete(comment.id)}
                  />
                )}
              </CommentAuthor>
              <CommentContent>{comment.content || comment.body}</CommentContent>
              <CommentTime>
                {comment.timestamp ? formatTimestamp(comment.timestamp) : ""}
              </CommentTime>
              {provider === "firebase" && <LikeButton itemId={comment.id} itemType="comments" />}
            </SingleComment>
          ))}
        </AnimatePresence>
      </CommentList>
    </Wrapper>
  );
};

export default CommentSection;
