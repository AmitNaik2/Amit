import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Gaming News | GamesDealsHub',
  description: 'Get the latest PC gaming news, hardware updates, and deal announcements.',
  openGraph: {
    title: 'Gaming News | GamesDealsHub',
    description: 'Get the latest PC gaming news, hardware updates, and deal announcements.',
    url: 'https://www.gamesdealshub.me/news'
  },
  alternates: { canonical: '/news' }
};

export default function Page() { 
  redirect("/#news");
}
