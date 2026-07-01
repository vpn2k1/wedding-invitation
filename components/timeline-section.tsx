import { SectionHeading } from '@/components/section-heading';
import { timeline } from '@/lib/wedding-data';

export function TimelineSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Love Story" title="Câu chuyện của chúng mình" />
        <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-champagne md:before:left-1/2">
          {timeline.map((item, index) => (
            <article key={item.title} className={`relative grid gap-4 md:grid-cols-2 ${index % 2 ? '' : 'md:text-right'}`}>
              <div className={`${index % 2 ? 'md:col-start-2' : ''} rounded-[1.6rem] border border-champagne bg-white/85 p-6 shadow-sm`}> 
                <span className="absolute left-[0.85rem] top-8 h-4 w-4 rounded-full border-4 border-ivory bg-goldSoft md:left-1/2 md:-translate-x-1/2" />
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-goldSoft">{item.date}</p>
                <h3 className="mt-2 font-serif text-3xl text-wine">{item.title}</h3>
                <p className="mt-3 leading-8 text-ink/65">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
