'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useEcommerce } from '@/hooks/useEcommerce';
import { BUSINESS_CONFIG } from '@/lib/config';
import Badge from '@/components/ui/Badge';

export default function HeroSection() {
  const { cart } = useEcommerce();
  const [currentOffer, setCurrentOffer] = useState(0);
  
  const offers = [
    { text: 'Free Delivery on Orders Above Rs. 2000', icon: '🚚' },
    { text: 'Fresh Produce Daily', icon: '🥬' },
    { text: '24/7 WhatsApp Support', icon: '💬' },
    { text: 'Monthly Ration Packages Available', icon: '📦' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          {/* Dynamic Badge */}
          <div className="hero-badge-container">
            <Badge variant="success" className="hero-badge">
              <span className="hero-badge-icon">{offers[currentOffer].icon}</span>
              <span className="hero-badge-text">{offers[currentOffer].text}</span>
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            Your Local Grocery Store —<br/>
            <span className="text-primary">Now Online.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle">
            Fresh produce, daily essentials, and monthly ration packages delivered straight to your door.
            <span className="hero-highlight"> Order now and get delivery within {BUSINESS_CONFIG.deliveryTime}!</span>
          </p>

          {/* Value Propositions */}
          <div className="hero-features">
            <div className="hero-feature">
              <div className="hero-feature-icon">🕒</div>
              <div className="hero-feature-text">Same Day<br/>Delivery</div>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">✅</div>
              <div className="hero-feature-text">Quality<br/>Guaranteed</div>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">💰</div>
              <div className="hero-feature-text">Best<br/>Prices</div>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">📱</div>
              <div className="hero-feature-text">Easy<br/>Ordering</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <Link href="/products" className="btn btn-primary btn-lg">
              <span>🛒</span>
              Start Shopping
            </Link>
            <Link href="/ration-packages" className="btn btn-outline btn-lg">
              <span>📦</span>
              View Packages
            </Link>
          </div>

          {/* Additional Info */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Products Available</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">2-4hrs</div>
              <div className="hero-stat-label">Delivery Time</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">24/7</div>
              <div className="hero-stat-label">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: 8rem 0 6rem;
          text-align: center;
          overflow: hidden;
          background: #18241d;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(16, 30, 23, 0.96) 0%, rgba(16, 30, 23, 0.8) 43%, rgba(16, 30, 23, 0.22) 100%), url('/images/grocery-hero-premium.png') center / cover no-repeat;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0;
          color: #f7f5ee;
          text-align: left;
        }

        .hero-badge-container {
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          animation: pulse 2s infinite;
        }

        .hero-badge-icon {
          font-size: 1.125rem;
        }

        .hero-badge-text {
          font-size: var(--text-sm);
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          color: #f7f5ee;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .hero-subtitle {
          font-size: clamp(1.125rem, 2.5vw, 1.375rem);
          color: #d6ddd5;
          max-width: 650px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .hero-highlight {
          color: var(--primary);
          font-weight: 600;
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 0 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
        }

        .hero-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-feature-icon {
          font-size: 0;
          width: 2.5rem;
          height: 2.5rem;
          margin-bottom: 0.5rem;
          background: #d3b16e;
          mask: url('/icons/shield.svg') center / contain no-repeat;
        }

        .hero-feature-text {
          font-size: var(--text-sm);
          font-weight: 600;
          color: #f7f5ee;
          line-height: 1.3;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 4rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1s forwards;
        }

        .hero-actions .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 180px;
        }

        .hero-actions .btn span {
          font-size: 1.125rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 500px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(247, 245, 238, 0.24);
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.2s forwards;
        }

        .hero-stat {
          text-align: center;
        }

        .hero-stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.25rem;
        }

        .hero-stat-label {
          font-size: var(--text-xs);
          color: #cbd3cb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 4.5rem 0 3rem;
          }

          .hero-bg {
            background: linear-gradient(180deg, rgba(16, 30, 23, .9), rgba(16, 30, 23, .62)), url('/images/grocery-hero-premium.png') center / cover no-repeat;
          }

          .hero-content { margin: 0; text-align: left; }

          .hero-badge-container { margin-bottom: 1.25rem; }

          .hero-features {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 0 1rem;
          }

          .hero-feature-icon {
            font-size: 2rem;
          }

          .hero-actions {
            flex-direction: column;
            padding: 0 1rem;
            gap: 0.75rem;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: .75rem;
            margin: 0;
            padding-top: 1.5rem;
          }

          .hero-stat-number {
            font-size: 1.05rem;
          }

          .hero-stat-label { font-size: .6rem; }
        }

        @media (max-width: 480px) {
          .hero-features {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .hero-feature {
            flex-direction: row;
            text-align: left;
            justify-content: flex-start;
          }

          .hero-feature-icon {
            margin-bottom: 0;
            margin-right: 1rem;
            width: 1.5rem;
            height: 1.5rem;
          }

          .hero-title { font-size: 2.35rem; }
          .hero-subtitle { margin-bottom: 2rem; }
          .hero-actions { margin-bottom: 2.5rem; }
        }
      `}</style>
    </section>
  );
}
