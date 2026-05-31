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
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-orbitron font-bold text-[#06B6D4] mb-4 uppercase tracking-widest">Game Reviews</h1>
        <p className="text-[#9CA3AF] mb-8 font-poppins">In-depth analysis, scoring, and breakdown of the latest PC titles.</p>
        
        <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
           <div className="inline-block p-4 rounded-full bg-[#06B6D4]/10 mb-6 border border-[#06B6D4]/30">
              <span className="text-[#06B6D4] font-orbitron font-bold tracking-widest text-lg">SYSTEM UPDATE</span>
           </div>
           <h2 className="text-2xl font-orbitron font-bold text-white mb-4">Content Under Construction</h2>
           <p className="text-[#9CA3AF] max-w-lg mx-auto leading-relaxed font-poppins">
             Our operatives are currently gathering fresh intelligence for this section. The network is establishing connections to bring you comprehensive game reviews soon. 
           </p>
           <a href="/" className="inline-block mt-8 px-6 py-3 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#8B5CF6] font-bold font-orbitron uppercase tracking-widest rounded-lg transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
             Return to Dashboard
           </a>
        </div>
      </div>
    </div>
  );
}
