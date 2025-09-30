import { Header } from '@/components/organisms/Header';
import { Hero } from '@/components/organisms/Hero';
import { About } from '@/components/organisms/About';
import { Services } from '@/components/organisms/Services';
import { Testimonials } from '@/components/organisms/Testimonials';
import { Faq } from '@/components/organisms/Faq';
import { Contact } from '@/components/organisms/Contact';
import { Footer } from '@/components/organisms/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { getSiteData, getTestimonialsData, getPlaceholderImage, getContactData } from '@/lib/data';

export default async function Home() {
  const siteData = await getSiteData();
  const testimonialsData = await getTestimonialsData();
  const contactData = await getContactData();

  // Pre-fetch all testimonial images
  const testimonialImages = await Promise.all(
    testimonialsData.items.map(item => getPlaceholderImage(item.avatar))
  );

  // Create a map for easy lookup
  const imageMap = testimonialsData.items.reduce((acc, item, index) => {
    acc[item.avatar] = testimonialImages[index];
    return acc;
  }, {} as Record<string, any>);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header navItems={siteData.navigation} cta={{ text: 'Agendar Sesión', href: '#contact'}}/>
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Testimonials 
            title={testimonialsData.title}
            subtitle={testimonialsData.subtitle}
            items={testimonialsData.items}
            images={imageMap}
        />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton phone={contactData.phone} />
    </div>
  );
}
