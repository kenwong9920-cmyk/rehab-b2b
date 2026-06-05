/**
 * Decap CMS GitHub OAuth Provider — Vercel Edge Function
 * Handles the complete OAuth flow:
 *   Step 1: GET /api/auth?provider=github&site_id=... → redirect to GitHub
 *   Step 2: GitHub callback → GET /api/auth?code=xxx → exchange token → redirect to CMS
 */
export default async function handler(req) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const origin = 'https://www.jdrehab.com';

  if (!clientId || !clientSecret) {
    return new Response('OAuth not configured', { status: 500 });
  }

  const url = new URL(req.url.startsWith('/') ? origin + req.url : req.url);
  const code = url.searchParams.get('code');

  // Step 2: GitHub OAuth callback — exchange code for token
  if (code) {
    try {
      const params = new URLSearchParams({
        client_id: clientId, client_secret: clientSecret, code,
      });
      const ghRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const data = await ghRes.json();

      if (data.error || !data.access_token) {
        return new Response('OAuth failed: ' + (data.error_description || 'unknown'), { status: 400 });
      }

      // Redirect back to CMS admin with token as hash fragment
      return Response.redirect(origin + '/admin/#access_token=' + data.access_token + '&token_type=bearer', 302);
    } catch (e) {
      return new Response('OAuth error: ' + e.message, { status: 500 });
    }
  }

  // Step 1: Initiate GitHub OAuth
  const provider = url.searchParams.get('provider') || 'github';
  if (provider !== 'github') {
    return new Response('Unsupported provider: ' + provider, { status: 400 });
  }

  const redirectParams = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    redirect_uri: origin + '/api/auth',
  });
  return Response.redirect('https://github.com/login/oauth/authorize?' + redirectParams.toString(), 302);
}

export const config = { runtime: 'edge' };
