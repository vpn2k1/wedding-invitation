import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { MusicProvider } from '@/components/music-provider';

export const metadata: Metadata = {
  title: 'Thiệp cưới Minh Anh & Hoàng Nam',
  description: 'Website thiệp cưới online serverless mẫu, có trang mở thiệp, thông tin cưới, album và lời chúc.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
