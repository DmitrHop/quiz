import React, { useEffect, useState } from "react";
import quizApi from '../api/quizApi';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get("/profile/").then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default Profile;