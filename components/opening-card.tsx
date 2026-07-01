'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMusic } from '@/components/music-provider';
import { weddingConfig } from '@/lib/wedding-data';

export function OpeningCard() {
  const router = useRouter();
  const { startMusic } = useMusic();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = async () => {
    setIsOpening(true);
    await startMusic();
    window.setTimeout(() => router.push('/invitation'), 900);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-paper px-5 py-8 text-ink">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-roseDust/20 blur-3xl" />
        <div className="absolute -right-24 bottom-4 h-96 w-96 rounded-full bg-goldSoft/20 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="text-center md:text-left">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-goldSoft">Wedding Invitation</p>
            <h1 className="font-serif text-5xl leading-tight text-wine md:text-7xl">{weddingConfig.fullTitle}</h1>
            <div className="gold-divider my-7" />
            <p className="mx-auto max-w-lg text-lg leading-8 text-ink/70 md:mx-0">Trân trọng kính mời bạn đến chung vui cùng chúng mình trong ngày đặc biệt.</p>
            <p className="mt-5 font-serif text-3xl text-wine">{weddingConfig.displayDate}</p>
          </div>

          <div className="story-card mx-auto w-full max-w-md">
            <div
              className={`relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/70 p-4 shadow-card backdrop-blur transition duration-700 ${
                isOpening ? 'scale-95 rotate-2 opacity-0' : 'animate-float'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-champagne">
                <Image src={weddingConfig.coverImage} alt="Ảnh bìa thiệp cưới" fill priority className="object-cover" />
                <div className="absolute inset-x-8 bottom-8 rounded-[2rem] border border-white/70 bg-white/75 p-6 text-center shadow-lg backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-goldSoft">Save the date</p>
                  <p className="mt-2 font-serif text-3xl text-wine">{weddingConfig.fullTitle}</p>
                  <p className="mt-2 text-sm text-ink/65">{weddingConfig.displayDate}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpen}
              disabled={isOpening}
              className="mx-auto mt-8 flex min-w-56 items-center justify-center rounded-full bg-wine px-8 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-card transition hover:-translate-y-1 hover:bg-[#5e3030] disabled:cursor-wait disabled:opacity-70"
            >
              {isOpening ? 'Đang mở...' : 'Mở thiệp'}
            </button>
            <p className="mt-4 text-center text-sm text-ink/55">Bấm mở thiệp để phát nhạc nền.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
