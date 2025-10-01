import { getContactData } from '@/lib/data';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SocialLinks } from '@/components/shared/SocialLinks';
import { ContactForm } from './ContactForm';

export async function Contact() {
  const contactData = await getContactData();

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {contactData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {contactData.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 lg:block lg:space-y-8">
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <h3 className="font-headline text-2xl font-semibold">Información de Contacto</h3>
                <ul className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${contactData.email}`} className="hover:text-primary">{contactData.email}</a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="hover:text-primary">{contactData.phone}</a>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p>{contactData.address.street}</p>
                        <p>{contactData.address.city}</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6 border-t pt-6">
                    <h4 className="font-semibold text-foreground">Horario de Atención</h4>
                    <p className="text-muted-foreground mt-2">{contactData.hours}</p>
                </div>
                <div className="mt-6 border-t pt-4">
                    <SocialLinks links={contactData.socials} />
                </div>
              </CardContent>
            </Card>
            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.603310495811!2d-74.05602378573215!3d4.664491943265039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a67035f0563%3A0x6a051829379812b!2sCra.%207%20%2371-21%2C%20Localidad%20de%20Chapinero%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación del consultorio"
              ></iframe>
            </div>
          </div>
          <Card className="p-6 sm:p-8">
            <h3 className="font-headline text-2xl font-semibold mb-6">Envíame un Mensaje</h3>
            <ContactForm formConfig={contactData.form}/>
          </Card>
        </div>
      </div>
    </section>
  );
}
