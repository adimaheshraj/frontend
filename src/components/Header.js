import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <Link to="/" className="logo">Citizen Tailors</Link>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        {!token ? (
          <>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            {role === 'admin' ? (
              <Link to="/admin" className="nav-link">Admin Dashboard</Link>
            ) : (
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            )}
            <button onClick={logout} className="nav-link btn">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
