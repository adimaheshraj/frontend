import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/orders', {
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
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </div>
      <h3>All Orders</h3>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="card">
            <p><strong>Customer ID:</strong> {order.customerId}</p>
            <p><strong>Items:</strong> {JSON.stringify(order.items)}</p>
            <p><strong>Photos:</strong> {order.photoUrls.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
