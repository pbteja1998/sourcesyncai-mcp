import { z } from 'zod'
import {
  SourceSyncFileStorageType,
  SourceSyncVectorStorageProvider,
  SourceSyncEmbeddingModelProvider,
  SourceSyncOpenAIEmbeddingModel,
  SourceSyncCohereEmbeddingModel,
  SourceSyncJinaEmbeddingModel,
  SourceSyncWebScraperProvider,
  SourceSyncIngestionSource,
  SourceSyncChunkConfig,
  SourceSyncDocumentType,
  SourceSyncIngestionStatus,
  SourceSyncConnector,
  SourceSyncSearchType,
} from './sourcesync.types.js'

// Common schemas
export const apiKeySchema = z.string().optional()
export const tenantIdSchema = z.string().optional()
export const namespaceIdSchema = z.string().optional()

// File storage config schema
export const fileStorageConfigSchema = z.object({
  type: z.nativeEnum(SourceSyncFileStorageType),
  bucket: z.string(),
  region: z.string(),
  endpoint: z.string(),
  credentials: z.object({
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
  }),
})

// Vector storage config schema
export const vectorStorageConfigSchema = z.object({
  provider: z.nativeEnum(SourceSyncVectorStorageProvider),
  apiKey: z.string(),
  indexHost: z.string(),
})

// Embedding model config schema
export const embeddingModelConfigSchema = z.union([
  z.object({
    provider: z.literal(SourceSyncEmbeddingModelProvider.OPENAI),
    model: z.nativeEnum(SourceSyncOpenAIEmbeddingModel),
    apiKey: z.string(),
  }),
  z.object({
    provider: z.literal(SourceSyncEmbeddingModelProvider.COHERE),
    model: z.nativeEnum(SourceSyncCohereEmbeddingModel),
    apiKey: z.string(),
  }),
  z.object({
    provider: z.literal(SourceSyncEmbeddingModelProvider.JINA),
    model: z.nativeEnum(SourceSyncJinaEmbeddingModel),
    apiKey: z.string(),
  }),
])

// Web scraper config schema
export const webScraperConfigSchema = z.object({
  provider: z.nativeEnum(SourceSyncWebScraperProvider),
  apiKey: z.string(),
})

// Connector config schemas
export const notionConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
})

export const googleDriveConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  apiKey: z.string(),
})

export const dropboxConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
})

export const onedriveConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
})

export const boxConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
})

export const sharepointConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
})

// Chunk config schema
export const chunkConfigSchema = z
  .object({
    chunkSize: z.number(),
    chunkOverlap: z.number(),
  })
  .describe(
    'Optional Chunk config. When not passed, default chunk config will be used.',
  )

// Tool schemas
export const validateApiKeySchema = z.object({})

export const createNamespaceSchema = z.object({
  name: z.string(),
  fileStorageConfig: fileStorageConfigSchema,
  vectorStorageConfig: vectorStorageConfigSchema,
  embeddingModelConfig: embeddingModelConfigSchema,
  webScraperConfig: webScraperConfigSchema.optional(),
  tenantId: tenantIdSchema,
})

export const listNamespacesSchema = z.object({
  tenantId: tenantIdSchema,
})

export const getNamespaceSchema = z.object({
  namespaceId: namespaceIdSchema,
  tenantId: tenantIdSchema,
})

export const updateNamespaceSchema = z.object({
  namespaceId: namespaceIdSchema,
  fileStorageConfig: fileStorageConfigSchema.optional(),
  vectorStorageConfig: vectorStorageConfigSchema.optional(),
  embeddingModelConfig: embeddingModelConfigSchema.optional(),
  webScraperConfig: webScraperConfigSchema.optional(),
  notionConfig: notionConfigSchema.optional(),
  googleDriveConfig: googleDriveConfigSchema.optional(),
  dropboxConfig: dropboxConfigSchema.optional(),
  onedriveConfig: onedriveConfigSchema.optional(),
  boxConfig: boxConfigSchema.optional(),
  sharepointConfig: sharepointConfigSchema.optional(),
  tenantId: tenantIdSchema,
})

export const deleteNamespaceSchema = z.object({
  namespaceId: namespaceIdSchema,
  tenantId: tenantIdSchema,
})

export const ingestTextSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal(SourceSyncIngestionSource.TEXT),
    config: z.object({
      name: z.string().optional(),
      text: z.string(),
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    }),
    chunkConfig: chunkConfigSchema.optional(),
  }),
  tenantId: tenantIdSchema,
})

