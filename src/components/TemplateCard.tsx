import Link from 'next/link';
import type { Template } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type TemplateCardProps = {
  template: Template;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const Icon = template.icon;
  return (
    <Link href={`/editor/${template.id}`} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary">
        <CardHeader className="flex flex-col h-full">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="w-8 h-8 text-primary" />
            </div>
             <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          <div className="mt-4 flex-grow">
            <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
            <CardDescription className="mt-1 text-base">{template.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
