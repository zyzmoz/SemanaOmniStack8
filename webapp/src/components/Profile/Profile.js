import React from 'react';
import './Profile.css';

const Profile = ({profile}) => {
  return (
    <div className="profile-container">
      <div className="avatar">
        <img src={profile.avatar} alt=""/>
      </div>
      <div className="profile-info">
        <p className="user">{profile.user}</p>
        <p className="name">{profile.name}</p>
        <p className="bio">{profile.bio}</p>
      </div>     
      
    </div>
  );
};

export default Profile;