import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { GeneratedArticleDraft, SourceNote, TopicCluster } from "../types/schema.ts";

type RuntimeExportInput = {
  notes: SourceNote[];
  clusters: TopicCluster[];
  drafts: {
    vi: GeneratedArticleDraft;
    en: GeneratedArticleDraft;
    viValidation: { ok: boolean; errors: string[] };
    enValidation: { ok: boolean; errors: string[] };
  }[];
};

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const publicRuntimeDir = resolve(root, "apps/web/public/data/agent/runtime");
const contentRuntimeDir = resolve(root, "content/exports/runtime");

export async function exportRuntimeAgentData(input: RuntimeExportInput) {
  const validDrafts = input.drafts.flatMap((draftSet) => [
    { draft: draftSet.vi, validation: draftSet.viValidation },
    { draft: draftSet.en, validation: draftSet.enValidation }
  ]);
  const generatedAt = new Date().toISOString();

  await writeRuntimeFile("source-notes.jsonl", jsonl(input.notes));
  await writeRuntimeFile("topic-clusters.jsonl", jsonl(input.clusters));
  await writeRuntimeFile(
    "article-drafts.jsonl",
    jsonl(
      validDrafts.map(({ draft, validation }) => ({
        ...draft,
        validation
      }))
    )
  );
  await writeRuntimeFile(
    "training-manifest.json",
    JSON.stringify(
      {
        name: "AI Radar runtime agent export",
        generatedAt,
        sourceNoteCount: input.notes.length,
        clusterCount: input.clusters.length,
        articleDraftCount: validDrafts.length,
        validArticleDraftCount: validDrafts.filter(({ validation }) => validation.ok).length,
        files: ["source-notes.jsonl", "topic-clusters.jsonl", "article-drafts.jsonl"],
        rawSourcesExposed: false
      },
      null,
      2
    ) + "\n"
  );
}

async function writeRuntimeFile(relativePath: string, content: string) {
  const destinations = [resolve(publicRuntimeDir, relativePath), resolve(contentRuntimeDir, relativePath)];
  await Promise.all(
    destinations.map(async (destination) => {
      await mkdir(resolve(destination, ".."), { recursive: true });
      await writeFile(destination, content);
    })
  );
}

function jsonl(rows: unknown[]) {
  return rows.map((row) => JSON.stringify(row)).join("\n") + "\n";
}
