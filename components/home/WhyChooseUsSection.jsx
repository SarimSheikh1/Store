'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import { BUSINESS_CONFIG } from '@/lib/config';

const FEATURES = [
  {
    id: 1,
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your groceries delivered within 2-4 hours',
    details: [
      'Same-day delivery available',
      'Real-time order tracking',
      'Flexible delivery slots',
      'Emergency delivery service'
    ],
    color: 'primary'
  },
  {
    id: 2,
    icon: '✅',
    title: 'Quality Guaranteed',
    description: 'Fresh produce and premium quality products',
    details: [
      '100% freshness guarantee',
      'Quality checks before delivery',
      'Easy returns and refunds',
      'Premium brand partnerships'
    ],
    color: 'success'
  },
  {
    id: 3,
    icon: '💰',
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts',
    details: [
      'Daily special offers',
      'Bulk purchase discounts',
      'Loyalty program rewards',
      'Price match guarantee'
    ],
    color: 'warning'
  },
  {
    id: 4,
    icon: '📱',
    title: 'Easy Ordering',
    description: 'Multiple convenient ways to place orders',
    details: [
      'WhatsApp ordering system',
      'User-friendly website',
      'Phone order support',
      'Subscription packages'
    ],
    color: 'info'
  },
  {
    id: 5,
    icon: '🤝',
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance',
    details: [
      'WhatsApp customer support',
      'Phone support available',
      'Live chat assistance',
      'Email support system'
    ],
    color: 'secondary'
  },
  {
    id: 6,
    icon: '📦',
    title: 'Monthly Packages',
    description: 'Convenient monthly grocery bundles',
    details: [
      'Customizable packages',
      'Family-sized portions',
      'Significant cost savings',
      'Regular package updates'
    ],
    color: 'primary'
  }
];

export default function WhyChooseUsSection() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0]);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <section className="why-choose-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="primary" className="section-badge">
            <span>⭐</span>
            Why Choose Us
          </Badge>
          
          <h2 className="section-title">
            Why Four Partners Mart is Your Best Choice
          </h2>
          <p className="section-description">
            We're committed to providing the best grocery shopping experience with 
            unmatched quality, convenience, and customer service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-container">
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-card ${activeFeature.id === feature.id ? 'feature-card--active' : ''}`}
                onClick={() => setActiveFeature(feature)}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeInScale 0.6s ease-out forwards'
                }}
              >
                <div className="feature-icon-wrapper">
                  <div 
                    className={`feature-icon feature-icon--${feature.color}`}
                    style={{
                      transform: hoveredFeature === feature.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>
                
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>

                <div className="feature-indicator">
                  {activeFeature.id === feature.id && (
                    <div className="indicator-dot"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Details */}
          <div className="feature-details">
            <div className="details-header">
              <div className={`details-icon details-icon--${activeFeature.color}`}>
                {activeFeature.icon}
              </div>
              <div>
                <h3 className="details-title">{activeFeature.title}</h3>
                <p className="details-subtitle">{activeFeature.description}</p>
              </div>
            </div>

            <ul className="details-list">
              {activeFeature.details.map((detail, index) => (
                <li 
                  key={index} 
                  className="details-item"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: 'slideInLeft 0.4s ease-out forwards'
                  }}
                >
                  <span className="details-check">✓</span>
                  <span className="details-text">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="details-action">
              <a href="/about" className="btn btn-outline">
                Learn More About Us
              </a>
            </div>
          </div>
        </div>

        {/* Business Stats */}
        <div className="business-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏪</div>
              <div className="stat-content">
                <div className="stat-number">5+</div>
                <div className="stat-label">Years in Business</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Orders Delivered</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-content">
                <div className="stat-number">{BUSINESS_CONFIG.deliveryTime}</div>
                <div className="stat-label">Average Delivery</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-number">98%</div>
                <div className="stat-label">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .why-choose-section {
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }

        .why-choose-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -20%;
          width: 40%;
          height: 100%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          background: var(--bg-color);
          border: 2px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 2rem;
          cursor: pointer;
          transition: all var(--transition-base);
          position: relative;
          opacity: 0;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .feature-card--active {
          border-color: var(--primary);
          background: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .feature-icon-wrapper {
          margin-bottom: 1.5rem;
        }

        .feature-icon {
          width: 4rem;
          height: 4rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: all var(--transition-base);
          margin-bottom: 1rem;
        }

        .feature-icon--primary {
          background: var(--primary-light);
          color: var(--primary);
        }

        .feature-icon--success {
          background: var(--success-light);
          color: var(--success);
        }

        .feature-icon--warning {
          background: var(--warning-light);
          color: var(--warning);
        }

        .feature-icon--info {
          background: var(--info-light);
          color: var(--info);
        }

        .feature-icon--secondary {
          background: var(--secondary-light);
          color: var(--secondary);
        }

        .feature-title {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .feature-description {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: 1.5;
        }

        .feature-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .indicator-dot {
          width: 0.75rem;
          height: 0.75rem;
          background: var(--primary);
          border-radius: var(--radius-full);
          animation: pulse 2s infinite;
        }

        .feature-details {
          background: var(--bg-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
          border: 1px solid var(--border);
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .details-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .details-icon {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .details-icon--primary {
          background: var(--primary-light);
          color: var(--primary);
        }

        .details-icon--success {
          background: var(--success-light);
          color: var(--success);
        }

        .details-icon--warning {
          background: var(--warning-light);
          color: var(--warning);
        }

        .details-icon--info {
          background: var(--info-light);
          color: var(--info);
        }

        .details-icon--secondary {
          background: var(--secondary-light);
          color: var(--secondary);
        }

        .details-title {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .details-subtitle {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .details-list {
          list-style: none;
          margin-bottom: 2rem;
        }

        .details-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          opacity: 0;
        }

        .details-item:last-child {
          border-bottom: none;
        }

        .details-check {
          color: var(--success);
          font-weight: 700;
          font-size: var(--text-lg);
          flex-shrink: 0;
        }

        .details-text {
          font-size: var(--text-sm);
          color: var(--text-main);
          line-height: 1.4;
        }

        .details-action {
          text-align: center;
        }

        .business-stats {
          background: var(--bg-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
          border: 1px solid var(--border);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: all var(--transition-base);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          background: var(--primary-light);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .stat-number {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(1rem);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .features-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1.5rem;
          }

          .feature-details {
            position: static;
            padding: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-card {
            padding: 1rem;
          }

          .section-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .details-header {
            flex-direction: column;
            text-align: center;
          }

          .feature-icon {
            width: 3rem;
            height: 3rem;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}