import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>CITIZEN MENS TAILORS</h1>
      <p>Bhongir, Yadadri Bhongir</p>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
