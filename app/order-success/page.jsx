'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="section container text-center">
      <div className="success-icon mb-4">✅</div>
      <h1 className="mb-4">Order Placed Successfully!</h1>
      <p className="text-muted mb-6">
        Thank you for shopping with Four Partners Mart.<br/>
        Your order has been received and is being processed.
      </p>
      
      {orderId && (
        <div className="order-id-box mb-8">
          <p className="text-sm text-muted">Your Order ID is</p>
          <h2 className="text-primary">{orderId}</h2>
        </div>
      )}

      <div className="actions flex justify-center gap-4">
        <Link href={`/track-order?id=${orderId || ''}`} className="btn btn-primary">
          Track Order
        </Link>
        <Link href="/products" className="btn btn-outline">
          Continue Shopping
        </Link>
      </div>

      <style jsx>{`
        .success-icon {
          font-size: 5rem;
        }
        .order-id-box {
          background: var(--surface);
          border: 1px dashed var(--primary);
          padding: 1.5rem;
          border-radius: var(--radius);
          display: inline-block;
          min-width: 300px;
        }
      `}</style>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
