/**
 * ============================================================
 * FOUR PARTNERS MART — WHATSAPP MESSAGE GENERATOR
 * ============================================================
 * All WhatsApp order/inquiry messages are built here.
 * ============================================================
 */

import { BUSINESS, whatsappUrl } from './config';

/**
 * Generate a WhatsApp order message from cart items + customer info.
 * @param {Array}  cartItems   — array of { name, quantity, price, unit }
 * @param {Object} customer    — { name, phone, address, city, area, notes, paymentMethod }
 * @param {Object} totals      — { subtotal, deliveryFee, discount, total }
 * @returns {string} WhatsApp URL with pre-filled message
 */
export function generateOrderWhatsApp(cartItems, customer, totals) {
  const date = new Date().toLocaleString('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Karachi',
  });

  const orderId = generateOrderId();

  const itemLines = cartItems
    .map(
      (item) =>
        `  • ${item.name} × ${item.quantity} ${item.unit || ''} — PKR ${formatPrice(item.price * item.quantity)}`
    )
    .join('\n');

  const message = `
🛒 *NEW ORDER — ${BUSINESS.name}*
━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* ${orderId}
📅 *Date:* ${date}

👤 *CUSTOMER DETAILS*
Name: ${customer.name}
Phone: ${customer.phone}
WhatsApp: ${customer.whatsapp || customer.phone}
Address: ${customer.address}
City: ${customer.city}
Area: ${customer.area}
${customer.landmark ? `Landmark: ${customer.landmark}` : ''}
${customer.notes ? `Notes: ${customer.notes}` : ''}

🛍️ *ORDER ITEMS*
${itemLines}

💰 *ORDER SUMMARY*
Subtotal:       PKR ${formatPrice(totals.subtotal)}
Delivery Fee:   PKR ${formatPrice(totals.deliveryFee)}
${totals.discount > 0 ? `Discount:       - PKR ${formatPrice(totals.discount)}\n` : ''}━━━━━━━━━━━━━━━━━━━━
*TOTAL:         PKR ${formatPrice(totals.total)}*

💳 *Payment:* ${customer.paymentMethod || 'Cash on Delivery'}

_Sent via ${BUSINESS.name} Website_
  `.trim();

  return { url: whatsappUrl(message), orderId };
}

/**
 * Generate a wholesale inquiry WhatsApp message.
 */
export function generateWholesaleWhatsApp(inquiry) {
  const message = `
🏭 *WHOLESALE INQUIRY — ${BUSINESS.name}*
━━━━━━━━━━━━━━━━━━━━
🏢 *Business:* ${inquiry.businessName}
👤 *Contact:* ${inquiry.contactPerson}
📞 *Phone:* ${inquiry.phone}
💬 *WhatsApp:* ${inquiry.whatsapp}
📧 *Email:* ${inquiry.email || 'N/A'}
🏪 *Business Type:* ${inquiry.businessType}

📦 *Required Products:*
${inquiry.products}

📊 *Estimated Quantity:* ${inquiry.quantity}

💬 *Message:*
${inquiry.message || 'N/A'}

_Sent via ${BUSINESS.name} Website_
  `.trim();

  return whatsappUrl(message);
}

/**
 * Generate a "quick order" WhatsApp message for a single product.
 */
export function generateQuickOrderWhatsApp(product, quantity = 1) {
  const message = `
🛒 *QUICK ORDER — ${BUSINESS.name}*
━━━━━━━━━━━━━━━━━━━━
Product: ${product.name}
Quantity: ${quantity} ${product.unit || 'piece(s)'}
Price: PKR ${formatPrice((product.salePrice || product.price) * quantity)}

Please confirm availability and delivery details.

_Sent via ${BUSINESS.name} Website_
  `.trim();

  return whatsappUrl(message);
}

export function generateGeneralWhatsApp(message) {
  return whatsappUrl(message);
}

export function generateCartWhatsApp(cartItems, totals) {
  const itemLines = cartItems
    .map((item) => `${item.name} x ${item.quantity} - PKR ${formatPrice((item.salePrice || item.price) * item.quantity)}`)
    .join('\n');
  const message = `Cart order from ${BUSINESS.name}\n\n${itemLines}\n\nTotal: PKR ${formatPrice(totals.total)}`;
  return whatsappUrl(message);
}

/**
 * Generate a ration package WhatsApp message.
 */
export function generatePackageWhatsApp(pkg, customer) {
  const message = `
📦 *RATION PACKAGE ORDER — ${BUSINESS.name}*
━━━━━━━━━━━━━━━━━━━━
📋 *Package:* ${pkg.name}
💰 *Price:* PKR ${formatPrice(pkg.price)}

👤 *Customer:* ${customer.name || 'Not provided'}
📞 *Phone:* ${customer.phone || 'Not provided'}
📍 *Address:* ${customer.address || 'Not provided'}

_Sent via ${BUSINESS.name} Website_
  `.trim();

  return whatsappUrl(message);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `FPM-${ts}-${rand}`;
}

export function formatPrice(amount) {
  return Number(amount).toLocaleString('en-PK');
}
