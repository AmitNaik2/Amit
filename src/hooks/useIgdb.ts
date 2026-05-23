import { useState, useEffect } from 'react';

export function useIgdb(title: string) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!title) return;
    
    let isMounted = true;
    
    // First try IGDB
    fetch(`/api/igdb?title=${encodeURIComponent(title)}`)
      .then(async res => {
          const text = await res.text();
          try { return JSON.parse(text); } catch { return null; }
      })
      .then(async json => {
        if (!isMounted) return;
        if (json && !json.not_found && !json.error) {
           // If IGDB is missing developer/publisher info, supplement with RAWG
           if (!json.involved_companies || json.involved_companies.length === 0) {
              try {
                 const rawgRes = await fetch(`/api/rawg?title=${encodeURIComponent(title)}`);
                 if (rawgRes.ok) {
                    const rawgJson = await rawgRes.json();
                    if (rawgJson && !rawgJson.error && !rawgJson.not_found) {
                       json.developers = rawgJson.developers;
                       json.publishers = rawgJson.publishers;
                    }
                 }
              } catch (e) {}
           }
           if (isMounted) setData(json);
        } else {
           // Fallback to RAWG if IGDB didn't find it or no keys configured
           try {
              const rawgRes = await fetch(`/api/rawg?title=${encodeURIComponent(title)}`);
              if (rawgRes.ok) {
                  const rawgJson = await rawgRes.json();
                  if (rawgJson && !rawgJson.not_found && !rawgJson.error && isMounted) {
                     setData(rawgJson);
                  }
              }
           } catch(e) {}
        }
      })
      .catch(err => {
         // Silently fail on network/adblocker errors
      });

    return () => { isMounted = false; };
  }, [title]);

  return data;
}
