'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, getProductsByCategory, getFeaturedProducts, getBestSellerProducts, getNewProducts } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { searchProducts, sortProducts, isInStock } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';
import LoadingCard from '@/components/ui/LoadingCard';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'name-asc';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [filterOptions, setFilterOptions] = useState({
    inStock: false,
    onSale: false,
    featured: false,
    newArrivals: false
  });
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const itemsPerPage = 12;

  // Filter and sort products
  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      let result = [...PRODUCTS];
      
      // Category filter
      if (category !== 'all') {
        result = getProductsByCategory(category);
      }
      
      // Search filter
      if (query.trim()) {
        result = searchProducts(result, query);
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
      
      if (filterOptions.newArrivals) {
        result = result.filter(product => product.isNew);
      }
      
      // Sort products
      result = sortProducts(result, sortBy);
      
      setFilteredProducts(result);
      setCurrentPage(1); // Reset to first page when filters change
      setLoading(false);
    }, 300);
  }, [query, category, sortBy, priceRange, filterOptions]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Clear all filters
  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setSortBy('name-asc');
    setPriceRange({ min: '', max: '' });
    setFilterOptions({
      inStock: false,
      onSale: false,
      featured: false,
      newArrivals: false
    });
  };

  // Handle filter option change
  const handleFilterChange = (filterName, value) => {
    setFilterOptions(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">All Products</h1>
            <p className="page-subtitle">
              Discover our complete range of fresh groceries and daily essentials
            </p>
            
            <div className="results-info">
              <Badge variant="primary-light" className="results-badge">
                {loading ? 'Searching...' : `${filteredProducts.length} products found`}
              </Badge>
              
              {(query || category !== 'all' || Object.values(filterOptions).some(Boolean)) && (
                <button 
                  className="btn btn-outline btn-sm clear-filters"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="view-controls">
            <div className="view-mode-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <span>⊞</span>
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <span>☰</span>
                List
              </button>
            </div>
          </div>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Search</h3>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-input search-input"
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Category</h3>
              <div className="category-filters">
                <label className="filter-option">
                  <input 
                    type="radio" 
                    name="category"
                    value="all"
                    checked={category === 'all'}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span>All Categories</span>
                  <Badge variant="outline" size="xs">{PRODUCTS.length}</Badge>
                </label>
                
                {CATEGORIES.map(cat => {
                  const count = getProductsByCategory(cat.slug).length;
                  return (
                    <label key={cat.id} className="filter-option">
                      <input 
                        type="radio" 
                        name="category"
                        value={cat.slug}
                        checked={category === cat.slug}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                      <span className="category-icon">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <Badge variant="outline" size="xs">{count}</Badge>
                    </label>
                  );
                })}
              </div>
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
                
                <label className="filter-checkbox">
                  <input 
                    type="checkbox"
                    checked={filterOptions.newArrivals}
                    onChange={(e) => handleFilterChange('newArrivals', e.target.checked)}
                  />
                  <span>New Arrivals</span>
                </label>
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
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className={`products-grid products-grid--${viewMode}`}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <LoadingCard key={index} variant="product" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState 
                type="products"
                title="No products found"
                description="Try adjusting your search terms or filters to find what you're looking for."
                action={clearFilters}
                actionText="Clear Filters"
              />
            ) : (
              <>
                <div className={`products-grid products-grid--${viewMode}`}>
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
                        variant={viewMode === 'list' ? 'horizontal' : 'default'}
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
        .products-page {
          background: var(--bg-color);
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .clear-filters {
          font-size: var(--text-sm);
        }

        .view-controls {
          flex-shrink: 0;
        }

        .view-mode-toggle {
          display: flex;
          background: var(--surface);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .view-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: var(--text-sm);
        }

        .view-btn:hover {
          background: var(--bg-color);
          color: var(--text-main);
        }

        .view-btn--active {
          background: var(--primary);
          color: white;
        }

        .products-content {
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

        .category-filters {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: var(--radius);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .filter-option:hover {
          background: var(--bg-color);
        }

        .filter-option input[type="radio"] {
          margin: 0;
        }

        .category-icon {
          font-size: 1.125rem;
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
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .products-grid--grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .products-grid--list {
          grid-template-columns: 1fr;
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
          .page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .products-content {
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

          .view-mode-toggle {
            align-self: center;
          }

          .products-grid--grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .pagination {
            flex-wrap: wrap;
            gap: 0.25rem;
          }

          .page-title {
            font-size: var(--text-3xl);
          }
        }

        @media (max-width: 480px) {
          .products-grid--grid {
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container section">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
