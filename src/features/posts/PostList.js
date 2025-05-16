import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Pagination from "../../components/UI/Pagination.js";
import Spinner from "../../components/UI/Spinner.js";
import PostCard from "./components/PostCard.js";
import styled from "styled-components";

// Styled wrapper for scoped styling
const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f6f7f8;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StyledList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledItem = styled(motion.li)`
  list-style: none;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.9rem;
  font-size: 1rem;
  background-color: ${({ active }) => (active ? "#005fcc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  z-index: 100;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function PostList() {
  const dispatch = useDispatch();
  const {
    status,
    error,
    selectedSubreddit,
    searchTerm,
    category,
    posts,
  } = useSelector((state) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const pageRange = 2;

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, selectedSubreddit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubreddit, searchTerm, category]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "all" || post.subreddit === category)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, i) =>
      typeof number === "number" ? (
        <PageButton
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </PageButton>
      ) : (
        <span key={`ellipsis-${i}`} style={{ padding: "0.5rem 0.8rem" }}>...</span>
      )
    );
  };

  
  return (
    <Wrapper>
      <h1>
        {filteredPosts.length > 0
          ? `Posts from r/${selectedSubreddit}`
          : "No posts found"}
      </h1>

      <StyledList>
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <StyledLink to={`/post/${post.id}`} key={post.id}>
              <StyledItem
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} />
              </StyledItem>
            </StyledLink>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </StyledList>

      {filteredPosts.length > postsPerPage && (
        <PaginationWrapper>
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀
          </PageButton>
          {renderPageNumbers()}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </PageButton>
        </PaginationWrapper>
      )}

      {currentPage > 1 && (
        <BackToTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑ Back to Top
        </BackToTopButton>
      )}
    </Wrapper>
  );
}
