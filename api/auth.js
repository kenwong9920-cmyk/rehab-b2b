/**
 * Decap CMS GitHub OAuth Callback — Vercel Edge Function
 * Handles both GET (GitHub callback) and POST (Decap internal proxy)
 */
export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  let code, redirect_uri, code_verifier;

  if (req.method === 'GET') {
    // Vercel Edge Function: URL might be relative, add base if needed
    let urlStr = req.url;
    if (urlStr.startsWith('/')) {
      urlStr = 'https://www.jdrehab.com' + urlStr;
    }
    const url = new URL(urlStr);
    code = url.searchParams.get('code');
    redirect_uri = url.searchParams.get('redirect_uri') || 'https://www.jdrehab.com/admin/';
    code_verifier = url.searchParams.get('code_verifier');
  } else if (req.method === 'POST') {
    try {
      const body = await req.json();
      code = body.code;
      redirect_uri = body.redirect_uri || 'https://www.jdrehab.com/admin/';
      code_verifier = body.code_verifier;
    } catch (e) {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
    }
  } else {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  if (!code) {
    return Response.json({ error: 'Missing authorization code' }, { status: 400, headers: corsHeaders });
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json({ error: 'OAuth not configured' }, { status: 500, headers: corsHeaders });
  }

  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirect_uri,
    });
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

    return Response.json({
      token: data.access_token,
      provider: 'github',
    }, { status: 200, headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}

export const config = { runtime: 'edge' };
