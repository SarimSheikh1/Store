// Business configuration
export const BUSINESS_CONFIG = {
  name: 'Four Partners Mart',
  tagline: 'Your Trusted Grocery Partner',
  description: 'Premium quality groceries delivered fresh to your doorstep. From daily essentials to wholesale supplies, we serve Lahore with excellence.',
  
  // Contact Information
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+92 300 1234567',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923001234567',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@fourpartnersmart.com',
  
  // Address
  address: process.env.NEXT_PUBLIC_ADDRESS || 'Shop 123, Main Market, Lahore, Pakistan',
  city: process.env.NEXT_PUBLIC_CITY || 'Lahore',
  postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || '54000',
  
  // Business Hours
  hours: {
    open: process.env.NEXT_PUBLIC_HOURS_OPEN || '8:00 AM',
    close: process.env.NEXT_PUBLIC_HOURS_CLOSE || '10:00 PM',
    delivery: process.env.NEXT_PUBLIC_DELIVERY_HOURS || '9:00 AM - 9:00 PM'
  },
  
  // Delivery
  delivery: {
    freeThreshold: parseInt(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD) || 2000,
    fee: parseInt(process.env.NEXT_PUBLIC_DELIVERY_FEE) || 150,
    radius: process.env.NEXT_PUBLIC_DELIVERY_RADIUS || '25km'
  },
  deliveryTime: '60-90 min',
  
  // Social Media
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || ''
  },
  
  // Currency
  currency: {
    code: 'PKR',
    symbol: '₨'
  },
  
  // Features
  features: {
    wholesale: true,
    rationPackages: true,
    onlinePayments: false, // Coming soon
    cashOnDelivery: true,
    bankTransfer: false // Coming soon
  }
};

// Site metadata
export const SITE_METADATA = {
  title: 'Four Partners Mart - Premium Grocery Store in Lahore',
  description: 'Shop premium groceries online in Lahore. Fresh produce, pantry essentials, wholesale supplies & ration packages delivered to your door. Free delivery on orders over ₨2000.',
  keywords: 'grocery store lahore, online grocery pakistan, fresh vegetables, wholesale food, ration packages, grocery delivery lahore',
  author: 'Four Partners Mart',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
};

// Payment methods
export const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    available: true,
    icon: '💵'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank account transfer',
    available: false,
    comingSoon: true,
    icon: '🏦'
  },
  {
    id: 'online',
    name: 'Online Payment',
    description: 'JazzCash, EasyPaisa, Credit Card',
    available: false,
    comingSoon: true,
    icon: '💳'
  }
];

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Order status display config
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUSES.PENDING]: {
    label: 'Order Pending',
    color: '#f59e0b',
    description: 'Your order is being reviewed'
  },
  [ORDER_STATUSES.CONFIRMED]: {
    label: 'Order Confirmed', 
    color: '#3b82f6',
    description: 'Your order has been confirmed'
  },
  [ORDER_STATUSES.PROCESSING]: {
    label: 'Processing',
    color: '#8b5cf6',
    description: 'We are preparing your order'
  },
  [ORDER_STATUSES.OUT_FOR_DELIVERY]: {
    label: 'Out for Delivery',
    color: '#f97316',
    description: 'Your order is on the way'
  },
  [ORDER_STATUSES.DELIVERED]: {
    label: 'Delivered',
    color: '#10b981',
    description: 'Order delivered successfully'
  },
  [ORDER_STATUSES.CANCELLED]: {
    label: 'Cancelled',
    color: '#ef4444',
    description: 'Order has been cancelled'
  }
};

// Compatibility exports used by the storefront pages.
export const BUSINESS = {
  ...BUSINESS_CONFIG,
  slogan: BUSINESS_CONFIG.tagline,
  launchYear: 2019,
  address: { full: BUSINESS_CONFIG.address },
  hours: { ...BUSINESS_CONFIG.hours, display: `${BUSINESS_CONFIG.hours.open} - ${BUSINESS_CONFIG.hours.close}` },
  delivery: { ...BUSINESS_CONFIG.delivery, standardFee: BUSINESS_CONFIG.delivery.fee },
};

export const COMPANY_INFO = { founded: BUSINESS.launchYear };

export function whatsappUrl(message = '') {
  return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
