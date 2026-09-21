'use client';

import { CartProvider } from './CartContext.jsx';
import { ToastProvider } from './ToastContext.jsx';
import { WishlistProvider } from './WishlistContext.jsx';
import { AppProvider } from './AppContext.jsx';

/**
 * Combined Providers Component
 * 
 * This component wraps all the context providers in the correct order
 * to provide global state management for the entire application.
 * 
 * Usage:
 * ```jsx
 * import { Providers } from './context/Providers';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Providers>
 *           {children}
 *         </Providers>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function Providers({ children }) {
  return (
    <AppProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AppProvider>
  );
}

// Re-export all hooks for easy importing
export { useCart } from './CartContext.jsx';
export { useToast } from './ToastContext.jsx';
export { useWishlist } from './WishlistContext.jsx';
export { useApp } from './AppContext.jsx';

// Re-export all providers for individual use if needed
export { CartProvider } from './CartContext.jsx';
export { ToastProvider } from './ToastContext.jsx';
export { WishlistProvider } from './WishlistContext.jsx';
export { AppProvider } from './AppContext.jsx';