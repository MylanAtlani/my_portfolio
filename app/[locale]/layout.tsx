import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toaster-provider';
import { NavbarWrapper } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { NothingCursor } from '@/components/ui/nothing-cursor';
import { EditProtection } from '@/components/ui/edit-protection';
import Script from 'next/script';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mylanatlani.com'),
  title: 'Mylan Atlani | Lead Dev Freelance & CTO - Marseille',
  description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes avec Go, NestJS et Next.js. 8 ans d\'expérience au service des startups et scale-ups à Marseille.',
  keywords: 'mylan atlani, lead developer, cto freelance, go, nestjs, nextjs, architecture backend, refonte, ci/cd, docker, postgresql, marseille, freelance, développeur freelance, cto fractionné',
  authors: [{ name: 'Mylan Atlani' }],
  creator: 'Mylan Atlani',
  publisher: 'Mylan Atlani',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://mylanatlani.com',
    languages: {
      'fr': 'https://mylanatlani.com/fr',
      'en': 'https://mylanatlani.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mylanatlani.com',
    title: 'Mylan Atlani | Lead Dev Freelance & CTO - Marseille',
    description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes avec Go, NestJS et Next.js.',
    siteName: 'Mylan Atlani Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mylan Atlani - Lead Dev Freelance & CTO',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mylan Atlani | Lead Dev Freelance & CTO',
    description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification',
    yandex: 'yandex-verification',
    yahoo: 'yahoo-site-verification',
  },
  category: 'technology',
  classification: 'Portfolio professionnel',
  referrer: 'origin-when-cross-origin',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://mylanatlani.com" />
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <meta name="geo.region" content="FR-13" />
        <meta name="geo.placename" content="Marseille" />
        <meta name="geo.position" content="43.296482;5.369780" />
        <meta name="ICBM" content="43.296482, 5.369780" />
        
        {/* Font Preloads pour optimiser le chargement */}
        <link
          rel="preload"
          href="/fonts/ndot-47.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        
        {/* Google Tag Manager - DANS LE HEAD */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MZNXKQ24');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased min-h-screen`}>
        {/* Google Tag Manager (noscript) - JUSTE APRÈS <body> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZNXKQ24"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <ToasterProvider>
              {/* Curseur Nothing OS Custom */}
              <NothingCursor />
              
              {/* Protection contre l'édition accidentelle */}
              <EditProtection />
              
              <div className="min-h-screen flex flex-col">
                <NavbarWrapper />
                <main className="flex-1 relative">
                  {children}
                </main>
                <Footer />
              </div>
            </ToasterProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
