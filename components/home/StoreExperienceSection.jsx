import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/lib/config';
import { PRODUCTS } from '@/data/products';

export default function StoreExperienceSection() {
  const productCount = PRODUCTS.length;

  return (
    <section className="store-experience">
      <div className="container store-experience__grid">
        <div className="store-experience__visual" aria-hidden="true">
          <img src="/images/local-grocery-products.png" alt="" />
          <div className="store-experience__label store-experience__label--top">
            <span>Fresh picks</span>
            <strong>Selected for your kitchen</strong>
          </div>
          <div className="store-experience__label store-experience__label--bottom">
            <span className="store-experience__dot" />
            <strong>Taking orders today</strong>
          </div>
        </div>

        <div className="store-experience__content">
          <p className="eyebrow">A better way to stock up</p>
          <h2>Everything for this week’s table, in one thoughtful shop.</h2>
          <p className="store-experience__intro">
            Browse {productCount} everyday essentials, add what you need, and choose delivery to your door or a quick WhatsApp order.
          </p>

          <div className="store-experience__details">
            <div className="store-detail">
              <span className="store-detail__icon">🛵</span>
              <div><strong>Local delivery</strong><small>{BUSINESS_CONFIG.deliveryTime} estimated delivery</small></div>
            </div>
            <div className="store-detail">
              <span className="store-detail__icon">₨</span>
              <div><strong>Clear delivery pricing</strong><small>Free over ₨{BUSINESS_CONFIG.delivery.freeThreshold.toLocaleString()}</small></div>
            </div>
            <div className="store-detail">
              <span className="store-detail__icon">◷</span>
              <div><strong>Order when it suits you</strong><small>{BUSINESS_CONFIG.hours.delivery}</small></div>
            </div>
            <div className="store-detail">
              <span className="store-detail__icon">✓</span>
              <div><strong>Pay on delivery</strong><small>No online payment required</small></div>
            </div>
          </div>

          <div className="store-experience__actions">
            <Link className="btn btn-primary" href="/products">Explore groceries <span>→</span></Link>
            <Link className="store-experience__text-link" href="/contact">Check delivery details</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .store-experience { background: #fffdf8; padding: 5.5rem 0; overflow: hidden; }
        .store-experience__grid { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1fr); align-items: center; gap: clamp(2.5rem, 7vw, 7rem); }
        .store-experience__visual { min-height: 34rem; position: relative; border-radius: 1.5rem; overflow: hidden; box-shadow: 1.25rem 1.25rem 0 #e8f0eb; background: #dce9dc; }
        .store-experience__visual::after { content: ''; position: absolute; inset: 0; background: linear-gradient(160deg, rgba(10, 38, 27, .12), transparent 45%, rgba(10, 38, 27, .3)); }
        .store-experience__visual img { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; }
        .store-experience__label { position: absolute; z-index: 1; display: grid; gap: .2rem; padding: .9rem 1rem; border: 1px solid rgba(255,255,255,.35); color: #fff; background: rgba(17, 43, 32, .76); backdrop-filter: blur(10px); border-radius: .7rem; box-shadow: 0 .75rem 1.5rem rgba(12, 34, 24, .15); }
        .store-experience__label span { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: #c9dfcc; font-weight: 800; }
        .store-experience__label strong { font-size: .9rem; }
        .store-experience__label--top { top: 1.25rem; left: 1.25rem; }
        .store-experience__label--bottom { bottom: 1.25rem; right: 1.25rem; display: flex; align-items: center; gap: .55rem; }
        .store-experience__dot { width: .55rem; height: .55rem; background: #80d39b; border-radius: 50%; box-shadow: 0 0 0 .25rem rgba(128,211,155,.16); }
        .eyebrow { margin-bottom: .9rem; color: #a05d12; font-size: .72rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
        .store-experience h2 { max-width: 38rem; font-size: clamp(2rem, 3.5vw, 3.35rem); letter-spacing: -.055em; line-height: 1.05; color: #163847; margin-bottom: 1.25rem; }
        .store-experience__intro { max-width: 36rem; font-size: 1.08rem; color: #5c6d68; line-height: 1.75; margin-bottom: 2rem; }
        .store-experience__details { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid #d9e4dc; border-left: 1px solid #d9e4dc; margin-bottom: 2rem; }
        .store-detail { min-height: 6.2rem; display: flex; gap: .75rem; align-items: flex-start; padding: 1rem .8rem; border-right: 1px solid #d9e4dc; border-bottom: 1px solid #d9e4dc; }
        .store-detail__icon { flex: 0 0 2.2rem; display: grid; place-items: center; height: 2.2rem; color: #164b45; background: #e3f1eb; border-radius: .6rem; font-weight: 900; }
        .store-detail strong, .store-detail small { display: block; }
        .store-detail strong { color: #1a3432; font-size: .88rem; margin: .1rem 0 .35rem; }
        .store-detail small { color: #70807a; font-size: .75rem; line-height: 1.35; }
        .store-experience__actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.25rem; }
        .store-experience__actions .btn { border-radius: .45rem; padding: .82rem 1.15rem; }
        .store-experience__text-link { color: #155e75; font-size: .88rem; font-weight: 750; text-decoration: underline; text-underline-offset: .25rem; }
        @media (max-width: 800px) { .store-experience { padding: 3.75rem 0; }.store-experience__grid { grid-template-columns: 1fr; gap: 2.5rem; }.store-experience__visual { min-height: 23rem; max-width: 38rem; }.store-experience h2 { font-size: 2.35rem; }.store-experience__details { max-width: 40rem; } }
        @media (max-width: 480px) { .store-experience__visual { min-height: 19rem; box-shadow: .7rem .7rem 0 #e8f0eb; }.store-experience__details { grid-template-columns: 1fr; }.store-experience__label--bottom { left: 1rem; right: auto; }.store-experience h2 { font-size: 2rem; } }
      `}</style>
    </section>
  );
}
