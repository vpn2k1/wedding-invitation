'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { AlbumImage } from '@/lib/supabase/types';

type UploadResponse = {
  success: boolean;
  message?: string;
  image?: AlbumImage;
};

export function AdminAlbumUpload() {
  const defaultSiteId = process.env.NEXT_PUBLIC_SITE_ID || '';
  const [siteId, setSiteId] = useState(defaultSiteId);
  const [adminSecret, setAdminSecret] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<AlbumImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const canUpload = useMemo(() => Boolean(siteId.trim() && adminSecret.trim() && file), [adminSecret, file, siteId]);

  const loadImages = async (currentSiteId = siteId) => {
    if (!currentSiteId.trim()) return;

    setIsLoadingImages(true);
    try {
      const response = await fetch(`/api/album?siteId=${encodeURIComponent(currentSiteId.trim())}`);
      const data = (await response.json()) as { images?: AlbumImage[] };
      setImages(data.images || []);
    } catch {
      setImages([]);
    } finally {
      setIsLoadingImages(false);
    }
  };

  useEffect(() => {
    loadImages(defaultSiteId);
  }, [defaultSiteId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canUpload || !file) return;

    setIsUploading(true);
    setNotice('');
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('siteId', siteId.trim());
    formData.append('title', title.trim());
    formData.append('description', description.trim());

    try {
      const response = await fetch('/api/admin/album/upload', {
        method: 'POST',
        headers: {
          'x-admin-secret': adminSecret,
        },
        body: formData,
      });
      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.success || !data.image) {
        throw new Error(data.message || 'Không thể upload ảnh lúc này.');
      }

      setImages((current) => [data.image as AlbumImage, ...current]);
      setTitle('');
      setDescription('');
      setFile(null);
      event.currentTarget.reset();
      setNotice('Ảnh đã được upload và lưu vào album.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Không thể upload ảnh lúc này.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-5 py-10 text-ink">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[420px_1fr]">
        <section className="rounded-[1.5rem] border border-white/80 bg-white/75 p-5 shadow-card backdrop-blur">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-goldSoft">Admin</p>
          <h1 className="font-serif text-4xl text-wine">Upload album</h1>
          <p className="mt-3 text-sm leading-6 text-ink/60">
            Nhập secret admin, chọn site và upload ảnh vào Supabase Storage.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="admin-secret">Admin secret</label>
              <input
                id="admin-secret"
                type="password"
                value={adminSecret}
                onChange={(event) => setAdminSecret(event.target.value)}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="ADMIN_SECRET"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="site-id">Site ID</label>
              <input
                id="site-id"
                value={siteId}
                onChange={(event) => setSiteId(event.target.value)}
                onBlur={() => loadImages()}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="UUID trong wedding_sites"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="album-title">Tiêu đề</label>
              <input
                id="album-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="Ví dụ: Nắng sớm"
                maxLength={160}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="album-description">Mô tả</label>
              <textarea
                id="album-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-28 w-full resize-none rounded-2xl border border-champagne bg-white px-4 py-3 outline-none transition focus:border-goldSoft"
                placeholder="Một dòng mô tả ngắn cho ảnh."
                maxLength={500}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink/70" htmlFor="album-file">Ảnh album</label>
              <input
                id="album-file"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
                className="w-full rounded-2xl border border-dashed border-goldSoft/60 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-wine file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              />
              <p className="mt-2 text-xs text-ink/50">Hỗ trợ JPEG, PNG, WebP. Tối đa 5MB.</p>
            </div>

            <button
              type="submit"
              disabled={!canUpload || isUploading}
              className="w-full rounded-full bg-wine px-6 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#5e3030] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading ? 'Đang upload...' : 'Upload ảnh'}
            </button>

            {notice && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}
            {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
          </form>
        </section>

        <section className="rounded-[1.5rem] border border-white/80 bg-white/65 p-5 shadow-card backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-goldSoft">Album</p>
              <h2 className="mt-1 font-serif text-3xl text-wine">Ảnh đang hiển thị</h2>
            </div>
            <button
              type="button"
              onClick={() => loadImages()}
              className="rounded-full border border-wine/20 bg-white/80 px-5 py-3 text-sm font-bold text-wine transition hover:bg-wine hover:text-white"
            >
              Tải lại
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
            {isLoadingImages && Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square animate-pulse rounded-2xl bg-champagne/70" />
            ))}

            {!isLoadingImages && images.map((image) => (
              <article key={image.id} className="overflow-hidden rounded-2xl border border-champagne bg-ivory/70">
                <div className="relative aspect-square bg-champagne">
                  <Image src={image.imageUrl} alt={image.title || 'Ảnh album cưới'} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 font-semibold text-wine">{image.title || 'Chưa có tiêu đề'}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-ink/60">{image.description || 'Chưa có mô tả.'}</p>
                </div>
              </article>
            ))}

            {!isLoadingImages && images.length === 0 && (
              <p className="col-span-full rounded-2xl border border-champagne bg-ivory/70 p-5 text-center text-ink/60">
                Chưa có ảnh album cho site này.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
