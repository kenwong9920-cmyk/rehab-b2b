/**
 * Decap CMS GitHub OAuth Callback — Vercel Serverless Function
 * POST /api/auth — exchange GitHub temp code for access token
 */
export default async function handler(req: any) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }, status: 204 });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { code, redirect_uri } = await req.json();
    if (!code) return new Response('Missing code', { status: 400 });

    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID || '',
      client_secret: process.env.OAUTH_CLIENT_SECRET || '',
      code,
      redirect_uri: redirect_uri || 'https://www.jdrehab.com/admin/',
    });

    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json() as any;

    if (data.error) {
      return Response.json({ error: data.error_description || data.error }, { status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return Response.json({ token: data.access_token, provider: 'github' }, {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}

export const config = { runtime: 'edge' };
