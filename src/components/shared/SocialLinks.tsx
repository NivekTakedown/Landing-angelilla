"use client";

import React from "react";
import { Instagram, MessageSquare, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Social = { name: string; href: string };

const ICONS: Record<string, React.ComponentType<any>> = {
  Instagram,
  WhatsApp: MessageSquare, // lucide no tiene WhatsApp; usamos MessageSquare como sustituto
  LinkedIn: Linkedin,
};

export function SocialLinks({ socials = [] }: { socials?: Social[] }) {
  if (!Array.isArray(socials) || socials.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {socials.map((social) => {
        const Icon = ICONS[social.name] ?? ExternalLink;
        return (
          <Button key={social.name} variant="ghost" size="sm" asChild>
            <a href={social.href} target="_blank" rel="noopener noreferrer">
              <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}

export default SocialLinks;
