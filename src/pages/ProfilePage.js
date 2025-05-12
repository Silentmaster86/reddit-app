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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
  }
`;

const Label = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin: 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }

  strong {
    font-weight: 600;
    color: #555;
  }
`;

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const provider = useSelector((state) => state.auth.provider);

  return (
    <Wrapper>
      <Card>
        <h2>User Profile</h2>
        {user ? (
          <>
            {user.avatar && <Avatar src={user.avatar} alt="User Avatar" />}
            <Label><strong>Name:</strong> {user.name || user.email || "N/A"}</Label>
            <Label><strong>ID:</strong> {user.id || user.uid || "N/A"}</Label>
            <Label><strong>Provider:</strong> {provider || "Unknown"}</Label>
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </Card>
    </Wrapper>
  );
};

export default ProfilePage;
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

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const provider = useSelector((state) => state.auth.provider);

  return (
    <Wrapper>
      <Card>
        <h2>User Profile</h2>
        {user ? (
          <>
            {user.avatar && <Avatar src={user.avatar} alt="User Avatar" />}
            <p><strong>Name:</strong> {user.name || user.email || "N/A"}</p>
            <p><strong>ID:</strong> {user.id || user.uid || "N/A"}</p>
            <p><strong>Provider:</strong> {provider}</p>
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </Card>
    </Wrapper>
  );
};

export default ProfilePage;
