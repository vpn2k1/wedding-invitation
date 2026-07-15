'use client';

import { FormEvent, useEffect, useState } from 'react';
import { getFallbackComments } from '@/lib/supabase/mappers';
import type { AttendanceStatus, GuestComment } from '@/lib/supabase/types';

const attendanceOptions: { label: string; value: AttendanceStatus }[] = [
  { label: 'Có thể tham dự', value: 'attending' },
  { label: 'Không thể tham dự', value: 'not_attending' },
  { label: 'Chưa chắc', value: 'maybe' },
];

function formatCommentTime(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return 'Vừa xong';

  const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;

  return date.toLocaleDateString('vi-VN');
}

export function CommentSection() {
  const [comments, setComments] = useState<GuestComment[]>(getFallbackComments());
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('attending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch('/api/comments')
      .then((response) => response.json())
      .then((data: { comments?: GuestComment[] }) => {
        if (isMounted && data.comments?.length) {
          setComments(data.comments);
        }
      })
      .catch(() => {
        if (isMounted) setComments(getFallbackComments());
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setNotice('');
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          message,
          attendanceStatus: attendance,
        }),
      });
      const data = (await response.json()) as { success: boolean; comment?: GuestComment; message?: string };

      if (!response.ok || !data.success || !data.comment) {
        throw new Error(data.message || 'Không thể gửi lời chúc lúc này.');
      }

      setComments((current) => [data.comment as GuestComment, ...current]);
      setName('');
      setMessage('');
      setAttendance('attending');
      setNotice('Cảm ơn bạn, lời chúc đã được gửi.');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Không thể gửi lời chúc lúc này.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-ivory px-5 py-20">
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
                onChange={(event) => setAttendance(event.target.value as AttendanceStatus)}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
              >
                {attendanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
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
            {notice && <p className="rounded-2xl bg-champagne px-4 py-3 text-sm font-semibold text-ink">{notice}</p>}
            {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
          </form>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/70 p-5 shadow-card backdrop-blur">
          <h3 className="font-serif text-3xl text-wine">Lời chúc mới nhất</h3>
          <div className="mt-5 space-y-4">
            {isLoading && Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-3xl border border-champagne bg-ivory/70" />
            ))}
            {!isLoading && comments.map((comment) => (
              <article key={comment.id} className="rounded-3xl border border-champagne bg-ivory/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-wine">{comment.name}</h4>
                  <span className="text-xs text-ink/45">{formatCommentTime(comment.createdAt)}</span>
                </div>
                <p className="mt-3 leading-7 text-ink/65">{comment.message}</p>
              </article>
            ))}
            {!isLoading && comments.length === 0 && (
              <p className="rounded-3xl border border-champagne bg-ivory/70 p-5 text-ink/60">Chưa có lời chúc nào được hiển thị.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
