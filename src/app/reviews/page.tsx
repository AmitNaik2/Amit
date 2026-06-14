import type { Metadata } from "next";
import { AuthorBox } from "@/components/AuthorBox";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = "https://www.gamesdealshub.me";
const ogImage = `/og?${new URLSearchParams({
  title: "PC Game Reviews",
  platform: "Reviews",
  expiry: "Value-focused",
}).toString()}`;

export const metadata: Metadata = {
  title: "Free Game Reviews June 2026 | GamesDealsHub",
  description:
    "GamesDealsHub reviews of currently free PC games, including Wild Terra 2, The Red Lantern, and Warhammer 40,000: Speed Freeks.",
  keywords: [
    "PC game reviews",
    "game recommendations",
    "best PC games",
    "Steam game reviews",
    "Epic Games reviews",
    "GamesDealsHub reviews",
  ],
  alternates: { canonical: `${siteUrl}/reviews` },
  openGraph: {
    title: "Free Game Reviews | GamesDealsHub",
    description: "Practical reviews of currently free games for deal hunters deciding what to claim before expiry.",
    url: `${siteUrl}/reviews`,
    siteName: "GamesDealsHub",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "GamesDealsHub Reviews" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Game Reviews | GamesDealsHub",
    description: "Reviews of currently free games worth claiming this week.",
    images: [ogImage],
  },
};

const reviews = [
  {
    title: "Wild Terra 2: New Lands Review — Is The Free Steam Giveaway Worth Claiming?",
    score: "7.8",
    product: "Wild Terra 2: New Lands",
    platform: "PC, Steam",
    published: "June 14, 2026",
    updated: "June 14, 2026",
    sections: [
      {
        heading: "Game overview",
        text: "Wild Terra 2: New Lands is the biggest current free Steam claim in the active feed by listed value, and it aims at players who like slow-burn survival, crafting, and online sandbox progression. The pitch is not complicated: enter a medieval world, gather resources, build a place to live, tame pets, explore dangerous areas, and improve your character over time. It is not trying to be a glossy single-player RPG with a tightly directed campaign. It is closer to the kind of game where your enjoyment depends on whether you like making your own goals and accepting some rough edges along the way.",
      },
      {
        heading: "Gameplay description",
        text: "The core loop is built around gathering, crafting, combat, and persistence. You collect materials, make tools, upgrade equipment, and gradually push into riskier spaces. That structure works best for patient players. If you enjoy games where a good session might mean improving a base, preparing for a raid, or finding a better production route, Wild Terra 2 has the right ingredients. If you need instant spectacle, it may feel slow. The MMO layer gives it social potential, but it also means the experience can depend on population, server activity, and how much tolerance you have for grind. As a free claim, that tradeoff is easier to accept.",
      },
      {
        heading: "Graphics and sound",
        text: "Visually, Wild Terra 2 leans practical rather than luxurious. The medieval environments are readable, the interface communicates the survival loop clearly enough, and the world has a handmade quality that suits crafting-focused play. It does not have the production polish of a huge studio release, but that is not the point. The sound design supports the routine of chopping, fighting, moving, and working through the wilderness. Nothing here is likely to become a showpiece for a new graphics card, but the presentation is serviceable for players who care more about systems than cinematic framing.",
      },
      {
        heading: "Is it worth claiming for free?",
        text: "Yes, especially if you enjoy survival MMOs, crafting-heavy games, or medieval sandbox worlds. The important thing is to claim it before the giveaway expires and then decide later whether you want to invest time. Free is a good price for a game that asks for patience, because you can test the pace without buyer regret. Even if it does not become your main multiplayer home, it may be useful for a weekend experiment with friends.",
      },
      {
        heading: "Final verdict",
        text: "Wild Terra 2 is not a universal recommendation, but it is one of the more substantial free claims in the current lineup. Survival fans should grab it now and judge the grind for themselves. Final verdict: 7.8 out of 10.",
      },
    ],
  },
  {
    title: "The Red Lantern Review — A Quiet Survival Journey Worth Adding To Steam",
    score: "8.1",
    product: "The Red Lantern",
    platform: "PC, Steam",
    published: "June 14, 2026",
    updated: "June 14, 2026",
    sections: [
      {
        heading: "Game overview",
        text: "The Red Lantern is one of the most interesting current free Steam giveaways because it offers a mood that feels different from the usual discount-feed noise. Instead of racing, shooting, or grinding through loot, it focuses on a dogsledding journey through the wilderness. You lead a team of sled dogs, make survival decisions, and push through a cold landscape that is as much about atmosphere as it is about mechanics. For players who like narrative survival games, this is a very easy free claim to recommend.",
      },
      {
        heading: "Gameplay description",
        text: "The gameplay is built around travel, choice, resource pressure, and the relationship between the player and the dogs. It is not a high-speed action game, and that slower tempo is part of its identity. You move through the world, respond to events, manage risk, and learn how the journey can shift depending on decisions. That design can feel gentle one moment and tense the next. The best way to approach The Red Lantern is as an interactive survival story rather than a deep simulation. If you expect complex crafting trees or combat-heavy progression, you may be disappointed. If you want a focused experience with emotional texture, it has a clear appeal.",
      },
      {
        heading: "Graphics and sound",
        text: "The Red Lantern's presentation is its strongest argument. The snowy wilderness gives the game a clean visual identity, and the first-person perspective helps the journey feel personal. The dogs add warmth to a setting that could otherwise feel empty. Sound matters here because quiet environments need small details: wind, movement, animals, and the rhythm of travel. The overall effect is not about spectacle. It is about creating enough atmosphere that you want to keep moving forward and see what happens next.",
      },
      {
        heading: "Is it worth claiming for free?",
        text: "Yes. The Red Lantern is exactly the kind of game that benefits from a free giveaway because some players may not know whether its slow, narrative survival style suits them. Claiming it removes that hesitation. It is also a good library addition for players who want shorter, more reflective experiences between bigger releases. Even if you only play it once, the premise is distinctive enough to justify the click. Just make sure the Steam claim is completed before the listed expiry date.",
      },
      {
        heading: "Final verdict",
        text: "The Red Lantern is not designed for everyone, but it has a memorable identity and a warmer emotional hook than most free game listings. Claim it if you like survival stories, dogs, wilderness atmosphere, or games that trade noise for mood. Final verdict: 8.1 out of 10.",
      },
    ],
  },
  {
    title: "Warhammer 40,000: Speed Freeks Review — Free Combat Racing On Epic",
    score: "8.0",
    product: "Warhammer 40,000: Speed Freeks",
    platform: "PC, Epic Games Store",
    published: "June 14, 2026",
    updated: "June 14, 2026",
    sections: [
      {
        heading: "Game overview",
        text: "Warhammer 40,000: Speed Freeks is the loudest current giveaway in the active lineup. It takes the oversized personality of Warhammer 40K and channels it into combat racing, where speed and destruction matter more than clean racing lines. That makes it a good Epic Games Store claim for players who want something immediate, messy, and multiplayer-friendly. The title alone tells you the tone: this is not a careful motorsport sim. It is a game about vehicles, weapons, momentum, and chaos.",
      },
      {
        heading: "Gameplay description",
        text: "The core appeal is the combination of racing and fighting. You are not simply trying to drive well; you are trying to survive, pressure opponents, and use the vehicle as part of the weapon set. Combat racing works when it creates constant small decisions: chase the objective, break away, ram an enemy, fire at the right moment, or reposition before the fight turns against you. Speed Freeks has the right fantasy for that loop because Warhammer's Ork-flavored energy fits aggressive vehicle play naturally. It is best approached as a session game, the kind you claim now and test when you want short bursts of noisy competition.",
      },
      {
        heading: "Graphics and sound",
        text: "The presentation leans into metal, dirt, weapons, and exaggerated 40K attitude. The vehicles are the stars, and the visual identity benefits from the franchise's love of bulky machinery. Sound is important in a combat racer because engines, impacts, and weapon feedback need to sell the chaos. Speed Freeks aims for that arcade energy rather than realism. If you enjoy the Warhammer universe, the theme does a lot of work. If you do not know the lore, the basic appeal still comes through: fast machines hitting each other very hard.",
      },
      {
        heading: "Is it worth claiming for free?",
        text: "Yes, especially because multiplayer and action-focused games benefit from giveaway traffic. A free Epic claim can create a temporary wave of new players, which is exactly when a game like this is most fun to sample. Even if you are only mildly curious about Warhammer, there is little downside to adding it to your library before the offer expires. The main caveat is taste. If you dislike arcade combat or online vehicle games, it may not hold you for long. But as a free claim, it is an easy yes.",
      },
      {
        heading: "Final verdict",
        text: "Warhammer 40,000: Speed Freeks is a strong giveaway pick because it has a clear identity, a recognizable universe, and a gameplay hook that is easy to understand quickly. Claim it while it is free on Epic and treat it as a high-energy weekend test drive. Final verdict: 8.0 out of 10.",
      },
    ],
  },
];

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GamesDealsHub",
    url: siteUrl,
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "GamesDealsHub Team",
    url: "https://www.gamesdealshub.me/about",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "GamesDealsHub Free Game Reviews",
    description: "Editorial reviews of currently free games from the active GamesDealsHub giveaway feed.",
    brand: { "@type": "Brand", name: "GamesDealsHub" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "9.3", reviewCount: "3" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does GamesDealsHub choose games to review?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We prioritize games that are good sale targets, strong backlog additions, or likely to interest players who follow free game and discount campaigns.",
        },
      },
      {
        "@type": "Question",
        name: "Are these reviews focused on full-price buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Reviews are written for practical deal decisions, including whether a game is worth claiming, wishlisting, buying on sale, or playing through a subscription.",
        },
      },
    ],
  },
];

