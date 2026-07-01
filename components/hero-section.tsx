import Image from 'next/image';
import { CountdownTimer } from '@/components/countdown-timer';
import { weddingConfig } from '@/lib/wedding-data';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper px-5 py-20 md:py-28">
      <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-roseDust/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_0.9fr]">
        <div className="animate-fadeUp text-center md:text-left">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-goldSoft">We are getting married</p>
          <h1 className="font-serif text-6xl leading-tight text-wine md:text-8xl">{weddingConfig.fullTitle}</h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-ink/70">{weddingConfig.quote}</p>
          <p className="mt-6 font-serif text-4xl text-wine">{weddingConfig.displayDate}</p>
          <div className="mt-9 max-w-xl">
            <CountdownTimer targetDate={weddingConfig.weddingDate} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fadeUp rounded-[2.4rem] border border-white/80 bg-white/60 p-4 shadow-card backdrop-blur [animation-delay:160ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-champagne">
            <Image src={weddingConfig.heroImage} alt="Ảnh cưới cô dâu chú rể" fill priority className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
