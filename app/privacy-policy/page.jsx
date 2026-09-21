'use client';
import { BUSINESS } from '@/lib/config';

export default function PolicyPage() {
  return (
    <div className="section container max-w-3xl mx-auto">
      <h1 className="mb-8">Privacy Policy</h1>
      <div className="prose">
        <p>Welcome to {BUSINESS.name}. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>
        
        <h3>1. Information We Collect</h3>
        <p>When you place an order, we collect information such as your name, phone number, and delivery address. This information is strictly used for order processing and delivery.</p>

        <h3>2. How We Use Your Information</h3>
        <p>Your information is used solely to fulfill your grocery orders, communicate order updates via WhatsApp, and improve our services. We do not sell or rent your personal information to third parties.</p>

        <h3>3. Data Storage</h3>
        <p>Currently, order data is stored locally in your browser. When you send an order via WhatsApp, the data is securely transmitted directly to our business number.</p>

        <h3>4. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at {BUSINESS.email}.</p>
      </div>

      <style jsx>{`
        .max-w-3xl { max-width: 800px; margin: 0 auto; }
        .prose h3 { margin-top: 2rem; margin-bottom: 1rem; }
        .prose p { color: var(--text-muted); line-height: 1.8; margin-bottom: 1rem; }
      `}</style>
    </div>
  );
}
