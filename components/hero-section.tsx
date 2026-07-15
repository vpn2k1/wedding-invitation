'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { useSiteSettings } from '@/components/site-settings-provider';
import { WeddingImage } from '@/components/wedding-image';

export function HeroSection() {
  const { settings, isLoading } = useSiteSettings();

  return (
    <section className="relative overflow-hidden bg-paper px-5 py-20 md:py-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_0.9fr]">
        <div className="animate-fadeUp text-center md:text-left">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-wine">Ngày chúng mình thành hôn</p>
          <h1 className="font-serif text-6xl leading-tight text-ink md:text-8xl">{settings.fullTitle}</h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-ink/70">{settings.quote}</p>
          <p className="mt-6 font-serif text-4xl text-wine">{settings.displayDate}</p>
          <div className="mt-9 max-w-xl">
            <CountdownTimer targetDate={settings.weddingDate} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fadeUp rounded-[2.4rem] border border-white/80 bg-white/60 p-4 shadow-card backdrop-blur [animation-delay:160ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-champagne">
            <WeddingImage src={isLoading ? null : settings.heroImage} fallbackSrc="/images/hero.svg" alt="Ảnh cưới cô dâu chú rể" fill priority sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
