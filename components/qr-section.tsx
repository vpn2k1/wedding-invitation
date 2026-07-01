import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { bankQrList } from '@/lib/wedding-data';

export function QrSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Wedding Gift" title="QR mừng cưới" description="Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi lời chúc qua chuyển khoản, bạn có thể dùng QR bên dưới." />
        <div className="grid gap-6 md:grid-cols-2">
          {bankQrList.map((bank) => (
            <article key={bank.accountNumber} className="rounded-[2rem] border border-champagne bg-white/85 p-6 text-center shadow-card">
              <div className="mx-auto relative h-56 w-56 overflow-hidden rounded-3xl border border-champagne bg-white p-4">
                <Image src={bank.qrImage} alt={`QR ${bank.ownerName}`} fill className="object-contain p-4" />
              </div>
              <h3 className="mt-6 font-serif text-3xl text-wine">{bank.ownerName}</h3>
              <p className="mt-2 font-semibold text-ink/80">{bank.bankName}</p>
              <p className="mt-1 text-ink/65">STK: {bank.accountNumber}</p>
              <p className="mt-4 rounded-2xl bg-ivory px-4 py-3 text-sm text-ink/60">Nội dung: {bank.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
