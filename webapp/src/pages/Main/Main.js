import React from 'react';
import Profile from '../../components/Profile/Profile';

const Main = () => {
  const profile = {
    "_id": "5d49ceddc3a53404507dc0bf",
    "name": "Daniel Cunha",
    "avatar": "https://avatars2.githubusercontent.com/u/6368327?v=4",
    "user": "zyzmoz",
    "bio": null
  }
  return (
    <div>
      <Profile profile={profile}/>
    </div>
  );
};

export default Main;