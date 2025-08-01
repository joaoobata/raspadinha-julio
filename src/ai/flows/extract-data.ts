'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting relevant information from free-form text.
 *
 * The flow uses an LLM to identify and extract key data points from user input, which can then be used
 * to populate document templates automatically.
 *
 * @extractData - A function that extracts data from the input text.
 * @ExtractDataInput - The input type for the extractData function.
 * @ExtractDataOutput - The output type for the extractData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDataInputSchema = z.object({
  text: z.string().describe('The free-form text input from which to extract data.'),
  templateType: z.string().describe('The type of template to populate (e.g., resume, cover letter).'),
});
export type ExtractDataInput = z.infer<typeof ExtractDataInputSchema>;

const ExtractDataOutputSchema = z.record(z.string(), z.any()).describe('A record of extracted data fields and their corresponding values.');
export type ExtractDataOutput = z.infer<typeof ExtractDataOutputSchema>;

export async function extractData(input: ExtractDataInput): Promise<ExtractDataOutput> {
  return extractDataFlow(input);
}

const extractDataPrompt = ai.definePrompt({
  name: 'extractDataPrompt',
  input: {schema: ExtractDataInputSchema},
  output: {schema: ExtractDataOutputSchema},
  prompt: `You are an expert data extraction assistant. Your task is to extract relevant information from the given text input to populate a template of type "{{{templateType}}}".

  Here's the text input:
  {{{text}}}

  Identify and extract key data points from the text, such as name, contact information, skills, experience, education, etc., as appropriate for the template type. Return a JSON object where each key represents a field in the template, and the value is the extracted information from the text.  If a particular piece of information cannot be found, return null for that field. The output MUST be a valid JSON object.
  `,
});

const extractDataFlow = ai.defineFlow(
  {
    name: 'extractDataFlow',
    inputSchema: ExtractDataInputSchema,
    outputSchema: ExtractDataOutputSchema,
  },
  async input => {
    const {output} = await extractDataPrompt(input);
    return output!;
  }
);
