import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'PC Optimization | GamesDealsHub',
  description: 'Boost your FPS and optimize your PC for gaming.',
  openGraph: {
    title: 'PC Optimization | GamesDealsHub',
    description: 'Boost your FPS and optimize your PC for gaming.',
    url: 'https://www.gamesdealshub.me/optimization'
  },
  alternates: { canonical: '/optimization' }
};

export default function Page() { 
  redirect("/#optimization");
}
