import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomerLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { phone });
      localStorage.setItem('token', res.data.token);
      alert('Logged in');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/admin/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      alert('Admin logged in');
      window.location.href = '/admin';
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <button onClick={() => setIsAdmin(!isAdmin)}>Switch to {isAdmin ? 'Customer' : 'Admin'}</button>
      {isAdmin ? (
        <div>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAdminLogin}>Admin Login</button>
        </div>
      ) : (
        <div>
          <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleCustomerLogin}>Customer Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
