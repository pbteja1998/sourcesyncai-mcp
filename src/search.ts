import { z } from "zod";
import { makeApiRequest, ApiKeySchema, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const FilterSchema = z.object({
  metadata: z.record(z.any()).optional(),
}).optional();

// Semantic Search
export const SemanticSearchSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  query: z.string().min(1, "Search query is required"),
  namespaceId: NamespaceIdSchema.optional(),
  topK: z.number().min(1).max(100).optional(),
  scoreThreshold: z.number().min(0).max(1).optional(),
  filter: FilterSchema,
  searchType: z.literal("SEMANTIC").optional(),
  tenantId: z.string().optional(),
});

export async function semanticSearch(params: z.infer<typeof SemanticSearchSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/search",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Hybrid Search
export const HybridSearchSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  query: z.string().min(1, "Search query is required"),
  namespaceId: NamespaceIdSchema.optional(),
  topK: z.number().min(1).max(100).optional(),
  scoreThreshold: z.number().min(0).max(1).optional(),
  filter: FilterSchema,
  hybridConfig: z.object({
    semanticWeight: z.number().min(0).max(1),
    keywordWeight: z.number().min(0).max(1),
  }),
  searchType: z.literal("HYBRID").optional(),
  tenantId: z.string().optional(),
});

export async function hybridSearch(params: z.infer<typeof HybridSearchSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/search/hybrid",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 