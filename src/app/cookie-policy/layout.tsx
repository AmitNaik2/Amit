import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | GamesDealsHub',
  description: 'GamesDealsHub cookie policy — how we use cookies to improve your experience.',
  alternates: { canonical: '/cookie-policy' }
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
