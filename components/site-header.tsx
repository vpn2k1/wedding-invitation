'use client';

import Link from 'next/link';
import { useSiteSettings } from '@/components/site-settings-provider';

export function SiteHeader() {
  const { settings } = useSiteSettings();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 py-3 sm:px-4 sm:py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/75 px-4 py-3 text-sm shadow-sm backdrop-blur sm:px-5">
        <Link href="/invitation" className="min-w-0 truncate font-serif text-lg text-wine sm:text-xl">
          {settings.fullTitle}
        </Link>
        <div className="flex shrink-0 items-center gap-2 font-semibold text-ink/65 sm:gap-4">
          <Link className="transition hover:text-wine" href="/invitation">Thiệp</Link>
          <Link className="transition hover:text-wine" href="/album">Album</Link>
        </div>
      </nav>
    </header>
  );
}
