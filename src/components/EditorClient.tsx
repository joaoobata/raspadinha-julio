'use client';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import type { Template, TemplateData } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { PreviewContainer } from './previews/PreviewContainer';
import { Download, FileText, FileUp } from 'lucide-react';

type EditorClientProps = {
  template: Template;
};

export function EditorClient({ template }: EditorClientProps) {
  const searchParams = useSearchParams();
  const initialDataString = searchParams.get('data');
  
  let initialData: TemplateData = {};
  if (initialDataString) {
    try {
      initialData = JSON.parse(decodeURIComponent(initialDataString));
    } catch (error) {
      console.error("Failed to parse initial data:", error);
    }
  }

  const defaultValues = template.fields.reduce((acc, field) => {
    acc[field.name] = initialData[field.name] || '';
    return acc;
  }, {} as TemplateData);

  const form = useForm<TemplateData>({
    defaultValues,
  });

  const watchedData = form.watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {template.fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === 'textarea' ? (
                          <Textarea placeholder={field.placeholder} {...formField} />
                        ) : (
                          <Input type={field.type} placeholder={field.placeholder} {...formField} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button variant="outline"><Download className="mr-2" /> Export as PDF</Button>
                <Button variant="outline"><FileUp className="mr-2" /> Export as DOCX</Button>
                <Button variant="outline"><FileText className="mr-2" /> Export as TXT</Button>
            </CardContent>
        </Card>
        <Card className="shadow-md sticky top-24">
            <CardHeader>
                <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="bg-muted/50 p-4 rounded-lg">
                <PreviewContainer templateId={template.id} data={watchedData} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
