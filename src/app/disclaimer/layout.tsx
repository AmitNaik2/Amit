import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | GamesDealsHub',
  description: 'GamesDealsHub disclaimer — information about our deals and third-party links.',
  alternates: { canonical: '/disclaimer' }
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
