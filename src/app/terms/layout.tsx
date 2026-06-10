import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | GamesDealsHub',
  description: 'GamesDealsHub terms of service — the rules for using our free game deals tracker.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | GamesDealsHub',
    description: 'GamesDealsHub terms of service — the rules for using our free game deals tracker.',
    url: 'https://www.gamesdealshub.me/terms',
    type: 'website',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
