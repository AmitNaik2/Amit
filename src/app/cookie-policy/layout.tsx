import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | GamesDealsHub',
  description: 'GamesDealsHub cookie policy — how we use cookies to improve your experience.',
  alternates: { canonical: '/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy | GamesDealsHub',
    description: 'GamesDealsHub cookie policy — how we use cookies to improve your experience.',
    url: 'https://www.gamesdealshub.me/cookie-policy',
    type: 'website',
  },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
