// C:/Users/Amit/antigravity/gamesdealshub-next/src/app/robots.ts
import { MetadataRoute } from 'next';

// Fix 7: Auto-generated robots.txt with sitemap reference
export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://www.gamesdealshub.me';
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
