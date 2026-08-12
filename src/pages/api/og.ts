import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Akanksha | Production AI Engineer';
  const subtitle = url.searchParams.get('subtitle') || 'Enterprise RAG, Autonomous Agents & System Architecture';

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e17" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />

  <circle cx="1000" cy="150" r="220" fill="#00e5b0" opacity="0.12" filter="url(#glow)" />
  <circle cx="200" cy="500" r="250" fill="#f59e0b" opacity="0.08" filter="url(#glow)" />

  <rect x="60" y="60" width="1080" height="510" rx="24" fill="#0f172a" fill-opacity="0.5" stroke="#1e293b" stroke-width="2" />

  <text x="120" y="160" font-family="system-ui, sans-serif" font-weight="700" font-size="24" fill="#00e5b0" letter-spacing="3">
    AKANKSHA.DEV
  </text>

  <text x="120" y="270" font-family="system-ui, sans-serif" font-weight="800" font-size="44" fill="#f8fafc">
    ${escapeXml(title)}
  </text>

  <text x="120" y="340" font-family="system-ui, sans-serif" font-weight="500" font-size="22" fill="#94a3b8">
    ${escapeXml(subtitle)}
  </text>

  <line x1="120" y1="420" x2="1080" y2="420" stroke="#1e293b" stroke-width="2" />

  <text x="120" y="480" font-family="system-ui, sans-serif" font-weight="600" font-size="20" fill="#f8fafc">
    Akanksha — Production AI Engineer @ Samsung SDS
  </text>
  <text x="120" y="515" font-family="system-ui, sans-serif" font-weight="400" font-size="18" fill="#64748b">
    Enterprise RAG · Agentic AI · LLM Infrastructure · Speaker
  </text>
</svg>
`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
