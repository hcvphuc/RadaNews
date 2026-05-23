import type { GeneratedArticleDraft, SourceNote } from "../types/schema.ts";

const DIRECT_MEDIA_RE = /\.(?:png|jpe?g|webp|gif|mp4|webm|mov)(?:[?#]|$)/i;
const TRUSTED_MEDIA_HOSTS = [
  "cdn.sanity.io",
  "storage.googleapis.com",
  "lh3.googleusercontent.com",
  "yt3.googleusercontent.com",
  "i.ytimg.com",
  "i.redd.it",
  "preview.redd.it",
  "external-preview.redd.it",
  "b.thumbs.redditmedia.com",
  "d.thumbs.redditmedia.com",
  "d3phaj0sisr2ct.cloudfront.net",
  "v16-kling.klingai.com",
  "runwayml.com",
  "bfl.ai",
  "replicate.com",
  "substackcdn.com",
  "ptht05hbb1ssoooe.public.blob.vercel-storage.com",
];

export function sanitizeGeneratedMedia<T extends Partial<GeneratedArticleDraft>>(draft: T, notes: SourceNote[]): T {
  const sourceUrls = notes.map((note) => normalizeUrl(note.url)).filter(Boolean);
  const clone = JSON.parse(JSON.stringify(draft)) as T;
  sanitizeValue(clone, sourceUrls);
  return clone;
}

function sanitizeValue(value: unknown, sourceUrls: string[]) {
  if (Array.isArray(value)) {
    for (const item of value) sanitizeValue(item, sourceUrls);
    return;
  }
  if (!value || typeof value !== "object") return;

  const obj = value as Record<string, unknown>;
  const src = typeof obj.src === "string" ? obj.src.trim() : "";
  if (src && !isSafeDirectMediaUrl(src, sourceUrls)) {
    // The model often copies source page URLs (or invents dead Unsplash URLs) into media.src.
    // Keep alt/caption/credit, but remove src so sync-articles can attach real crawled media.
    delete obj.src;
  }

  for (const key in obj) sanitizeValue(obj[key], sourceUrls);
}

function isSafeDirectMediaUrl(raw: string, sourceUrls: string[]) {
  const url = normalizeUrl(raw);
  if (!url) return false;
  if (sourceUrls.indexOf(url) !== -1) return false;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const trusted = TRUSTED_MEDIA_HOSTS.some((name) => host === name || host.slice(-name.length - 1) === `.${name}`);
    if (trusted) return true;
    // Only accept generic direct media URLs from hosts that are not known article-page domains.
    // Example failure seen in production: simonwillison.net/static/images/...jpg returns 404.
    if (host === "simonwillison.net" || host.slice(-19) === ".simonwillison.net") return false;
    return DIRECT_MEDIA_RE.test(parsed.pathname + parsed.search);
  } catch {
    return false;
  }
}

function normalizeUrl(raw: string) {
  return raw.split("&amp;").join("&").replace(/\/$/, "").trim();
}
