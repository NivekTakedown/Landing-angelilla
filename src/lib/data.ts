import fs from 'fs/promises';
import path from 'path';
import type { SiteData, HeroData, AboutData, ServicesData, TestimonialsData, FaqData, ContactData, FooterData } from './types';
import { ImagePlaceholder } from './placeholder-images';

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export const getSiteData = () => readJsonFile<SiteData>('site.json');
export const getHeroData = () => readJsonFile<HeroData>('hero.json');
export const getAboutData = () => readJsonFile<AboutData>('about.json');
export const getServicesData = () => readJsonFile<ServicesData>('services.json');
export const getTestimonialsData = () => readJsonFile<TestimonialsData>('testimonials.json');
export const getFaqData = () => readJsonFile<FaqData>('faq.json');
export const getContactData = () => readJsonFile<ContactData>('contact.json');
export const getFooterData = () => readJsonFile<FooterData>('footer.json');

export async function getPlaceholderImages(): Promise<ImagePlaceholder[]> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.placeholderImages;
}

export async function getPlaceholderImage(id: string): Promise<ImagePlaceholder | undefined> {
    const images = await getPlaceholderImages();
    return images.find(img => img.id === id);
}
