'use client';

import Link from 'next/link';
import { useState } from 'react';

const categoryPhotos = {
  grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85',
  'rice-flour': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85',
  pulses: 'https://images.unsplash.com/photo-1515543904379-3d757efa72e1?auto=format&fit=crop&w=900&q=85',
  'oil-ghee': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85',
  'tea-beverages': 'https://images.unsplash.com/photo-1594631252845-29fc4cc8c09a?auto=format&fit=crop&w=900&q=85',
  'biscuits-snacks': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=85',
  drinks: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
  cleaning: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=900&q=85',
  'personal-care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85',
  'baby-care': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85',
  household: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=85',
};

export default function CategoryCard({ category, variant = 'default', showProductCount = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/categories/${category.slug}`} 
      className={`category-card category-card--${variant}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="category-card__content">
        <div className="category-card__image-wrap">
          <img
            src="/images/local-grocery-products.png"
            alt={category.name}
            className="category-card__image"
            onError={(event) => { event.currentTarget.src = '/images/grocery-hero-premium.png'; }}
          />
        </div>
        
        <div className="category-card__info">
          <h3 className="category-card__title">{category.name}</h3>
          <p className="category-card__description">{category.description}</p>
          
          {showProductCount && category.productCount && (
            <div className="category-card__count">
              {category.productCount} products
            </div>
          )}
        </div>
        
        <div className="category-card__arrow">
          <span className={`category-card__arrow-icon ${isHovered ? 'category-card__arrow-icon--hovered' : ''}`}>
            →
          </span>
        </div>
      </div>

      <style jsx>{`
        .category-card {
          display: block;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: ${category.colors?.primary || 'var(--primary)'};
          transform: scaleX(0);
          transition: transform var(--transition-base);
          transform-origin: left;
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: ${category.colors?.primary || 'var(--primary)'};
        }

        .category-card:hover::before {
          transform: scaleX(1);
        }

        .category-card--compact {
          padding: 1rem;
        }

        .category-card--horizontal .category-card__content {
          flex-direction: row;
          text-align: left;
        }

        .category-card--horizontal .category-card__icon-wrapper {
          margin-right: 1rem;
          margin-bottom: 0;
        }

        .category-card--horizontal .category-card__info {
          flex-grow: 1;
        }

        .category-card__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
        }

        .category-card__image-wrap {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border-radius: calc(var(--radius-lg) - .15rem);
          margin-bottom: 1.25rem;
          background: var(--bg-color);
        }

        .category-card__image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .45s ease;
        }

        .category-card:hover .category-card__image { transform: scale(1.06); }

        .category-card__info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .category-card__title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          transition: color var(--transition-base);
        }

        .category-card:hover .category-card__title {
          color: ${category.colors?.primary || 'var(--primary)'};
        }

        .category-card__description {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        .category-card__count {
          font-size: var(--text-xs);
          font-weight: 600;
          color: ${category.colors?.primary || 'var(--primary)'};
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .category-card__arrow {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          opacity: 0;
          transition: all var(--transition-base);
        }

        .category-card:hover .category-card__arrow {
          opacity: 1;
        }

        .category-card__arrow-icon {
          font-size: var(--text-lg);
          color: ${category.colors?.primary || 'var(--primary)'};
          transition: transform var(--transition-base);
        }

        .category-card__arrow-icon--hovered {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .category-card {
            padding: 1rem;
          }

          .category-card__image-wrap { margin-bottom: 1rem; }

          .category-card__title {
            font-size: var(--text-base);
          }
        }
      `}</style>
    </Link>
  );
}
