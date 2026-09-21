'use client';

import { BUSINESS } from '@/lib/config';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { PARTNERS } from '@/data/partners';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    addToast('Your message has been sent successfully! We will get back to you soon.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="section container">
      <h1 className="text-center mb-12">Contact Us</h1>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-card">
            <h3>Get in Touch</h3>
            <p className="text-muted mb-6">We'd love to hear from you. Reach out to us via any of the channels below.</p>
            
            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <strong>Phone</strong>
                <p>{BUSINESS.phone}</p>
                {BUSINESS.phone2 && <p>{BUSINESS.phone2}</p>}
              </div>
            </div>

            <div className="info-item">
              <span className="icon">💬</span>
              <div>
                <strong>WhatsApp</strong>
                <p>{BUSINESS.whatsapp}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <strong>Visit Us</strong>
                <p>{BUSINESS.address.full}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">🕒</span>
              <div>
                <strong>Opening Hours</strong>
                <p>{BUSINESS.hours.display}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h3 className="mb-6">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} className="form-textarea"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-4">Send Message</button>
          </form>
        </div>
      </div>

      <section className="team-contact">
        <div><p className="team-contact__eyebrow">OUR TEAM</p><h2>Contact the right person</h2><p>For purchasing, online orders, store service, or website support.</p></div>
        <div className="team-contact__list">
          {PARTNERS.map((partner) => <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`For ${partner.name}`)}`} className="team-contact__person" key={partner.id}><strong>{partner.name}</strong><span>{partner.role}</span></a>)}
        </div>
      </section>

      <style jsx>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .info-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .info-item:last-child { margin-bottom: 0; }
        .icon {
          font-size: 1.5rem;
          background: var(--bg-color);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .contact-form-container {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }
        .team-contact { margin-top: 3rem; padding: 2rem; background: var(--primary-dark); color: white; border-radius: var(--radius-lg); display: grid; grid-template-columns: .8fr 1.2fr; gap: 2rem; }
        .team-contact h2 { color: white; margin-bottom: .5rem; }
        .team-contact p { color: #dce8df; }
        .team-contact__eyebrow { color: #d3b16e !important; font-size: .75rem; font-weight: 800; letter-spacing: .12em; margin-bottom: .5rem; }
        .team-contact__list { display: grid; grid-template-columns: repeat(2, 1fr); gap: .75rem; }
        .team-contact__person { padding: 1rem; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); border-radius: var(--radius); display: grid; gap: .25rem; }
        .team-contact__person span { color: #dce8df; font-size: .85rem; }
        
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; gap: 2rem; }
          .grid-cols-2 { grid-template-columns: 1fr; }
          .team-contact { grid-template-columns: 1fr; padding: 1.5rem; }
          .team-contact__list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
