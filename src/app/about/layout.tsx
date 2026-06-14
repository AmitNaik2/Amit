import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About GamesDealsHub | Free Game Tracking Team',
  description: 'Meet the GamesDealsHub Team, learn why we track free PC games across 9+ platforms, and see how we verify active giveaways.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About GamesDealsHub | Free Game Tracking Team',
    description: 'Meet the GamesDealsHub Team and learn how we track, verify, and explain active free game giveaways.',
    url: 'https://www.gamesdealshub.me/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
