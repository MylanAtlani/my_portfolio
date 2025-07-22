import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { NothingCursor } from '@/components/ui/nothing-cursor';
import { EditProtection } from '@/components/ui/edit-protection';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://atlani-mylan.github.io'),
  title: 'Mylan Atlani | Lead Dev Freelance & CTO',
  description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes avec Go, NestJS et Next.js. 8 ans d\'expérience au service des startups et scale-ups.',
  keywords: 'mylan atlani, lead developer, cto freelance, go, nestjs, nextjs, architecture backend, refonte, ci/cd, docker, postgresql, marseille, freelance',
  authors: [{ name: 'Mylan Atlani' }],
  creator: 'Mylan Atlani',
  publisher: 'Mylan Atlani',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://atlani-mylan.github.io',
    title: 'Mylan Atlani | Lead Dev Freelance & CTO',
    description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes avec Go, NestJS et Next.js.',
    siteName: 'Mylan Atlani Portfolio',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mylan Atlani | Lead Dev Freelance & CTO',
    description: 'Lead Dev Freelance & CTO spécialisé dans la refonte d\'architectures backend robustes.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' }
  ]
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
        <link rel="canonical" href="https://atlani-mylan.github.io" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="geo.region" content="FR-13" />
        <meta name="geo.placename" content="Marseille" />
        <meta name="geo.position" content="43.296482;5.369780" />
        <meta name="ICBM" content="43.296482, 5.369780" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {/* Curseur Nothing OS Custom */}
            <NothingCursor />
            
            {/* Protection contre l'édition accidentelle */}
            <EditProtection />
            
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 relative">
                {children}
              </main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
