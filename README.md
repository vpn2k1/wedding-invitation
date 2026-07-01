# Wedding Invitation Serverless Demo

Project mẫu thiệp cưới online bằng Next.js. Bản hiện tại tập trung vào phần thiệp trước, chưa làm admin/database/upload ảnh.

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
  - Form gửi lời chúc mẫu.
  - Danh sách lời chúc dưới footer.

- Trang album `/album`
  - Xem ảnh dạng storybook/carousel.
  - Next/previous.
  - Thumbnail chọn ảnh.

## Chạy local

```bash
npm install
npm run dev
```

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
components/
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
public/
  images/                   # Ảnh placeholder dạng SVG
  music/wedding-demo.wav    # Nhạc demo tự tạo
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

## Giai đoạn sau: thêm admin + database

Có thể mở rộng theo hướng:

- Database: Neon PostgreSQL.
- ORM: Prisma.
- Upload ảnh: Cloudinary hoặc UploadThing.
- Admin auth: NextAuth hoặc admin password đơn giản.
- API:
  - `GET /api/album`
  - `POST /api/admin/album`
  - `PATCH /api/admin/album/:id`
  - `DELETE /api/admin/album/:id`
  - `POST /api/comments`
  - `GET /api/comments`

Khi đó chỉ cần đổi `lib/wedding-data.ts` từ dữ liệu static sang fetch API/database.
