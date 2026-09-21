'use client';

import Link from 'next/link';
import { formatPrice, effectivePrice } from '@/lib/utils';

export default function SearchResultCard({ result, onClose }) {
  const { type, data, matchType } = result;
  
  if (type === 'product') {
    const price = effectivePrice(data);
    
    return (
      <Link 
        href={`/products/${data.id}`}
        className="search-result-card"
        onClick={onClose}
      >
        <div className="search-result__image">
          <div className="search-result__image-placeholder">
            {data.image}
          </div>
        </div>
        
        <div className="search-result__content">
          <div className="search-result__badge search-result__badge--product">
            Product
          </div>
          
          <h4 className="search-result__title">
            {highlightMatch(data.name, matchType)}
          </h4>
          
          <div className="search-result__meta">
            <span className="search-result__category">
              {data.category.replace('-', ' ')}
            </span>
            <span className="search-result__price">
              ₨{formatPrice(price)}
            </span>
          </div>
          
          {data.description && (
            <p className="search-result__description">
              {data.description.length > 100 
                ? `${data.description.substring(0, 100)}...` 
                : data.description}
            </p>
          )}
        </div>
        
        <div className="search-result__action">
          <span className="search-result__arrow">→</span>
        </div>
        
        <style jsx>{`
          .search-result-card {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: var(--radius);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
            border: 1px solid transparent;
          }
          
          .search-result-card:hover {
            background: var(--bg-color);
            border-color: var(--border);
          }
          
          .search-result__image {
            width: 3rem;
            height: 3rem;
            flex-shrink: 0;
            background: var(--bg-color);
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
          }
          
          .search-result__content {
            flex-grow: 1;
            min-width: 0;
          }
          
          .search-result__badge {
            display: inline-block;
            font-size: var(--text-xs);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.125rem 0.375rem;
            border-radius: var(--radius-sm);
            margin-bottom: 0.25rem;
          }
          
          .search-result__badge--product {
            background: var(--primary-light);
            color: var(--primary);
          }
          
          .search-result__badge--category {
            background: var(--secondary-light);
            color: var(--secondary);
          }
          
          .search-result__title {
            font-size: var(--text-sm);
            font-weight: 600;
            margin-bottom: 0.25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .search-result__meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.25rem;
          }
          
          .search-result__category {
            font-size: var(--text-xs);
            color: var(--text-muted);
            text-transform: capitalize;
          }
          
          .search-result__price {
            font-size: var(--text-sm);
            font-weight: 600;
            color: var(--primary);
          }
          
          .search-result__description {
            font-size: var(--text-xs);
            color: var(--text-muted);
            line-height: 1.4;
            margin: 0;
          }
          
          .search-result__action {
            flex-shrink: 0;
            opacity: 0;
            transition: all var(--transition-base);
          }
          
          .search-result-card:hover .search-result__action {
            opacity: 1;
          }
          
          .search-result__arrow {
            font-size: var(--text-lg);
            color: var(--primary);
          }
          
          .match-highlight {
            background: var(--warning-light);
            color: var(--warning);
            font-weight: 600;
            padding: 0.125rem 0.25rem;
            border-radius: var(--radius-sm);
          }
        `}</style>
      </Link>
    );
  }
  
  if (type === 'category') {
    return (
      <Link 
        href={`/categories/${data.slug}`}
        className="search-result-card"
        onClick={onClose}
      >
        <div className="search-result__image">
          <div className="search-result__image-placeholder">
            {data.icon}
          </div>
        </div>
        
        <div className="search-result__content">
          <div className="search-result__badge search-result__badge--category">
            Category
          </div>
          
          <h4 className="search-result__title">
            {highlightMatch(data.name, matchType)}
          </h4>
          
          <div className="search-result__meta">
            <span className="search-result__category">
              {data.productCount || 0} products
            </span>
          </div>
          
          {data.description && (
            <p className="search-result__description">
              {data.description}
            </p>
          )}
        </div>
        
        <div className="search-result__action">
          <span className="search-result__arrow">→</span>
        </div>
        
        <style jsx>{`
          .search-result-card {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: var(--radius);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
            border: 1px solid transparent;
          }
          
          .search-result-card:hover {
            background: var(--bg-color);
            border-color: var(--border);
          }
          
          .search-result__image {
            width: 3rem;
            height: 3rem;
            flex-shrink: 0;
            background: ${data.colors?.secondary || 'var(--bg-color)'};
            color: ${data.colors?.primary || 'var(--primary)'};
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
          }
          
          .search-result__content {
            flex-grow: 1;
            min-width: 0;
          }
          
          .search-result__badge {
            display: inline-block;
            font-size: var(--text-xs);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.125rem 0.375rem;
            border-radius: var(--radius-sm);
            margin-bottom: 0.25rem;
          }
          
          .search-result__badge--product {
            background: var(--primary-light);
            color: var(--primary);
          }
          
          .search-result__badge--category {
            background: var(--secondary-light);
            color: var(--secondary);
          }
          
          .search-result__title {
            font-size: var(--text-sm);
            font-weight: 600;
            margin-bottom: 0.25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .search-result__meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.25rem;
          }
          
          .search-result__category {
            font-size: var(--text-xs);
            color: var(--text-muted);
            text-transform: capitalize;
          }
          
          .search-result__price {
            font-size: var(--text-sm);
            font-weight: 600;
            color: var(--primary);
          }
          
          .search-result__description {
            font-size: var(--text-xs);
            color: var(--text-muted);
            line-height: 1.4;
            margin: 0;
          }
          
          .search-result__action {
            flex-shrink: 0;
            opacity: 0;
            transition: all var(--transition-base);
          }
          
          .search-result-card:hover .search-result__action {
            opacity: 1;
          }
          
          .search-result__arrow {
            font-size: var(--text-lg);
            color: var(--primary);
          }
          
          .match-highlight {
            background: var(--warning-light);
            color: var(--warning);
            font-weight: 600;
            padding: 0.125rem 0.25rem;
            border-radius: var(--radius-sm);
          }
        `}</style>
      </Link>
    );
  }
  
  return null;
}

// Helper function to highlight search matches
function highlightMatch(text, matchType) {
  if (!matchType || !matchType.query) return text;
  
  const { query } = matchType;
  const regex = new RegExp(`(${query})`, 'gi');
  
  return text.replace(regex, (match) => 
    `<span class="match-highlight">${match}</span>`
  );
}