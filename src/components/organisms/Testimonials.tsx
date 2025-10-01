'use client'

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';
import type { TestimonialItem } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type TestimonialsProps = {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
  images: Record<string, ImagePlaceholder | undefined>;
};

export function Testimonials({ title, subtitle, items, images }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto mt-16 w-full max-w-4xl"
          aria-label="Carrusel de testimonios"
        >
          <CarouselContent>
            {items.map((testimonial, index) => {
              const image = images[testimonial.avatar];
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex h-full flex-col justify-between shadow-lg">
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <Quote className="h-8 w-8 text-primary/50 mb-4" />
                        <p className="text-muted-foreground flex-grow">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="mt-6">
                            {image && (
                                <Image
                                    src={image.imageUrl}
                                    alt={testimonial.name}
                                    data-ai-hint={image.imageHint}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                            )}
                          <p className="mt-2 font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <div className="mt-2 flex justify-center">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" aria-label="Testimonio anterior" />
          <CarouselNext className="hidden sm:flex" aria-label="Siguiente testimonio" />
        </Carousel>
      </div>
    </section>
  );
}
