import React, { useState } from 'react';
import './Login.css';
import { login } from '../../services/api';

const Login = ({ history }) => {
  const [user, setUser] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(user);    
    history.push(`/dev/${data._id}`);
  }
  return (
    <div className="login-container">
      <form onSubmit={e => handleSubmit(e)}>
        <input onChange={e => setUser(e.target.value)} value={user} type="text" placeholder="Digite seus usuário do GitHub" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Login;