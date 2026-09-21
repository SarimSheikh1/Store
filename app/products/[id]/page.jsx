'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProductBySlug, getRelatedProducts, PRODUCTS } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice, effectivePrice, discountPercent, isInStock } from '@/lib/utils';
import { generateQuickOrderWhatsApp } from '@/lib/whatsapp';
import ProductCard from '@/components/ui/ProductCard';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductBySlug(id);
  const { addToCart, isLoaded } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return (
      <div className="section container">
        <div className="not-found">
          <div className="not-found-content">
            <div className="not-found-icon">📦</div>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const price = effectivePrice(product);
  const discount = discountPercent(product.price, product.salePrice);
  const inStock = isInStock(product);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id, 4);
  
  // Mock multiple images - in real app this would come from product data
  const productImages = [product.image];

  const handleAddToCart = async () => {
    if (!inStock) {
      addToast('This item is currently out of stock', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      await addToCart(product, quantity);
      addToast(`${quantity} ${product.name} added to cart!`, 'success');
    } catch (error) {
      addToast('Failed to add item to cart', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      addToast('Added to wishlist', 'success');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && (newQuantity <= product.stock || !product.stock)) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star star--filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star star--half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star star--empty">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href="/products" className="breadcrumb-link">Products</Link>
          {category && (
            <>
              <span className="breadcrumb-separator">›</span>
              <Link href={`/categories/${product.category}`} className="breadcrumb-link">
                {category.name}
              </Link>
            </>
          )}
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>
        {/* Product Details */}
        <div className="product-layout">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <div className="image-container">
                <div className="product-image">
                  {productImages[selectedImage]}
                </div>
                
                {/* Badges */}
                <div className="product-badges">
                  {discount > 0 && (
                    <Badge variant="error" className="discount-badge">
                      -{discount}% OFF
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="primary">Featured</Badge>
                  )}
                  {product.bestseller && (
                    <Badge variant="warning">Best Seller</Badge>
                  )}
                  {product.isNew && (
                    <Badge variant="success">New</Badge>
                  )}
                  {!inStock && (
                    <Badge variant="outline">Out of Stock</Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <button 
                  className={`wishlist-btn ${inWishlist ? 'wishlist-btn--active' : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="product-info">
            {/* Category & Brand */}
            <div className="product-meta">
              {category && (
                <Link 
                  href={`/categories/${product.category}`} 
                  className="product-category"
                  style={{ color: category.colors?.primary }}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </Link>
              )}
              
              {product.brand && (
                <div className="product-brand">
                  Brand: <strong>{product.brand}</strong>
                </div>
              )}
            </div>

            {/* Product Title */}
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="product-rating">
                <div className="rating-stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Pricing */}
            <div className="product-pricing">
              <div className="price-main">
                <span className="current-price">₨{formatPrice(price)}</span>
                {discount > 0 && (
                  <span className="original-price">₨{formatPrice(product.price)}</span>
                )}
                <span className="unit-label">per {product.unit || 'piece'}</span>
              </div>
              
              {discount > 0 && (
                <div className="savings-info">
                  <Badge variant="success" size="sm">
                    Save ₨{formatPrice(product.price - price)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="stock-status">
              {inStock ? (
                product.stock !== undefined ? (
                  product.stock <= 10 ? (
                    <Badge variant="warning">Only {product.stock} left in stock</Badge>
                  ) : (
                    <Badge variant="success">✅ In Stock</Badge>
                  )
                ) : (
                  <Badge variant="success">✅ Available</Badge>
                )
              ) : (
                <Badge variant="error">❌ Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <div className="product-description">
              <p className={`description-text ${!showFullDescription ? 'description-text--truncated' : ''}`}>
                {product.description || 'Fresh, high-quality product available for delivery.'}
              </p>
              
              {product.description && product.description.length > 150 && (
                <button 
                  className="description-toggle"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="cart-section">
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={product.stock && quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button 
                className={`btn btn-primary btn-lg add-to-cart ${isLoading ? 'btn--loading' : ''}`}
                onClick={handleAddToCart}
                disabled={!inStock || isLoading || !isLoaded}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Adding...
                  </>
                ) : !inStock ? (
                  'Out of Stock'
                ) : (
                  <>
                    <span>🛒</span>
                    Add {quantity} to Cart
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Order */}
            <div className="whatsapp-section">
              <a 
                href={generateQuickOrderWhatsApp(product, quantity)}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-success btn-lg whatsapp-btn"
              >
                <span>💬</span>
                Order {quantity} via WhatsApp
              </a>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <ProductCard product={relatedProduct} showQuickActions={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .product-detail-page {
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

        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .product-images {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-image {
          flex: 1;
        }

        .image-container {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          aspect-ratio: 1;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
          transition: transform var(--transition-base);
        }

        .image-container:hover .product-image {
          transform: scale(1.05);
        }

        .product-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 10;
        }

        .discount-badge {
          font-weight: 700;
          font-size: var(--text-sm);
        }

        .wishlist-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: none;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all var(--transition-base);
          z-index: 10;
        }

        .wishlist-btn:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 1);
        }

        .wishlist-btn--active {
          background: var(--error-light);
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: var(--text-sm);
          font-weight: 600;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: opacity var(--transition-base);
        }

        .product-category:hover {
          opacity: 0.8;
        }

        .category-icon {
          font-size: 1.125rem;
        }

        .product-brand {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .product-title {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.2;
          margin: 0;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .rating-stars {
          display: flex;
          gap: 0.125rem;
        }

        .star {
          font-size: var(--text-lg);
        }

        .star--filled {
          color: var(--warning);
        }

        .star--half {
          color: var(--warning);
          opacity: 0.5;
        }

        .star--empty {
          color: var(--text-light);
        }

        .rating-text {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .product-pricing {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          border: 1px solid var(--border);
        }

        .price-main {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .current-price {
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .original-price {
          font-size: var(--text-xl);
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .unit-label {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .stock-status {
          display: flex;
          align-items: center;
        }

        .product-description {
          background: var(--surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          border: 1px solid var(--border);
        }

        .description-text {
          font-size: var(--text-base);
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
        }

        .description-text--truncated {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .description-toggle {
          color: var(--primary);
          background: none;
          border: none;
          font-size: var(--text-sm);
          cursor: pointer;
          margin-top: 0.5rem;
          transition: opacity var(--transition-base);
        }

        .description-toggle:hover {
          opacity: 0.8;
        }

        .cart-section {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .qty-btn {
          width: 3rem;
          height: 3rem;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .qty-btn:hover:not(:disabled) {
          background: var(--bg-color);
        }

        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .qty-display {
          width: 3rem;
          text-align: center;
          font-weight: 600;
          font-size: var(--text-lg);
        }

        .add-to-cart {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 3rem;
        }

        .whatsapp-section {
          margin-top: -0.5rem;
        }

        .whatsapp-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #25D366;
          border-color: #25D366;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .related-products {
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .section-title {
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2rem;
          text-align: center;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .loading-spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top-color: currentColor;
          border-radius: var(--radius-full);
          animation: spin 0.8s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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
          .product-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .product-title {
            font-size: var(--text-3xl);
          }

          .current-price {
            font-size: var(--text-3xl);
          }

          .cart-section {
            flex-direction: column;
            align-items: stretch;
          }

          .quantity-controls {
            align-self: center;
          }

          .related-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .product-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
