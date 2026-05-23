import { GameDeal } from "../types";

// Base API URL
const BASE_URL = "https://www.gamerpower.com/api";

/**
 * Fetches all active giveaways from GamerPower.
 * Utilizes Next.js native fetch caching for ISR with a 1-hour revalidation.
 */
export async function getActiveGames(): Promise<GameDeal[]> {
  try {
    const res = await fetch(`${BASE_URL}/giveaways?type=game&sort-by=date`, {
      next: { revalidate: 3600 } // 1 hour ISR caching
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch active games: ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    
    return data.map((deal: any) => formatDeal(deal));
  } catch (error) {
    console.error("Error fetching GamerPower deals:", error);
    return [];
  }
}

/**
 * Fetches a specific giveaway by ID from GamerPower.
 */
export async function getGameDealById(id: string | number): Promise<GameDeal | null> {
  try {
    // If it's prefixed with gp_, remove it
    const cleanId = String(id).replace("gp_", "");
    const res = await fetch(`${BASE_URL}/giveaway?id=${cleanId}`, {
      next: { revalidate: 3600 } // 1 hour ISR caching
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    if (data.status === "Error") return null;
    
    return formatDeal(data);
  } catch (error) {
    console.error(`Error fetching deal ${id}:`, error);
    return null;
  }
}

/**
 * Parses original price from strings like "$19.99" to a number for sorting.
 */
export function parseEstimatedValue(worth: string): number {
  if (!worth || worth === "N/A" || worth === "Free") return 0;
  return parseFloat(worth.replace(/[^0-9.]/g, "")) || 0;
}

/**
 * Calculates remaining milliseconds until the deal expires.
 */
export function getUrgencyMs(endDate: string): number {
  if (!endDate || endDate === "N/A") return Infinity; // No expiration means least urgent
  const expiryTime = new Date(endDate).getTime();
  const now = new Date().getTime();
  return expiryTime - now;
}

/**
 * Normalizes the raw API response into our internal GameDeal type.
 */
function formatDeal(deal: any): GameDeal {
  return {
    ...deal,
    id: `gp_${deal.id}`, // Prefix with gp_ to avoid ID collisions if integrating other APIs
    worth: deal.worth || "N/A",
    thumbnail: deal.thumbnail || deal.image || "",
    image: deal.image || deal.thumbnail || "",
    open_giveaway_url: deal.open_giveaway_url || deal.gamerpower_url || "",
    end_date: deal.end_date || "N/A"
  };
}
