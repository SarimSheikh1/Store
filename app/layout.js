import { BUSINESS_CONFIG, SITE_METADATA } from '@/lib/config';
import './globals.css';
import './components.css';
import './animations.css';
import './print.css';
import { Providers } from '@/context/Providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export const metadata = {
  title: {
    template: `%s | ${BUSINESS_CONFIG.name}`,
    default: SITE_METADATA.title,
  },
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  publisher: BUSINESS_CONFIG.name,
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE_METADATA.siteUrl,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: BUSINESS_CONFIG.name,
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#16a34a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-TileColor" content="#16a34a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AnnouncementBar />
            <Navbar />
            <main className="main-content" style={{ flex: 1, minHeight: '60vh' }}>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
