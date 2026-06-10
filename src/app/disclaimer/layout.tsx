import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | GamesDealsHub',
  description: 'GamesDealsHub disclaimer — information about our deals and third-party links.',
  alternates: { canonical: '/disclaimer' },
  openGraph: {
    title: 'Disclaimer | GamesDealsHub',
    description: 'GamesDealsHub disclaimer — information about our deals and third-party links.',
    url: 'https://www.gamesdealshub.me/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
