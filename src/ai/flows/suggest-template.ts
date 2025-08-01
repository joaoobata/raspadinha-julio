// This file holds the Genkit flow for suggesting a relevant template based on a document description.

'use server';

/**
 * @fileOverview Template suggestion AI agent.
 *
 * - suggestTemplate - A function that suggests a template based on a document description.
 * - SuggestTemplateInput - The input type for the suggestTemplate function.
 * - SuggestTemplateOutput - The return type for the suggestTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTemplateInputSchema = z.object({
  documentDescription: z
    .string()
    .describe('A short description of the document to be created.'),
});
export type SuggestTemplateInput = z.infer<typeof SuggestTemplateInputSchema>;

const SuggestTemplateOutputSchema = z.object({
  templateSuggestion: z
    .string()
    .describe('The name of the suggested template.'),
  reason: z
    .string()
    .describe('The reason why this template is suggested.'),
});
export type SuggestTemplateOutput = z.infer<typeof SuggestTemplateOutputSchema>;

export async function suggestTemplate(
  input: SuggestTemplateInput
): Promise<SuggestTemplateOutput> {
  return suggestTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTemplatePrompt',
  input: {schema: SuggestTemplateInputSchema},
  output: {schema: SuggestTemplateOutputSchema},
  prompt: `You are a template suggestion expert. Based on the user's description of the document they want to create, you will suggest a relevant template name and the reason for the suggestion.

Document description: {{{documentDescription}}}

Template suggestion:`,
});

const suggestTemplateFlow = ai.defineFlow(
  {
    name: 'suggestTemplateFlow',
    inputSchema: SuggestTemplateInputSchema,
    outputSchema: SuggestTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
