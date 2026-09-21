'use client';

import { useState } from 'react';
import { generateWholesaleWhatsApp } from '@/lib/whatsapp';

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessType: 'Grocery Shop',
    products: '',
    quantity: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = generateWholesaleWhatsApp(formData);
    window.open(url, '_blank');
  };

  return (
    <div className="section container">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1>Wholesale & Bulk Supply</h1>
        <p className="text-muted text-lg mt-4">
          We provide high-quality grocery products at competitive wholesale prices to grocery shops, general stores, restaurants, offices, and small businesses.
        </p>
      </div>

      <div className="wholesale-layout">
        <div className="wholesale-info">
          <h2>Why Partner With Us?</h2>
          <ul className="benefits-list mt-6">
            <li>
              <span className="icon">💰</span>
              <div>
                <strong>Competitive Pricing</strong>
                <p className="text-muted text-sm">Get the best market rates for bulk orders.</p>
              </div>
            </li>
            <li>
              <span className="icon">🚚</span>
              <div>
                <strong>Reliable Delivery</strong>
                <p className="text-muted text-sm">Fast and scheduled delivery to your business location.</p>
              </div>
            </li>
            <li>
              <span className="icon">✅</span>
              <div>
                <strong>Quality Assurance</strong>
                <p className="text-muted text-sm">100% genuine and fresh products guaranteed.</p>
              </div>
            </li>
            <li>
              <span className="icon">📦</span>
              <div>
                <strong>Wide Range of Products</strong>
                <p className="text-muted text-sm">Everything from rice, flour, oil, to cleaning supplies.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="wholesale-form-container">
          <h3 className="mb-6">Request a Wholesale Quote</h3>
          <form onSubmit={handleSubmit} className="wholesale-form">
            <div className="form-group">
              <label className="form-label">Business Name *</label>
              <input required type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="form-input" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Contact Person *</label>
                <input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleInputChange} className="form-select">
                  <option value="Grocery Shop">Grocery Shop</option>
                  <option value="General Store">General Store</option>
                  <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number *</label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Required Products (Comma separated) *</label>
              <input required type="text" name="products" value={formData.products} onChange={handleInputChange} className="form-input" placeholder="e.g. Sugar, Oil, Rice" />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Monthly Quantity *</label>
              <input required type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} className="form-input" placeholder="e.g. 500kg Sugar, 200L Oil" />
            </div>

            <div className="form-group">
              <label className="form-label">Additional Message</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-textarea" placeholder="Any specific brands or requirements?"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-4">
              Send Inquiry via WhatsApp
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .max-w-2xl { max-width: 800px; margin: 0 auto; }
        .wholesale-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .icon {
          font-size: 2rem;
          background: var(--surface);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .wholesale-form-container {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
        }
        @media (max-width: 768px) {
          .wholesale-layout { grid-template-columns: 1fr; gap: 2rem; }
          .grid-cols-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
