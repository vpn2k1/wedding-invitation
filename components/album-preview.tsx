import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { albumImages } from '@/lib/wedding-data';

export function AlbumPreview() {
  return (
    <section className="bg-paper px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Gallery" title="Album ảnh" description="Một vài khoảnh khắc nhỏ trong hành trình của chúng mình." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {albumImages.slice(0, 4).map((image, index) => (
            <div key={image.id} className={`relative overflow-hidden rounded-[1.5rem] bg-champagne shadow-card ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <div className={`${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
                <Image src={image.src} alt={image.title} fill className="object-cover transition duration-500 hover:scale-105" />
              </div>
            </div>
          ))}
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
