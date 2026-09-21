'use client';

import Link from 'next/link';

export default function EmptyState({ 
  type = 'generic',
  title,
  description,
  action,
  actionText,
  actionHref,
  icon,
  className = ''
}) {
  
  const getDefaultContent = () => {
    switch (type) {
      case 'cart':
        return {
          icon: '🛒',
          title: 'Your cart is empty',
          description: 'Add some items to your cart to get started shopping.',
          actionText: 'Browse Products',
          actionHref: '/products'
        };
      
      case 'wishlist':
        return {
          icon: '💝',
          title: 'Your wishlist is empty',
          description: 'Save your favorite items to your wishlist for later.',
          actionText: 'Explore Products',
          actionHref: '/products'
        };
      
      case 'search':
        return {
          icon: '🔍',
          title: 'No results found',
          description: 'Try adjusting your search terms or browse our categories.',
          actionText: 'Browse Categories',
          actionHref: '/categories'
        };
      
      case 'products':
        return {
          icon: '📦',
          title: 'No products found',
          description: 'No products match your current filters. Try adjusting your criteria.',
          actionText: 'View All Products',
          actionHref: '/products'
        };
      
      case 'orders':
        return {
          icon: '📋',
          title: 'No orders yet',
          description: 'You haven\'t placed any orders yet. Start shopping to see your orders here.',
          actionText: 'Start Shopping',
          actionHref: '/products'
        };
      
      case 'error':
        return {
          icon: '⚠️',
          title: 'Something went wrong',
          description: 'We encountered an error while loading this content.',
          actionText: 'Try Again',
          actionHref: null
        };
      
      default:
        return {
          icon: '📭',
          title: 'Nothing here yet',
          description: 'This section is currently empty.',
          actionText: 'Go Home',
          actionHref: '/'
        };
    }
  };
  
  const defaultContent = getDefaultContent();
  const finalIcon = icon || defaultContent.icon;
  const finalTitle = title || defaultContent.title;
  const finalDescription = description || defaultContent.description;
  const finalActionText = actionText || defaultContent.actionText;
  const finalActionHref = actionHref || defaultContent.actionHref;
  const finalAction = action || finalActionHref;
  
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__content">
        <div className="empty-state__icon">
          {finalIcon}
        </div>
        
        <h3 className="empty-state__title">
          {finalTitle}
        </h3>
        
        <p className="empty-state__description">
          {finalDescription}
        </p>
        
        {finalAction && (
          <div className="empty-state__action">
            {typeof finalAction === 'function' ? (
              <button 
                className="btn btn-primary"
                onClick={finalAction}
              >
                {finalActionText}
              </button>
            ) : (
              <Link href={finalAction} className="btn btn-primary">
                {finalActionText}
              </Link>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 20rem;
          padding: 2rem;
        }
        
        .empty-state__content {
          text-align: center;
          max-width: 24rem;
        }
        
        .empty-state__icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }
        
        .empty-state__title {
          font-size: var(--text-xl);
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        
        .empty-state__description {
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        
        .empty-state__action {
          display: flex;
          justify-content: center;
        }
        
        /* Variants for different contexts */
        .empty-state--small {
          min-height: 12rem;
          padding: 1rem;
        }
        
        .empty-state--small .empty-state__icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .empty-state--small .empty-state__title {
          font-size: var(--text-lg);
        }
        
        .empty-state--small .empty-state__description {
          font-size: var(--text-sm);
          margin-bottom: 1rem;
        }
        
        .empty-state--inline {
          min-height: auto;
          padding: 1.5rem;
          background: var(--bg-color);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        
        @media (max-width: 768px) {
          .empty-state {
            padding: 1rem;
          }
          
          .empty-state__icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          
          .empty-state__title {
            font-size: var(--text-lg);
          }
          
          .empty-state__description {
            font-size: var(--text-sm);
          }
        }
      `}</style>
    </div>
  );
}