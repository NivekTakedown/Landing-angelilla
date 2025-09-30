import { getFooterData, getSiteData, getContactData } from '@/lib/data';
import { Logo } from '@/components/atoms/Logo';
import { SocialLinks } from '@/components/shared/SocialLinks';
import Link from 'next/link';

export async function Footer() {
  const footerData = await getFooterData();
  const siteData = await getSiteData();
  const contactData = await getContactData();
  const currentYear = new Date().getFullYear();

  const formattedCopyright = footerData.copyright.replace('{year}', currentYear.toString());
  const formattedProfessionalInfo = footerData.professionalInfo.replace('{number}', siteData.professional.registrationNumber);

  return (
    <footer className="bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
                <Logo />
                <p className="text-sm text-muted-foreground">{siteData.tagline}</p>
                <SocialLinks links={contactData.socials} />
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-semibold text-foreground">{footerData.quickLinks.title}</h4>
                    <ul className="mt-4 space-y-2">
                        {footerData.quickLinks.links.map(link => (
                            <li key={link.name}>
                                <a href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold text-foreground">Contacto</h4>
                     <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li><a href={`mailto:${contactData.email}`} className="hover:text-primary">{contactData.email}</a></li>
                        <li><a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="hover:text-primary">{contactData.phone}</a></li>
                     </ul>
                </div>
                 <div>
                     <h4 className="font-semibold text-foreground">Consultorio</h4>
                     <p className="mt-4 text-sm text-muted-foreground">
                        {contactData.address.street}<br/>
                        {contactData.address.city}
                     </p>
                </div>
            </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{formattedCopyright}</p>
          <p className="mt-2">{formattedProfessionalInfo}</p>
        </div>
      </div>
    </footer>
  );
}
