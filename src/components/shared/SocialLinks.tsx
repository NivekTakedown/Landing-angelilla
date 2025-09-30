import { Instagram, Facebook, Linkedin as LucideLinkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SocialLink } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap = {
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: LucideLinkedin,
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((social) => {
        const Icon = iconMap[social.name];
        return (
          <Button
            key={social.name}
            variant="ghost"
            size="icon"
            asChild
            aria-label={social.name}
          >
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
