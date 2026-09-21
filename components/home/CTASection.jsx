'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateGeneralWhatsApp } from '@/lib/whatsapp';
import Badge from '@/components/ui/Badge';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function CTASection() {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const offers = [
    {
      title: 'Free Delivery Today!',
      subtitle: 'On orders above Rs. 2000',
      icon: '🚚',
      color: 'success'
    },
    {
      title: '20% Off First Order',
      subtitle: 'Use code: WELCOME20',
      icon: '💰',
      color: 'warning'
    },
    {
      title: 'Same Day Delivery',
      subtitle: 'Order by 6 PM',
      icon: '⚡',
      color: 'primary'
    }
  ];

  // Rotate offers every 4 seconds
  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(offerInterval);
  }, [offers.length]);

  // Countdown timer simulation
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          // Reset to 24 hours
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const whatsappMessage = `Hi! I'm interested in shopping with Four Partners Mart. Can you help me get started?`;
  const whatsappLink = generateGeneralWhatsApp(whatsappMessage);

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          {/* Dynamic Offer Badge */}
          <div className="offer-container">
            <Badge 
              variant={offers[currentOffer].color} 
              size="lg" 
              className="offer-badge"
            >
              <span className="offer-icon">{offers[currentOffer].icon}</span>
              <div className="offer-text">
                <div className="offer-title">{offers[currentOffer].title}</div>
                <div className="offer-subtitle">{offers[currentOffer].subtitle}</div>
              </div>
            </Badge>
          </div>

          {/* Main CTA Content */}
          <div className="cta-main">
            <h2 className="cta-title">
              Ready to Start Shopping?
            </h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers and experience the convenience 
              of fresh groceries delivered to your door.
            </p>

            {/* Countdown Timer */}
            <div className="countdown-container">
              <div className="countdown-label">Today's offer ends in:</div>
              <div className="countdown-timer">
                <div className="time-unit">
                  <div className="time-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="time-label">Hours</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="time-label">Minutes</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <div className="time-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="time-label">Seconds</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="cta-actions">
              <Link href="/products" className="btn btn-primary btn-lg cta-button">
                <span className="btn-icon">🛒</span>
                <div className="btn-content">
                  <div className="btn-text">Start Shopping Now</div>
                  <div className="btn-subtext">Browse 500+ Products</div>
                </div>
              </Link>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg cta-button whatsapp-btn"
              >
                <span className="btn-icon">💬</span>
                <div className="btn-content">
                  <div className="btn-text">Order via WhatsApp</div>
                  <div className="btn-subtext">Quick & Easy</div>
                </div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span className="trust-text">100% Fresh Guarantee</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <span className="trust-text">Fast {BUSINESS_CONFIG.deliveryTime} Delivery</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span className="trust-text">Secure Payment</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">📞</span>
                <span className="trust-text">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Side Stats */}
          <div className="cta-stats">
            <div className="stat-circle">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy<br/>Customers</div>
            </div>
            
            <div className="stat-circle">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Customer<br/>Rating</div>
            </div>
            
            <div className="stat-circle">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products<br/>Available</div>
            </div>
          </div>
        </div>

        {/* Bottom Contact Info */}
        <div className="contact-strip">
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span className="contact-text">{BUSINESS_CONFIG.address}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <a href={`tel:${BUSINESS_CONFIG.phone}`} className="contact-link">
              {BUSINESS_CONFIG.phone}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💬</span>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-link">
              WhatsApp Us
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">⏰</span>
            <span className="contact-text">Open {BUSINESS_CONFIG.hours.open} - {BUSINESS_CONFIG.hours.close}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 100%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .cta-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 3rem;
          align-items: center;
          margin-bottom: 3rem;
        }

        .offer-container {
          margin-bottom: 2rem;
          display: flex;
          justify-content: flex-start;
          grid-column: 1;
        }

        .cta-main { grid-column: 1; }

        .cta-stats { grid-column: 2; grid-row: 1 / span 2; }

        .offer-badge {
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: pulse 3s infinite;
        }

        .offer-icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }

        .offer-title {
          font-size: var(--text-lg);
          font-weight: 700;
          margin-bottom: 0.125rem;
        }

        .offer-subtitle {
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .cta-title {
          font-size: var(--text-5xl);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .cta-subtitle {
          font-size: var(--text-xl);
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.5;
          max-width: 500px;
        }

        .countdown-container {
          margin-bottom: 2.5rem;
        }

        .countdown-label {
          font-size: var(--text-sm);
          margin-bottom: 1rem;
          opacity: 0.8;
          text-align: center;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .time-unit {
          text-align: center;
        }

        .time-number {
          font-size: var(--text-2xl);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.25rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius);
          padding: 0.5rem;
          min-width: 3rem;
        }

        .time-label {
          font-size: var(--text-xs);
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .time-separator {
          font-size: var(--text-2xl);
          font-weight: 700;
          opacity: 0.6;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          min-height: 4rem;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .whatsapp-btn {
          background: #25D366;
          border-color: #25D366;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .btn-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .btn-content {
          text-align: left;
        }

        .btn-text {
          font-size: var(--text-lg);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .btn-subtext {
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .trust-indicators {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .trust-icon {
          font-size: 1rem;
        }

        .cta-stats {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }

        .stat-circle {
          width: 8rem;
          height: 8rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-full);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: all var(--transition-base);
        }

        .stat-circle:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-number {
          font-size: var(--text-xl);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: var(--text-xs);
          opacity: 0.8;
          line-height: 1.2;
        }

        .contact-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--text-sm);
          justify-content: center;
          text-align: center;
        }

        .contact-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .contact-link {
          color: inherit;
          text-decoration: none;
          transition: opacity var(--transition-base);
        }

        .contact-link:hover {
          opacity: 0.8;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .cta-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .offer-container, .cta-main, .cta-stats { grid-column: 1; grid-row: auto; }

          .offer-container { justify-content: center; }

          .cta-title {
            font-size: var(--text-4xl);
          }

          .cta-subtitle {
            font-size: var(--text-lg);
            margin: 0 auto 2rem;
          }

          .countdown-timer {
            gap: 0.5rem;
          }

          .time-number {
            font-size: var(--text-xl);
            min-width: 2.5rem;
            padding: 0.375rem;
          }

          .cta-stats {
            flex-direction: row;
            gap: 1rem;
          }

          .stat-circle {
            width: 6rem;
            height: 6rem;
          }

          .stat-number {
            font-size: var(--text-lg);
          }

          .trust-indicators {
            grid-template-columns: 1fr;
          }

          .contact-strip {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .cta-title {
            font-size: var(--text-3xl);
          }

          .cta-button {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1rem;
          }

          .cta-stats {
            gap: 0.75rem;
          }

          .stat-circle {
            width: 5rem;
            height: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
