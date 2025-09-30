import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getFaqData } from '@/lib/data';

export async function Faq() {
  const faqData = await getFaqData();

  return (
    <section id="faq" className="bg-secondary/30 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {faqData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {faqData.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-primary/10">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
