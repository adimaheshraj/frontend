import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Citizen Mens Tailors</h1>
        <p>Welcome to Citizen Tailors - Bhongir, Yadadri Bhongir</p>
        <p>Expert tailoring services for suits, shirts, pants, and more. Quality craftsmanship since day one.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" className="btn">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