// Type inference from schemas
export type ValidateApiKeyParams = z.infer<typeof validateApiKeySchema>
export type CreateNamespaceParams = z.infer<typeof createNamespaceSchema>
export type ListNamespacesParams = z.infer<typeof listNamespacesSchema>
export type GetNamespaceParams = z.infer<typeof getNamespaceSchema>
export type UpdateNamespaceParams = z.infer<typeof updateNamespaceSchema>
export type DeleteNamespaceParams = z.infer<typeof deleteNamespaceSchema>
export type IngestTextParams = z.infer<typeof ingestTextSchema>

export const ScrapeOptionsSchema = z.object({
  includeSelectors: z.array(z.string()).optional(),
  excludeSelectors: z.array(z.string()).optional(),
})

// Authentication schemas
export const ValidateApiKeySchema = validateApiKeySchema

// Namespace schemas
export const FileStorageConfigSchema = fileStorageConfigSchema
export const VectorStorageConfigSchema = vectorStorageConfigSchema
export const EmbeddingModelConfigSchema = embeddingModelConfigSchema
export const WebScraperConfigSchema = webScraperConfigSchema
export const CreateNamespaceSchema = createNamespaceSchema
export const ListNamespacesSchema = listNamespacesSchema
export const GetNamespaceSchema = getNamespaceSchema
export const UpdateNamespaceSchema = updateNamespaceSchema
export const DeleteNamespaceSchema = deleteNamespaceSchema

// Ingestion schemas
export const IngestTextSchema = ingestTextSchema
export const IngestFileSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  file: z.instanceof(Blob),
  metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  chunkConfig: chunkConfigSchema.optional(),
  tenantId: tenantIdSchema,
})

export const IngestUrlsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal(SourceSyncIngestionSource.URLS_LIST),
    config: z.object({
      urls: z.array(z.string()),
      scrapeOptions: ScrapeOptionsSchema.optional(),
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    }),
    chunkConfig: chunkConfigSchema.optional(),
  }),
  tenantId: tenantIdSchema,
})

export const IngestSitemapSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal(SourceSyncIngestionSource.SITEMAP),
    config: z.object({
      url: z.string(),
      maxLinks: z.number().optional(),
      includePaths: z.array(z.string()).optional(),
      excludePaths: z.array(z.string()).optional(),
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    }),
    chunkConfig: chunkConfigSchema.optional(),
  }),
  tenantId: tenantIdSchema,
})

export const IngestWebsiteSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.literal(SourceSyncIngestionSource.WEBSITE),
    config: z.object({
      url: z.string(),
      maxDepth: z.number().optional(),
      maxLinks: z.number().optional(),
      includePaths: z.array(z.string()).optional(),
      excludePaths: z.array(z.string()).optional(),
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    }),
    chunkConfig: chunkConfigSchema.optional(),
  }),
  tenantId: tenantIdSchema,
})

export const IngestGoogleDriveSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connectionId: z.string().min(1, 'Connection ID is required'),
  folderId: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  apiKey: apiKeySchema.optional(),
  tenantId: tenantIdSchema,
})

export const IngestNotionSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connectionId: z.string().min(1, 'Connection ID is required'),
  pageId: z.string().optional(),
  metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  apiKey: apiKeySchema.optional(),
  tenantId: tenantIdSchema,
})

export const IngestConnectorSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestConfig: z.object({
    source: z.string(),
    config: z.object({
      connectionId: z.string(),
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    }),
    chunkConfig: chunkConfigSchema.optional(),
  }),
  tenantId: tenantIdSchema,
})

export const IngestJobRunStatusSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  ingestJobRunId: z.string(),
  tenantId: tenantIdSchema,
})

// Document schemas
export const DocumentFilterConfigSchema = z.object({
  documentIds: z.array(z.string()).optional(),
  documentExternalIds: z.array(z.string()).optional(),
  documentConnectionIds: z.array(z.string()).optional(),
  documentTypes: z.array(z.nativeEnum(SourceSyncDocumentType)).optional(),
  documentIngestionSources: z
    .array(z.nativeEnum(SourceSyncIngestionSource))
    .optional(),
  documentIngestionStatuses: z
    .array(z.nativeEnum(SourceSyncIngestionStatus))
    .optional(),
  metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
})

export const DocumentIncludeConfigSchema = z.object({
  documents: z.boolean().optional(),
  rawFileUrl: z.boolean().optional(),
  parsedTextFileUrl: z.boolean().optional(),
  statsBySource: z.boolean().optional(),
  statsByStatus: z.boolean().optional(),
})

export const PaginationSchema = z.object({
  pageSize: z.number().optional(),
  cursor: z.string().optional(),
})

