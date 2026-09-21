'use client';

import { getDiscountedProducts } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

export default function OffersPage() {
  const products = getDiscountedProducts();

  return (
    <div className="section container">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span className="badge badge-discount mb-4" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>SALE</span>
        <h1>Special Offers & Discounts</h1>
        <p className="text-muted text-lg mt-4">Enjoy great savings on your favorite grocery items. Hurry, offers valid while stock lasts!</p>
      </div>

      {products.length === 0 ? (
        <div className="empty-state text-center py-12">
          <h2>No active offers right now</h2>
          <p className="text-muted mt-2">Please check back later for new discounts!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <style jsx>{`
        .max-w-2xl { max-width: 800px; margin: 0 auto; }
        @media (max-width: 768px) {
          .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
