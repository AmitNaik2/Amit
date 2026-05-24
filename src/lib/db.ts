import { Redis } from '@upstash/redis';

// Initialize Redis from environment variables
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
let redis: Redis | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
  }
} catch (error) {
  console.warn("Failed to initialize Upstash Redis. Make sure environment variables are set.");
}

const SUBSCRIBERS_KEY = 'gamedeals:subscribers';
const NOTIFIED_GAMES_KEY = 'gamedeals:notified_games';

/**
 * Add a new email to the subscriber list
 */
export async function addSubscriber(email: string): Promise<boolean> {
  if (!redis) {
    console.warn("Redis is not configured. Cannot save subscriber.");
    return false;
  }
  
  try {
    await redis.sadd(SUBSCRIBERS_KEY, email);
    return true;
  } catch (error) {
    console.error("Error saving subscriber to DB:", error);
    return false;
  }
}

/**
 * Get all subscribed emails
 */
export async function getAllSubscribers(): Promise<string[]> {
  if (!redis) return [];
  
  try {
    const subscribers = await redis.smembers(SUBSCRIBERS_KEY);
    return subscribers || [];
  } catch (error) {
    console.error("Error retrieving subscribers:", error);
    return [];
  }
}

/**
 * Check if a game has already been notified.
 * If not, it adds it to the notified list and returns true (meaning it's new).
 * If yes, it returns false.
 */
export async function isNewGameAndMarkNotified(gameId: string | number): Promise<boolean> {
  if (!redis) return false;
  
  try {
    // SADD returns 1 if the element was added, 0 if it already existed
    const added = await redis.sadd(NOTIFIED_GAMES_KEY, gameId.toString());
    return added === 1;
  } catch (error) {
    console.error("Error tracking notified game:", error);
    return false;
  }
}
