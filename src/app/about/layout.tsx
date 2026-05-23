import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | GamesDealsHub',
  description: 'Learn about GamesDealsHub, a platform built by Amit to track free PC game deals, optimization tips, and gaming guides.',
  alternates: { canonical: '/about' }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