export const FilterConfigSchema = z.object({
  documentIds: z.array(z.string()).optional(),
  documentExternalIds: z.array(z.string()).optional(),
  documentConnectionIds: z.array(z.string()).optional(),
  documentTypes: z
    .array(
      z.enum([
        'TEXT',
        'URL',
        'FILE',
        'NOTION_DOCUMENT',
        'GOOGLE_DRIVE_DOCUMENT',
        'DROPBOX_DOCUMENT',
        'ONEDRIVE_DOCUMENT',
        'BOX_DOCUMENT',
        'SHAREPOINT_DOCUMENT',
      ]),
    )
    .optional(),
  documentIngestionSources: z
    .array(
      z.enum([
        'TEXT',
        'URLS_LIST',
        'SITEMAP',
        'WEBSITE',
        'LOCAL_FILE',
        'NOTION',
        'GOOGLE_DRIVE',
        'DROPBOX',
        'ONEDRIVE',
        'BOX',
        'SHAREPOINT',
      ]),
    )
    .optional(),
  documentIngestionStatuses: z
    .array(
      z.enum([
        'BACKLOG',
        'QUEUED',
        'QUEUED_FOR_RESYNC',
        'PROCESSING',
        'SUCCESS',
        'FAILED',
        'CANCELLED',
      ]),
    )
    .optional(),
  metadata: z.record(z.string()).optional(),
})

export const FetchDocumentsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  documentIds: z.array(z.string()).optional(),
  pagination: PaginationSchema.optional(),
  tenantId: tenantIdSchema,
  filterConfig: FilterConfigSchema,
  includeConfig: z
    .object({
      documents: z.boolean().optional(),
      stats: z.boolean().optional(),
      statsBySource: z.boolean().optional(),
      statsByStatus: z.boolean().optional(),
      rawFileUrl: z.boolean().optional(),
      parsedTextFileUrl: z.boolean().optional(),
    })
    .optional(),
})

export const UpdateDocumentsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  documents: z.array(
    z.object({
      documentId: z.string(),
      metadata: z.record(z.string()).optional(),
    }),
  ),
  tenantId: tenantIdSchema,
  filterConfig: FilterConfigSchema,
  data: z.object({
    metadata: z.record(z.string()).optional(),
    $metadata: z
      .object({
        $set: z.record(z.union([z.string(), z.array(z.string())])).optional(),
        $append: z.record(z.array(z.string())).optional(),
        $remove: z.record(z.array(z.string())).optional(),
      })
      .optional(),
  }),
})

export const DeleteDocumentsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  documentIds: z.array(z.string()).optional(),
  tenantId: tenantIdSchema,
  filterConfig: FilterConfigSchema,
})

export const ResyncDocumentsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  documentIds: z.array(z.string()).optional(),
  tenantId: tenantIdSchema,
  filterConfig: FilterConfigSchema,
})

// Search schemas
export const SearchTypeEnum = z.nativeEnum(SourceSyncSearchType)

export const SearchFilterSchema = z.object({
  metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
})

export const SemanticSearchSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  query: z.string(),
  topK: z.number().optional(),
  scoreThreshold: z.number().optional(),
  filter: z
    .object({
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    })
    .optional(),
  tenantId: tenantIdSchema,
  searchType: SearchTypeEnum.optional(),
})

export const HybridConfigSchema = z.object({
  semanticWeight: z.number(),
  keywordWeight: z.number(),
})

export const HybridSearchSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  query: z.string(),
  topK: z.number().optional(),
  scoreThreshold: z.number().optional(),
  filter: z
    .object({
      metadata: z.record(z.union([z.string(), z.array(z.string())])).optional(),
    })
    .optional(),
  hybridConfig: z.object({
    semanticWeight: z.number(),
    keywordWeight: z.number(),
  }),
  tenantId: tenantIdSchema,
  searchType: SearchTypeEnum.optional(),
})

// Connection schemas
export const ConnectorEnum = z.nativeEnum(SourceSyncConnector)

export const CreateConnectionSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  name: z.string(),
  connector: ConnectorEnum,
  clientRedirectUrl: z.string().optional(),
  tenantId: tenantIdSchema,
})

export const ListConnectionsSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connector: ConnectorEnum.optional(),
  tenantId: tenantIdSchema,
})

export const GetConnectionSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connectionId: z.string(),
  tenantId: tenantIdSchema,
})

export const UpdateConnectionSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connectionId: z.string(),
  name: z.string().optional(),
  clientRedirectUrl: z.string().optional(),
  tenantId: tenantIdSchema,
})

export const RevokeConnectionSchema = z.object({
  namespaceId: namespaceIdSchema.optional(),
  connectionId: z.string(),
  tenantId: tenantIdSchema,
})

// Utility schemas
export const FetchUrlContentSchema = z.object({
  url: z.string().url(),
  // Authentication might be needed for some SourceSync URLs
  apiKey: apiKeySchema,
  tenantId: tenantIdSchema,
})

export type FetchUrlContentParams = z.infer<typeof FetchUrlContentSchema>
