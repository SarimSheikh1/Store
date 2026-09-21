'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { generatePackageWhatsApp } from '@/lib/whatsapp';

export default function PackageCard({ pkg }) {
  return (
    <div className={`package-card ${pkg.popular ? 'popular' : ''}`}>
      {pkg.popular && <div className="popular-badge">Most Popular</div>}
      
      <div className="pkg-header">
        <div className="pkg-image-wrap">
          <img
            src={pkg.image || '/images/local-grocery-products.png'}
            alt={pkg.name}
            className="pkg-image"
            onError={(event) => { event.currentTarget.src = '/images/local-grocery-products.png'; }}
          />
        </div>
        <h3 className="pkg-name">{pkg.name}</h3>
        <p className="pkg-target">{pkg.target}</p>
        <div className="pkg-price">Rs. {formatPrice(pkg.price)}<span className="per-month">/month</span></div>
      </div>

      <div className="pkg-body">
        <p className="pkg-desc">{pkg.description}</p>
        <ul className="pkg-items">
          {pkg.items.map((item, i) => (
            <li key={i} className="pkg-item">
              <span className="check">✓</span>
              {item.name} <span className="item-qty">({item.qty})</span>
            </li>
          ))}
          {pkg.items.length > 6 && <li className="more-items">Hover to see all {pkg.items.length} items</li>}
        </ul>
      </div>

      <div className="pkg-footer">
        <Link href={`/ration-packages`} className="btn btn-outline btn-full mb-2">
          View Full Details
        </Link>
        <a 
          href={generatePackageWhatsApp(pkg, {})}
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary btn-full"
        >
          Order via WhatsApp
        </a>
      </div>

      <style jsx>{`
        .package-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
        }
        .package-card.popular {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
        }
        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        .popular-badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.25rem 1rem;
          border-bottom-left-radius: var(--radius);
          border-bottom-right-radius: var(--radius);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .pkg-header {
          padding: 2.5rem 1.5rem 1.5rem;
          text-align: center;
          background: var(--bg-color);
          border-bottom: 1px solid var(--border);
        }
        .pkg-image-wrap {
          width: 100%;
          height: 11rem;
          overflow: hidden;
          margin: -1rem 0 1.25rem;
          border-radius: var(--radius);
          background: var(--surface-hover);
        }
        .pkg-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform .35s ease;
        }
        .pkg-name {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }
        .pkg-target {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .pkg-price {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
        }
        .per-month {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 400;
        }
        .pkg-body {
          padding: 1.5rem;
          flex: 1;
        }
        .pkg-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .pkg-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .pkg-items li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .pkg-item:nth-child(n+7) { display: none; }
        .package-card:hover .pkg-item:nth-child(n+7) { display: flex; }
        .package-card:hover .pkg-image { transform: scale(1.04); }
        .check {
          color: var(--primary);
          font-weight: bold;
        }
        .item-qty {
          color: var(--text-muted);
        }
        .more-items {
          color: var(--primary);
          font-style: italic;
          padding-left: 1.5rem;
        }
        .package-card:hover .more-items { display: none; }
        @media (max-width: 768px) {
          .pkg-item:nth-child(n+7) { display: flex; }
          .more-items { display: none; }
        }
        .pkg-footer {
          padding: 1.5rem;
          background: var(--bg-color);
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
      `}</style>
    </div>
  );
}
