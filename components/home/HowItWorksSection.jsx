import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/lib/config';

const steps = [
  { number: '01', title: 'Choose what you need', text: 'Browse groceries by category or search for a specific household essential.' },
  { number: '02', title: 'Review your basket', text: 'See prices clearly, adjust quantities, and check your delivery total before placing an order.' },
  { number: '03', title: 'Receive your order', text: `Our local delivery window is ${BUSINESS_CONFIG.deliveryTime}. Pay cash when your order arrives.` },
];

export default function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="how-it-works__heading">
          <div>
            <p className="how-it-works__eyebrow">Simple by design</p>
            <h2>From shopping list to doorstep in three clear steps.</h2>
          </div>
          <p>We keep the process straightforward: no subscription required, no payment details needed online.</p>
        </div>
        <div className="how-it-works__steps">
          {steps.map((step) => (
            <article className="how-it-works__step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="how-it-works__footer">
          <span>Delivery available within {BUSINESS_CONFIG.delivery.radius} · Free for orders above ₨{BUSINESS_CONFIG.delivery.freeThreshold.toLocaleString()}</span>
          <Link href="/products">Start your order <span>→</span></Link>
        </div>
      </div>
      <style jsx>{`
        .how-it-works { padding: 5.5rem 0; background: #163847; color: #edf5ef; }
        .how-it-works__heading { display: grid; grid-template-columns: 1.15fr .65fr; gap: 3rem; align-items: end; padding-bottom: 3rem; border-bottom: 1px solid rgba(231,245,235,.18); }
        .how-it-works__eyebrow { color: #d7af60; font-size: .7rem; font-weight: 850; text-transform: uppercase; letter-spacing: .14em; margin-bottom: .8rem; }
        .how-it-works h2 { max-width: 43rem; color: #fffdf8; font-size: clamp(2rem, 3.7vw, 3.3rem); line-height: 1.05; letter-spacing: -.055em; margin: 0; }
        .how-it-works__heading > p { color: #c8d8d2; line-height: 1.7; font-size: 1.03rem; margin: 0; }
        .how-it-works__steps { display: grid; grid-template-columns: repeat(3, 1fr); }
        .how-it-works__step { padding: 2rem 2rem 1.4rem 0; min-height: 15rem; border-right: 1px solid rgba(231,245,235,.18); }
        .how-it-works__step + .how-it-works__step { padding-left: 2rem; }
        .how-it-works__step:last-child { border-right: 0; }
        .how-it-works__step span { display: inline-flex; color: #163847; background: #d7af60; border-radius: 999px; padding: .27rem .52rem; font-size: .7rem; font-weight: 900; letter-spacing: .08em; }
        .how-it-works__step h3 { color: #fffdf8; margin: 1.5rem 0 .65rem; font-size: 1.2rem; }
        .how-it-works__step p { color: #c8d8d2; line-height: 1.65; max-width: 20rem; font-size: .9rem; }
        .how-it-works__footer { display: flex; justify-content: space-between; gap: 1.5rem; align-items: center; padding-top: 1.5rem; color: #c8d8d2; font-size: .86rem; border-top: 1px solid rgba(231,245,235,.18); }
        .how-it-works__footer a { color: #fffdf8; font-weight: 800; white-space: nowrap; }
        .how-it-works__footer a span { color: #d7af60; margin-left: .3rem; }
        @media (max-width: 768px) { .how-it-works { padding: 3.75rem 0; }.how-it-works__heading, .how-it-works__steps { grid-template-columns: 1fr; gap: 1.25rem; }.how-it-works__heading { padding-bottom: 2rem; }.how-it-works__step, .how-it-works__step + .how-it-works__step { min-height: auto; padding: 1.75rem 0; border-right: 0; border-bottom: 1px solid rgba(231,245,235,.18); }.how-it-works__footer { flex-direction: column; align-items: flex-start; }.how-it-works h2 { font-size: 2.15rem; } }
      `}</style>
    </section>
  );
}
