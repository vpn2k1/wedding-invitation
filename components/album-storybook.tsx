'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getFallbackAlbumImages } from '@/lib/supabase/mappers';
import type { AlbumImage } from '@/lib/supabase/types';

export function AlbumStorybook() {
  const [images, setImages] = useState<AlbumImage[]>(getFallbackAlbumImages());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const activeImage = images[activeIndex];

  const pageLabel = useMemo(() => `${activeIndex + 1} / ${images.length}`, [activeIndex, images.length]);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/album')
      .then((response) => response.json())
      .then((data: { images?: AlbumImage[] }) => {
        if (isMounted && data.images) {
          setImages(data.images.length ? data.images : getFallbackAlbumImages());
          setActiveIndex(0);
        }
      })
      .catch(() => {
        if (isMounted) setImages(getFallbackAlbumImages());
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const goPrev = () => setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  const goNext = () => setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));

  return (
    <main className="min-h-screen bg-paper px-5 py-24 text-ink">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-goldSoft">Photo Storybook</p>
            <h1 className="font-serif text-5xl text-wine md:text-7xl">Album ảnh</h1>
          </div>
          <Link href="/invitation" className="rounded-full border border-wine/20 bg-white/70 px-5 py-3 text-sm font-bold text-wine shadow-sm transition hover:bg-wine hover:text-white">
            Về trang thiệp
          </Link>
        </div>

        <section className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <div className="story-card min-w-0">
            <div className="story-page relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/70 p-4 backdrop-blur">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-champagne md:aspect-[16/10]">
                {isLoading && <div className="absolute inset-0 animate-pulse bg-champagne/80" />}
                {!isLoading && activeImage && (
                  <>
                    <Image src={activeImage.imageUrl} alt={activeImage.title || 'Ảnh album cưới'} fill priority className="object-cover" />
                    <div className="absolute inset-x-3 bottom-3 rounded-[1.5rem] border border-white/70 bg-white/75 p-4 shadow-lg backdrop-blur sm:inset-x-5 sm:bottom-5 sm:p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-goldSoft">Trang {pageLabel}</p>
                      <h2 className="mt-1 line-clamp-2 font-serif text-2xl text-wine sm:text-3xl">{activeImage.title || 'Khoảnh khắc cưới'}</h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/65">{activeImage.description || 'Một khoảnh khắc đáng nhớ trong album.'}</p>
                    </div>
                  </>
                )}
                {!isLoading && !activeImage && <div className="grid h-full place-items-center px-6 text-center text-ink/60">Album chưa có ảnh hiển thị.</div>}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/80 bg-white/65 p-5 shadow-card backdrop-blur">
            <div className="flex gap-3">
              <button type="button" onClick={goPrev} className="flex-1 rounded-full border border-wine/20 px-5 py-3 font-bold text-wine transition hover:bg-wine hover:text-white">
                Trước
              </button>
              <button type="button" onClick={goNext} className="flex-1 rounded-full bg-wine px-5 py-3 font-bold text-white transition hover:bg-[#5e3030]">
                Sau
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition ${index === activeIndex ? 'border-wine ring-2 ring-wine/20' : 'border-champagne opacity-70 hover:opacity-100'}`}
                  aria-label={`Xem ảnh ${image.title || index + 1}`}
                >
                  <Image src={image.imageUrl} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            <p className="mt-5 rounded-2xl bg-ivory px-4 py-3 text-sm leading-6 text-ink/60">
              Album sẽ ưu tiên ảnh từ Supabase Storage và tự dùng ảnh mẫu khi chưa cấu hình database.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
