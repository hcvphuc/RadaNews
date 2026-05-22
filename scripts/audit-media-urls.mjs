import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'apps/web/src/data/articles-generated.ts',
  'apps/web/public/data/agent/runtime/article-drafts.jsonl',
  'content/exports/runtime/article-drafts.jsonl'
].filter(f => fs.existsSync(path.join(root, f)));

const urls = new Set();
for (const f of files) {
  const s = fs.readFileSync(path.join(root, f), 'utf8');
  for (const m of s.matchAll(/(?:src|imageUrl|thumbnail|heroMedia)"?\s*[:=]\s*"(https?:[^"\\]+)"/g)) urls.add(m[1].replaceAll('&amp;', '&'));
  for (const m of s.matchAll(/<img[^>]+src="(https?:[^"]+)"/g)) urls.add(m[1].replaceAll('&amp;', '&'));
  for (const m of s.matchAll(/<video[^>]+src="(https?:[^"]+)"/g)) urls.add(m[1].replaceAll('&amp;', '&'));
}
if (fs.existsSync(path.join(root, 'apps/web/dist'))) {
  const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(d => {
    const p = path.join(dir, d.name); return d.isDirectory() ? walk(p) : [p];
  });
  for (const f of walk(path.join(root, 'apps/web/dist')).filter(x => x.endsWith('.html'))) {
    const s = fs.readFileSync(f, 'utf8');
    for (const m of s.matchAll(/<(?:img|video)[^>]+src="(https?:[^"]+)"/g)) urls.add(m[1].replaceAll('&amp;', '&'));
    for (const m of s.matchAll(/property="og:image" content="(https?:[^"]+)"/g)) urls.add(m[1].replaceAll('&amp;', '&'));
  }
}

let bad = 0;
for (const url of urls) {
  try {
    const res = await fetch(url, {method:'HEAD', redirect:'follow', signal:AbortSignal.timeout(12000), headers:{'user-agent':'Mozilla/5.0'}});
    const ct = res.headers.get('content-type') || '';
    const ok = res.status === 200 && /^(image|video)\//.test(ct);
    console.log(`${ok?'OK':'FAIL'} ${res.status} ${ct} ${url}`);
    if (!ok) bad++;
  } catch (e) { console.log(`FAIL ERR ${e?.message} ${url}`); bad++; }
}
if (bad) { console.error(`Media audit failed: ${bad}/${urls.size}`); process.exit(1); }
console.log(`Media audit passed: ${urls.size} URLs`);
