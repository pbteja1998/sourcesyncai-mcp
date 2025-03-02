import { z } from "zod";
import { makeApiRequest, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const FileStorageConfigSchema = z.object({
  provider: z.enum(["S3_COMPATIBLE"]),
  config: z.object({
    endpoint: z.string(),
    accessKey: z.string(),
    secretKey: z.string(),
    bucket: z.string(),
    region: z.string().optional(),
  }),
});

const VectorStorageConfigSchema = z.object({
  provider: z.enum(["PINECONE"]),
  config: z.object({
    apiKey: z.string(),
    environment: z.string(),
    index: z.string(),
  }),
});

const EmbeddingModelConfigSchema = z.object({
  provider: z.enum(["OPENAI", "COHERE", "JINA"]),
  config: z.object({
    apiKey: z.string(),
    model: z.enum([
      "text-embedding-3-small",
      "text-embedding-3-large",
      "text-embedding-ada-002",
      "embed-english-v3.0",
      "embed-multilingual-v3.0",
      "embed-english-light-v3.0",
      "embed-multilingual-light-v3.0",
      "embed-english-v2.0",
      "embed-english-light-v2.0",
      "embed-multilingual-v2.0",
      "jina-embeddings-v3",
    ]),
    dimensions: z.number().optional(),
  }),
});

const WebScraperConfigSchema = z.object({
  provider: z.enum(["FIRECRAWL", "JINA", "SCRAPINGBEE"]),
  config: z.object({
    apiKey: z.string(),
  }),
}).optional();

// Create Namespace
export const CreateNamespaceSchema = z.object({
  name: z.string().min(1, "Namespace name is required"),
  fileStorageConfig: FileStorageConfigSchema,
  vectorStorageConfig: VectorStorageConfigSchema,
  embeddingModelConfig: EmbeddingModelConfigSchema,
  webScraperConfig: WebScraperConfigSchema,
  tenantId: z.string().optional(),
});

export async function createNamespace(params: z.infer<typeof CreateNamespaceSchema>) {
  const { tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/namespaces",
    tenantId,
    body: requestBody,
  });
}

// List Namespaces
export const ListNamespacesSchema = z.object({
  tenantId: z.string().optional(),
});

export async function listNamespaces(params: z.infer<typeof ListNamespacesSchema>) {
  const { tenantId } = params;
  
  return makeApiRequest({
    method: "GET",
    path: "/v1/namespaces",
    tenantId,
  });
}

// Get Namespace
export const GetNamespaceSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  tenantId: z.string().optional(),
});

export async function getNamespace(params: z.infer<typeof GetNamespaceSchema>) {
  const { namespaceId, tenantId } = params;
  
  return makeApiRequest({
    method: "GET",
    path: `/v1/namespaces/${getDefaultNamespaceId(namespaceId)}`,
    tenantId,
  });
}

// Update Namespace
export const UpdateNamespaceSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  name: z.string().optional(),
  fileStorageConfig: FileStorageConfigSchema.optional(),
  vectorStorageConfig: VectorStorageConfigSchema.optional(),
  embeddingModelConfig: EmbeddingModelConfigSchema.optional(),
  webScraperConfig: WebScraperConfigSchema.optional(),
  tenantId: z.string().optional(),
});

export async function updateNamespace(params: z.infer<typeof UpdateNamespaceSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "PUT",
    path: `/v1/namespaces/${getDefaultNamespaceId(namespaceId)}`,
    tenantId,
    body: requestBody,
  });
}

// Delete Namespace
export const DeleteNamespaceSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  tenantId: z.string().optional(),
});

export async function deleteNamespace(params: z.infer<typeof DeleteNamespaceSchema>) {
  const { namespaceId, tenantId } = params;
  
  return makeApiRequest({
    method: "DELETE",
    path: `/v1/namespaces/${getDefaultNamespaceId(namespaceId)}`,
    tenantId,
  });
} 