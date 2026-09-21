'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BUSINESS_CONFIG, COMPANY_INFO } from '@/lib/config';
import { useToast } from '@/context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { addToast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      addToast('Please enter your email address', 'error');
      return;
    }

    setIsSubscribing(true);
    
    // Simulate newsletter subscription
    setTimeout(() => {
      addToast('Thank you for subscribing to our newsletter!', 'success');
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Ration Packages', href: '/ration-packages' },
    { label: 'Wholesale', href: '/wholesale' },
    { label: 'Offers', href: '/offers' }
  ];

  const customerSupport = [
    { label: 'Track Order', href: '/track-order' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Delivery Info', href: '/delivery-info' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Return Policy', href: '/return-policy' },
    { label: 'Shipping Policy', href: '/shipping-policy' }
  ];

  const socialLinks = [
    { label: 'Facebook', href: BUSINESS_CONFIG.social.facebook, icon: '📘' },
    { label: 'Instagram', href: BUSINESS_CONFIG.social.instagram, icon: '📷' },
    { label: 'Twitter', href: BUSINESS_CONFIG.social.twitter, icon: '🐦' }
  ];

  return (
    <footer className="footer" style={{ backgroundColor: '#f5e7bf', color: '#172b35' }}>
      <div className="container">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__section">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-panel"><img src="/images/four-partners-logo.png" alt="Four Partners Mart" className="footer__logo-image" /></div>
              </div>
              <p className="footer__tagline">{BUSINESS_CONFIG.tagline}</p>
              <p className="footer__description">
                Premium quality groceries delivered fresh to your doorstep. 
                From daily essentials to wholesale supplies, we serve Lahore with excellence.
              </p>
            </div>

            {/* Contact Info */}
            <div className="footer__contact">
              <h4 className="footer__subtitle">Contact Info</h4>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span>{BUSINESS_CONFIG.address}</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                <a href={`tel:${BUSINESS_CONFIG.phone}`}>{BUSINESS_CONFIG.phone}</a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                <a href={`mailto:${BUSINESS_CONFIG.email}`}>{BUSINESS_CONFIG.email}</a>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">💬</span>
                <a href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Business
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Customer Support</h4>
            <ul className="footer__links">
              {customerSupport.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="footer__business-hours">
              <h5 className="footer__hours-title">Business Hours</h5>
              <div className="footer__hours-item">
                <span>Store Hours:</span>
                <span>{BUSINESS_CONFIG.hours.open} - {BUSINESS_CONFIG.hours.close}</span>
              </div>
              <div className="footer__hours-item">
                <span>Delivery:</span>
                <span>{BUSINESS_CONFIG.hours.delivery}</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="footer__section">
            <h4 className="footer__subtitle">Stay Connected</h4>
            
            {/* Newsletter */}
            <div className="footer__newsletter">
              <p className="footer__newsletter-text">
                Get updates on new products, offers, and delivery schedules.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__newsletter-input"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit" 
                  className="footer__newsletter-btn"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? '...' : 'Subscribe'}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="footer__social">
              <h5 className="footer__social-title">Follow Us</h5>
              <div className="footer__social-links">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={social.label}
                  >
                    <span>{social.icon}</span>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="footer__legal">
          <div className="footer__legal-links">
            {legalLinks.map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="footer__legal-link">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && <span className="footer__legal-separator">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
            </p>
            <p className="footer__established">
              Proudly serving Lahore since {COMPANY_INFO?.founded || '2019'}
            </p>
          </div>
          
          <div className="footer__certifications">
            <span className="footer__cert">✅ Halal Certified</span>
            <span className="footer__cert">🏆 Quality Assured</span>
            <span className="footer__cert">🚚 Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
