import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '', phone: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isAdmin) {
        const { username, password } = form;
        res = await axios.post('http://localhost:8080/api/auth/admin-login', { username, password });
      } else {
        res = await axios.post('http://localhost:8080/api/auth/login', { phone: form.phone });
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', isAdmin ? 'admin' : 'customer');
      window.location.href = isAdmin ? '/admin' : '/dashboard';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <div className="radio-group">
        <label>
          <input type="radio" name="role" checked={!isAdmin} onChange={() => setIsAdmin(false)} /> Customer
        </label>
        <label>
          <input type="radio" name="role" checked={isAdmin} onChange={() => setIsAdmin(true)} /> Admin
        </label>
      </div>
      <form onSubmit={handleLogin}>
        {isAdmin ? (
          <>
            <div className="form-group">
              <label>Username</label>
              <input name="username" placeholder="Username" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
          </>
        ) : (
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
          </div>
        )}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
