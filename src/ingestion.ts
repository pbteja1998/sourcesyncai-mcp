import { z } from "zod";
import { makeApiRequest, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const ChunkConfigSchema = z.object({
  chunkSize: z.number().optional(),
  chunkOverlap: z.number().optional(),
});

// Ingest Text
export const IngestTextSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal("TEXT"),
    config: z.object({
      name: z.string().optional(),
      text: z.string(),
      metadata: z.record(z.any()).optional(),
    }),
    chunkConfig: ChunkConfigSchema.optional(),
  }),
  tenantId: z.string().optional(),
});

export async function ingestText(params: z.infer<typeof IngestTextSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/text",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest URLs
export const IngestUrlsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal("URLS_LIST"),
    config: z.object({
      urls: z.array(z.string()),
      scrapeOptions: z.object({
        includeSelectors: z.array(z.string()).optional(),
        excludeSelectors: z.array(z.string()).optional(),
      }).optional(),
      metadata: z.record(z.any()).optional(),
    }),
    chunkConfig: ChunkConfigSchema.optional(),
  }),
  tenantId: z.string().optional(),
});

export async function ingestUrls(params: z.infer<typeof IngestUrlsSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/urls",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Sitemap
export const IngestSitemapSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal("SITEMAP"),
    config: z.object({
      url: z.string().url(),
      maxLinks: z.number().optional(),
      includePaths: z.array(z.string()).optional(),
      excludePaths: z.array(z.string()).optional(),
      scrapeOptions: z.object({
        includeSelectors: z.array(z.string()).optional(),
        excludeSelectors: z.array(z.string()).optional(),
      }).optional(),
      metadata: z.record(z.any()).optional(),
    }),
    chunkConfig: ChunkConfigSchema.optional(),
  }),
  tenantId: z.string().optional(),
});

export async function ingestSitemap(params: z.infer<typeof IngestSitemapSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/sitemap",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Website
export const IngestWebsiteSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal("WEBSITE"),
    config: z.object({
      url: z.string().url(),
      maxDepth: z.number().optional(),
      maxLinks: z.number().optional(),
      includePaths: z.array(z.string()).optional(),
      excludePaths: z.array(z.string()).optional(),
      scrapeOptions: z.object({
        includeSelectors: z.array(z.string()).optional(),
        excludeSelectors: z.array(z.string()).optional(),
      }).optional(),
      metadata: z.record(z.any()).optional(),
    }),
    chunkConfig: ChunkConfigSchema.optional(),
  }),
  tenantId: z.string().optional(),
});

export async function ingestWebsite(params: z.infer<typeof IngestWebsiteSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/website",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest from external services (Notion, Google Drive, Dropbox, OneDrive, Box)
const ExternalServiceSchema = (source: string) => z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal(source),
    config: z.object({
      connectionId: z.string(),
      metadata: z.record(z.any()).optional(),
    }),
    chunkConfig: ChunkConfigSchema.optional(),
  }),
  tenantId: z.string().optional(),
});

// Ingest Notion
export const IngestNotionSchema = ExternalServiceSchema("NOTION");

export async function ingestNotion(params: z.infer<typeof IngestNotionSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/notion",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Google Drive
export const IngestGoogleDriveSchema = ExternalServiceSchema("GOOGLE_DRIVE");

export async function ingestGoogleDrive(params: z.infer<typeof IngestGoogleDriveSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/google-drive",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Dropbox
export const IngestDropboxSchema = ExternalServiceSchema("DROPBOX");

export async function ingestDropbox(params: z.infer<typeof IngestDropboxSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/dropbox",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest OneDrive
export const IngestOneDriveSchema = ExternalServiceSchema("ONEDRIVE");

export async function ingestOneDrive(params: z.infer<typeof IngestOneDriveSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/onedrive",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Ingest Box
export const IngestBoxSchema = ExternalServiceSchema("BOX");

export async function ingestBox(params: z.infer<typeof IngestBoxSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/ingest/box",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Get Ingest Job Run Status
export const GetIngestJobRunStatusSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  ingestJobRunId: z.string(),
  tenantId: z.string().optional(),
});

export async function getIngestJobRunStatus(params: z.infer<typeof GetIngestJobRunStatusSchema>) {
  const { namespaceId, ingestJobRunId, tenantId } = params;
  
  return makeApiRequest({
    method: "GET",
    path: `/v1/ingest-job-runs/${ingestJobRunId}`,
    tenantId,
    queryParams: {
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 