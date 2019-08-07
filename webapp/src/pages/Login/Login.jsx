import React, { useState } from 'react';
import './Login.css';

const Login = ({ history }) => {
  const [user, setUser] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/main');
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