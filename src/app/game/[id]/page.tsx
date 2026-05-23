"use client";

import { useEffect, useState } from "react";
import { GameDetail } from "../../../components/GameDetail";
import { type GameDeal } from "../../../types";

export default function GamePage() {
  const [deals, setDeals] = useState<GameDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const [resGames, resUpcoming, dbRes, premiumRes] = await Promise.all([
          fetch("/api/giveaways-feed?type=game").catch(() => null),
          fetch("/api/upcoming-free-games").catch(() => null),
          fetch("/api/dlc-feed").catch(() => null),
          fetch("/api/premium-feed").catch(() => null)
        ]);

        let allDeals: GameDeal[] = [];

        if (resGames && resGames.ok) {
           const games = await resGames.json();
           allDeals = [...allDeals, ...games];
        }
        
        if (resUpcoming && resUpcoming.ok) {
           const upcoming = await resUpcoming.json();
           allDeals = [...allDeals, ...upcoming];
        }

        if (dbRes && dbRes.ok) {
           const dlc = await dbRes.json();
           allDeals = [...allDeals, ...dlc];
        }
        
        if (premiumRes && premiumRes.ok) {
           let csData = await premiumRes.json();
           const csDeals: GameDeal[] = csData.map((cs: any) => ({
              id: "cs_" + cs.dealID,
              title: cs.title,
              description: "Premium Deal on " + (cs.storeName || "Store"),
              instructions: "Get it on " + (cs.storeName || "Store"),
              url: cs.dealID ? "https://www.cheapshark.com/redirect?dealID=" + cs.dealID : "",
              image: cs.thumb || "",
              type: "Discount",
              platforms: "PC",
              users: 0,
              status: "Active",
              savings: cs.savings,
              salePrice: cs.salePrice,
              normalPrice: cs.normalPrice,
              dealRating: cs.dealRating,
              steamRatingText: cs.steamRatingText,
              steamRatingPercent: cs.steamRatingPercent,
              steamRatingCount: cs.steamRatingCount,
              storeName: cs.storeName,
              steamAppID: cs.steamAppID,
           }));
           allDeals = [...allDeals, ...csDeals];
        }

        setDeals(allDeals);
      } catch (err) {
        console.error("Failed to fetch deals for GameDetail:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  return <GameDetail deals={deals} isLoading={loading} />;
}
