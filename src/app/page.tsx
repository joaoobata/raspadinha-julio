import { Header } from "@/components/Header";
import { AiWizard } from "@/components/AiWizard";
import { TemplateGallery } from "@/components/TemplateGallery";
import { templates } from "@/lib/templates";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <section className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">
            Craft Perfect Documents in Seconds
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Describe your document, and let our AI select the best template and fill it out for you. Or, choose a template yourself.
          </p>
        </section>

        <Suspense>
          <AiWizard />
        </Suspense>

        <TemplateGallery templates={templates} />
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} QuickType. All rights reserved.</p>
      </footer>
    </>
  );
}
