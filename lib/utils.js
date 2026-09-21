/**
 * ============================================================
 * FOUR PARTNERS MART — SHARED UTILITIES
 * ============================================================
 */

/**
 * Format a price in Pakistani Rupees.
 * @param {number} amount
 * @returns {string} e.g. "1,500"
 */
export function formatPrice(amount) {
  return Number(amount).toLocaleString('en-PK');
}

/**
 * Convert a string to a URL-safe slug.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate discount percentage.
 * @param {number} originalPrice
 * @param {number} salePrice
 * @returns {number}
 */
export function discountPercent(originalPrice, salePrice) {
  if (!salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Get the effective price of a product (salePrice if available, else price).
 */
export function effectivePrice(product) {
  return product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;
}

/**
 * Generate a random order ID.
 */
export function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `FPM-${ts}-${rand}`;
}

/**
 * Truncate text to a max length.
 */
export function truncate(text, maxLength = 80) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

/**
 * Debounce a function.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if a product is in stock.
 */
export function isInStock(product) {
  return product.stock === undefined || product.stock === null || product.stock > 0;
}

/**
 * Calculate cart totals.
 * @param {Array}  items      — array of cart items { price, quantity, discount }
 * @param {number} deliveryFee
 * @returns {{ subtotal, discount, deliveryFee, total }}
 */
export function calculateTotals(items, deliveryFee = 0) {
  const subtotal = items.reduce((sum, item) => {
    const price = effectivePrice(item);
    return sum + price * item.quantity;
  }, 0);

  const discount = items.reduce((sum, item) => {
    if (!item.salePrice || item.salePrice >= item.price) return sum;
    return sum + (item.price - item.salePrice) * item.quantity;
  }, 0);

  const total = subtotal + deliveryFee;

  return { subtotal, discount, deliveryFee, total };
}

/**
 * Filter products by search query.
 */
export function searchProducts(products, query) {
  if (!query || query.trim() === '') return products;
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.keywords && p.keywords.some((k) => k.toLowerCase().includes(q)))
  );
}

/**
 * Sort products.
 */
export function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'discount':
      return sorted.sort(
        (a, b) =>
          discountPercent(b.price, b.salePrice) - discountPercent(a.price, a.salePrice)
      );
    default:
      return sorted;
  }
}

export const storage = {
  get(key, fallback = null) {
    if (typeof window === 'undefined') return fallback;
    try {
      const value = window.localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};

export function calculateDeliveryFee(subtotal) {
  return subtotal >= 2000 ? 0 : 150;
}
