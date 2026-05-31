import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGameDealById, getActiveGames } from "../../../lib/gamerpower";
import { type GameDeal } from "../../../types";
import CountdownTimer from "../../../components/CountdownTimer";

export const revalidate = 3600;

async function fetchServerDeal(id: string): Promise<GameDeal | null> {
  const cleanId = id.replace("gp_", "");
  return getGameDealById(cleanId);
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const game = await fetchServerDeal(params.id);
  
  if (!game) {
    return { title: 'Deal Not Found - GamesDealsHub' };
  }

  const title = `${game.title} — Free on ${game.platforms} | GamesDealsHub`;
  const description = game.description ? `${game.description.slice(0, 155)}...` : `Get ${game.title} for free!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.gamesdealshub.me/game/${params.id}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: game.image, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [game.image]
    }
  };
}

export default async function GamePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const game = await fetchServerDeal(params.id);

  if (!game) {
    notFound();
  }

  const activeGames = await getActiveGames();
  const relatedGames = activeGames.filter(g => g.id !== game.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": game.title,
    "description": game.description,
    "image": game.image,
    "brand": { "@type": "Brand", "name": game.platforms },
    "sku": game.id,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": game.users ?? 100
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": game.end_date !== "N/A" && game.end_date !== "2099-12-31"
        ? new Date(game.end_date).toISOString().split("T")[0] 
        : undefined,
      "url": game.open_giveaway_url || game.gamerpower_url
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-4 md:px-8 font-poppins">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#9CA3AF] hover:text-[#06B6D4] transition-colors mb-8 font-orbitron text-sm tracking-widest uppercase font-bold">
          ← Back to All Deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (Image) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)] border border-white/5">
              <Image 
                src={game.image} 
                alt={game.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
            
            <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-orbitron font-bold text-white uppercase tracking-widest mb-4 border-b border-white/10 pb-4">Game Description</h2>
              <div className="prose prose-invert max-w-none text-[#D1D5DB] leading-relaxed" dangerouslySetInnerHTML={{ __html: game.description || "No description available." }} />
            </div>
          </div>

          {/* Right Column (Details) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0F172A]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col items-start shadow-[0_0_20px_rgba(6,182,212,0.05)]">
              
              <span className="px-3 py-1 bg-[#6366f1]/20 border border-[#6366f1]/50 text-[#6366f1] text-xs font-bold uppercase tracking-widest rounded mb-4">
                {game.platforms}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-orbitron font-black text-white uppercase leading-tight tracking-tight mb-6">
                {game.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-[#9CA3AF] line-through decoration-red-500/50">
                  {game.worth !== "N/A" ? game.worth : "$19.99"}
                </span>
                <span className="px-4 py-1 bg-green-500/20 text-green-400 font-bold font-orbitron text-xl uppercase tracking-widest border border-green-500/50 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  FREE
                </span>
              </div>
              
              <div className="w-full bg-black/40 rounded-xl p-4 mb-6 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#9CA3AF] font-orbitron uppercase tracking-widest">Time Remaining</span>
                  <CountdownTimer endDate={game.end_date} />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs text-[#9CA3AF] font-orbitron uppercase tracking-widest">Heat Score</span>
                  <span className="text-sm font-bold text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded border border-[#EC4899]/30">
                    {(game.users >= 1000 ? (game.users / 1000).toFixed(1) + "k" : game.users) ?? "45.3k"}
                  </span>
                </div>
              </div>
              
              <a 
                href={game.open_giveaway_url || game.gamerpower_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#8B5CF6] text-white font-orbitron font-black text-lg tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:-translate-y-1"
              >
                CLAIM FREE GAME →
              </a>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        {relatedGames.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/5">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-widest mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGames.map(related => (
                <Link key={related.id} href={`/game/${related.id}`} className="group relative bg-[#0F172A]/80 border border-white/5 rounded-2xl overflow-hidden hover:border-[#06B6D4]/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <div className="relative w-full aspect-video">
                    <Image src={related.image} alt={related.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/90 text-white text-[10px] font-bold font-orbitron uppercase tracking-widest rounded">FREE</div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-[#06B6D4] font-orbitron font-bold uppercase tracking-widest">{related.platforms}</span>
                    <h4 className="text-white font-bold mt-1 line-clamp-1">{related.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const games = await getActiveGames();
  return games.map((game) => ({
    id: game.id,
  }));
}
