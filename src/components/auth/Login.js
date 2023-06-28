import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import FormInput from '../shared/FormInput';
import Button from '../shared/Button';
const Login = ({at}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Make API call to login
      const data = await login(email, password);
      console.log(data)
      // Handle successful login
      localStorage.setItem('access_token',data.access_token)
      navigate('/leaves',);
    } catch (error) {
      // Handle login error
      setError('Invalid email or password, Try to Register if not already registered');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormInput
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <Button type="submit">Login</Button>
      </form>
      <button onClick={()=>(navigate('/register'))}>Register</button>
    </div>
  );
};

export default Login;
