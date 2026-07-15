'use client';

import { SectionHeading } from '@/components/section-heading';
import { useSiteSettings } from '@/components/site-settings-provider';
import { WeddingImage } from '@/components/wedding-image';

export function CoupleSection() {
  const { settings, isLoading } = useSiteSettings();
  const people = [
    {
      name: settings.brideName,
      role: 'Cô dâu',
      description: settings.brideDescription,
      image: settings.brideImage,
    },
    {
      name: settings.groomName,
      role: 'Chú rể',
      description: settings.groomDescription,
      image: settings.groomImage,
    },
  ];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Bride & Groom" title="Cô dâu & Chú rể" description="Hai con người, hai hành trình, cùng chọn nhau để bắt đầu một chương mới." />
        <div className="grid gap-6 md:grid-cols-2">
          {people.map((person) => (
            <article key={person.name} className="rounded-[2rem] border border-champagne bg-white/80 p-5 shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-champagne">
                <WeddingImage src={isLoading ? null : person.image} alt={person.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-goldSoft">{person.role}</p>
                <h3 className="mt-2 font-serif text-4xl text-wine">{person.name}</h3>
                <p className="mt-4 leading-8 text-ink/65">{person.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
