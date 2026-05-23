import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | GamesDealsHub',
  description: 'Read the GamesDealsHub privacy policy — how we collect, use, and protect your personal data.',
  alternates: { canonical: '/privacy' }
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
