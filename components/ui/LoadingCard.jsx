'use client';

export default function LoadingCard({ variant = 'product' }) {
  if (variant === 'category') {
    return (
      <div className="loading-card loading-card--category">
        <div className="loading-skeleton loading-skeleton--circle"></div>
        <div className="loading-skeleton loading-skeleton--title"></div>
        <div className="loading-skeleton loading-skeleton--text"></div>
        <div className="loading-skeleton loading-skeleton--text loading-skeleton--short"></div>
        
        <style jsx>{`
          .loading-card--category {
            padding: 1.5rem;
            text-align: center;
          }
          
          .loading-skeleton--circle {
            width: 4rem;
            height: 4rem;
            border-radius: var(--radius-lg);
            margin: 0 auto 1rem;
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'package') {
    return (
      <div className="loading-card loading-card--package">
        <div className="loading-card__header">
          <div className="loading-skeleton loading-skeleton--circle loading-skeleton--small"></div>
          <div className="loading-skeleton loading-skeleton--title"></div>
          <div className="loading-skeleton loading-skeleton--text loading-skeleton--short"></div>
          <div className="loading-skeleton loading-skeleton--price"></div>
        </div>
        
        <div className="loading-card__body">
          <div className="loading-skeleton loading-skeleton--text"></div>
          <div className="loading-skeleton loading-skeleton--text"></div>
          <div className="loading-skeleton loading-skeleton--text loading-skeleton--short"></div>
        </div>
        
        <div className="loading-card__footer">
          <div className="loading-skeleton loading-skeleton--button"></div>
          <div className="loading-skeleton loading-skeleton--button"></div>
        </div>
        
        <style jsx>{`
          .loading-card--package {
            display: flex;
            flex-direction: column;
          }
          
          .loading-card__header {
            padding: 2rem 1.5rem 1.5rem;
            text-align: center;
            background: var(--bg-color);
            border-bottom: 1px solid var(--border);
          }
          
          .loading-card__body {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .loading-card__footer {
            padding: 1.5rem;
            background: var(--bg-color);
            border-top: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .loading-skeleton--small {
            width: 3rem;
            height: 3rem;
            margin: 0 auto 1rem;
          }
          
          .loading-skeleton--price {
            width: 6rem;
            height: 2rem;
            margin: 1rem auto 0;
          }
          
          .loading-skeleton--button {
            height: 2.5rem;
            border-radius: var(--radius);
          }
        `}</style>
      </div>
    );
  }

  // Default product card loading
  return (
    <div className="loading-card loading-card--product">
      <div className="loading-card__image">
        <div className="loading-skeleton loading-skeleton--square"></div>
      </div>
      
      <div className="loading-card__content">
        <div className="loading-skeleton loading-skeleton--text loading-skeleton--short"></div>
        <div className="loading-skeleton loading-skeleton--title"></div>
        <div className="loading-skeleton loading-skeleton--text"></div>
        <div className="loading-skeleton loading-skeleton--price"></div>
        <div className="loading-skeleton loading-skeleton--button"></div>
      </div>

      <style jsx>{`
        .loading-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          height: 100%;
          position: relative;
        }

        .loading-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: loading-shimmer 1.5s infinite;
          z-index: 1;
        }

        .loading-card--product {
          display: flex;
          flex-direction: column;
        }

        .loading-card__image {
          aspect-ratio: 1;
          background: var(--bg-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-card__content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .loading-skeleton {
          background: var(--border);
          border-radius: var(--radius);
          position: relative;
          overflow: hidden;
        }

        .loading-skeleton--square {
          width: 4rem;
          height: 4rem;
        }

        .loading-skeleton--title {
          height: 1.25rem;
          width: 85%;
        }

        .loading-skeleton--text {
          height: 1rem;
          width: 100%;
        }

        .loading-skeleton--short {
          width: 60%;
        }

        .loading-skeleton--price {
          height: 1.5rem;
          width: 4rem;
        }

        .loading-skeleton--button {
          height: 2.5rem;
          width: 100%;
          margin-top: auto;
          border-radius: var(--radius);
        }

        @keyframes loading-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-card::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}