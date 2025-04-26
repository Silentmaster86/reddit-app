// src/features/users/UserProfile.js
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <ProfileContainer>
      <h2>User Profile</h2>
      {user ? (
        <>
          <p><strong>Username:</strong> {user.displayName}</p>
          <p><strong>UID:</strong> {user.uid}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;