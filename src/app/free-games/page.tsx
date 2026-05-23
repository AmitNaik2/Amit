import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Free PC Games | GamesDealsHub',
  description: 'Live feed of currently active free PC games on Epic, Steam, and GOG.',
  openGraph: {
    title: 'Free PC Games | GamesDealsHub',
    description: 'Live feed of currently active free PC games on Epic, Steam, and GOG.',
    url: 'https://www.gamesdealshub.me/free-games'
  },
  alternates: { canonical: '/free-games' }
};

export default function Page() { 
  redirect("/#free-games");
}
