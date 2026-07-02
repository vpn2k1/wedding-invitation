'use client';

import { SectionHeading } from '@/components/section-heading';
import { useSiteSettings } from '@/components/site-settings-provider';

export function EventsSection() {
  const { settings } = useSiteSettings();
  const gridClassName = settings.layout.eventColumns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <section className="bg-[#fff6e6] px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Wedding Events" title="Thông tin buổi lễ" description="Mong bạn lưu lại thời gian và đến chung vui cùng gia đình hai bên." />
        <div className={`grid gap-5 ${gridClassName}`}>
          {settings.events.map((event) => (
            <article key={event.title} className="flex h-full flex-col rounded-[2rem] border border-white bg-white/75 p-6 shadow-card backdrop-blur">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-2xl">✦</div>
              <h3 className="font-serif text-3xl text-wine">{event.title}</h3>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-goldSoft">{event.date} · {event.time}</p>
              <p className="mt-5 font-semibold text-ink">{event.locationName}</p>
              <p className="mt-2 min-h-16 text-sm leading-7 text-ink/65">{event.address}</p>
              <p className="mt-4 flex-1 text-sm leading-7 text-ink/60">{event.description}</p>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-wine/20 px-5 py-3 text-sm font-bold text-wine transition hover:bg-wine hover:text-white"
              >
                Xem bản đồ
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
