'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative text (alt text) for images to improve SEO.
 *
 * - suggestImageAltText - A function that takes an image data URI and returns suggested alt text.
 * - SuggestImageAltTextInput - The input type for the suggestImageAltText function.
 * - SuggestImageAltTextOutput - The return type for the suggestImageAltText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImageAltTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type SuggestImageAltTextInput = z.infer<typeof SuggestImageAltTextInputSchema>;

const SuggestImageAltTextOutputSchema = z.object({
  altText: z.string().describe('Suggested alt text for the image.'),
});
export type SuggestImageAltTextOutput = z.infer<typeof SuggestImageAltTextOutputSchema>;

export async function suggestImageAltText(input: SuggestImageAltTextInput): Promise<SuggestImageAltTextOutput> {
  return suggestImageAltTextFlow(input);
}

const suggestImageAltTextPrompt = ai.definePrompt({
  name: 'suggestImageAltTextPrompt',
  input: {schema: SuggestImageAltTextInputSchema},
  output: {schema: SuggestImageAltTextOutputSchema},
  prompt: `You are an SEO expert. Given the image, suggest concise and descriptive alt text for the image that improves SEO.

Image: {{media url=photoDataUri}}`,
});

const suggestImageAltTextFlow = ai.defineFlow(
  {
    name: 'suggestImageAltTextFlow',
    inputSchema: SuggestImageAltTextInputSchema,
    outputSchema: SuggestImageAltTextOutputSchema,
  },
  async input => {
    const {output} = await suggestImageAltTextPrompt(input);
    return output!;
  }
);
