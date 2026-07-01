import { AlbumStorybook } from '@/components/album-storybook';
import { MusicToggle } from '@/components/music-toggle';
import { SiteHeader } from '@/components/site-header';

export default function AlbumPage() {
  return (
    <>
      <SiteHeader />
      <AlbumStorybook />
      <MusicToggle />
    </>
  );
}
