'use client';

import { FormEvent, useState } from 'react';
import { initialComments } from '@/lib/wedding-data';

type CommentItem = {
  name: string;
  message: string;
  time: string;
};

export function CommentSection() {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('Có thể tham dự');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setComments((current) => [
        {
          name: name.trim(),
          message: `${message.trim()} (${attendance})`,
          time: 'Vừa xong',
        },
        ...current,
      ]);
      setName('');
      setMessage('');
      setAttendance('Có thể tham dự');
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <section className="bg-[#fff6e6] px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-goldSoft">Guestbook</p>
          <h2 className="font-serif text-4xl text-wine md:text-5xl">Gửi lời chúc</h2>
          <p className="mt-4 leading-8 text-ink/65">Hãy để lại một lời nhắn nhỏ để chúng mình lưu giữ trong ngày đặc biệt này.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-[2rem] border border-white bg-white/75 p-5 shadow-card">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="guest-name">Tên của bạn</label>
              <input
                id="guest-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="Ví dụ: Gia đình cô Lan"
                maxLength={60}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="guest-attendance">Trạng thái tham dự</label>
              <select
                id="guest-attendance"
                value={attendance}
                onChange={(event) => setAttendance(event.target.value)}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
              >
                <option>Có thể tham dự</option>
                <option>Không thể tham dự</option>
                <option>Chưa chắc</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="guest-message">Lời chúc</label>
              <textarea
                id="guest-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-32 w-full resize-none rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="Chúc hai bạn..."
                maxLength={300}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="w-full rounded-full bg-wine px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#5e3030] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
            </button>
            <p className="text-xs leading-6 text-ink/50">Bản mẫu này đang lưu lời chúc tạm trên trình duyệt. Khi làm admin/database, form sẽ chuyển sang API + database.</p>
          </form>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/70 p-5 shadow-card backdrop-blur">
          <h3 className="font-serif text-3xl text-wine">Lời chúc mới nhất</h3>
          <div className="mt-5 space-y-4">
            {comments.map((comment, index) => (
              <article key={`${comment.name}-${index}`} className="rounded-3xl border border-champagne bg-ivory/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-wine">{comment.name}</h4>
                  <span className="text-xs text-ink/45">{comment.time}</span>
                </div>
                <p className="mt-3 leading-7 text-ink/65">{comment.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
