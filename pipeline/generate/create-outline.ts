import type { SourceNote, TopicCluster } from "../types/schema.ts";

export function createOutline(cluster: TopicCluster, notes: SourceNote[] = []) {
  const strongestFacts = notes.flatMap((note) => note.keyFacts).slice(0, 5);

  return {
    titleDirection: cluster.topic,
    angle: cluster.category.startsWith("prompt-") ? "workflow-first prompt breakdown" : "editorial analysis for builders and creators",
    sections: ["TL;DR", "Main analysis", "Why it matters", "Creator / Builder takeaway", "Sources"],
    sourceFacts: strongestFacts
  };
}
