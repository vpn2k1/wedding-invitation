import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { MusicProvider } from '@/components/music-provider';
import { SiteSettingsProvider } from '@/components/site-settings-provider';

export const metadata: Metadata = {
  title: 'Thiệp cưới Cô dâu & Chú rể',
  description: 'Website thiệp cưới online serverless mẫu, có trang mở thiệp, thông tin cưới, album và lời chúc.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <SiteSettingsProvider>
          <MusicProvider>{children}</MusicProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
