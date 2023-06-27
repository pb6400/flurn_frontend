import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { register } from '../../api/authApi';
import FormInput from '../shared/FormInput';
import Button from '../shared/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate ();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <FormInput
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
