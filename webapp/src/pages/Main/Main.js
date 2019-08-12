import React, { useEffect, useState } from 'react';
import Profile from '../../components/Profile/Profile';
import { getDev } from '../../services/api';
import DevList from '../../components/Devs/DevList';
import io from 'socket.io-client';

const Main = ({ match }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const devId = match.params.id;
    const getData = async () => {      
      const dev = await getDev(devId);      
      setProfile(dev);
    }
    const socket = io.connect('http://localhost:3000', {query: {id : devId}});
    socket.on('match', (res) => {
      console.log(res);
    })
    socket.emit('like', {id: devId, msg: 'like'})

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