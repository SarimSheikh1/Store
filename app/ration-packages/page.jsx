'use client';

import { PACKAGES } from '@/data/packages';
import PackageCard from '@/components/ui/PackageCard';

export default function RationPackagesPage() {
  return (
    <div className="section container">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1>Monthly Ration Packages</h1>
        <p className="text-muted text-lg mt-4">
          Save time, effort, and money with our pre-built monthly grocery bundles. 
          Designed for families of all sizes, delivered directly to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-16">
        {PACKAGES.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      <div className="custom-package-section bg-light text-center py-12 px-6 rounded-lg border">
        <h2 className="mb-4">Need a Custom Package?</h2>
        <p className="text-muted mb-8 max-w-2xl mx-auto">
          Every family has different needs. You can build your own custom ration package by chatting with us on WhatsApp. Just send us your monthly grocery list and we'll prepare a custom bundle with a special discount.
        </p>
        <a 
          href={`https://wa.me/process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?text=Hi, I would like to create a custom monthly ration package.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Build Custom Package via WhatsApp
        </a>
      </div>

      <style jsx>{`
        .max-w-2xl { max-width: 800px; margin-left: auto; margin-right: auto; }
        .bg-light { background-color: var(--surface); }
        .rounded-lg { border-radius: var(--radius-lg); }
        .border { border: 1px solid var(--border); }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        @media (max-width: 768px) {
          .grid-cols-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
