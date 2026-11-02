import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [items, setItems] = useState({ pants: 0, shirts: 0, suits: 0, kurtas: 0, others: '' });
  const [photos, setPhotos] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pants', items.pants);
    formData.append('shirts', items.shirts);
    formData.append('suits', items.suits);
    formData.append('kurtas', items.kurtas);
    if (items.others) formData.append('others', items.others);
    photos.forEach(photo => formData.append('photos', photo));

    try {
      await axios.post('http://localhost:8080/api/customer/order', formData, {
        headers: { Authorization: `Bearer ${token}` },
        contentType: false,
        processData: false
      });
      alert('Order created');
      fetchOrders();
    } catch (err) {
      alert('Order creation failed');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customer/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Customer Dashboard</h2>
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </div>
      <form onSubmit={createOrder} className="card">
        <h3>Create Order</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label>Pants</label>
            <input name="pants" type="number" placeholder="Pants" onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Shirts</label>
            <input name="shirts" type="number" placeholder="Shirts" onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Suits</label>
            <input name="suits" type="number" placeholder="Suits" onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Kurtas</label>
            <input name="kurtas" type="number" placeholder="Kurtas" onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Others</label>
            <input name="others" placeholder="Others" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Photos</label>
            <input type="file" multiple onChange={handlePhotoChange} />
          </div>
        </div>
        <button type="submit" className="btn">Create Order</button>
      </form>
      <h3>Your Orders</h3>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="card">
            <p><strong>Items:</strong> {JSON.stringify(order.items)}</p>
            <p><strong>Photos:</strong> {order.photoUrls.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
