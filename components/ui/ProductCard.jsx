'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice, effectivePrice, discountPercent, isInStock } from '@/lib/utils';
import { generateQuickOrderWhatsApp } from '@/lib/whatsapp';

export default function ProductCard({ product, variant = 'default', showQuickActions = true }) {
  const { addToCart, isLoaded } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const price = effectivePrice(product);
  const discount = discountPercent(product.price, product.salePrice);
  const inStock = isInStock(product);
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = async () => {
    if (!inStock) {
      addToast('This item is currently out of stock', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      await addToCart(product, 1);
      addToast(`${product.name} added to cart!`, 'success');
    } catch (error) {
      addToast('Failed to add item to cart', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
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
    <div className={`product-card product-card--${variant} ${!inStock ? 'product-card--out-of-stock' : ''}`}>
      {/* Product Image */}
      <div className="product-card__image">
        <Link href={`/products/${product.id}`} className="product-card__image-link">
          <div className="product-card__image-placeholder">
            <img
              src={product.image?.startsWith('/') || product.image?.startsWith('http') ? product.image : '/images/local-grocery-products.png'}
              alt={product.name}
              className="product-card__photo"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="product-card__badges">
          {discount > 0 && (
            <span className="product-card__badge badge-discount">
              -{discount}%
            </span>
          )}
          {product.featured && (
            <span className="product-card__badge badge-featured">
              Featured
            </span>
          )}
          {product.bestseller && (
            <span className="product-card__badge badge-bestseller">
              Best Seller
            </span>
          )}
          {!inStock && (
            <span className="product-card__badge badge-stock">
              Out of Stock
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        {showQuickActions && (
          <button 
            className={`product-card__wishlist ${inWishlist ? 'product-card__wishlist--active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card__content">
        {/* Category */}
        <Link href={`/categories/${product.category}`} className="product-card__category">
          {product.category.replace('-', ' ')}
        </Link>
        
        {/* Brand */}
        {product.brand && (
          <div className="product-card__brand">{product.brand}</div>
        )}
        
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="product-card__title">{product.name}</h3>
        </Link>
        
        {/* Rating */}
        {product.rating && (
          <div className="product-card__rating">
            <div className="product-card__stars">
              {renderStars(product.rating)}
            </div>
            <span className="product-card__rating-text">
              {product.rating} ({product.reviews || 0})
            </span>
          </div>
        )}
        
        {/* Pricing */}
        <div className="product-card__price">
          <span className="product-card__current-price">
            ₨{formatPrice(price)}
          </span>
          {discount > 0 && (
            <span className="product-card__original-price">
              ₨{formatPrice(product.price)}
            </span>
          )}
        </div>
        
        {/* Unit */}
        <div className="product-card__unit">per {product.unit || 'piece'}</div>
        
        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="product-card__stock">
            {inStock ? (
              product.stock <= 10 ? (
                <span className="text-warning">Only {product.stock} left</span>
              ) : (
                <span className="text-success">In Stock</span>
              )
            ) : (
              <span className="text-error">Out of Stock</span>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="product-card__actions">
          <button 
            className={`btn btn-primary btn-full ${isLoading ? 'btn--loading' : ''}`}
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
              'Add to Cart'
            )}
          </button>
          
          {showQuickActions && inStock && (
            <a 
              href={generateQuickOrderWhatsApp(product)}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline btn-full whatsapp-btn"
            >
              <span>💬</span>
              WhatsApp Order
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all var(--transition-base);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--border-hover);
        }

        .product-card--out-of-stock {
          opacity: 0.7;
        }

        .product-card--compact .product-card__content {
          padding: 0.75rem;
        }

        .product-card__image {
          position: relative;
          background: var(--bg-color);
          aspect-ratio: 1;
          overflow: hidden;
        }

        .product-card__image-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .product-card__image-placeholder {
          width: 100%;
          height: 100%;
          transition: transform var(--transition-base);
        }

        .product-card__photo { width: 100%; height: 100%; object-fit: cover; display: block; }

        .product-card:hover .product-card__image-placeholder {
          transform: scale(1.1);
        }

        .product-card__badges {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          z-index: 10;
        }

        .product-card__badge {
          position: static;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .badge-discount {
          background-color: var(--error);
          color: white;
        }

        .badge-featured {
          background-color: var(--primary);
          color: white;
        }

        .badge-bestseller {
          background-color: var(--warning);
          color: white;
        }

        .badge-stock {
          background-color: var(--surface);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }

        .product-card__wishlist {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: none;
          border-radius: var(--radius-full);
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          transition: all var(--transition-base);
          cursor: pointer;
          z-index: 10;
        }

        .product-card__wishlist:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }

        .product-card__wishlist--active {
          background: var(--error-light);
        }

        .product-card__content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .product-card__category {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          transition: color var(--transition-base);
        }

        .product-card__category:hover {
          color: var(--primary);
        }

        .product-card__brand {
          font-size: var(--text-sm);
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .product-card__title {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          transition: color var(--transition-base);
        }

        .product-card__title:hover {
          color: var(--primary);
        }

        .product-card__rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .product-card__stars {
          display: flex;
          gap: 0.125rem;
        }

        .star {
          font-size: var(--text-sm);
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

        .product-card__rating-text {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .product-card__price {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .product-card__current-price {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--primary);
        }

        .product-card__original-price {
          font-size: var(--text-sm);
          color: var(--text-muted);
          text-decoration: line-through;
        }

        .product-card__unit {
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .product-card__stock {
          font-size: var(--text-xs);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .product-card__actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: auto;
        }

        .whatsapp-btn {
          border-color: #25D366;
          color: #25D366;
          font-size: var(--text-sm);
        }

        .whatsapp-btn:hover {
          background-color: #25D366;
          color: white;
        }

        .btn--loading {
          cursor: not-allowed;
          opacity: 0.7;
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
      `}</style>
    </div>
  );
}
