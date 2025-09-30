
export type NavItem = {
  name: string;
  href: string;
};

export type SiteData = {
  name: string;
  tagline: string;
  url: string;
  language: string;
  professional: {
    name: string;
    title: string;
    registrationNumber: string;
    registrationOrg: string;
  };
  seo: {
    homepage: {
      title: string;
      description: string;
      keywords: string[];
      ogImage: string;
    };
  };
  navigation: NavItem[];
};

export type HeroData = {
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
};

export type AboutData = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: string;
  stats: {
    value: string;
    label: string;
  }[];
};

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export type ServicesData = {
  title: string;
  subtitle: string;
  items: ServiceItem[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export type TestimonialsData = {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqData = {
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export type SocialLink = {
  name: 'Instagram' | 'Facebook' | 'LinkedIn';
  href: string;
};

export type ContactData = {
  title: string;
  subtitle:string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
  hours: string;
  socials: SocialLink[];
  form: {
    endpoint_url: string;
    name_label: string;
    email_label: string;
    message_label: string;
    button_text: string;
    success_message: string;
    error_message: string;
  };
};

export type FooterData = {
  copyright: string;
  professionalInfo: string;
  quickLinks: {
    title: string;
    links: NavItem[];
  };
};
