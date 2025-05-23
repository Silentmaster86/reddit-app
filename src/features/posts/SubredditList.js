import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSubreddit, setSubreddits, fetchPosts } from "./postsSlice.js";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../../components/UI/Spinner.js";

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #404040;
  color: #fff;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: #272729;
  border: 1px solid #343536;
  color: #d7dadc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0079d3;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;
  background: ${({ $active }) => ($active ? "#272729" : "transparent")};

  &:hover {
    background: #343536;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0;
  }
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.6rem;
  background: #fff;

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }
`;

const SubredditName = styled.span`
  font-weight: bold;
  color: #d7dadc;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const fallbackIcon = "https://www.redditstatic.com/icon.png";

const staticSubreddits = [
  {
    id: "all",
    display_name: "all",
    display_name_prefixed: "r/all",
    icon_img: "https://www.redditstatic.com/avatars/avatar_default_01_24A0ED.png",
  },
  {
    id: "popular",
    display_name: "popular",
    display_name_prefixed: "r/popular",
    icon_img: "https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png",
  }
];

const SubredditList = ({ onItemClick }) => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);
  const subreddits = useSelector((state) => state.posts.subreddits);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get("https://www.reddit.com/subreddits/popular.json");
        const subredditData = response.data.data.children.map((sub) => sub.data);
        dispatch(setSubreddits(subredditData));
      } catch (error) {
        console.error("❌ Failed to load subreddits:", error);
        setError("Failed to load subreddits. Try again later.");
      }
    };

    fetchSubreddits();
  }, [dispatch]);

  const handleClick = (sub) => {
    dispatch(setSelectedSubreddit(sub.display_name));
    dispatch(fetchPosts(sub.display_name)); 
    if (onItemClick) onItemClick(); // ✅ closes sidebar on mobile
  };

  const combinedSubreddits = [...staticSubreddits, ...subreddits];
  const filteredSubreddits = combinedSubreddits.filter((sub) =>
    sub.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <Title>Popular Subreddits</Title>
      <SearchInput
        type="text"
        placeholder="Search subreddit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      
      {subreddits.length === 0 && !error ? (
        <Spinner />
      ) : (
        <List>
          {filteredSubreddits.length > 0 ? (
            filteredSubreddits.map((sub) => (
              <ListItem
                key={sub.id}
                onClick={() => handleClick(sub)}
                $active={selectedSubreddit === sub.display_name}
              >
                <Icon
                  src={
                    sub.icon_img && sub.icon_img.startsWith("https")
                      ? sub.icon_img
                      : sub.community_icon && sub.community_icon.startsWith("https")
                      ? sub.community_icon
                      : fallbackIcon
                  }
                  onError={(e) => (e.target.src = fallbackIcon)}
                  alt={sub.display_name}
                />
                <SubredditName>{sub.display_name_prefixed}</SubredditName>
              </ListItem>
            ))
          ) : (
            <p>No subreddits found.</p>
          )}
        </List>
      )}
    </Wrapper>
  );
};

export default SubredditList;

