"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Activity, ChevronRight, Crosshair, Gamepad2, Mail, Radar, ShieldCheck, Target } from "lucide-react";
import { LegalLayout } from "@/components/LegalLayout";

const sections = [
  {
    title: "Our story",
    icon: <Gamepad2 className="h-5 w-5 text-[#06B6D4]" />,
    paragraphs: [
      "GamesDealsHub started from a very ordinary problem: good free games are easy to miss. One week a title is free on Epic, the next a Steam promotion appears for only a day, and somewhere else an indie developer quietly posts a DRM-free giveaway that never reaches a big social feed. We built this site because we wanted one calm place to check before a claim window closed. No hype wall, no fake countdowns, and no confusing mix of expired offers pretending to be active.",
      "The site is run by the GamesDealsHub Team, a small group of gaming deal hunters who care about practical value. We like the feeling of adding a genuinely good game to a library without spending money, but we also know that time matters. A free game is only useful if the link works, the offer is still live, and the page explains what you are claiming. That is the basic promise behind every update we make.",
    ],
  },
  {
    title: "Our mission",
    icon: <Target className="h-5 w-5 text-[#8B5CF6]" />,
    paragraphs: [
      "Our mission is to help players build better PC game libraries while spending less money and wasting less time. We focus on free-to-keep games, official giveaways, limited-time store promotions, and clear tracking information. We also write guides and reviews because a deal feed alone is not enough. Players deserve context: what kind of game it is, who might enjoy it, how long the offer lasts, and whether it is worth claiming before the deadline.",
      "We want GamesDealsHub to be useful for every kind of player: students on budget laptops, parents managing family accounts, collectors building a backlog, Steam Deck owners checking platform options, and anyone who simply enjoys discovering a new game without risk. Saving money should not require opening nine tabs every morning.",
    ],
  },
  {
    title: "What makes us different",
    icon: <ShieldCheck className="h-5 w-5 text-[#22C55E]" />,
    paragraphs: [
      "We are not trying to list every free thing on the internet. That would make the site noisy and less trustworthy. Instead, we prioritize offers that players can actually use: real game giveaways, official store claims, free-to-keep promotions, and clearly labeled limited offers. We separate active deals from expired ones, show expiry signals where available, and avoid sending users through suspicious download pages or unofficial resellers.",
      "We also care about plain language. If a game is free on Steam, we say that. If it is an Epic Games Store claim, we say that. If a mobile app is required, we say that too. The goal is not to make every offer sound bigger than it is. The goal is to help you make a quick, informed decision before the promotion ends.",
    ],
  },
  {
    title: "How our tracking works",
    icon: <Radar className="h-5 w-5 text-[#F59E0B]" />,
    paragraphs: [
      "Our tracking process combines automated feed checks with editorial review. We monitor public giveaway data, official store signals, and platform-specific pages across Steam, Epic Games Store, GOG, Prime Gaming, Ubisoft Connect, IndieGala, itch.io, Stove, Meta, and other campaign pages when they appear. When an offer includes an end date, we compare it against current UTC time so expired deals can be removed from active lists. Offers close to ending are surfaced with urgency badges so users know what to claim first.",
      "We refresh data regularly and use caching responsibly so the site stays fast without showing stale information for too long. Some stores provide precise timestamps, while others use vague campaign language or regional availability rules. When data is uncertain, we try to keep the wording honest instead of guessing. Trust is more important than pretending every feed is perfect.",
    ],
  },
  {
    title: "Our team",
    icon: <Activity className="h-5 w-5 text-[#EC4899]" />,
    paragraphs: [
      "GamesDealsHub is written and maintained by the GamesDealsHub Team. Our work includes checking active giveaways, writing practical guides, reviewing current free games, maintaining policy pages, improving performance, and making the site easier to use on mobile devices. We are not a large media company, and that is part of the point. The voice here is meant to feel like a helpful gaming friend who checks the store pages so you do not have to.",
      "We believe good deal coverage should be honest about limitations. Sometimes a free game is only available in selected regions. Sometimes a key pool ends early. Sometimes an offer is more interesting as a curiosity than as a must-play recommendation. We would rather explain those details than chase clicks with inflated language.",
    ],
  },
  {
    title: "Contact us",
    icon: <Mail className="h-5 w-5 text-[#06B6D4]" />,
    paragraphs: [
      "If you spot a missing free game, find an expired deal still appearing as active, notice a broken link, or want to send feedback, please contact us. Reader reports are genuinely useful because store pages can change quickly and regional differences are hard to see from one location. You can reach us through the contact page, and we review messages with the same goal we bring to the feed: make the site more accurate and more helpful.",
      "GamesDealsHub is built for players who want free games without the mess. If the site helps you claim one game before it disappears, avoid one bad link, or discover one indie project you would have missed, then it is doing what we built it to do.",
    ],
  },
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
  };

  return (
    <LegalLayout
      title="About GamesDealsHub"
      subtitle="Built by gaming deal hunters for players who hate missing claim windows."
      icon={<Crosshair className="h-8 w-8" />}
      accentTheme="cyan"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.section variants={itemVariants} className="rounded-2xl border border-[#06B6D4]/25 bg-[#0F172A]/80 p-6 shadow-[0_0_30px_rgba(6,182,212,0.08)] md:p-8">
          <p className="text-lg leading-8 text-[#D1D5DB]">
            GamesDealsHub tracks free PC games, official giveaways, and useful gaming deals across 9+ platforms.
            We care about clear deadlines, safe claim paths, original guidance, and a browsing experience that helps
            players decide quickly.
          </p>
        </motion.section>

        {sections.map((section) => (
          <motion.section
            key={section.title}
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-[#050816]/70 p-6 md:p-8"
          >
            <h2 className="mb-5 flex items-center gap-3 font-orbitron text-xl font-bold uppercase tracking-widest text-white">
              {section.icon}
              {section.title}
            </h2>
            <div className="space-y-5 font-poppins text-[15px] leading-8 text-[#D1D5DB]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 80)}>{paragraph}</p>
              ))}
            </div>
          </motion.section>
        ))}

        <motion.section variants={itemVariants} className="rounded-2xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 p-6 md:p-8">
          <h2 className="font-orbitron text-xl font-bold uppercase tracking-widest text-white">GamesDealsHub Team</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#D1D5DB]">
            Gaming deal hunters since 2024, focused on free games, giveaway verification, practical reviews,
            and straightforward guides for players who want better value from their PC library.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#06B6D4]/50 bg-[#06B6D4]/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#67E8F9] transition-colors hover:bg-[#06B6D4] hover:text-[#050816]"
          >
            Contact the team
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </motion.div>
    </LegalLayout>
  );
}
