'use client';

import Link from 'next/link';
import { useSiteSettings } from '@/components/site-settings-provider';

export function SiteHeader() {
  const { settings } = useSiteSettings();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 text-sm shadow-sm backdrop-blur">
        <Link href="/invitation" className="font-serif text-xl text-wine">
          {settings.fullTitle}
        </Link>
        <div className="flex items-center gap-4 font-semibold text-ink/65">
          <Link className="transition hover:text-wine" href="/invitation">Thiệp</Link>
          <Link className="transition hover:text-wine" href="/album">Album</Link>
        </div>
      </nav>
    </header>
  );
}
