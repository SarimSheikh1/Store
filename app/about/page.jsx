'use client';

import { PARTNERS } from '@/data/partners';
import { BUSINESS } from '@/lib/config';
import PartnerCard from '@/components/ui/PartnerCard';

export default function AboutPage() {
  return (
    <div className="section container">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1>About {BUSINESS.name}</h1>
        <p className="text-muted text-lg mt-4">
          {BUSINESS.slogan}
        </p>
      </div>

      <div className="about-grid mb-20">
        <div className="about-content">
          <h2 className="mb-4">Our Story</h2>
          <p className="mb-4">
            Established in {BUSINESS.launchYear}, Four Partners Mart started with a simple vision: to revolutionize local grocery shopping by combining the reliability of a physical store with the convenience of modern e-commerce.
          </p>
          <p className="mb-4">
            We are a group of four dedicated partners who identified a gap in the market for high-quality, reasonably priced daily essentials delivered quickly. Our business spans across retail, wholesale, and online channels to serve every segment of our community.
          </p>
          
          <h3 className="mt-8 mb-4">Our Mission</h3>
          <p className="mb-4">
            To make everyday grocery shopping easier, reliable and convenient through both physical and online services, providing fresh products at the best prices.
          </p>

          <h3 className="mt-8 mb-4">Our Vision</h3>
          <p>
            To build a trusted local grocery brand that can expand into multiple locations and online markets across the country.
          </p>
        </div>
        <div className="about-image-placeholder">
          🏪<br/>Physical & Online Store
        </div>
      </div>

      <div className="team-section text-center">
        <h2 className="mb-4">Meet The Partners</h2>
        <p className="text-muted mb-12">The driving force behind Four Partners Mart</p>

        <div className="grid grid-cols-4 gap-6">
          {PARTNERS.map(partner => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .max-w-2xl { max-width: 800px; margin: 0 auto; }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .about-content p {
          color: var(--text-muted);
          line-height: 1.8;
        }
        .about-image-placeholder {
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
          aspect-ratio: 4/3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.2;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 2rem; }
          .grid-cols-4 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
