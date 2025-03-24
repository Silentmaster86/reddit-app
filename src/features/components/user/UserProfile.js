import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './user.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({ username: '', bio: '', avatar: '' });
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const accessToken = useSelector((state) => state.auth.accessToken); // Get Reddit access token

  useEffect(() => {
    if (accessToken) {
      const fetchRedditProfile = async () => {
        try {
          const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = response.data;
          setProfile({
            username: userData.name, // Assuming 'name' is Reddit's username field
            avatar: userData.icon_img, // Assuming 'icon_img' contains avatar URL
            bio: userData.subreddit.public_description, // Fetching bio from subreddit description
          });
        } catch (error) {
          console.error("Error fetching Reddit profile:", error);
        }
      };

      fetchRedditProfile();
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = () => {
    // Implement saving profile (e.g., to Firestore or other services)
    setEditMode(false);
  };

  if (!accessToken) {
    return <p>Please sign in to view and edit your profile.</p>;
  }

  return (
    <div>
      {editMode ? (
        <div className="user-profile">
          <input
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
          />
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <img src={profile.avatar} alt="Avatar" />
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
