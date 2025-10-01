import type { Metadata, Viewport } from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getSiteData } from '@/lib/data';
import { cn } from '@/lib/utils';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteData();

  return {
    metadataBase: new URL(siteData.url),
    title: {
      default: `${siteData.name} | ${siteData.tagline}`,
      template: `%s | ${siteData.name}`,
    },
    description: siteData.seo.homepage.description,
    keywords: siteData.seo.homepage.keywords,
    openGraph: {
      title: siteData.seo.homepage.title,
      description: siteData.seo.homepage.description,
      url: siteData.url,
      siteName: siteData.name,
      images: [
        {
          url: `${siteData.url}${siteData.seo.homepage.ogImage}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: siteData.language,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteData.seo.homepage.title,
      description: siteData.seo.homepage.description,
      images: [`${siteData.url}${siteData.seo.homepage.ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#F8F0E3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(playfairDisplay.variable, ptSans.variable)}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests; default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com https://picsum.photos; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-src 'self' https://www.google.com;" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
