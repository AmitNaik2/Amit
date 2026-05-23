import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Gaming Guides | GamesDealsHub',
  description: 'Tips, tricks, and walkthroughs for the best PC games.',
  openGraph: {
    title: 'Gaming Guides | GamesDealsHub',
    description: 'Tips, tricks, and walkthroughs for the best PC games.',
    url: 'https://www.gamesdealshub.me/guides'
  },
  alternates: { canonical: '/guides' }
};

export default function Page() { 
  redirect("/#guides");
}
