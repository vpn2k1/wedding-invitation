'use client';

import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { useSiteSettings } from '@/components/site-settings-provider';

export function QrSection() {
  const { settings } = useSiteSettings();

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Wedding Gift" title="QR mừng cưới" description="Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi lời chúc qua chuyển khoản, bạn có thể dùng QR bên dưới." />
        <div className="grid gap-6 sm:grid-cols-2">
          {settings.qrItems.map((bank, index) => (
            <article key={`${bank.accountNumber}-${index}`} className="rounded-[2rem] border border-champagne bg-white/85 p-5 text-center shadow-card sm:p-6">
              <div className="relative mx-auto aspect-square w-full max-w-56 overflow-hidden rounded-3xl border border-champagne bg-white p-4">
                <Image src={bank.qrImage} alt={`QR ${bank.ownerName}`} fill className="object-contain p-4" />
              </div>
              <h3 className="mt-6 break-words font-serif text-3xl text-wine">{bank.ownerName}</h3>
              <p className="mt-2 font-semibold text-ink/80">{bank.bankName}</p>
              <p className="mt-1 break-all text-ink/65">STK: {bank.accountNumber}</p>
              <p className="mt-4 rounded-2xl bg-ivory px-4 py-3 text-sm text-ink/60">Nội dung: {bank.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
