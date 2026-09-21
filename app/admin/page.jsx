'use client';

import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, STATUS_STEPS, STATUS_COLORS } from '@/lib/orders';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getAllOrders());
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = updateOrderStatus(id, newStatus);
    if (updated) {
      setOrders(getAllOrders()); // refresh
    }
  };

  const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.totals.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="section container">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Frontend-only demo for managing local orders.</p>
        </div>
        <Link href="/" className="btn btn-outline">Back to Store</Link>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Orders</div>
          <div className="stat-value">{pendingOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Sales (PKR)</div>
          <div className="stat-value">{formatPrice(totalSales)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Users</div>
          <div className="stat-value">Demo</div>
        </div>
      </div>

      <div className="table-container">
        <h3>Recent Orders</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <div>{order.customer.name}</div>
                  <div className="text-sm text-muted">{order.customer.phone}</div>
                </td>
                <td>Rs. {formatPrice(order.totals.total)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[order.status] }}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="form-select text-sm p-1"
                  >
                    {STATUS_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .stat-label {
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: var(--primary);
        }
        .table-container {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        .admin-table th, .admin-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .admin-table th {
          background: var(--bg-color);
          font-weight: 600;
          color: var(--text-muted);
        }
        .status-badge {
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: bold;
        }
        .text-sm { font-size: 0.875rem; }
        .p-1 { padding: 0.25rem; }
        
        @media (max-width: 1024px) {
          .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
