import React, { useEffect, useState } from 'react';
import Profile from '../../components/Profile/Profile';
import { getDev } from '../../services/api';
import DevList from '../../components/Devs/DevList';

const Main = ({ match }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getData = async () => {
      const devId = match.params.id;
      const dev = await getDev(devId);      
      setProfile(dev);
    }

    getData();

  }, []);
  
  return (
    <div>
      {profile && <Profile profile={profile} />}
      <DevList />
    </div>
  );
};

export default Main;