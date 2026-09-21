'use client';

import { useState, useEffect } from 'react';
import { getFeaturedProducts, getBestSellerProducts, getNewProducts } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import LoadingCard from '@/components/ui/LoadingCard';
import Badge from '@/components/ui/Badge';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { 
      id: 'featured', 
      label: 'Featured', 
      count: getFeaturedProducts().length,
      icon: '⭐'
    },
    { 
      id: 'bestseller', 
      label: 'Best Sellers', 
      count: getBestSellerProducts().length,
      icon: '🔥'
    },
    { 
      id: 'new', 
      label: 'New Arrivals', 
      count: getNewProducts().length,
      icon: '✨'
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      let newProducts = [];
      
      switch (activeTab) {
        case 'featured':
          newProducts = getFeaturedProducts().slice(0, 8);
          break;
        case 'bestseller':
          newProducts = getBestSellerProducts().slice(0, 8);
          break;
        case 'new':
          newProducts = getNewProducts().slice(0, 8);
          break;
        default:
          newProducts = getFeaturedProducts().slice(0, 8);
      }
      
      setProducts(newProducts);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-info">
            <h2 className="section-title">Discover Great Products</h2>
            <p className="section-description">
              Handpicked fresh arrivals and top quality items our customers love
            </p>
          </div>

          {/* Product Tabs */}
          <div className="product-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'tab-button--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <Badge 
                  variant={activeTab === tab.id ? 'primary' : 'outline'} 
                  size="xs"
                  className="tab-badge"
                >
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {loading ? (
            // Loading State
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index} variant="product" />
            ))
          ) : (
            // Products
            products.map((product, index) => (
              <div
                key={product.id}
                className="product-item"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <ProductCard 
                  product={product} 
                  showQuickActions={true}
                />
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="section-action">
          <a href="/products" className="btn btn-outline btn-lg">
            View All Products
            <span>→</span>
          </a>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon">🛒</div>
            <div className="stat-content">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products Available</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-number">2-4hrs</div>
              <div className="stat-label">Fast Delivery</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">💯</div>
            <div className="stat-content">
              <div className="stat-number">100%</div>
              <div className="stat-label">Quality Guaranteed</div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-icon">📞</div>
            <div className="stat-content">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section {
          background: var(--bg-color);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          gap: 2rem;
        }

        .section-info {
          flex: 1;
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

        .product-tabs {
          display: flex;
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 0.25rem;
          border: 1px solid var(--border);
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 500;
          color: var(--text-muted);
        }

        .tab-button:hover {
          background: var(--bg-color);
          color: var(--text-main);
        }

        .tab-button--active {
          background: var(--primary);
          color: white;
          box-shadow: var(--shadow-sm);
        }

        .tab-icon {
          font-size: 1.125rem;
        }

        .tab-label {
          font-size: var(--text-sm);
          white-space: nowrap;
        }

        .tab-badge {
          margin-left: 0.25rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .product-item {
          opacity: 0;
        }

        .section-action {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-action .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 180px;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          padding: 2rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }

        .stat-icon {
          font-size: 2rem;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-light);
          border-radius: var(--radius-lg);
          flex-shrink: 0;
        }

        .stat-number {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--primary);
          line-height: 1;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-top: 0.125rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }

          .product-tabs {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .product-tabs::-webkit-scrollbar {
            display: none;
          }

          .tab-button {
            flex-shrink: 0;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
          }

          .quick-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .section-title {
            font-size: var(--text-2xl);
          }

          .section-description {
            font-size: var(--text-base);
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .quick-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-item {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
