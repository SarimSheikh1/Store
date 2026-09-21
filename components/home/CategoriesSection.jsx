'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/data/categories';
import CategoryCard from '@/components/ui/CategoryCard';
import Badge from '@/components/ui/Badge';

export default function CategoriesSection() {
  const [showAll, setShowAll] = useState(false);
  
  // Show first 8 categories by default, all when expanded
  const displayCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 8);
  const hasMore = CATEGORIES.length > 8;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-header-content">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-description">
                Browse our wide range of fresh groceries and daily essentials
              </p>
            </div>
            
            <div className="section-header-badge">
              <Badge variant="primary-light">
                {CATEGORIES.length} Categories
              </Badge>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {displayCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="category-item"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fadeInScale 0.6s ease-out forwards'
              }}
            >
              <CategoryCard 
                category={category} 
                showProductCount={true}
              />
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="categories-action">
            <button 
              className="btn btn-outline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>Show Less Categories ↑</>
              ) : (
                <>View All {CATEGORIES.length} Categories →</>
              )}
            </button>
          </div>
        )}

        {/* Featured Categories Highlight */}
        <div className="featured-categories">
          <h3 className="featured-title">Popular This Week</h3>
          <div className="featured-list">
            {CATEGORIES.filter(cat => cat.featured).slice(0, 4).map(category => (
              <a 
                key={category.id}
                href={`/categories/${category.slug}`}
                className="featured-category"
                style={{ backgroundColor: category.colors?.secondary }}
              >
                <span className="featured-icon" style={{ color: category.colors?.primary }}>
                  {category.icon}
                </span>
                <span className="featured-name">{category.name}</span>
                <Badge variant="success" size="xs">Hot</Badge>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .section {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .section-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .section-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          max-width: 500px;
        }

        .section-header-badge {
          flex-shrink: 0;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .category-item {
          opacity: 0;
        }

        .categories-action {
          text-align: center;
          margin-bottom: 4rem;
        }

        .categories-action .btn {
          min-width: 200px;
        }

        .featured-categories {
          background: var(--bg-color);
          border-radius: var(--radius-xl);
          padding: 2rem;
          border: 1px solid var(--border);
        }

        .featured-title {
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .featured-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .featured-category {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-base);
        }

        .featured-category:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary);
        }

        .featured-icon {
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-color);
          border-radius: var(--radius);
          flex-shrink: 0;
        }

        .featured-name {
          font-weight: 600;
          color: var(--text-main);
          flex-grow: 1;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(1rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .section-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .featured-list {
            grid-template-columns: 1fr;
          }

          .featured-category {
            padding: 0.75rem;
          }

          .section-title {
            font-size: var(--text-2xl);
          }

          .section-description {
            font-size: var(--text-base);
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
