import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ pants: 0, shirts: 0, suits: 0, kurtas: 0, others: '' });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/customer/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      alert('Error fetching orders');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('pants', form.pants);
    data.append('shirts', form.shirts);
    data.append('suits', form.suits);
    data.append('kurtas', form.kurtas);
    data.append('others', form.others);
    for (let i = 0; i < photos.length; i++) {
      data.append('photos', photos[i]);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/customer/order', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      alert('Order created');
      fetchOrders();
    } catch (err) {
      alert('Error creating order');
    }
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="pants" placeholder="Pants" onChange={handleChange} />
        <input type="number" name="shirts" placeholder="Shirts" onChange={handleChange} />
        <input type="number" name="suits" placeholder="Suits" onChange={handleChange} />
        <input type="number" name="kurtas" placeholder="Kurtas" onChange={handleChange} />
        <input name="others" placeholder="Others" onChange={handleChange} />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Create Order</button>
      </form>
      <h3>Your Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Pants: {order.items.pants}, Shirts: {order.items.shirts}, Photos: {order.photoUrls.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
