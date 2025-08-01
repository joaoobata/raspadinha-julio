'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2, Loader2, Info } from 'lucide-react';

import { suggestAndExtract } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import type { TemplateData } from '@/lib/types';
import { findTemplateById } from '@/lib/templates';

type Suggestion = {
  templateId: string;
  reason: string;
}

export function AiWizard() {
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState('');
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [extractedData, setExtractedData] = useState<TemplateData | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await suggestAndExtract(description);
      if (result.success && result.suggestion && result.extractedData) {
        setSuggestion(result.suggestion);
        setExtractedData(result.extractedData as TemplateData);
      } else {
        toast({
          variant: 'destructive',
          title: 'Suggestion Failed',
          description: result.error,
        });
      }
    });
  };

  const handleProceed = () => {
    if (!suggestion || !extractedData) return;
    
    const dataString = encodeURIComponent(JSON.stringify(extractedData));
    router.push(`/editor/${suggestion.templateId}?data=${dataString}`);
  };
  
  const suggestedTemplate = suggestion ? findTemplateById(suggestion.templateId) : null;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 p-6">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-background rounded-full shadow-inner">
                <Wand2 className="h-8 w-8 text-primary" />
             </div>
             <div>
                <CardTitle className="text-2xl font-bold">AI Document Wizard</CardTitle>
                <CardDescription className="text-lg">Let AI do the heavy lifting for you.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Describe the document you want to create. For example: 'Create a resume for a software engineer with 5 years of experience in React and Node.js. My name is Jane Doe and my email is jane@email.com...'"
              className="min-h-[120px] text-base"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
            />
            <Button type="submit" className="w-full" disabled={isPending || !description}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate with AI
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!suggestion} onOpenChange={(open) => !open && setSuggestion(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI Suggestion</AlertDialogTitle>
            <AlertDialogDescription>
              Based on your description, we suggest the following template:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-secondary rounded-lg">
            <h3 className="font-bold text-lg text-primary">{suggestedTemplate?.name}</h3>
            <p className="text-sm text-muted-foreground mt-2 flex gap-2">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span><span className="font-semibold">Reason:</span> {suggestion?.reason}</span>
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSuggestion(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed}>Proceed to Editor</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
