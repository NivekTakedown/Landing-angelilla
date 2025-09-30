'use server';

import { suggestImageAltText } from '@/ai/flows/suggest-image-alt-text';
import { z } from 'zod';

const AltTextSchema = z.object({
  imageData: z.string().startsWith('data:image', 'Debe ser un data URI de imagen válido.'),
});

type AltTextState = {
  altText?: string;
  error?: string;
};

export async function getAltTextSuggestion(prevState: AltTextState, formData: FormData): Promise<AltTextState> {
  const validatedFields = AltTextSchema.safeParse({
    imageData: formData.get('imageData'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.imageData?.join(', ') };
  }

  try {
    const result = await suggestImageAltText({ photoDataUri: validatedFields.data.imageData });
    if (result.altText) {
      return { altText: result.altText };
    }
    return { error: 'No se pudo generar el texto alternativo.' };
  } catch (error) {
    console.error('AI alt text generation failed:', error);
    return { error: 'Ocurrió un error al contactar al servicio de IA.' };
  }
}
