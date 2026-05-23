import ClientHome from "./ClientHome";
import Script from "next/script";

async function getActiveGames() {
  try {
    const res = await fetch('https://www.gamerpower.com/api/giveaways?type=game&sort-by=date', { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

async function getUpcomingGames() {
  try {
    const epicUrl = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US";
    const res = await fetch(epicUrl, { next: { revalidate: 3600 } });
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
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: imageObj ? imageObj.url : "",
        startDate: promo.startDate,
        endDate: promo.endDate,
        originalPrice: item.price?.totalPrice?.fmtPrice?.originalPrice || "Paid"
      };
    });
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  // SSR Data Fetching
  const [activeGames, upcomingGames] = await Promise.all([
    getActiveGames(),
    getUpcomingGames()
  ]);

  // Generate ItemList + Offer Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": activeGames.slice(0, 10).map((game: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": game.title,
        "description": game.description,
        "image": game.image,
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": game.open_giveaway_url || game.gamerpower_url
        }
      }
    }))
  };

  return (
    <>
      <Script
        id="item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ClientHome initialActiveGames={activeGames} initialUpcomingGames={upcomingGames} />
    </>
  );
}
