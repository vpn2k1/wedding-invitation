type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-goldSoft">{eyebrow}</p> : null}
      <h2 className="font-serif text-4xl text-wine md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-ink/70">{description}</p> : null}
    </div>
  );
}
