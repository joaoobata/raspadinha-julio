import { notFound } from 'next/navigation';
import { findTemplateById } from '@/lib/templates';
import { Header } from '@/components/Header';
import { EditorClient } from '@/components/EditorClient';
import { Suspense } from 'react';

type EditorPageProps = {
  params: {
    templateId: string;
  };
};

export default function EditorPage({ params }: EditorPageProps) {
  const template = findTemplateById(params.templateId);

  if (!template) {
    notFound();
  }
  
  const Icon = template.icon;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-headline">{template.name} Editor</h1>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">{template.description}</p>
         </div>
        <Suspense fallback={<div>Loading Editor...</div>}>
          <EditorClient template={template} />
        </Suspense>
      </main>
    </div>
  );
}
