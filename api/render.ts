import { loadSsrTemplate, resolveSsrContext } from "../lib/ssr-handler";
import { renderHtml } from "../lib/ssr-html";

export const config = {
  maxDuration: 30,
};

export default async function handler(req: { url?: string }, res: {
  status: (code: number) => { send: (body: string) => void };
  setHeader: (name: string, value: string) => void;
}) {
  const template = loadSsrTemplate();
  if (!template) {
    return res
      .status(500)
      .send("SSR template missing. Ensure npm run build ran postbuild (ssr-template.html).");
  }

  const rawUrl = req.url || "/";
  const pathName = rawUrl.split("?")[0] || "/";

  try {
    const ctx = await resolveSsrContext(pathName);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).send(renderHtml(template, ctx));
  } catch (error) {
    console.error("SSR render error:", error);
    return res.status(500).send("Error rendering page.");
  }
}
