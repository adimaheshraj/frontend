import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', otp: '' });
  const [step, setStep] = useState(1); // 1: register, 2: verify
  const [uniqueId, setUniqueId] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', form);
      setUniqueId(res.data.uniqueId);
      setStep(2);
    } catch (err) {
      alert('Registration failed');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify-otp', { phone: form.phone, otp: form.otp });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('OTP verification failed');
    }
  };

  return (
    <div className="form-container">
      {step === 1 ? (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div className="form-group">
            <label>Name</label>
            <input name="name" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <h2>Verify OTP</h2>
          <p>Unique ID: {uniqueId}</p>
          <div className="form-group">
            <label>OTP</label>
            <input name="otp" placeholder="OTP" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn">Verify</button>
        </form>
      )}
    </div>
  );
};

export default Register;
