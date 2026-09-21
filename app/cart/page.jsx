'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { formatPrice, effectivePrice, discountPercent } from '@/lib/utils';
import { generateCartWhatsApp } from '@/lib/whatsapp';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import LoadingCard from '@/components/ui/LoadingCard';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, cartCount, isLoaded } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [isUpdating, setIsUpdating] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Mock promo codes
  const promoCodes = {
    'WELCOME20': { discount: 0.2, minAmount: 1000, description: '20% off on orders above Rs. 1000' },
    'SAVE100': { discount: 100, minAmount: 500, description: 'Rs. 100 off on orders above Rs. 500' },
    'NEWUSER': { discount: 0.15, minAmount: 0, description: '15% off for new users' }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const price = effectivePrice(item);
    return sum + (price * item.quantity);
  }, 0);

  const deliveryFee = subtotal >= 2000 ? 0 : 150; // Free delivery above Rs. 2000
  
  let discount = 0;
  if (appliedPromo) {
    if (typeof appliedPromo.discount === 'number' && appliedPromo.discount < 1) {
      discount = subtotal * appliedPromo.discount;
    } else {
      discount = appliedPromo.discount;
    }
  }

  const total = subtotal - discount + deliveryFee;
  const totalSavings = items.reduce((sum, item) => {
    if (item.salePrice && item.salePrice < item.price) {
      return sum + ((item.price - item.salePrice) * item.quantity);
    }
    return sum;
  }, discount);

  const handleQuantityUpdate = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(prev => ({ ...prev, [itemId]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      updateQuantity(itemId, newQuantity);
      addToast('Cart updated', 'info');
    } catch (error) {
      addToast('Failed to update cart', 'error');
    } finally {
      setIsUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    addToast(`${item.name} removed from cart`, 'info');
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    addToast(`${item.name} moved to wishlist`, 'success');
  };

  const handleApplyPromo = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (!promo) {
      addToast('Invalid promo code', 'error');
      return;
    }
    
    if (subtotal < promo.minAmount) {
      addToast(`Minimum order amount is Rs. ${promo.minAmount}`, 'error');
      return;
    }

    setAppliedPromo({ ...promo, code: promoCode.toUpperCase() });
    setShowPromoInput(false);
    addToast(`Promo code ${promoCode.toUpperCase()} applied!`, 'success');
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    addToast('Promo code removed', 'info');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      addToast('Cart cleared', 'info');
    }
  };

  if (!isLoaded) {
    return (
      <div className="section container">
        <h1>Shopping Cart</h1>
        <div className="cart-loading">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} variant="product" />
          ))}
      </div>
    </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section container">
        <EmptyState 
          type="cart"
          title="Your cart is empty"
          description="Add some items to your cart to get started shopping."
          actionText="Browse Products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <div className="cart-header">
          <div className="header-content">
            <h1 className="cart-title">Shopping Cart</h1>
            <Badge variant="primary-light" className="cart-count">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn btn-outline btn-sm clear-cart"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            
            <a 
              href={generateCartWhatsApp(items, { subtotal, deliveryFee, discount, total })}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-success btn-sm whatsapp-btn"
            >
              <span>💬</span>
              Order via WhatsApp
            </a>
          </div>
        </div>
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {items.map((item, index) => {
              const itemPrice = effectivePrice(item);
              const itemDiscount = discountPercent(item.price, item.salePrice);
              const isUpdatingItem = isUpdating[item.id];
              const inWishlist = isInWishlist(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className="cart-item"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: 'fadeInUp 0.4s ease-out forwards'
                  }}
                >
                  {/* Item Image */}
                  <div className="item-image">
                    <Link href={`/products/${item.slug}`} className="image-link">
                      <img
                        src={typeof item.image === 'string' && (item.image.startsWith('/') || item.image.startsWith('http')) ? item.image : '/images/local-grocery-products.png'}
                        alt={item.name}
                        className="cart-product-image"
                        onError={(event) => { event.currentTarget.src = '/images/local-grocery-products.png'; }}
                      />
                    </Link>
                    
                    {itemDiscount > 0 && (
                      <Badge variant="error" size="xs" className="item-discount">
                        -{itemDiscount}%
                      </Badge>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="item-details">
                    <Link href={`/products/${item.slug}`} className="item-name">
                      {item.name}
                    </Link>
                    
                    {item.brand && (
                      <div className="item-brand">Brand: {item.brand}</div>
                    )}
                    
                    <div className="item-pricing">
                      <span className="current-price">₨{formatPrice(itemPrice)}</span>
                      {itemDiscount > 0 && (
                        <span className="original-price">₨{formatPrice(item.price)}</span>
                      )}
                      <span className="unit-label">per {item.unit || 'piece'}</span>
                    </div>

                    {item.stock && item.stock <= 10 && (
                      <Badge variant="warning" size="xs" className="stock-warning">
                        Only {item.stock} left in stock
                      </Badge>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="item-quantity">
                    <div className="quantity-label">Quantity</div>
                    <div className={`quantity-controls ${isUpdatingItem ? 'quantity-controls--loading' : ''}`}>
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isUpdatingItem}
                      >
                        −
                      </button>
                      <span className="qty-display">
                        {isUpdatingItem ? (
                          <div className="mini-spinner"></div>
                        ) : (
                          item.quantity
                        )}
                      </span>
                      <button 
                        className="qty-btn"
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                        disabled={isUpdatingItem || (item.stock && item.quantity >= item.stock)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="item-total">
                    <div className="total-label">Total</div>
                    <div className="total-price">₨{formatPrice(itemPrice * item.quantity)}</div>
                    {itemDiscount > 0 && (
                      <div className="total-savings">
                        Save ₨{formatPrice((item.price - itemPrice) * item.quantity)}
                      </div>
                    )}
                  </div>

                  {/* Item Actions */}
                  <div className="item-actions">
                    {!inWishlist && (
                      <button 
                        className="action-btn wishlist-btn"
                        onClick={() => handleMoveToWishlist(item)}
                        title="Move to wishlist"
                      >
                        <span>🤍</span>
                        Wishlist
                      </button>
                    )}
                    
                    <button 
                      className="action-btn remove-btn"
                      onClick={() => handleRemoveItem(item)}
                      title="Remove from cart"
                    >
                      <span>🗑️</span>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              {/* Summary Items */}
              <div className="summary-section">
                <div className="summary-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>₨{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-success' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₨${formatPrice(deliveryFee)}`}
                  </span>
                </div>
                
                {deliveryFee > 0 && (
                  <div className="delivery-note">
                    <Badge variant="info" size="sm">
                      Free delivery on orders above ₨2,000
                    </Badge>
                  </div>
                )}

                {appliedPromo && (
                  <div className="summary-row promo-row">
                    <div className="promo-info">
                      <span>Promo ({appliedPromo.code})</span>
                      <button 
                        className="remove-promo"
                        onClick={handleRemovePromo}
                        title="Remove promo code"
                      >
                        ×
                      </button>
                    </div>
                    <span className="text-success">-₨{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              {/* Promo Code Section */}
              <div className="promo-section">
                {!showPromoInput ? (
                  <button 
                    className="promo-toggle"
                    onClick={() => setShowPromoInput(true)}
                  >
                    Have a promo code? Apply here
                  </button>
                ) : (
                  <div className="promo-input-group">
                    <input 
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="form-input promo-input"
                    />
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={handleApplyPromo}
                      disabled={!promoCode.trim()}
                    >
                      Apply
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setShowPromoInput(false);
                        setPromoCode('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="summary-total">
                <div className="total-row">
                  <span>Total</span>
                  <span>₨{formatPrice(total)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="total-savings">
                    <Badge variant="success" size="sm">
                      You save ₨{formatPrice(totalSavings)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="summary-actions">
                <Link href="/checkout" className="btn btn-primary btn-lg checkout-btn">
                  <span>🛒</span>
                  Proceed to Checkout
                </Link>
                
                <Link href="/products" className="btn btn-outline continue-shopping">
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="security-info">
                <div className="security-item">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="security-item">
                  <span>🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="security-item">
                  <span>↩️</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
