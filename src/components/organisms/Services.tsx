import { getServicesData } from '@/lib/data';
import { ServiceCard } from '@/components/molecules/ServiceCard';

export async function Services() {
  const servicesData = await getServicesData();

  return (
    <section id="services" className="bg-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {servicesData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {servicesData.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {servicesData.items.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
