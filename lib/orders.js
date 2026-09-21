/**
 * ============================================================
 * FOUR PARTNERS MART — DEMO ORDER STORE
 * ============================================================
 * This is a LOCAL (frontend-only) demo implementation.
 * Orders are stored in localStorage.
 *
 * TO CONNECT A REAL DATABASE:
 * Replace the localStorage calls below with API fetch() calls
 * to your backend (e.g., Next.js API routes + MongoDB/PostgreSQL).
 * ============================================================
 */

import { generateOrderId } from './utils';

const ORDERS_KEY = 'fpm_orders';

export const ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#f59e0b',
  [ORDER_STATUS.CONFIRMED]: '#3b82f6',
  [ORDER_STATUS.PREPARING]: '#8b5cf6',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '#f97316',
  [ORDER_STATUS.DELIVERED]: '#22c55e',
  [ORDER_STATUS.CANCELLED]: '#ef4444',
};

export const STATUS_STEPS = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

/**
 * Create a new order and save to localStorage.
 */
export function createOrder({ cartItems, customer, totals, paymentMethod }) {
  const orderId = generateOrderId();
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    status: ORDER_STATUS.PENDING,
    customer,
    items: cartItems,
    totals,
    paymentMethod,
    statusHistory: [
      { status: ORDER_STATUS.PENDING, timestamp: new Date().toISOString() },
    ],
  };

  const existing = getAllOrders();
  existing.unshift(order);

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
  }

  return order;
}

/**
 * Get all orders from localStorage.
 */
export function getAllOrders() {
  if (typeof window === 'undefined') return getDemoOrders();
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    // Merge with demo orders for admin dashboard display
    const demos = getDemoOrders().filter(
      (d) => !stored.find((s) => s.id === d.id)
    );
    return [...stored, ...demos];
  } catch {
    return getDemoOrders();
  }
}

/**
 * Find an order by ID and customer phone.
 */
export function findOrder(orderId, phone) {
  const orders = getAllOrders();
  return (
    orders.find(
      (o) =>
        o.id.toUpperCase() === orderId.toUpperCase() &&
        o.customer?.phone?.replace(/\D/g, '').includes(phone.replace(/\D/g, ''))
    ) || null
  );
}

/**
 * Update order status.
 */
export function updateOrderStatus(orderId, newStatus) {
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;

  orders[idx].status = newStatus;
  orders[idx].statusHistory = [
    ...(orders[idx].statusHistory || []),
    { status: newStatus, timestamp: new Date().toISOString() },
  ];

  if (typeof window !== 'undefined') {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  return orders[idx];
}

/**
 * Demo orders for admin dashboard.
 * These are pre-seeded so the admin page has data to display.
 */
function getDemoOrders() {
  return [
    {
      id: 'FPM-DEMO001',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: ORDER_STATUS.CONFIRMED,
      customer: {
        name: 'Ahmed Ali',
        phone: '0300-1234567',
        address: '123 Street, Block A',
        city: 'Lahore',
        area: 'Gulberg',
      },
      items: [
        { name: 'Basmati Rice 5kg', quantity: 2, price: 1200 },
        { name: 'Cooking Oil 5L', quantity: 1, price: 1800 },
      ],
      totals: { subtotal: 4200, deliveryFee: 150, discount: 0, total: 4350 },
      paymentMethod: 'Cash on Delivery',
    },
    {
      id: 'FPM-DEMO002',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      status: ORDER_STATUS.DELIVERED,
      customer: {
        name: 'Sara Khan',
        phone: '0321-7654321',
        address: '456 Avenue, Phase 2',
        city: 'Karachi',
        area: 'DHA',
      },
      items: [{ name: 'Family Ration Package', quantity: 1, price: 8500 }],
      totals: { subtotal: 8500, deliveryFee: 0, discount: 0, total: 8500 },
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'FPM-DEMO003',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      status: ORDER_STATUS.PENDING,
      customer: {
        name: 'Bilal Hassan',
        phone: '0333-9876543',
        address: '789 Road, Sector G',
        city: 'Islamabad',
        area: 'F-10',
      },
      items: [
        { name: 'Sugar 10kg', quantity: 1, price: 1500 },
        { name: 'Wheat Flour 10kg', quantity: 2, price: 1400 },
        { name: 'Tea 200g', quantity: 3, price: 480 },
      ],
      totals: { subtotal: 5740, deliveryFee: 150, discount: 200, total: 5690 },
      paymentMethod: 'Cash on Delivery',
    },
  ];
}
