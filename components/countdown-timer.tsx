'use client';

import { useEffect, useMemo, useState } from 'react';

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();
  const safeDiff = Math.max(diff, 0);

  return {
    days: Math.floor(safeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDiff / (1000 * 60)) % 60),
    seconds: Math.floor((safeDiff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  const items = useMemo(
    () => [
      { label: 'Ngày', value: timeLeft.days },
      { label: 'Giờ', value: timeLeft.hours },
      { label: 'Phút', value: timeLeft.minutes },
      { label: 'Giây', value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-3xl border border-white/70 bg-white/55 p-4 text-center shadow-sm backdrop-blur">
          <div className="font-serif text-3xl text-wine md:text-4xl">{item.value.toString().padStart(2, '0')}</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
