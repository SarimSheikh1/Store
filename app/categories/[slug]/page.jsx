'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { searchProducts, sortProducts, isInStock } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';
import LoadingCard from '@/components/ui/LoadingCard';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filterOptions, setFilterOptions] = useState({
    inStock: false,
    onSale: false,
    featured: false
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize products
  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(slug);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
      setLoading(false);
    }
  }, [slug, category]);

  // Filter and sort products
  useEffect(() => {
    if (products.length === 0) return;
    
    setLoading(true);
    
    setTimeout(() => {
      let result = [...products];
      
      // Search filter
      if (searchQuery.trim()) {
        result = searchProducts(result, searchQuery);
      }
      
      // Price range filter
      if (priceRange.min || priceRange.max) {
        result = result.filter(product => {
          const price = product.salePrice || product.price;
          const min = priceRange.min ? parseFloat(priceRange.min) : 0;
          const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
          return price >= min && price <= max;
        });
      }
      
      // Additional filters
      if (filterOptions.inStock) {
        result = result.filter(product => isInStock(product));
      }
      
      if (filterOptions.onSale) {
        result = result.filter(product => product.salePrice && product.salePrice < product.price);
      }
      
      if (filterOptions.featured) {
        result = result.filter(product => product.featured);
      }
      
      // Sort products
      result = sortProducts(result, sortBy);
      
      setFilteredProducts(result);
      setCurrentPage(1);
      setLoading(false);
    }, 200);
  }, [products, searchQuery, sortBy, priceRange, filterOptions]);

  if (!category) {
    return (
      <div className="section container">
        <div className="not-found">
          <div className="not-found-content">
            <div className="not-found-icon">📂</div>
            <h2>Category Not Found</h2>
            <p>The category you're looking for doesn't exist.</p>
            <Link href="/categories" className="btn btn-primary">
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('name-asc');
    setPriceRange({ min: '', max: '' });
    setFilterOptions({
      inStock: false,
      onSale: false,
      featured: false
    });
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="category-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href="/categories" className="breadcrumb-link">Categories</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="category-header">
          <div className="category-info">
            <div 
              className="category-icon-large"
              style={{ 
                backgroundColor: category.colors?.secondary || 'var(--primary-light)',
                color: category.colors?.primary || 'var(--primary)'
              }}
            >
              {category.icon}
            </div>
            <div className="category-details">
              <h1 className="category-title">{category.name}</h1>
              <p className="category-description">{category.description}</p>
              <div className="category-stats">
                <Badge variant="primary-light" className="products-count">
                  {products.length} products available
                </Badge>
                {category.featured && (
                  <Badge variant="success">Featured Category</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="results-summary">
            <Badge variant="outline" className="results-badge">
              {loading ? 'Filtering...' : `${filteredProducts.length} results`}
            </Badge>
            
            {(searchQuery || Object.values(filterOptions).some(Boolean) || priceRange.min || priceRange.max) && (
              <button 
                className="btn btn-outline btn-sm clear-filters"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="category-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Search in {category.name}</h3>
              <input 
                type="text" 
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input search-input"
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-filter">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="form-input price-input"
                />
                <span>to</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="form-input price-input"
                />
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Filters</h3>
              <div className="checkbox-filters">
                <label className="filter-checkbox">
                  <input 
                    type="checkbox"
                    checked={filterOptions.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox"
                    checked={filterOptions.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  />
                  <span>On Sale</span>
                </label>
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox"
                    checked={filterOptions.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  />
                  <span>Featured Products</span>
                </label>
              </div>
            </div>

            {/* Quick Category Navigation */}
            <div className="filter-section">
              <h3 className="filter-title">Other Categories</h3>
              <div className="quick-categories">
                <Link href="/categories/rice-flour" className="quick-category">
                  🌾 Rice & Flour
                </Link>
                <Link href="/categories/pulses" className="quick-category">
                  🫘 Pulses
                </Link>
                <Link href="/categories/oil-ghee" className="quick-category">
                  🫗 Oil & Ghee
                </Link>
                <Link href="/categories/cleaning" className="quick-category">
                  🧽 Cleaning
                </Link>
              </div>
            </div>
          </div>

          {/* Products Main Content */}
          <div className="products-main">
            {/* Sort Controls */}
            <div className="sort-controls">
              <div className="sort-info">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select sort-select"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="discount">Highest Discount</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="products-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <LoadingCard key={index} variant="product" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState 
                type="products"
                title={`No ${category.name.toLowerCase()} found`}
                description="Try adjusting your search terms or filters to find what you're looking for."
                action={clearFilters}
                actionText="Clear Filters"
              />
            ) : (
              <>
                <div className="products-grid">
                  {paginatedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="product-item"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        opacity: 0,
                        animation: 'fadeInUp 0.4s ease-out forwards'
                      }}
                    >
                      <ProductCard 
                        product={product} 
                        showQuickActions={true}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      className="pagination-btn"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            className={`pagination-number ${currentPage === pageNum ? 'pagination-number--active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && (
                        <>
                          <span className="pagination-ellipsis">...</span>
                          <button
                            className={`pagination-number ${currentPage === totalPages ? 'pagination-number--active' : ''}`}
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>
                    
                    <button 
                      className="pagination-btn"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .category-page {
          background: var(--bg-color);
          min-height: 100vh;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: var(--text-sm);
        }

        .breadcrumb-link {
          color: var(--primary);
          text-decoration: none;
          transition: opacity var(--transition-base);
        }

        .breadcrumb-link:hover {
          opacity: 0.8;
        }

        .breadcrumb-separator {
          color: var(--text-muted);
        }

        .breadcrumb-current {
          color: var(--text-main);
          font-weight: 500;
        }

        .not-found {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .not-found-content {
          text-align: center;
          max-width: 400px;
        }

        .not-found-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding: 2rem;
          background: var(--surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border);
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .category-icon-large {
          width: 5rem;
          height: 5rem;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          flex-shrink: 0;
          border: 2px solid var(--border);
        }

        .category-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .category-description {
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .category-stats {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .results-summary {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .category-content {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
        }

        .filters-sidebar {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          border: 1px solid var(--border);
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .filter-section {
          margin-bottom: 2rem;
        }

        .filter-section:last-child {
          margin-bottom: 0;
        }

        .filter-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
        }

        .price-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-input {
          flex: 1;
          font-size: var(--text-sm);
        }

        .checkbox-filters {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .filter-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: var(--text-sm);
        }

        .quick-categories {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: var(--radius);
          text-decoration: none;
          color: var(--text-main);
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .quick-category:hover {
          background: var(--bg-color);
          color: var(--primary);
        }

        .products-main {
          flex: 1;
        }

        .sort-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
        }

        .sort-info {
          color: var(--text-muted);
          font-size: var(--text-sm);
        }

        .sort-select {
          min-width: 200px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .product-item {
          opacity: 0;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 2rem 0;
        }

        .pagination-btn {
          padding: 0.75rem 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.25rem;
        }

        .pagination-number {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .pagination-number:hover {
          background: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }

        .pagination-number--active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .pagination-ellipsis {
          display: flex;
          align-items: center;
          padding: 0 0.5rem;
          color: var(--text-muted);
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
          .category-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }

          .category-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .category-content {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            position: static;
          }

          .sort-controls {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .category-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .pagination-numbers {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
