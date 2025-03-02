import { z } from "zod";
import { makeApiRequest, ApiKeySchema, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const ChunkConfigSchema = z.object({
  chunkSize: z.number().optional(),
  chunkOverlap: z.number().optional(),
});

// Ingest Text
export const IngestTextSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal("TEXT"),
    config: z.object({
      name: z.string(),
      text: z.string(),
      metadata: z.record(z.any()).optional(),
      chunkConfig: ChunkConfigSchema.optional(),
    }),
  }),
  tenantId: z.string().optional(),
});

export async function ingestText(params: z.infer<typeof IngestTextSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/text",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest URLs
export const IngestUrlsSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    urls: z.array(z.string()),
    scrapeOptions: z.object({
      waitForSelector: z.string().optional(),
      waitForTimeout: z.number().optional(),
      removeSelectors: z.array(z.string()).optional(),
      extractContent: z.boolean().optional(),
    }).optional(),
  }),
  tenantId: z.string().optional(),
});

export async function ingestUrls(params: z.infer<typeof IngestUrlsSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/urls",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Sitemap
export const IngestSitemapSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  url: z.string().url(),
  tenantId: z.string().optional(),
});

export async function ingestSitemap(params: z.infer<typeof IngestSitemapSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/sitemap",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Website
export const IngestWebsiteSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  url: z.string().url(),
  tenantId: z.string().optional(),
});

export async function ingestWebsite(params: z.infer<typeof IngestWebsiteSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/website",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest from external services (Notion, Google Drive, Dropbox, OneDrive, Box)
const ExternalServiceSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string(),
  tenantId: z.string().optional(),
});

// Ingest Notion
export const IngestNotionSchema = ExternalServiceSchema;

export async function ingestNotion(params: z.infer<typeof IngestNotionSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/notion",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Google Drive
export const IngestGoogleDriveSchema = ExternalServiceSchema;

export async function ingestGoogleDrive(params: z.infer<typeof IngestGoogleDriveSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/google-drive",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Dropbox
export const IngestDropboxSchema = ExternalServiceSchema;

export async function ingestDropbox(params: z.infer<typeof IngestDropboxSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/dropbox",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest OneDrive
export const IngestOneDriveSchema = ExternalServiceSchema;

export async function ingestOneDrive(params: z.infer<typeof IngestOneDriveSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/onedrive",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Box
export const IngestBoxSchema = ExternalServiceSchema;

export async function ingestBox(params: z.infer<typeof IngestBoxSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/box",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 