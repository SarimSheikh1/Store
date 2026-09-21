'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist, 
  isInWishlist,
  clearWishlist,
  getWishlistItemCount,
  moveToCart as moveWishlistItemToCart
} from '../lib/cart.js';
import { useToast } from './ToastContext.jsx';

// Create Wishlist Context
const WishlistContext = createContext();

// Wishlist Provider Component
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  // Initialize wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const storedWishlist = getWishlist();
        setWishlistItems(storedWishlist);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Add item to wishlist
  const addItemToWishlist = (product) => {
    const result = addToWishlist(product);
    
    if (result.success) {
      setWishlistItems(result.wishlist);
      toast?.addToast(`${product.name} added to wishlist`, 'success');
    } else {
      toast?.addToast(result.message, 'warning');
    }
    
    return result;
  };

  // Remove item from wishlist
  const removeItemFromWishlist = (productId) => {
    const result = removeFromWishlist(productId);
    
    if (result.success) {
      setWishlistItems(result.wishlist);
      toast?.addToast('Item removed from wishlist', 'success');
    }
    
    return result;
  };

  // Toggle item in wishlist
  const toggleWishlistItem = (product) => {
    if (isInWishlist(product.id)) {
      return removeItemFromWishlist(product.id);
    } else {
      return addItemToWishlist(product);
    }
  };

  // Move item to cart
  const moveToCart = (product, quantity = 1) => {
    const result = moveWishlistItemToCart(product, quantity);
    
    if (result.success) {
      setWishlistItems(getWishlist()); // Refresh wishlist
      toast?.addToast(`${product.name} moved to cart`, 'success');
    } else {
      toast?.addToast(result.message, 'error');
    }
    
    return result;
  };

  // Clear entire wishlist
  const clearWishlistItems = () => {
    const result = clearWishlist();
    
    if (result.success) {
      setWishlistItems([]);
      toast?.addToast('Wishlist cleared', 'success');
    }
    
    return result;
  };

  // Check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return isInWishlist(productId);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    return getWishlistItemCount();
  };

  // Find wishlist item by product ID
  const findWishlistItem = (productId) => {
    return wishlistItems.find(item => item.productId === productId) || null;
  };

  // Get wishlist items by category
  const getWishlistItemsByCategory = (categorySlug) => {
    return wishlistItems.filter(item => item.category === categorySlug);
  };

  // Sort wishlist items
  const sortWishlistItems = (sortBy = 'newest') => {
    const sorted = [...wishlistItems];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      case 'price-high':
        return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      default:
        return sorted;
    }
  };

  // Context value
  const contextValue = {
    // State
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isLoading,
    
    // Actions
    addToWishlist: addItemToWishlist,
    removeFromWishlist: removeItemFromWishlist,
    toggleWishlistItem,
    moveToCart,
    clearWishlist: clearWishlistItems,
    
    // Utilities
    isInWishlist: isProductInWishlist,
    getWishlistCount,
    findWishlistItem,
    getWishlistItemsByCategory,
    sortWishlistItems
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

// Hook to use Wishlist Context
export function useWishlist() {
  const context = useContext(WishlistContext);
  
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  return context;
}