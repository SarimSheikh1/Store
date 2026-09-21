'use client';

export default function Badge({ 
  variant = 'default',
  size = 'default',
  children,
  className = '',
  ...props
}) {
  return (
    <span 
      className={`badge badge--${variant} badge--${size} ${className}`}
      {...props}
    >
      {children}
      
      <style jsx>{`
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: var(--radius-sm);
          transition: all var(--transition-base);
          white-space: nowrap;
        }
        
        /* Variants */
        .badge--default {
          background-color: var(--surface);
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        
        .badge--primary {
          background-color: var(--primary);
          color: white;
        }
        
        .badge--secondary {
          background-color: var(--secondary);
          color: white;
        }
        
        .badge--success {
          background-color: var(--success);
          color: white;
        }
        
        .badge--warning {
          background-color: var(--warning);
          color: white;
        }
        
        .badge--error {
          background-color: var(--error);
          color: white;
        }
        
        .badge--info {
          background-color: var(--info);
          color: white;
        }
        
        /* Light variants */
        .badge--primary-light {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        
        .badge--secondary-light {
          background-color: var(--secondary-light);
          color: var(--secondary);
        }
        
        .badge--success-light {
          background-color: var(--success-light);
          color: var(--success);
        }
        
        .badge--warning-light {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        
        .badge--error-light {
          background-color: var(--error-light);
          color: var(--error);
        }
        
        .badge--info-light {
          background-color: var(--info-light);
          color: var(--info);
        }
        
        /* Outline variants */
        .badge--outline {
          background-color: transparent;
          border: 1px solid var(--border);
          color: var(--text-main);
        }
        
        .badge--outline-primary {
          background-color: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
        }
        
        .badge--outline-secondary {
          background-color: transparent;
          border: 1px solid var(--secondary);
          color: var(--secondary);
        }
        
        /* Sizes */
        .badge--xs {
          font-size: var(--text-xs);
          padding: 0.125rem 0.375rem;
        }
        
        .badge--sm {
          font-size: var(--text-xs);
          padding: 0.25rem 0.5rem;
        }
        
        .badge--default {
          font-size: var(--text-xs);
          padding: 0.375rem 0.75rem;
        }
        
        .badge--lg {
          font-size: var(--text-sm);
          padding: 0.5rem 1rem;
        }
        
        /* Special badges for e-commerce */
        .badge--discount {
          background-color: var(--error);
          color: white;
          font-weight: 700;
        }
        
        .badge--bestseller {
          background-color: var(--warning);
          color: white;
          font-weight: 700;
        }
        
        .badge--featured {
          background-color: var(--primary);
          color: white;
          font-weight: 700;
        }
        
        .badge--new {
          background-color: var(--success);
          color: white;
          font-weight: 700;
        }
        
        .badge--out-of-stock {
          background-color: var(--surface);
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        
        .badge--low-stock {
          background-color: var(--warning-light);
          color: var(--warning);
          border: 1px solid var(--warning);
        }
        
        .badge--in-stock {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid var(--success);
        }
        
        /* Order status badges */
        .badge--pending {
          background-color: var(--warning-light);
          color: var(--warning);
        }
        
        .badge--processing {
          background-color: var(--info-light);
          color: var(--info);
        }
        
        .badge--confirmed {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        
        .badge--shipped {
          background-color: var(--secondary-light);
          color: var(--secondary);
        }
        
        .badge--delivered {
          background-color: var(--success-light);
          color: var(--success);
        }
        
        .badge--cancelled {
          background-color: var(--error-light);
          color: var(--error);
        }
        
        /* Interactive badges */
        .badge--interactive {
          cursor: pointer;
        }
        
        .badge--interactive:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .badge--lg {
            font-size: var(--text-xs);
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </span>
  );
}