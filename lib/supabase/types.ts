export type AttendanceStatus = 'attending' | 'not_attending' | 'maybe';

export type AlbumImage = {
  id: string;
  siteId: string;
  title?: string | null;
  description?: string | null;
  imageUrl: string;
  storagePath?: string | null;
  width?: number | null;
  height?: number | null;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export type GuestComment = {
  id: string;
  siteId: string;
  name: string;
  message: string;
  attendanceStatus?: AttendanceStatus | null;
  guestCount?: number | null;
  isVisible: boolean;
  createdAt: string;
};

export type AlbumImageRow = {
  id: string;
  site_id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  storage_path: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string | null;
};

export type GuestCommentRow = {
  id: string;
  site_id: string;
  name: string;
  message: string;
  attendance_status: AttendanceStatus | null;
  guest_count: number | null;
  is_visible: boolean;
  created_at: string;
};
