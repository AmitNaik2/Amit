import ClientHome from "./ClientHome";
import { type GameDeal } from "../types";

async function getGames(): Promise<GameDeal[]> {
  try {
    const res = await fetch("https://www.gamerpower.com/api/giveaways?type=game&sort-by=date", { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getUpcoming(): Promise<GameDeal[]> {
  try {
    const epicUrl = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US";
    const res = await fetch(epicUrl, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    const elements = data?.data?.Catalog?.searchStore?.elements || [];
    
    const upcoming = elements.filter((el: any) => 
      el.promotions && 
      el.promotions.upcomingPromotionalOffers && 
      el.promotions.upcomingPromotionalOffers.length > 0
    );

    return upcoming.map((item: any) => {
      const promo = item.promotions.upcomingPromotionalOffers[0].promotionalOffers[0];
      const imageObj = item.keyImages.find((img: any) => img.type === "OfferImageWide") || 
                       item.keyImages.find((img: any) => img.type === "Thumbnail") || 
                       item.keyImages[0];
      const imageUrl = imageObj ? imageObj.url : "";

      return {
        id: item.id || String(Math.random()),
        title: item.title,
        description: item.description,
        thumbnail: imageUrl,
        image: imageUrl,
        platforms: "Epic Games Stores",
        type: "Upcoming Free Game",
        worth: "N/A",
        status: "upcoming",
        start_date: promo.startDate,
        end_date: promo.endDate,
        open_giveaway_url: `https://store.epicgames.com/p/${item.productSlug || item.urlSlug || item.title.toLowerCase().replace(/\s+/g, '-')}`,
        users: 0,
      };
    });
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const [games, upcoming] = await Promise.all([getGames(), getUpcoming()]);
  return <ClientHome initialDeals={games} initialUpcomingDeals={upcoming} />;
}
