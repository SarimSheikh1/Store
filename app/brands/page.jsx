import Link from 'next/link';
import { BRANDS } from '@/data/brands';

export default function BrandsPage() {
  return (
    <main className="brands-page section">
      <div className="container">
        <p className="brands-eyebrow">TRUSTED SUPPLIERS</p>
        <h1>Brands we stock</h1>
        <p className="brands-intro">A carefully selected range of familiar, dependable brands for your everyday essentials.</p>
        <div className="brands-grid">
          {BRANDS.map((brand) => (
            <article key={brand.name} className="brand-card">
              <div className="brand-mark" style={{ background: brand.color }}>{brand.initials}</div>
              <div><h2>{brand.name}</h2><p>{brand.category}</p></div>
            </article>
          ))}
        </div>
        <div className="brands-contact"><div><p className="brands-eyebrow">CAN'T FIND A BRAND?</p><h2>Talk to our purchasing team.</h2></div><Link href="/contact" className="btn btn-primary">Contact the team</Link></div>
      </div>
      <style>{`
        .brands-page { min-height: 70vh; } .brands-eyebrow { color: var(--primary); font-size: .75rem; font-weight: 800; letter-spacing: .12em; margin-bottom: .75rem; } .brands-intro { max-width: 42rem; color: var(--text-muted); font-size: 1.1rem; line-height: 1.7; margin-bottom: 2.5rem; } .brands-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; } .brand-card { display: flex; align-items: center; gap: 1rem; min-height: 8rem; padding: 1.25rem; border: 1px solid var(--border); background: rgba(251,250,246,.9); border-radius: var(--radius-lg); } .brand-mark { width: 3.5rem; height: 3.5rem; display: grid; place-items: center; color: white; font-weight: 800; border-radius: var(--radius); } .brand-card h2 { font-size: 1.1rem; margin: 0 0 .25rem; } .brand-card p { color: var(--text-muted); font-size: .85rem; } .brands-contact { margin-top: 3rem; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; background: var(--primary-dark); color: white; border-radius: var(--radius-lg); } .brands-contact h2 { color: white; margin: 0; } @media(max-width:768px){.brands-grid{grid-template-columns:1fr 1fr}.brands-contact{align-items:flex-start;flex-direction:column}} @media(max-width:420px){.brands-grid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
