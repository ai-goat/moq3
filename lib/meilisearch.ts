import { MeiliSearch } from "meilisearch";

import { env, isMeilisearchConfigured } from "@/lib/env";
import type { SearchDocument } from "@/types/domain";

const client = isMeilisearchConfigured
  ? new MeiliSearch({
      host: env.meilisearchHost,
      apiKey: env.meilisearchApiKey || undefined,
    })
  : null;

export async function searchDocuments(query: string) {
  if (!client) {
    return null;
  }

  const index = client.index<SearchDocument>(env.meilisearchIndex);
  const response = await index.search(query, {
    limit: 8,
    attributesToHighlight: ["name", "description"],
  });

  return response.hits;
}

export async function syncDocuments(documents: SearchDocument[]) {
  if (!client) {
    return { enabled: false };
  }

  const index = client.index<SearchDocument>(env.meilisearchIndex);
  await index.updateSearchableAttributes([
    "name",
    "category",
    "conductingBody",
    "description",
  ]);
  await index.addDocuments(documents);

  return { enabled: true };
}
