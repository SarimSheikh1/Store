'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { BUSINESS } from '@/lib/config';
import { calculateTotals } from '@/lib/utils';
import { createOrder } from '@/lib/orders';
import { generateOrderWhatsApp } from '@/lib/whatsapp';

export default function CheckoutPage() {
  const { items, clearCart, isLoaded } = useCart();
  const { addToast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: 'Lahore',
    area: '',
    landmark: '',
    notes: '',
    paymentMethod: 'Cash on Delivery'
  });

  if (!isLoaded) return <div className="container section text-center">Loading...</div>;
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const { subtotal, deliveryFee, discount, total } = calculateTotals(items, BUSINESS.delivery.standardFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Create order locally
    const order = createOrder({
      cartItems: items,
      customer: formData,
      totals: { subtotal, deliveryFee, discount, total },
      paymentMethod: formData.paymentMethod
    });

    // 2. Generate WhatsApp link
    const { url } = generateOrderWhatsApp(items, formData, { subtotal, deliveryFee, discount, total });
    
    // 3. Clear cart
    clearCart();
    
    // 4. Show success & redirect (or open WhatsApp)
    addToast('Order placed successfully!');
    
    // We can open WhatsApp in new tab, then redirect to order success
    window.open(url, '_blank');
    router.push(`/order-success?id=${order.id}`);
  };

  return (
    <div className="section container">
      <h1 className="mb-8">Checkout</h1>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3 className="mb-4">1. Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number (Optional)</label>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="form-input" placeholder="Same as phone number if left blank" />
            </div>
          </div>

          <div className="form-section">
            <h3 className="mb-4">2. Delivery Address</h3>
            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">City *</label>
                <select required name="city" value={formData.city} onChange={handleInputChange} className="form-select">
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Area / Town *</label>
                <input required type="text" name="area" value={formData.area} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Landmark (Optional)</label>
              <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="form-input" />
            </div>
          </div>

          <div className="form-section">
            <h3 className="mb-4">3. Payment Method</h3>
            <div className="payment-methods">
              <label className="payment-method-card">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={handleInputChange}
                />
                <div className="payment-details">
                  <strong>Cash on Delivery</strong>
                  <span className="text-muted text-sm">Pay when you receive the order</span>
                </div>
              </label>
              <label className="payment-method-card disabled" title="Coming Soon">
                <input type="radio" disabled />
                <div className="payment-details">
                  <strong>Bank Transfer / EasyPaisa</strong>
                  <span className="text-muted text-sm">Coming Soon</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3 className="mb-4">Order Notes (Optional)</h3>
            <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="form-textarea" placeholder="Any special instructions for delivery?"></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-full mt-4" style={{ fontSize: '1.25rem', padding: '1rem' }}>
            Place Order & Send WhatsApp
          </button>
        </form>

        <div className="checkout-summary">
          <h3 className="mb-4">Order Summary</h3>
          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span className="item-name">{item.quantity}x {item.name}</span>
                <span className="item-price">Rs. {(item.salePrice || item.price) * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals mt-4 pt-4">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row text-primary">
                <span>Discount</span>
                <span>- Rs. {discount}</span>
              </div>
            )}
            <div className="summary-total mt-4 pt-4">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .form-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .payment-method-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid var(--border);
          padding: 1rem;
          border-radius: var(--radius);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .payment-method-card:hover { border-color: var(--primary); }
        .payment-method-card.disabled { opacity: 0.5; cursor: not-allowed; }
        .payment-details { display: flex; flex-direction: column; }
        
        .checkout-summary {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.5rem;
          position: sticky;
          top: 100px;
        }
        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }
        .summary-totals {
          border-top: 1px solid var(--border);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: bold;
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .checkout-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
