import { z } from "zod";
import { makeApiRequest, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const DocumentTypeEnum = z.enum([
  "TEXT", "URL", "FILE", "NOTION_DOCUMENT", "GOOGLE_DRIVE_DOCUMENT", 
  "DROPBOX_DOCUMENT", "ONEDRIVE_DOCUMENT", "BOX_DOCUMENT"
]);

const IngestionSourceEnum = z.enum([
  "TEXT", "LOCAL_FILE", "URLS_LIST", "SITEMAP", "WEBSITE", 
  "NOTION", "GOOGLE_DRIVE", "DROPBOX", "ONEDRIVE", "BOX"
]);

const IngestionStatusEnum = z.enum([
  "BACKLOG", "QUEUED", "QUEUED_FOR_RESYNC", "PROCESSING", 
  "SUCCESS", "FAILED", "CANCELLED"
]);

const FilterConfigSchema = z.object({
  documentIds: z.array(z.string()).optional(),
  documentExternalIds: z.array(z.string()).optional(),
  documentConnectionIds: z.array(z.string()).optional(),
  documentTypes: z.array(DocumentTypeEnum).optional(),
  documentIngestionSources: z.array(IngestionSourceEnum).optional(),
  documentIngestionStatuses: z.array(IngestionStatusEnum).optional(),
  metadata: z.record(z.any()).optional(),
});

const IncludeConfigSchema = z.object({
  documents: z.boolean().optional(),
  stats: z.boolean().optional(),
  statsBySource: z.boolean().optional(),
  statsByStatus: z.boolean().optional(),
  rawFileUrl: z.boolean().optional(),
  parsedTextFileUrl: z.boolean().optional(),
}).optional();

const PaginationSchema = z.object({
  pageSize: z.number().min(1).max(100).optional(),
  cursor: z.string().optional(),
}).optional();

// Fetch Documents
export const FetchDocumentsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  filterConfig: FilterConfigSchema,
  includeConfig: IncludeConfigSchema,
  pagination: PaginationSchema,
  tenantId: z.string().optional(),
});

export async function fetchDocuments(params: z.infer<typeof FetchDocumentsSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/documents",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Update Documents
export const UpdateDocumentsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  filterConfig: FilterConfigSchema,
  includeConfig: IncludeConfigSchema,
  pagination: PaginationSchema,
  data: z.object({
    metadata: z.record(z.any()).optional(),
    $metadata: z.object({
      $set: z.record(z.any()).optional(),
      $append: z.record(z.any()).optional(),
      $remove: z.record(z.any()).optional(),
    }).optional(),
  }),
  tenantId: z.string().optional(),
});

export async function updateDocuments(params: z.infer<typeof UpdateDocumentsSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "PATCH",
    path: "/v1/documents",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Delete Documents
export const DeleteDocumentsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  filterConfig: FilterConfigSchema,
  tenantId: z.string().optional(),
});

export async function deleteDocuments(params: z.infer<typeof DeleteDocumentsSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "DELETE",
    path: "/v1/documents",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Resync Documents
export const ResyncDocumentsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  filterConfig: FilterConfigSchema,
  tenantId: z.string().optional(),
});

export async function resyncDocuments(params: z.infer<typeof ResyncDocumentsSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/documents/resync",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 