/**
 * Decap CMS GitHub OAuth Callback — Vercel Serverless Function
 * Handles PKCE auth flow: exchanges code + code_verifier for access token
 */
export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { code, code_verifier } = body;

    if (!code) {
      return Response.json({ error: 'Missing authorization code' }, { status: 400, headers: corsHeaders });
    }

    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return Response.json({ error: 'OAuth not configured' }, { status: 500, headers: corsHeaders });
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    });

    if (code_verifier) {
      params.append('code_verifier', code_verifier);
    }

    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();

    if (data.error) {
      return Response.json({ error: data.error_description || data.error }, {
        status: 400, headers: corsHeaders,
      });
    }

    if (!data.access_token) {
      return Response.json({ error: 'No access token received' }, { status: 500, headers: corsHeaders });
    }

    return Response.json({
      token: data.access_token,
      provider: 'github',
    }, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (e) {
    return Response.json({ error: e.message || 'Internal error' }, {
      status: 500, headers: corsHeaders,
    });
  }
}

export const config = { runtime: 'edge' };
