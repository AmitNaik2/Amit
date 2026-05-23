import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Game Reviews | GamesDealsHub',
  description: 'In-depth reviews and recommendations for PC games.',
  openGraph: {
    title: 'Game Reviews | GamesDealsHub',
    description: 'In-depth reviews and recommendations for PC games.',
    url: 'https://www.gamesdealshub.me/reviews'
  },
  alternates: { canonical: '/reviews' }
};

export default function Page() { 
  redirect("/#reviews");
}
