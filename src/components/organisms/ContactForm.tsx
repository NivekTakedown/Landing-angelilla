'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitContactForm, type FormState } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import type { ContactData } from '@/lib/types';

function SubmitButton({ buttonText }: { buttonText: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {buttonText}
    </Button>
  );
}

export function ContactForm({ formConfig }: { formConfig: ContactData['form'] }) {
  const initialState: FormState = { message: '', status: 'idle' };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Éxito',
        description: state.message,
      });
    } else if (state.status === 'error') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="name">{formConfig.name_label}</Label>
        <Input type="text" id="name" name="name" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="email">{formConfig.email_label}</Label>
        <Input type="email" id="email" name="email" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="message">{formConfig.message_label}</Label>
        <Textarea id="message" name="message" rows={5} required className="mt-2" />
      </div>
      <SubmitButton buttonText={formConfig.button_text} />
    </form>
  );
}
