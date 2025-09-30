import Image from 'next/image';
import { getAboutData, getPlaceholderImage } from '@/lib/data';

export async function About() {
  const aboutData = await getAboutData();
  const aboutImage = await getPlaceholderImage(aboutData.image);

  if (!aboutImage) return null;

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
             <div className="absolute -top-4 -left-4 w-full h-full rounded-lg bg-secondary/50 transform -rotate-3 z-0"></div>
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              data-ai-hint={aboutImage.imageHint}
              width={600}
              height={800}
              className="rounded-lg object-cover relative z-10 shadow-2xl"
            />
          </div>
          <div className="text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {aboutData.title}
            </h2>
            <p className="mt-4 text-lg text-primary font-semibold">{aboutData.subtitle}</p>
            <div className="mt-6 space-y-4 text-foreground/80">
              {aboutData.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {aboutData.stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-background shadow-sm border">
                  <p className="text-3xl font-bold font-headline text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
