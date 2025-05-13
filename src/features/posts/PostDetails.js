import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/UI/Spinner.js";
import CommentSection from "./CommentSection.js";

const Wrapper = styled.div`
  padding: 2rem;
  color: #d7dadc;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackLink = styled(Link)`
  font-size: 0.85rem;
  color: #818384;
  text-decoration: none;
  display: inline-block;
  margin: 1.5rem 0 1rem;

  &:hover {
    text-decoration: underline;
    color: #d7dadc;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const PostMeta = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 1rem;
`;

const Thumbnail = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const PostText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
`;

const Comment = styled.div`
  border-left: 2px solid #ff4500;
  padding-left: 1rem;
  margin-bottom: 1.2rem;

  p {
    margin: 0.25rem 0;
  }

  strong {
    color: #ffb000;
  }
`;

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.reddit.com/comments/${postId}.json`);
        const json = await res.json();

        const postData = json[0].data.children[0].data;
        const commentData = json[1].data.children.map((c) => c.data);

        setPost(postData);
        setComments(commentData);
        setError(null);
      } catch (err) {
        console.error("Failed to load post details", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
    window.scrollTo({ top: 0, behavior: "instant" }); // ⚡ scroll immediately on load
  }, [postId]);

  if (loading) return <Spinner />;
  if (error) return <Wrapper><p>{error}</p></Wrapper>;
  if (!post) return <Wrapper><p>Post not found.</p></Wrapper>;

  return (
    <Wrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostMeta>Posted by u/{post.author}</PostMeta>

      {post.preview?.images?.[0]?.source?.url && (
        <Thumbnail
          src={post.preview.images[0].source.url.replace(/&amp;/g, "&")}
          alt="preview"
        />
      )}

      {post.selftext && <PostText>{post.selftext}</PostText>}

      <BackLink to="/">← Back to Posts</BackLink>

      <CommentsSection>
        <CommentSection postId={post.id} />
      </CommentsSection>
    </Wrapper>
  );
};

export default PostDetails;