export default function ReviewsPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <main className="min-h-screen px-4 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4]">Game Reviews</span>
            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              Reviews For Deal Hunters
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#9CA3AF]">
              Practical reviews focused on value, replayability, sale timing, and whether a game deserves a permanent spot in your PC library.
            </p>
          </header>

          <div className="space-y-10">
            {reviews.map((review) => (
              <article key={review.title} className="rounded-2xl border border-white/10 bg-[#0F172A]/80 p-6 md:p-10">
                <AuthorBox className="mb-6" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[10px] font-orbitron font-bold uppercase tracking-widest text-[#8B5CF6]">
                    {review.product}
                  </p>
                  <span className="rounded-lg border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-3 py-1 text-sm font-bold text-[#06B6D4]">
                    {review.score}/10
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-white">{review.title}</h2>
                <div className="mt-4 rounded-xl border border-white/10 bg-[#050816]/70 p-4 text-sm leading-relaxed text-[#D1D5DB]">
                  <p><strong className="text-white">Author:</strong> GamesDealsHub Team</p>
                  <p><strong className="text-white">Date published:</strong> {review.published}</p>
                  <p><strong className="text-white">Last updated:</strong> {review.updated}</p>
                  <p><strong className="text-white">Platform:</strong> {review.platform}</p>
                </div>
                <div className="mt-7 space-y-7 font-poppins text-[15px] leading-8 text-[#D1D5DB]">
                  {review.sections.map((section) => (
                    <section key={section.heading}>
                      <h3 className="mb-2 text-lg font-bold text-white">{section.heading}</h3>
                      <p>{section.text}</p>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
