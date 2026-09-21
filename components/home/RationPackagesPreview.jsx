'use client';

import { useState } from 'react';
import { PACKAGES } from '@/data/packages';
import PackageCard from '@/components/ui/PackageCard';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';

export default function RationPackagesPreview() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Calculate savings
  const totalSavings = PACKAGES.reduce((total, pkg) => {
    const itemsValue = pkg.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total + (itemsValue - pkg.price);
  }, 0);

  const averageSavings = Math.round(totalSavings / PACKAGES.length);

  return (
    <section className="section packages-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-content">
            <div className="section-badge-container">
              <Badge variant="success" className="section-badge">
                <span>💰</span>
                Save up to Rs. {formatPrice(averageSavings)}/month
              </Badge>
            </div>
            
            <h2 className="section-title">Monthly Ration Packages</h2>
            <p className="section-description">
              Save time and money with our pre-built monthly grocery bundles. 
              Carefully curated for different family sizes and dietary needs.
            </p>

            <div className="section-features">
              <div className="feature">
                <span className="feature-icon">📦</span>
                <span className="feature-text">Complete monthly groceries</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💵</span>
                <span className="feature-text">Up to 20% savings</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span className="feature-text">Free monthly delivery</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <span className="feature-text">Customizable contents</span>
              </div>
            </div>
          </div>

          <div className="section-stats">
            <div className="stat">
              <div className="stat-number">{PACKAGES.length}</div>
              <div className="stat-label">Package Options</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Families</div>
            </div>
            <div className="stat">
              <div className="stat-number">20%</div>
              <div className="stat-label">Average Savings</div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-grid">
          {PACKAGES.map((pkg, index) => (
            <div
              key={pkg.id}
              className="package-item"
              style={{ 
                animationDelay: `${index * 200}ms`,
                opacity: 0,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>

        {/* Package Comparison */}
        <div className="package-comparison">
          <h3 className="comparison-title">Choose What's Right for You</h3>
          
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-cell">Features</div>
              {PACKAGES.map(pkg => (
                <div key={pkg.id} className="comparison-cell">
                  <div className="package-name">{pkg.name}</div>
                  <div className="package-target">{pkg.target}</div>
                </div>
              ))}
            </div>

            {/* Price Row */}
            <div className="comparison-row">
              <div className="comparison-cell feature-cell">
                <strong>Monthly Price</strong>
              </div>
              {PACKAGES.map(pkg => (
                <div key={pkg.id} className="comparison-cell price-cell">
                  <span className="price">Rs. {formatPrice(pkg.price)}</span>
                </div>
              ))}
            </div>

            {/* Items Count Row */}
            <div className="comparison-row">
              <div className="comparison-cell feature-cell">
                Items Included
              </div>
              {PACKAGES.map(pkg => (
                <div key={pkg.id} className="comparison-cell">
                  {pkg.items.length} items
                </div>
              ))}
            </div>

            {/* Savings Row */}
            <div className="comparison-row">
              <div className="comparison-cell feature-cell">
                Monthly Savings
              </div>
              {PACKAGES.map(pkg => {
                const itemsValue = pkg.items.reduce((sum, item) => 
                  sum + (item.price * item.quantity), 0
                );
                const savings = itemsValue - pkg.price;
                return (
                  <div key={pkg.id} className="comparison-cell savings-cell">
                    <Badge variant="success" size="sm">
                      Rs. {formatPrice(savings)}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="packages-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Saving?</h3>
            <p className="cta-description">
              Join hundreds of families who save time and money with our monthly packages
            </p>
            <div className="cta-actions">
              <a href="/ration-packages" className="btn btn-primary btn-lg">
                <span>📦</span>
                Explore All Packages
              </a>
              <a href="/ration-packages#build-your-own" className="btn btn-outline btn-lg">
                <span>🛠️</span>
                Build Your Own
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .packages-section {
          background: linear-gradient(135deg, var(--surface) 0%, var(--bg-color) 100%);
          position: relative;
          overflow: hidden;
        }

        .packages-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: -10%;
          width: 30%;
          height: 100%;
          background: radial-gradient(circle, rgba(22, 163, 74, 0.05) 0%, transparent 70%);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .section-header {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
          align-items: start;
        }

        .section-badge-container {
          margin-bottom: 1rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .section-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .section-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .feature-icon {
          font-size: 1.25rem;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-light);
          border-radius: var(--radius);
          flex-shrink: 0;
        }

        .feature-text {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-main);
        }

        .section-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
          height: fit-content;
        }

        .stat {
          text-align: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .stat:last-child {
          border-bottom: none;
        }

        .stat-number {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .package-item {
          opacity: 0;
        }

        .package-comparison {
          background: var(--surface);
          border-radius: var(--radius-xl);
          padding: 2rem;
          margin-bottom: 4rem;
          border: 1px solid var(--border);
        }

        .comparison-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: var(--text-main);
        }

        .comparison-table {
          display: grid;
          grid-template-columns: 1fr repeat(${PACKAGES.length}, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .comparison-header {
          display: contents;
        }

        .comparison-row {
          display: contents;
        }

        .comparison-cell {
          background: var(--bg-color);
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .comparison-header .comparison-cell {
          background: var(--primary-light);
          font-weight: 600;
          color: var(--primary);
        }

        .feature-cell {
          background: var(--surface);
          font-weight: 500;
          justify-content: flex-start;
        }

        .package-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .package-target {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .price-cell .price {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--primary);
        }

        .packages-cta {
          background: var(--primary-light);
          border-radius: var(--radius-xl);
          padding: 3rem;
          text-align: center;
          border: 2px solid var(--primary);
        }

        .cta-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .cta-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .cta-actions .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 200px;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .section-header {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-features {
            grid-template-columns: 1fr;
          }

          .packages-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .comparison-table {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .comparison-cell {
            border-bottom: 1px solid var(--border);
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 300px;
          }

          .section-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 480px) {
          .packages-cta {
            padding: 2rem;
          }

          .section-title {
            font-size: var(--text-2xl);
          }
        }
      `}</style>
    </section>
  );
}
