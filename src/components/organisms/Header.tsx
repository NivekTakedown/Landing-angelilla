'use client';

import { useState, useEffect, useRef } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0" aria-label="Página de inicio">
            <Logo className="w-32 h-auto" />
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
              ref={openButtonRef}
              variant="ghost"
              size="icon"
              className="md:hidden flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        className={cn(
          'fixed inset-0 z-50 transform bg-background transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        tabIndex={-1}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
            <Link href="/" onClick={handleLinkClick}>
                <Logo className="w-32 h-auto" />
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Cerrar menú">
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
