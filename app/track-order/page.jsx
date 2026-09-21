'use client';

import { useState, Suspense } from 'react';
import { findOrder, STATUS_STEPS } from '@/lib/orders';
import { formatPrice } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    setError('');
    const found = findOrder(orderId, phone);
    if (found) {
      setOrder(found);
    } else {
      setOrder(null);
      setError('Order not found. Please check your Order ID and Phone Number.');
    }
  };

  return (
    <div className="section container max-w-2xl mx-auto">
      <h1 className="text-center mb-8">Track Your Order</h1>

      <form onSubmit={handleTrack} className="track-form mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Order ID *</label>
            <input required type="text" value={orderId} onChange={e => setOrderId(e.target.value)} className="form-input" placeholder="e.g. FPM-XXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="form-input" placeholder="03XXXXXXXXX" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-full mt-4">Track Status</button>
      </form>

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {order && (
        <div className="order-details">
          <div className="order-header mb-6">
            <h3>Order {order.id}</h3>
            <p className="text-muted">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>

          <div className="status-tracker mb-8">
            {STATUS_STEPS.map((status, index) => {
              const isActive = STATUS_STEPS.indexOf(order.status) >= index;
              const isCurrent = order.status === status;
              return (
                <div key={status} className={`status-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon">{isActive ? '✓' : index + 1}</div>
                  <div className="step-label">{status}</div>
                </div>
              );
            })}
          </div>

          <div className="order-summary-box">
            <h4 className="mb-4">Order Summary</h4>
            <div className="items-list mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm mb-2">
                  <span>{item.quantity}x {item.name}</span>
                  <span>Rs. {formatPrice((item.salePrice || item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold pt-4 border-t">
              <span>Total</span>
              <span>Rs. {formatPrice(order.totals.total)}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .track-form {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        .max-w-2xl { max-width: 800px; margin: 0 auto; }
        .alert-error {
          background: #fee2e2;
          color: #991b1b;
          padding: 1rem;
          border-radius: var(--radius);
          text-align: center;
        }
        .order-details {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        .status-tracker {
          display: flex;
          justify-content: space-between;
          position: relative;
        }
        .status-tracker::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--border);
          z-index: 1;
        }
        .status-step {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          width: 80px;
          text-align: center;
        }
        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--surface);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--text-muted);
          transition: all 0.3s;
        }
        .step-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .active .step-icon {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }
        .active .step-label {
          color: var(--primary);
          font-weight: 500;
        }
        .current .step-icon {
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.2);
        }
        .order-summary-box {
          background: var(--bg-color);
          padding: 1.5rem;
          border-radius: var(--radius);
        }
        .border-t { border-top: 1px solid var(--border); }
        
        @media (max-width: 768px) {
          .grid-cols-2 { grid-template-columns: 1fr; }
          .status-tracker { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
          .status-tracker::before {
            top: 0; bottom: 0; left: 15px; width: 2px; height: auto;
          }
          .status-step { flex-direction: row; width: 100%; text-align: left; }
        }
      `}</style>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
