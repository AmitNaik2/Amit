import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | GamesDealsHub',
  description: 'GamesDealsHub terms of service — the rules for using our free game deals tracker.',
  alternates: { canonical: '/terms' }
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
