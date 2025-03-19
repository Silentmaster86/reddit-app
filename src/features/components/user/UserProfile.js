import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import "./user.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({ username: '', bio: '', avatar: '' });
  const [editMode, setEditMode] = useState(false);

  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchProfile = async () => {
      const profileRef = doc(db, 'users', userId);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSave = async () => {
    const profileRef = doc(db, 'users', userId);
    await updateDoc(profileRef, profile);
    setEditMode(false);
  };

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
