import { articles as mockArticles, publishedArticles as mockPublished } from "@/data/articles";
import { generatedArticles } from "@/data/articles-generated";
import { categories } from "@/lib/categories";
import type { Article, Category, Lang } from "@/lib/schema";

const allArticles: Article[] = [...mockArticles, ...generatedArticles];
export const articles: Article[] = allArticles;
export const publishedArticles: Article[] = allArticles.filter((a) => a.status === "published");

export function getArticles(lang?: Lang) {
  return publishedArticles
    .filter((article) => (lang ? article.lang === lang : true))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function getArticlesByCategory(lang: Lang, category: Category) {
  return getArticles(lang).filter((article) => article.category === category);
}

export function getArticle(lang: Lang, category: Category, slug: string) {
  return publishedArticles.find(
    (article) => article.lang === lang && article.category === category && article.slug === slug
  );
}

export function getLanguageVariant(article: Article, lang: Lang) {
  const clusterId = article.generation.sourceClusterId;
  return publishedArticles.find((candidate) => candidate.lang === lang && candidate.generation.sourceClusterId === clusterId);
}

export function getTodayArticles(lang: Lang) {
  return categories.flatMap((category) => getArticlesByCategory(lang, category.id).slice(0, 1));
}

export function getFeaturedArticle(lang: Lang) {
  return getArticlesByCategory(lang, "ai-video")[0] ?? getArticles(lang)[0];
}

export function getArchiveArticles(lang: Lang) {
  return getArticles(lang).slice(6);
}

export function getHotTopics(lang: Lang) {
  const tagCounts = new Map<string, number>();
  getArticles(lang).forEach((article) => {
    article.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1));
  });
  return [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, count]) => ({ tag, count }));
}

export function getReferencedSources(lang: Lang) {
  const sourceCounts = new Map<string, number>();
  getArticles(lang).forEach((article) => {
    article.sources.forEach((source) => sourceCounts.set(source.sourceName, (sourceCounts.get(source.sourceName) ?? 0) + 1));
  });
  return [...sourceCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
}

export function getRelatedArticles(article: Article, limit = 5) {
  return publishedArticles
    .filter(
      (candidate) =>
        candidate.id !== article.id &&
        candidate.lang === article.lang &&
        candidate.category === article.category
    )
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}

export function getAllStaticArticlePaths() {
  return articles.map((article) => ({
    params: {
      lang: article.lang,
      category: article.category,
      slug: article.slug
    },
    props: {
      article
    }
  }));
}

export function formatDate(date: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function articleUrl(article: Article) {
  return `/${article.lang}/${article.category}/${article.slug}`;
}

export function readingMeta(article: Article, lang: Lang) {
  const sourcesLabel = lang === "vi" ? "nguồn" : "sources";
  const readLabel = lang === "vi" ? "phút đọc" : "min read";
  return `${article.readingTime} ${readLabel} · ${article.sources.length} ${sourcesLabel}`;
}

export function articleText(article: Article) {
  return [
    article.title,
    article.subtitle,
    article.tldr.join("\n"),
    article.bodyMarkdown,
    article.whyItMatters,
    article.creatorTakeaway
  ].join("\n\n");
}
