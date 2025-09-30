import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  className?: string;
};

export function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  const Icon = (Icons as any)[icon] as React.ElementType;

  return (
    <Card className={cn("text-center h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2", className)}>
      <CardHeader className="items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          {Icon && <Icon className="h-8 w-8" />}
        </div>
        <CardTitle className="pt-4 font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
