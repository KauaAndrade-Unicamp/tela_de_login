import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await axios.post('http://localhost:3000/login',
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      if (!error.response) {
        setError('Erro em acessar');
      } else if (error.response.status === 401) {
        setError('Email ou senha incorretos');
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    setError('');
  };

  return (
    <div className="login-form-warp">
      {user == null ? (
        <div>
          <h2>Login</h2>
          <form className='login-form' onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='btn-login'>Login</button>
          </form>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Bem-vindo, {user.name}</h2>
          <button type="button" className='btn-login' onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
