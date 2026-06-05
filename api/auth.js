/**
 * Decap CMS GitHub OAuth — Vercel Edge Function
 * Uses GitHub OAuth App to authenticate users via their own GitHub account
 */
export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Debug: log request info
  console.log('Auth request:', req.method, req.url);

  let code, code_verifier;

  try {
    if (req.method === 'GET') {
      const urlStr = req.url.startsWith('/') ? 'https://placeholder' + req.url : req.url;
      const url = new URL(urlStr);
      code = url.searchParams.get('code');
      code_verifier = url.searchParams.get('code_verifier');
    } else if (req.method === 'POST') {
      const body = await req.json();
      code = body.code;
      code_verifier = body.code_verifier;
    } else {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }
  } catch (e) {
    return Response.json({ error: 'Failed to parse request: ' + e.message }, { status: 400, headers: corsHeaders });
  }

  if (!code) {
    return Response.json({ error: 'Missing authorization code. Request body must contain {code: "..."} ' }, { status: 400, headers: corsHeaders });
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json({ error: 'OAuth credentials not configured on server' }, { status: 500, headers: corsHeaders });
  }

  const params = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, code });
  if (code_verifier) params.append('code_verifier', code_verifier);

  const ghRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await ghRes.json();

  if (data.error) {
    return Response.json({ error: data.error_description || data.error }, { status: 400, headers: corsHeaders });
  }

  if (!data.access_token) {
    return Response.json({ error: 'No access token in GitHub response', details: data }, { status: 500, headers: corsHeaders });
  }

  return Response.json({ token: data.access_token, provider: 'github' }, { status: 200, headers: corsHeaders });
}

export const config = { runtime: 'edge' };
