'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

interface HeaderProps {
  navItems: NavItem[];
  cta: { text: string; href: string };
}

export function Header({ navItems, cta }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex-shrink-0" aria-label="Página de inicio">
            <Logo />
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <Button asChild className="hidden md:inline-flex">
              <a href={cta.href}>{cta.text}</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 transform bg-background transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
            <Link href="/" onClick={handleLinkClick}>
                <Logo />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar menú">
                <X className="h-6 w-6" />
            </Button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 pt-16">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className="text-2xl font-headline font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </a>
          ))}
          <Button asChild size="lg" className="mt-8">
            <a href={cta.href} onClick={handleLinkClick}>{cta.text}</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
