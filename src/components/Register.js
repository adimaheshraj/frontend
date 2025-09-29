import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: register, 2: verify

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', form);
      alert('OTP sent');
      setStep(2);
    } catch (err) {
      alert('Error');
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/verify-otp', { phone: form.phone, otp });
      localStorage.setItem('token', res.data.token);
      alert('Registered');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div>
          <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerify}>Verify</button>
        </div>
      )}
    </div>
  );
};

export default Register;
