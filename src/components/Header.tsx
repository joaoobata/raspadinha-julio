'use client';

import { FileType2 } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Back to homepage">
            <FileType2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold tracking-tight text-foreground">
              QuickType
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
