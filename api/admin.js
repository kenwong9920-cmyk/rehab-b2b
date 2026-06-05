export default async function handler(req) {
  const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS, status: 204 });

  const token = process.env.GITHUB_PAT;
  if (!token) return Response.json({ error: 'token missing' }, { status: 500, headers: CORS });

  try {
    const { action, path, content, sha, message } = await req.json();
    const base = 'https://api.github.com/repos/kenwong9920-cmyk/rehab-b2b/contents';
    const auth = 'Basic ' + btoa('x-access-token:' + token);
    const h = { 'Authorization': auth, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };

    // WRITE
    if (action === 'write') {
      const body = { message: message || 'cms: update',
        content: btoa(unescape(encodeURIComponent(content))), branch: 'master' };
      if (sha) body.sha = sha;
      const r = await fetch(base + '/' + path, { method: 'PUT', headers: h, body: JSON.stringify(body) });
      return Response.json(await r.json(), { status: r.status, headers: CORS });
    }
    // READ
    if (action === 'read') {
      const r = await fetch(base + '/' + path, { headers: h });
      const d = await r.json();
      if (d.content) d._text = decodeURIComponent(escape(atob(d.content)));
      return Response.json(d, { status: r.status, headers: CORS });
    }
    // LIST
    if (action === 'list') {
      const r = await fetch(base + '/' + path, { headers: h });
      return Response.json(await r.json(), { status: r.status, headers: CORS });
    }
    // DELETE
    if (action === 'delete') {
      const r = await fetch(base + '/' + path, {
        method: 'DELETE', headers: h,
        body: JSON.stringify({ message: message || 'cms: delete', sha, branch: 'master' }),
      });
      return Response.json(await r.json(), { status: r.status, headers: CORS });
    }
    return Response.json({ error: 'invalid action' }, { status: 400, headers: CORS });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500, headers: CORS });
  }
}
export const config = { runtime: 'edge' };
