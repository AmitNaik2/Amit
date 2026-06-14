import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract params
    const title = searchParams.get('title') || 'Free Game on GamesDealsHub';
    const platform = searchParams.get('platform') || 'PC Gaming';
    const expiry = searchParams.get('expiry') || 'Updated Daily';
    const image = searchParams.get('image');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            backgroundColor: '#050816',
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 18% 20%, rgba(6,182,212,0.32), transparent 32%), radial-gradient(circle at 78% 22%, rgba(139,92,246,0.34), transparent 30%), linear-gradient(135deg, #050816 0%, #0f172a 45%, #111827 100%)',
            }}
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: image
                ? 'linear-gradient(to top, rgba(5, 8, 22, 0.98) 0%, rgba(5, 8, 22, 0.72) 48%, rgba(5, 8, 22, 0.42) 100%)'
                : 'linear-gradient(145deg, rgba(5, 8, 22, 0.94) 0%, rgba(15, 23, 42, 0.88) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 36,
              border: '2px solid rgba(6,182,212,0.24)',
              boxShadow: '0 0 80px rgba(139,92,246,0.24)',
            }}
          />
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '60px',
              position: 'relative',
              zIndex: 10,
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: '#f8fafc',
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 26,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050816',
                }}
              >
                G
              </div>
              GamesDealsHub
            </div>
            {/* Badges Row */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div
                style={{
                  background: 'rgba(6,182,212,0.16)',
                  border: '2px solid rgba(6,182,212,0.55)',
                  color: '#67e8f9',
                  padding: '8px 24px',
                  borderRadius: '10px',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                {platform}
              </div>
              <div
                style={{
                  background: 'rgba(239,68,68,0.18)',
                  border: '2px solid rgba(239,68,68,0.55)',
                  color: '#fecaca',
                  padding: '8px 24px',
                  borderRadius: '10px',
                  fontSize: 24,
                  fontWeight: 'bold',
                  display: 'flex',
                }}
              >
                {expiry}
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: 'white',
                margin: 0,
                lineHeight: 1.1,
                maxWidth: 980,
                textShadow: '0 4px 22px rgba(0,0,0,0.65)',
              }}
            >
              {title}
            </h1>
            
            {/* Branding */}
            <div style={{ color: '#94a3b8', fontSize: 30, marginTop: '24px', fontWeight: 700 }}>
              Free PC games, giveaways, reviews, and deal intelligence.
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
