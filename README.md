# Wedding Invitation Serverless Demo

Project mẫu thiệp cưới online bằng Next.js. Album và guestbook có thể dùng Supabase, đồng thời vẫn fallback về dữ liệu static khi chưa cấu hình database.

## Tính năng đã có

- Trang mở thiệp `/`
  - Hiển thị ảnh thiệp/cover.
  - Bấm **Mở thiệp** để phát nhạc nền.
  - Tự chuyển sang trang thông tin thiệp.

- Trang thông tin thiệp `/invitation`
  - Hero section.
  - Countdown ngày cưới.
  - Thông tin cô dâu chú rể.
  - Thông tin lễ cưới và nút mở Google Maps.
  - Timeline câu chuyện tình yêu.
  - Preview album.
  - QR code mừng cưới.
  - Form gửi lời chúc qua API.
  - Danh sách lời chúc từ Supabase hoặc dữ liệu fallback.

- Trang album `/album`
  - Xem ảnh dạng storybook/carousel.
  - Next/previous.
  - Thumbnail chọn ảnh.
  - Ưu tiên ảnh từ Supabase Storage/Database.

- Trang admin `/admin`
  - Chỉnh thông tin cô dâu chú rể, ngày cưới, quote và ảnh chính.
  - Chỉnh địa chỉ/sự kiện cưới.
  - Bật/tắt section và đổi bố cục sự kiện.
  - Upload ảnh album vào Supabase Storage.
  - Lưu metadata vào bảng `album_images`.
  - Được bảo vệ bằng Basic Auth từ `.env`.

## Chạy local

```bash
npm install
npm run dev
```

## Supabase setup

Tạo file `.env.local` từ `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_ID=11111111-1111-4111-8111-111111111111
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

Các bước cấu hình:

1. Tạo project Supabase.
2. Copy `NEXT_PUBLIC_SUPABASE_URL` từ Project Settings.
3. Copy `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy `SUPABASE_SERVICE_ROLE_KEY` và chỉ đặt trong `.env.local`, không đưa lên client.
5. Chạy SQL trong `supabase/schema.sql` bằng Supabase SQL Editor.
6. Tạo hoặc kiểm tra bucket public `wedding-images`.
7. Chạy seed trong `supabase/seed.sql`.
8. Đặt `NEXT_PUBLIC_SITE_ID` theo id trong bảng `wedding_sites`.
9. Đặt `ADMIN_USERNAME` và `ADMIN_PASSWORD` để đăng nhập `/admin`.
10. Chạy lại project:

```bash
npm install
npm run dev
```

Nếu nhiều project muốn đọc/chỉnh cùng một bộ dữ liệu, copy cùng `NEXT_PUBLIC_SITE_ID` sang tất cả project. Nếu muốn tách dữ liệu từng website trong cùng Supabase, tạo thêm record trong `wedding_sites`, rồi mỗi project đặt `NEXT_PUBLIC_SITE_ID` khác nhau. Các bảng `site_settings`, `album_images` và `guest_comments` đều được tách theo `site_id`.

API hiện có:

```txt
GET  /api/album
GET  /api/site/settings
GET  /api/comments
POST /api/comments
GET  /api/admin/site/settings
PUT  /api/admin/site/settings
POST /api/admin/album/upload
```

Trang `/admin` và các API `/api/admin/*` được bảo vệ bằng Basic Auth qua `ADMIN_USERNAME` và `ADMIN_PASSWORD` khi chạy production. Ở local development, nếu chưa cấu hình hai biến này thì admin được mở để tiện setup ban đầu. Các Supabase key, service role key và site id đều cấu hình trong `.env.local`, không nhập trên giao diện admin.

`ADMIN_USERNAME` và `ADMIN_PASSWORD` không lấy từ Supabase. Đây là tài khoản admin đơn giản do bạn tự đặt trong `.env.local`, ví dụ:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=doi-mat-khau-nay
```

Sau khi cấu hình, vào `/admin/login` để đăng nhập rồi quản lý nội dung thiệp.

Sau đó mở:

```txt
http://localhost:3000
```

## Cấu trúc chính

```txt
app/
  page.tsx                  # Trang mở thiệp
  invitation/page.tsx       # Trang thông tin thiệp
  album/page.tsx            # Trang album storybook
  admin/page.tsx            # Trang admin quản lý nội dung và album
  api/                       # API settings, album, comments, admin upload
components/
  admin-dashboard.tsx
  site-settings-provider.tsx
  opening-card.tsx
  hero-section.tsx
  couple-section.tsx
  events-section.tsx
  timeline-section.tsx
  album-preview.tsx
  album-storybook.tsx
  qr-section.tsx
  comment-section.tsx
  music-provider.tsx
  music-toggle.tsx
lib/
  wedding-data.ts           # Dữ liệu mẫu
  supabase/                 # Supabase clients, types, mappers
public/
  images/                   # Ảnh placeholder dạng SVG
  music/wedding-demo.wav    # Nhạc demo tự tạo
supabase/
  schema.sql                # Tables, indexes, RLS policies, storage bucket
  seed.sql                  # Seed site mẫu, album, guestbook
```

## Chỉnh nội dung thiệp

Chỉnh toàn bộ dữ liệu mẫu tại:

```txt
lib/wedding-data.ts
```

Bạn có thể thay:

- Tên cô dâu chú rể.
- Ngày cưới.
- Quote.
- Thông tin sự kiện.
- Timeline tình yêu.
- QR code.
- Album ảnh.
- Lời chúc mẫu.

## Thay ảnh thật

Thêm ảnh vào thư mục:

```txt
public/images
```

Ví dụ:

```txt
public/images/cover-real.jpg
public/images/hero-real.jpg
public/images/album-01.jpg
```

Sau đó sửa đường dẫn trong `lib/wedding-data.ts`:

```ts
coverImage: '/images/cover-real.jpg'
```

## Thay nhạc thật

Thêm file nhạc vào:

```txt
public/music/wedding.mp3
```

Sau đó sửa trong `lib/wedding-data.ts`:

```ts
musicUrl: '/music/wedding.mp3'
```

Lưu ý: trình duyệt chỉ cho phát nhạc sau khi người dùng có tương tác, nên nhạc được phát sau khi bấm **Mở thiệp**.

## Giai đoạn sau: thêm admin UI

Có thể mở rộng theo hướng:

- Trang admin upload ảnh gọi `/api/admin/album/upload`.
- Admin auth: NextAuth hoặc admin password nâng cấp.
- API:
  - `PATCH /api/admin/album/:id`
  - `DELETE /api/admin/album/:id`
  - Duyệt/ẩn lời chúc bằng `is_visible`.
