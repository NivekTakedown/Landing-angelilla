
import React, { Suspense } from 'react';
import { Header } from '@/components/organisms/Header';
import { Hero } from '@/components/organisms/Hero';
import { Footer } from '@/components/organisms/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { getSiteData, getTestimonialsData, getPlaceholderImage, getContactData } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

const About = React.lazy(() => import('@/components/organisms/About').then(module => ({ default: module.About })));
const Services = React.lazy(() => import('@/components/organisms/Services').then(module => ({ default: module.Services })));
const Testimonials = React.lazy(() => import('@/components/organisms/Testimonials').then(module => ({ default: module.Testimonials })));
const Faq = React.lazy(() => import('@/components/organisms/Faq').then(module => ({ default: module.Faq })));
const Contact = React.lazy(() => import('@/components/organisms/Contact').then(module => ({ default: module.Contact })));

const SectionSkeleton = () => <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"><Skeleton className="h-48 w-full" /></div>;

export default async function Home() {
  const siteData = await getSiteData();
  const contactData = await getContactData();
  
  // Pre-fetch testimonials data to avoid waterfall
  const testimonialsDataPromise = getTestimonialsData();
  const testimonialsData = await testimonialsDataPromise;
  const testimonialImages = await Promise.all(
    testimonialsData.items.map(item => getPlaceholderImage(item.avatar))
  );
  const imageMap = testimonialsData.items.reduce((acc, item, index) => {
    acc[item.avatar] = testimonialImages[index];
    return acc;
  }, {} as Record<string, any>);


  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header navItems={siteData.navigation} cta={{ text: 'Agendar Sesión', href: '#contact'}}/>
      <main className="flex-grow">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        {/*<Suspense fallback={<SectionSkeleton />}>
          <Testimonials 
              title={testimonialsData.title}
              subtitle={testimonialsData.subtitle}
              items={testimonialsData.items}
              images={imageMap}
          />
        </Suspense>*/}
        <Suspense fallback={<SectionSkeleton />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton phone={contactData.phone} />
    </div>
  );
}
