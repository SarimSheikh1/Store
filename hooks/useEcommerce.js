/**
 * ============================================================
 * FOUR PARTNERS MART — E-COMMERCE HOOK
 * ============================================================
 * Combined hook for common e-commerce operations
 * ============================================================
 */

import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useApp } from '../context/AppContext.jsx';

/**
 * Combined e-commerce hook that provides cart, wishlist, and related functionality
 * This hook is designed to make common e-commerce operations simpler and more consistent
 */
export function useEcommerce() {
  const cart = useCart();
  const wishlist = useWishlist();
  const toast = useToast();
  const app = useApp();

  /**
   * Add product to cart with enhanced UX
   */
  const addProductToCart = async (product, quantity = 1, showToast = true) => {
    try {
      app.setLoading(true);
      
      const result = await cart.addToCart(product, quantity);
      
      if (result.success && showToast) {
        toast.addToast(`${product.name} added to cart`, 'success');
      } else if (!result.success && showToast) {
        toast.addToast(result.message || 'Failed to add to cart', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      if (showToast) {
        toast.addToast('Something went wrong. Please try again.', 'error');
      }
      
      return { success: false, message: 'Failed to add to cart' };
    } finally {
      app.setLoading(false);
    }
  };

  /**
   * Remove product from cart with confirmation
   */
  const removeProductFromCart = (productId, showToast = true) => {
    try {
      const result = cart.removeFromCart(productId);
      
      if (result.success && showToast) {
        toast.addToast('Item removed from cart', 'success');
      }
      
      return result;
    } catch (error) {
      console.error('Error removing from cart:', error);
      
      if (showToast) {
        toast.addToast('Failed to remove item', 'error');
      }
      
      return { success: false, message: 'Failed to remove from cart' };
    }
  };

  /**
   * Toggle product in wishlist
   */
  const toggleProductWishlist = (product, showToast = true) => {
    try {
      const isCurrentlyInWishlist = wishlist.isInWishlist(product.id);
      let result;
      
      if (isCurrentlyInWishlist) {
        result = wishlist.removeFromWishlist(product.id);
        
        if (result.success && showToast) {
          toast.addToast('Removed from wishlist', 'success');
        }
      } else {
        result = wishlist.addToWishlist(product);
        
        if (result.success && showToast) {
          toast.addToast('Added to wishlist', 'success');
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      
      if (showToast) {
        toast.addToast('Failed to update wishlist', 'error');
      }
      
      return { success: false, message: 'Failed to update wishlist' };
    }
  };

  /**
   * Move product from wishlist to cart
   */
  const moveWishlistItemToCart = (product, quantity = 1, showToast = true) => {
    try {
      const result = wishlist.moveToCart(product, quantity);
      
      if (result.success && showToast) {
        toast.addToast(`${product.name} moved to cart`, 'success');
      } else if (!result.success && showToast) {
        toast.addToast(result.message || 'Failed to move to cart', 'error');
      }
      
      return result;
    } catch (error) {
      console.error('Error moving to cart:', error);
      
      if (showToast) {
        toast.addToast('Failed to move item to cart', 'error');
      }
      
      return { success: false, message: 'Failed to move to cart' };
    }
  };

  /**
   * Quick add to cart with stock validation
   */
  const quickAddToCart = (product, quantity = 1) => {
    // Check if product is in stock
    if (product.stock !== undefined && product.stock <= 0) {
      toast.addToast('This item is currently out of stock', 'warning');
      return { success: false, message: 'Out of stock' };
    }
    
    // Check if quantity exceeds stock
    if (product.stock !== undefined && quantity > product.stock) {
      toast.addToast(`Only ${product.stock} items available`, 'warning');
      return { success: false, message: 'Insufficient stock' };
    }
    
    return addProductToCart(product, quantity);
  };

  /**
   * Bulk add products to cart
   */
  const bulkAddToCart = async (products, showToast = true) => {
    const results = [];
    let successCount = 0;
    let failCount = 0;
    
    app.setLoading(true);
    
    try {
      for (const { product, quantity = 1 } of products) {
        const result = await addProductToCart(product, quantity, false);
        results.push(result);
        
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      
      if (showToast) {
        if (failCount === 0) {
          toast.addToast(`${successCount} items added to cart`, 'success');
        } else if (successCount > 0) {
          toast.addToast(`${successCount} items added, ${failCount} failed`, 'warning');
        } else {
          toast.addToast('Failed to add items to cart', 'error');
        }
      }
      
      return {
        success: successCount > 0,
        results,
        successCount,
        failCount
      };
    } catch (error) {
      console.error('Error in bulk add to cart:', error);
      
      if (showToast) {
        toast.addToast('Failed to add items to cart', 'error');
      }
      
      return {
        success: false,
        results: [],
        successCount: 0,
        failCount: products.length
      };
    } finally {
      app.setLoading(false);
    }
  };

  /**
   * Get product interaction status
   */
  const getProductStatus = (productId) => {
    return {
      inCart: cart.items?.some(item => item.id === productId) || false,
      inWishlist: wishlist.isInWishlist(productId),
      cartQuantity: cart.items?.find(item => item.id === productId)?.quantity || 0
    };
  };

  /**
   * Clear all user data (cart + wishlist)
   */
  const clearAllUserData = (showToast = true) => {
    try {
      cart.clearCart();
      wishlist.clearWishlist();
      
      if (showToast) {
        toast.addToast('All data cleared', 'success');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing user data:', error);
      
      if (showToast) {
        toast.addToast('Failed to clear data', 'error');
      }
      
      return { success: false };
    }
  };

  /**
   * Get shopping summary
   */
  const getShoppingSummary = () => {
    return {
      cartItemCount: cart.cartCount || 0,
      wishlistItemCount: wishlist.wishlistCount || 0,
      cartTotal: cart.items?.reduce((total, item) => 
        total + ((item.salePrice || item.price) * item.quantity), 0
      ) || 0,
      hasItems: (cart.cartCount || 0) > 0 || (wishlist.wishlistCount || 0) > 0
    };
  };

  // Return all functionality
  return {
    // Core actions
    addToCart: addProductToCart,
    removeFromCart: removeProductFromCart,
    toggleWishlist: toggleProductWishlist,
    moveToCart: moveWishlistItemToCart,
    quickAddToCart,
    bulkAddToCart,
    
    // Utilities
    getProductStatus,
    clearAllUserData,
    getShoppingSummary,
    
    // Direct access to individual contexts
    cart,
    wishlist,
    toast,
    app
  };
}