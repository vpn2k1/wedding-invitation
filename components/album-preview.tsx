'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { getFallbackAlbumImages } from '@/lib/supabase/mappers';
import { WeddingImage } from '@/components/wedding-image';
import type { AlbumImage } from '@/lib/supabase/types';

export function AlbumPreview() {
  const [images, setImages] = useState<AlbumImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch('/api/album')
      .then((response) => response.json())
      .then((data: { images?: AlbumImage[] }) => {
        if (isMounted) setImages(data.images?.length ? data.images : getFallbackAlbumImages());
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

  return (
    <section className="bg-paper px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="Album ảnh" description="Một vài khoảnh khắc nhỏ trong hành trình của chúng mình." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={`animate-pulse rounded-[1.5rem] bg-champagne/70 shadow-card ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <div className={`${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`} />
                </div>
              ))
            : images.slice(0, 4).map((image, index) => (
                <div key={image.id} className={`relative overflow-hidden rounded-[1.5rem] bg-champagne shadow-card ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <div className={`${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                    <WeddingImage src={image.imageUrl} alt={image.title || 'Ảnh album cưới'} fill sizes={index === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} className="object-cover transition duration-500 hover:scale-105" />
                  </div>
                </div>
              ))}
          {!isLoading && images.length === 0 && (
            <div className="col-span-full rounded-[1.5rem] border border-champagne bg-white/70 px-5 py-8 text-center text-ink/60">
              Album chưa có ảnh hiển thị.
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link href="/album" className="inline-flex rounded-full bg-wine px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-card transition hover:-translate-y-1 hover:bg-[#5e3030]">
            Xem album storybook
          </Link>
        </div>
      </div>
    </section>
  );
}
