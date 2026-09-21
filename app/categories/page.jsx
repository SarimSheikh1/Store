'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import CategoryCard from '@/components/ui/CategoryCard';
import Badge from '@/components/ui/Badge';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter categories based on search and featured status
  const filteredCategories = CATEGORIES.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || category.featured;
    
    return matchesSearch && matchesFeatured;
  });

  // Calculate total products across all categories
  const totalProducts = CATEGORIES.reduce((total, category) => {
    return total + getProductsByCategory(category.slug).length;
  }, 0);

  const featuredCategoriesCount = CATEGORIES.filter(cat => cat.featured).length;

  return (
    <div className="categories-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">All Categories</h1>
            <p className="page-subtitle">
              Browse our complete range of products organized by category. 
              Find exactly what you need with our comprehensive selection.
            </p>

            <div className="page-stats">
              <div className="stat-item">
                <div className="stat-number">{CATEGORIES.length}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{totalProducts}</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{featuredCategoriesCount}</div>
                <div className="stat-label">Featured</div>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <Badge variant="primary-light" className="categories-count">
              {filteredCategories.length} categories shown
            </Badge>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="controls-section">
          <div className="search-control">
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
            />
          </div>

          <div className="filter-controls">
            <label className="filter-checkbox">
              <input 
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              />
              <span>Featured Categories Only</span>
            </label>

            {(searchQuery || showFeaturedOnly) && (
              <button 
                className="btn btn-outline btn-sm clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  setShowFeaturedOnly(false);
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No categories found</h3>
            <p>Try adjusting your search terms or remove filters.</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setShowFeaturedOnly(false);
              }}
            >
              Show All Categories
            </button>
          </div>
        ) : (
          <div className="categories-grid">
            {filteredCategories.map((category, index) => {
              const productsCount = getProductsByCategory(category.slug).length;
              
              return (
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
                    category={{
                      ...category,
                      productCount: productsCount
                    }} 
                    showProductCount={true}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Featured Categories Highlight */}
        {!showFeaturedOnly && CATEGORIES.filter(cat => cat.featured).length > 0 && (
          <div className="featured-section">
            <h2 className="featured-title">Featured Categories</h2>
            <p className="featured-subtitle">
              Our most popular categories with the best selection of products
            </p>
            
            <div className="featured-grid">
              {CATEGORIES.filter(cat => cat.featured).slice(0, 4).map((category, index) => {
                const productsCount = getProductsByCategory(category.slug).length;
                
                return (
                  <div
                    key={category.id}
                    className="featured-item"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      opacity: 0,
                      animation: 'slideInUp 0.8s ease-out forwards'
                    }}
                  >
                    <div 
                      className="featured-card"
                      style={{ 
                        background: `linear-gradient(135deg, ${category.colors?.secondary || 'var(--primary-light)'} 0%, ${category.colors?.primary || 'var(--primary)'} 100%)`
                      }}
                    >
                      <div className="featured-icon">{category.icon}</div>
                      <h3 className="featured-name">{category.name}</h3>
                      <p className="featured-desc">{category.description}</p>
                      <div className="featured-stats">
                        <Badge variant="outline" size="sm" className="products-badge">
                          {productsCount} products
                        </Badge>
                        <Badge variant="warning" size="sm">⭐ Featured</Badge>
                      </div>
                      <a 
                        href={`/categories/${category.slug}`}
                        className="featured-link"
                      >
                        Shop Now →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="quick-nav">
          <h3 className="quick-nav-title">Quick Navigation</h3>
          <div className="quick-nav-grid">
            <a href="/products" className="quick-nav-item">
              <span className="nav-icon">🛒</span>
              <span className="nav-text">All Products</span>
              <span className="nav-count">{totalProducts}</span>
            </a>
            <a href="/products?featured=true" className="quick-nav-item">
              <span className="nav-icon">⭐</span>
              <span className="nav-text">Featured</span>
              <span className="nav-count">New</span>
            </a>
            <a href="/products?sale=true" className="quick-nav-item">
              <span className="nav-icon">💰</span>
              <span className="nav-text">On Sale</span>
              <span className="nav-count">Hot</span>
            </a>
            <a href="/ration-packages" className="quick-nav-item">
              <span className="nav-icon">📦</span>
              <span className="nav-text">Packages</span>
              <span className="nav-count">3</span>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .categories-page {
          background: var(--bg-color);
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .header-content {
          flex: 1;
          max-width: 600px;
        }

        .page-title {
          font-size: var(--text-5xl);
          font-weight: 900;
          color: var(--text-main);
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .page-subtitle {
          font-size: var(--text-xl);
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .page-stats {
          display: flex;
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-actions {
          flex-shrink: 0;
        }

        .controls-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .search-control {
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: var(--text-sm);
        }

        .clear-btn {
          font-size: var(--text-sm);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .category-item {
          opacity: 0;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .featured-section {
          margin-bottom: 4rem;
          padding: 3rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
        }

        .featured-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-main);
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .featured-subtitle {
          font-size: var(--text-lg);
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .featured-item {
          opacity: 0;
        }

        .featured-card {
          padding: 2rem;
          border-radius: var(--radius-xl);
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .featured-card {
          background: linear-gradient(145deg, #102b3b 0%, #155e75 100%) !important;
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 1rem 2rem rgba(16, 43, 59, .14);
        }

        .featured-item:nth-child(2) .featured-card { background: linear-gradient(145deg, #3b2b18 0%, #96601e 100%) !important; }
        .featured-item:nth-child(3) .featured-card { background: linear-gradient(145deg, #3d1f2a 0%, #8d3549 100%) !important; }
        .featured-item:nth-child(4) .featured-card { background: linear-gradient(145deg, #263218 0%, #59702a 100%) !important; }

        .featured-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .featured-card:hover::before {
          background: rgba(0, 0, 0, 0.05);
        }

        .featured-card > * {
          position: relative;
          z-index: 2;
        }

        .featured-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .featured-name {
          font-size: var(--text-xl);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .featured-desc {
          font-size: var(--text-sm);
          opacity: 0.9;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .featured-stats {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .products-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .featured-link {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: var(--text-sm);
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius);
          transition: all var(--transition-base);
        }

        .featured-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(4px);
        }

        .quick-nav {
          background: var(--surface);
          border-radius: var(--radius-xl);
          padding: 2rem;
          border: 1px solid var(--border);
        }

        .quick-nav-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-main);
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .quick-nav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .quick-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: var(--bg-color);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          text-decoration: none;
          color: var(--text-main);
          transition: all var(--transition-base);
        }

        .quick-nav-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
          border-color: var(--primary);
        }

        .nav-icon {
          font-size: 1.5rem;
          margin-right: 0.75rem;
        }

        .nav-text {
          font-weight: 500;
          flex-grow: 1;
        }

        .nav-count {
          font-size: var(--text-sm);
          color: var(--primary);
          font-weight: 600;
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
          .page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }

          .page-stats {
            justify-content: center;
          }

          .controls-section {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .search-control {
            max-width: none;
          }

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .featured-grid {
            grid-template-columns: 1fr;
          }

          .quick-nav-grid {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: var(--text-4xl);
          }

          .page-subtitle {
            font-size: var(--text-lg);
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }

          .page-stats {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
