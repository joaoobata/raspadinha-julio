'use server';

import { extractData } from "@/ai/flows/extract-data";
import { suggestTemplate } from "@/ai/flows/suggest-template";
import { templates } from "@/lib/templates";
import { z } from "zod";

const SuggestAndExtractResultSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  suggestion: z.object({
    templateId: z.string(),
    reason: z.string(),
  }).optional(),
  extractedData: z.record(z.any()).optional(),
});

type SuggestAndExtractResult = z.infer<typeof SuggestAndExtractResultSchema>;

export async function suggestAndExtract(
  documentDescription: string
): Promise<SuggestAndExtractResult> {
  if (!documentDescription || documentDescription.trim().length < 10) {
    return {
      success: false,
      error: "Please provide a more detailed description (at least 10 characters).",
    };
  }

  try {
    const suggestionResult = await suggestTemplate({ documentDescription });

    const suggestedTemplateId = suggestionResult.templateSuggestion
      .toLowerCase()
      .replace(/\s+/g, '-');
      
    const templateExists = templates.some(t => t.id === suggestedTemplateId);

    if (!templateExists) {
      return {
        success: false,
        error: `The AI suggested a template ("${suggestionResult.templateSuggestion}") that doesn't exist. Please try a different description or choose a template manually.`
      };
    }
    
    const extractionResult = await extractData({
      text: documentDescription,
      templateType: suggestedTemplateId
    });

    return {
      success: true,
      suggestion: {
        templateId: suggestedTemplateId,
        reason: suggestionResult.reason,
      },
      extractedData: extractionResult,
    };

  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "An unexpected error occurred with the AI. Please try again later.",
    };
  }
}
