/**
 * GitHub API Proxy — Vercel Edge Function
 * All GitHub API calls go through this proxy, which uses the PAT env var.
 * Supports: GET (read file), PUT (write file), LIST (list directory), DELETE
 */
export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders, status: 204 });

  const token = process.env.GITHUB_PAT;
  if (!token) return Response.json({ error: 'Not configured' }, { status: 500, headers: corsHeaders });

  try {
    const body = await req.json();
    const { path, content, message, sha } = body;
    const method = body._method || req.method;
    const baseUrl = 'https://api.github.com/repos/kenwong9920-cmyk/rehab-b2b/contents';
    const auth = 'Basic ' + btoa('x-access-token:' + token);
    const headers = { 'Authorization': auth, 'Accept': 'application/vnd.github.v3+json' };

    if (method === 'LIST') {
      const r = await fetch(baseUrl + '/' + path, { headers });
      const data = await r.json();
      return Response.json(data, { status: r.status, headers: corsHeaders });
    }

    if (method === 'DELETE') {
      const r = await fetch(baseUrl + '/' + path, {
        method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message || 'cms: delete', sha, branch: 'master' }),
      });
      const data = await r.json();
      return Response.json(data, { status: r.status, headers: corsHeaders });
    }

    if (method === 'PUT') {
      const body_ = {
        message: message || 'cms: update',
        content: btoa(unescape(encodeURIComponent(content))),
        branch: 'master',
      };
      if (sha) body_.sha = sha;
      const r = await fetch(baseUrl + '/' + path, {
        method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body_),
      });
      const data = await r.json();
      return Response.json(data, { status: r.status, headers: corsHeaders });
    }

    // GET: read file
    const r = await fetch(baseUrl + '/' + path, { headers });
    const data = await r.json();
    return Response.json(data, { status: r.status, headers: corsHeaders });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: corsHeaders });
  }
}
export const config = { runtime: 'edge' };
