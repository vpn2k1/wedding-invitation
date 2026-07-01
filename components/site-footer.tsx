import { weddingConfig } from '@/lib/wedding-data';

export function SiteFooter() {
  return (
    <footer className="bg-wine px-5 py-14 text-center text-white">
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/60">Thank you for celebrating with us</p>
      <h2 className="mt-4 font-serif text-5xl">{weddingConfig.fullTitle}</h2>
      <p className="mt-3 text-white/70">{weddingConfig.displayDate}</p>
    </footer>
  );
}
