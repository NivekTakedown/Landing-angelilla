import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getSiteData } from '@/lib/data';

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
    <html lang="es">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
