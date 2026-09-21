/**
 * ============================================================
 * FOUR PARTNERS MART — CART UTILITIES
 * ============================================================
 * Cart operations and persistence utilities
 * ============================================================
 */

import { storage, calculateDeliveryFee } from './utils.js';
import { BUSINESS_CONFIG } from './config.js';

// Storage key for cart data
const CART_STORAGE_KEY = 'fourPartnersCart';
const WISHLIST_STORAGE_KEY = 'fourPartnersWishlist';

/**
 * Cart item structure:
 * {
 *   productId: string,
 *   name: string,
 *   price: number,
 *   salePrice: number | null,
 *   quantity: number,
 *   unit: string,
 *   image: string,
 *   maxStock: number,
 *   addedAt: string (ISO date)
 * }
 */

/**
 * Get cart from storage
 */
export function getCart() {
  const cart = storage.get(CART_STORAGE_KEY, []);
  // Ensure all cart items have required properties
  return cart.map(item => ({
    ...item,
    addedAt: item.addedAt || new Date().toISOString(),
    unit: item.unit || 'piece'
  }));
}

/**
 * Save cart to storage
 */
export function saveCart(cart) {
  return storage.set(CART_STORAGE_KEY, cart);
}

/**
 * Add product to cart
 */
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === product.id);
  
  if (existingItemIndex > -1) {
    // Update existing item quantity
    const existingItem = cart[existingItemIndex];
    const newQuantity = existingItem.quantity + quantity;
    
    // Check stock limit
    if (product.stock && newQuantity > product.stock) {
      return {
        success: false,
        message: `Sorry, only ${product.stock} items available in stock`,
        cart: getCart()
      };
    }
    
    cart[existingItemIndex].quantity = newQuantity;
    cart[existingItemIndex].addedAt = new Date().toISOString(); // Update timestamp
  } else {
    // Add new item
    if (product.stock && quantity > product.stock) {
      return {
        success: false,
        message: `Sorry, only ${product.stock} items available in stock`,
        cart: getCart()
      };
    }
    
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice || null,
      quantity: quantity,
      unit: product.unit || 'piece',
      image: product.image,
      maxStock: product.stock || 999,
      addedAt: new Date().toISOString()
    };
    
    cart.unshift(cartItem); // Add to beginning of cart
  }
  
  saveCart(cart);
  
  return {
    success: true,
    message: `${product.name} added to cart`,
    cart: getCart()
  };
}

/**
 * Remove product from cart
 */
export function removeFromCart(productId) {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.productId !== productId);
  
  saveCart(filteredCart);
  
  return {
    success: true,
    message: 'Item removed from cart',
    cart: getCart()
  };
}

/**
 * Update item quantity in cart
 */
export function updateCartQuantity(productId, newQuantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return {
      success: false,
      message: 'Item not found in cart',
      cart: getCart()
    };
  }
  
  if (newQuantity <= 0) {
    return removeFromCart(productId);
  }
  
  const item = cart[itemIndex];
  
  // Check stock limit
  if (item.maxStock && newQuantity > item.maxStock) {
    return {
      success: false,
      message: `Sorry, only ${item.maxStock} items available in stock`,
      cart: getCart()
    };
  }
  
  cart[itemIndex].quantity = newQuantity;
  saveCart(cart);
  
  return {
    success: true,
    message: 'Cart updated',
    cart: getCart()
  };
}

/**
 * Clear entire cart
 */
export function clearCart() {
  saveCart([]);
  
  return {
    success: true,
    message: 'Cart cleared',
    cart: []
  };
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(cart = null) {
  const cartItems = cart || getCart();
  
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + (price * item.quantity);
  }, 0);
  
  const deliveryFee = calculateDeliveryFee(subtotal);
  
  const discount = cartItems.reduce((total, item) => {
    if (item.salePrice && item.salePrice < item.price) {
      return total + ((item.price - item.salePrice) * item.quantity);
    }
    return total;
  }, 0);
  
  const total = subtotal + deliveryFee;
  
  return {
    subtotal,
    deliveryFee,
    discount,
    total,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    isFreeDelivery: deliveryFee === 0,
    freeDeliveryThreshold: BUSINESS_CONFIG.delivery.freeThreshold
  };
}

/**
 * Get cart item count
 */
export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Check if product is in cart
 */
export function isInCart(productId) {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
}

/**
 * Get cart item by product ID
 */
export function getCartItem(productId) {
  const cart = getCart();
  return cart.find(item => item.productId === productId) || null;
}

/**
 * Validate cart before checkout
 */
export function validateCart(cart = null) {
  const cartItems = cart || getCart();
  const errors = [];
  
  if (cartItems.length === 0) {
    errors.push('Your cart is empty');
  }
  
  cartItems.forEach(item => {
    if (item.quantity <= 0) {
      errors.push(`${item.name} has invalid quantity`);
    }
    
    if (item.maxStock && item.quantity > item.maxStock) {
      errors.push(`${item.name} quantity exceeds available stock (${item.maxStock})`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================================
// WISHLIST UTILITIES
// ============================================================

/**
 * Get wishlist from storage
 */
export function getWishlist() {
  return storage.get(WISHLIST_STORAGE_KEY, []);
}

/**
 * Save wishlist to storage
 */
export function saveWishlist(wishlist) {
  return storage.set(WISHLIST_STORAGE_KEY, wishlist);
}

/**
 * Add product to wishlist
 */
export function addToWishlist(product) {
  const wishlist = getWishlist();
  
  if (wishlist.some(item => item.productId === product.id)) {
    return {
      success: false,
      message: 'Item already in wishlist',
      wishlist: getWishlist()
    };
  }
  
  const wishlistItem = {
    productId: product.id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice || null,
    image: product.image,
    addedAt: new Date().toISOString()
  };
  
  wishlist.unshift(wishlistItem);
  saveWishlist(wishlist);
  
  return {
    success: true,
    message: `${product.name} added to wishlist`,
    wishlist: getWishlist()
  };
}

/**
 * Remove product from wishlist
 */
export function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const filteredWishlist = wishlist.filter(item => item.productId !== productId);
  
  saveWishlist(filteredWishlist);
  
  return {
    success: true,
    message: 'Item removed from wishlist',
    wishlist: getWishlist()
  };
}

/**
 * Check if product is in wishlist
 */
export function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
}

/**
 * Move item from wishlist to cart
 */
export function moveToCart(product, quantity = 1) {
  const addResult = addToCart(product, quantity);
  
  if (addResult.success) {
    removeFromWishlist(product.id);
  }
  
  return addResult;
}

/**
 * Get wishlist item count
 */
export function getWishlistItemCount() {
  const wishlist = getWishlist();
  return wishlist.length;
}

/**
 * Clear entire wishlist
 */
export function clearWishlist() {
  saveWishlist([]);
  
  return {
    success: true,
    message: 'Wishlist cleared',
    wishlist: []
  };
}