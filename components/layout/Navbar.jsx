'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useApp } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function Navbar() {
  const { cartCount, isLoaded } = useCart();
  const { searchQuery, setSearchQuery, isBusinessOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Sync local search with global state
  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
      router.push(`/products?q=${encodeURIComponent(localSearchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Packages', href: '/ration-packages' },
    { label: 'Wholesale', href: '/wholesale' },
    { label: 'Offers', href: '/offers' },
    { label: 'Brands', href: '/brands' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          {/* Logo */}
          <Link href="/" className="navbar__logo">
            <img src="/images/four-partners-logo.png" alt="Four Partners Mart" className="navbar__logo-image" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar__nav">
            {navLinks.slice(0, 6).map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`navbar__link ${isActiveLink(link.href) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="navbar__actions">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="search-bar hidden md:block">
              <div className="search-bar__icon">🔍</div>
              <input 
                type="text" 
                placeholder="Search groceries..." 
                className="search-bar__input"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </form>

            {/* Business Status Indicator */}
            <div className={`business-status ${isBusinessOpen() ? 'business-status--open' : 'business-status--closed'}`}>
              <div className="business-status__dot"></div>
              <span className="business-status__text">
                {isBusinessOpen() ? 'Open' : 'Closed'}
              </span>
            </div>

            <Link href="/login" className="navbar__login">
              Login
            </Link>

            {/* Cart Button */}
            <Link href="/cart" className="navbar__cart btn-icon">
              Cart
              {isLoaded && cartCount > 0 && (
                <span className="navbar__cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="navbar__mobile-toggle btn-icon md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="search-bar mb-4">
            <div className="search-bar__icon">🔍</div>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-bar__input"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Navigation Links */}
          <nav className="navbar__mobile-nav">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`navbar__mobile-link ${isActiveLink(link.href) ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/login" className="navbar__mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
            
            {/* Admin Link (Mobile Only) */}
            <Link 
              href="/admin" 
              className="navbar__mobile-link text-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="navbar__backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .business-status {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .business-status--open {
          background-color: var(--success-light);
          color: var(--success);
        }

        .business-status--closed {
          background-color: var(--error-light);
          color: var(--error);
        }

        .business-status__dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: var(--radius-full);
          background-color: currentColor;
          animation: pulse 2s infinite;
        }

        .business-status__text {
          font-size: var(--text-xs);
        }

        .navbar__logo-image {
          width: 9rem;
          height: auto;
          display: block;
        }

        .navbar__backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: var(--z-modal);
        }

        .navbar__mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 0;
          border-bottom: 1px solid var(--border);
          color: var(--text-main);
          font-weight: 500;
          transition: color var(--transition-base);
        }

        .navbar__mobile-link:hover {
          color: var(--primary);
        }

        .navbar__mobile-link--active {
          color: var(--primary);
          font-weight: 600;
        }

        .navbar__mobile-link:last-child {
          border-bottom: none;
        }

        .navbar__mobile-link-icon {
          font-size: 1.125rem;
        }

        @media (min-width: 768px) {
          .business-status__text {
            display: inline;
          }
        }

        @media (max-width: 767px) {
          .navbar__nav {
            display: none;
          }
          
          .business-status__text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
