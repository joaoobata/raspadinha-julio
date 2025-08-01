import type { Template } from '@/lib/types';
import { TemplateCard } from './TemplateCard';

type TemplateGalleryProps = {
  templates: Template[];
};

export function TemplateGallery({ templates }: TemplateGalleryProps) {
  return (
    <section id="templates" className="mt-12 md:mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
          Or Start with a Template
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose from our library of professionally designed templates.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
