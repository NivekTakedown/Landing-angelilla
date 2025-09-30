import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getHeroData, getPlaceholderImage } from '@/lib/data';
import { ArrowDown } from 'lucide-react';

export async function Hero() {
  const heroData = await getHeroData();
  const heroImage = await getPlaceholderImage('hero-background');

  if (!heroImage) {
    return null;
  }
  
  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        data-ai-hint={heroImage.imageHint}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent"></div>
       <div className="absolute inset-0 bg-background/30"></div>


      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {heroData.headline}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
            {heroData.subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href={heroData.ctaPrimary.href}>{heroData.ctaPrimary.text}</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-background/80">
              <a href={heroData.ctaSecondary.href}>{heroData.ctaSecondary.text}</a>
            </Button>
          </div>
        </div>
        <a href="#about" className="absolute bottom-10 animate-bounce" aria-label="Ir a la sección sobre mí">
          <ArrowDown className="h-8 w-8 text-primary" />
        </a>
      </div>
    </section>
  );
}
