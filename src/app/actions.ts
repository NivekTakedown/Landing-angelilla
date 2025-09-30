'use server'

import { z } from 'zod';
import { getContactData } from '@/lib/data';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});

export type FormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map(e => e.message).join(', '),
      status: 'error',
    };
  }

  const contactData = await getContactData();
  const endpointUrl = contactData.form.endpoint_url || process.env.CONTACT_FORM_ENDPOINT;

  if (!endpointUrl) {
    console.warn('CONTACT_FORM_ENDPOINT is not defined. Form submission is mocked.');
    // Simulate a successful submission for UI purposes
    return { message: contactData.form.success_message, status: 'success' };
  }
  
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (response.ok) {
      return { message: contactData.form.success_message, status: 'success' };
    } else {
      return { message: contactData.form.error_message, status: 'error' };
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { message: contactData.form.error_message, status: 'error' };
  }
}
