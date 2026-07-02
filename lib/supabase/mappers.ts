import { albumImages, initialComments } from '@/lib/wedding-data';
import type { AlbumImage, AlbumImageRow, GuestComment, GuestCommentRow } from '@/lib/supabase/types';

const fallbackSiteId = process.env.NEXT_PUBLIC_SITE_ID || 'static-site';

export function mapAlbumImage(row: AlbumImageRow): AlbumImage {
  return {
    id: row.id,
    siteId: row.site_id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    storagePath: row.storage_path,
    width: row.width,
    height: row.height,
    sortOrder: row.sort_order,
    isVisible: row.is_visible,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapGuestComment(row: GuestCommentRow): GuestComment {
  return {
    id: row.id,
    siteId: row.site_id,
    name: row.name,
    message: row.message,
    attendanceStatus: row.attendance_status,
    guestCount: row.guest_count,
    isVisible: row.is_visible,
    createdAt: row.created_at,
  };
}

export function getFallbackAlbumImages(): AlbumImage[] {
  return albumImages.map((image, index) => ({
    id: image.id,
    siteId: fallbackSiteId,
    title: image.title,
    description: image.description,
    imageUrl: image.src,
    storagePath: null,
    width: null,
    height: null,
    sortOrder: index,
    isVisible: true,
    createdAt: new Date(0).toISOString(),
    updatedAt: null,
  }));
}

export function getFallbackComments(): GuestComment[] {
  return initialComments.map((comment, index) => ({
    id: `fallback-${index}`,
    siteId: fallbackSiteId,
    name: comment.name,
    message: comment.message,
    attendanceStatus: null,
    guestCount: null,
    isVisible: true,
    createdAt: new Date(Date.now() - index * 60_000).toISOString(),
  }));
}
