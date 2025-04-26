// src/pages/ProfilePage.js
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Wrapper>
      <Card>
        <h2>User Profile</h2>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
            <p><strong>UID:</strong> {user.uid}</p>
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </Card>
    </Wrapper>
  );
};

export default ProfilePage;
