export type SourceSyncApiResponse<T> = {
  success: boolean
  message: string
  data: T
  error?: {
    code: string
    message: string
    details?: { reason: string } & Record<string, any>
  }
}

export type SourceSyncFaunaTime = {
  isoString: string
}

export type SourceSyncFaunaRef = {
  id: string
}

export type SourceSyncNamespaceRef = {
  identifier: string
}

export type SourceSyncPaginationRequest = {
  pageSize?: number
  cursor?: string
}

export type SourceSyncPaginationResponse = {
  itemsReturned: number
  hasNextPage: boolean
  nextCursor: string | null
}

export type SourceSyncPaginatedResult<T> = {
  data: T[]
  hasNextPage: boolean
  nextCursor: string | null
}

export type SourceSyncDocumentsPaginatedResult =
  SourceSyncPaginatedResult<SourceSyncDocument> & {
    statsBySource: { source: SourceSyncIngestionSource; totalCount: number }[]
    statsByStatus: { status: SourceSyncIngestionStatus; totalCount: number }[]
  }

// ************************************************************************* //
// ***************************** ⬇⬇ ENUMS ⬇⬇ **************************** //
// ************************************************************************* //

export enum SourceSyncWebScraperProvider {
  FIRECRAWL = 'FIRECRAWL',
  JINA = 'JINA',
  SCRAPINGBEE = 'SCRAPINGBEE',
}

export enum SourceSyncFileStorageType {
  S3_COMPATIBLE = 'S3_COMPATIBLE',
}

export enum SourceSyncVectorStorageProvider {
  PINECONE = 'PINECONE',
}

export enum SourceSyncEmbeddingModelProvider {
  OPENAI = 'OPENAI',
  COHERE = 'COHERE',
  JINA = 'JINA',
}

export enum SourceSyncOpenAIEmbeddingModel {
  TEXT_EMBEDDING_3_SMALL = 'text-embedding-3-small',
  TEXT_EMBEDDING_3_LARGE = 'text-embedding-3-large',
  TEXT_EMBEDDING_ADA_002 = 'text-embedding-ada-002',
}

export enum SourceSyncCohereEmbeddingModel {
  EMBED_ENGLISH_V3 = 'embed-english-v3.0',
  EMBED_MULTILINGUAL_V3 = 'embed-multilingual-v3.0',
  EMBED_ENGLISH_LIGHT_V3 = 'embed-english-light-v3.0',
  EMBED_MULTILINGUAL_LIGHT_V3 = 'embed-multilingual-light-v3.0',
  EMBED_ENGLISH_V2 = 'embed-english-v2.0',
  EMBED_ENGLISH_LIGHT_V2 = 'embed-english-light-v2.0',
  EMBED_MULTILINGUAL_V2 = 'embed-multilingual-v2.0',
}

export enum SourceSyncJinaEmbeddingModel {
  JINA_EMBEDDINGS_V3 = 'jina-embeddings-v3',
}

export enum SourceSyncConnector {
  NOTION = 'NOTION',
  GOOGLE_DRIVE = 'GOOGLE_DRIVE',
  DROPBOX = 'DROPBOX',
  ONEDRIVE = 'ONEDRIVE',
  BOX = 'BOX',
  SHAREPOINT = 'SHAREPOINT',
}

export enum SourceSyncConnectionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  REVOKED = 'REVOKED',
}

export enum SourceSyncConnectionAuthType {
  OAUTH2 = 'OAUTH2',
}

export enum SourceSyncIngestionSource {
  TEXT = 'TEXT',
  URLS_LIST = 'URLS_LIST',
  SITEMAP = 'SITEMAP',
  WEBSITE = 'WEBSITE',
  LOCAL_FILE = 'LOCAL_FILE',
  NOTION = 'NOTION',
  GOOGLE_DRIVE = 'GOOGLE_DRIVE',
  DROPBOX = 'DROPBOX',
  ONEDRIVE = 'ONEDRIVE',
  BOX = 'BOX',
  SHAREPOINT = 'SHAREPOINT',
}

export enum SourceSyncIngestionStatus {
  BACKLOG = 'BACKLOG',
  QUEUED = 'QUEUED',
  QUEUED_FOR_RESYNC = 'QUEUED_FOR_RESYNC',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

enum SourceSyncIngestJobRunStatus {
  QUEUED = 'QUEUED',
  PRE_PROCESSING = 'PRE_PROCESSING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}

export enum SourceSyncDocumentType {
  TEXT = 'TEXT',
  URL = 'URL',
  FILE = 'FILE',
  NOTION_DOCUMENT = 'NOTION_DOCUMENT',
  GOOGLE_DRIVE_DOCUMENT = 'GOOGLE_DRIVE_DOCUMENT',
  DROPBOX_DOCUMENT = 'DROPBOX_DOCUMENT',
  ONEDRIVE_DOCUMENT = 'ONEDRIVE_DOCUMENT',
  BOX_DOCUMENT = 'BOX_DOCUMENT',
  SHAREPOINT_DOCUMENT = 'SHAREPOINT_DOCUMENT',
}

export enum SourceSyncSearchType {
  SEMANTIC = 'SEMANTIC',
  HYBRID = 'HYBRID',
}

// ************************************************************************* //
// ***************************** ⬆⬆ ENUMS ⬆⬆ **************************** //
// ************************************************************************* //

// ************************************************************************* //
// ************************** ⬇⬇ NAMESPACES ⬇⬇ ************************** //
// ************************************************************************* //

export type SourceSyncFileStorageConfig = {
  type: SourceSyncFileStorageType.S3_COMPATIBLE
  bucket: string
  region: string
  endpoint: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

export type SourceSyncVectorStorageConfig = {
  provider: SourceSyncVectorStorageProvider.PINECONE
  apiKey: string
  indexHost: string
}

export type SourceSyncEmbeddingModelConfig =
  | {
      provider: SourceSyncEmbeddingModelProvider.OPENAI
      model: SourceSyncOpenAIEmbeddingModel
      apiKey: string
    }
  | {
      provider: SourceSyncEmbeddingModelProvider.COHERE
      model: SourceSyncCohereEmbeddingModel
      apiKey: string
    }
  | {
      provider: SourceSyncEmbeddingModelProvider.JINA
      model: SourceSyncJinaEmbeddingModel
      apiKey: string
    }

export type SourceSyncWebScraperConfig = {
  provider:
    | SourceSyncWebScraperProvider.FIRECRAWL
    | SourceSyncWebScraperProvider.JINA
    | SourceSyncWebScraperProvider.SCRAPINGBEE
  apiKey: string
}

export type SourceSyncNotionConfig = {
  clientId: string
  clientSecret: string
}

export type SourceSyncGoogleDriveConfig = {
  clientId: string
  clientSecret: string
  apiKey: string
}

export type SourceSyncDropboxConfig = {
  clientId: string
  clientSecret: string
}

export type SourceSyncOnedriveConfig = {
  clientId: string
  clientSecret: string
}

export type SourceSyncBoxConfig = {
  clientId: string
  clientSecret: string
}

export type SourceSyncSharepointConfig = {
  clientId: string
  clientSecret: string
}

export type SourceSyncNamespace = {
  identifier: string
  name: string
  organization: SourceSyncFaunaRef
  fileStorageConfig: SourceSyncFileStorageConfig
  vectorStorageConfig: SourceSyncVectorStorageConfig
  embeddingModelConfig: SourceSyncEmbeddingModelConfig
  webScraperConfig: SourceSyncWebScraperConfig | null
  notionConfig: SourceSyncNotionConfig | null
  googleDriveConfig: SourceSyncGoogleDriveConfig | null
  dropboxConfig: SourceSyncDropboxConfig | null
  onedriveConfig: SourceSyncOnedriveConfig | null
  boxConfig: SourceSyncBoxConfig | null
  sharepointConfig: SourceSyncSharepointConfig | null
  createdAt: SourceSyncFaunaTime
  updatedAt: SourceSyncFaunaTime
}

export type SourceSyncCreateNamespaceRequest = {
  name: string
  fileStorageConfig: SourceSyncFileStorageConfig
  vectorStorageConfig: SourceSyncVectorStorageConfig
  embeddingModelConfig: SourceSyncEmbeddingModelConfig
  webScraperConfig?: SourceSyncWebScraperConfig
}

export type SourceSyncCreateNamespaceResponse =
  SourceSyncApiResponse<SourceSyncNamespace>

export type SourceSyncListNamespacesResponse = SourceSyncApiResponse<
  SourceSyncNamespace[]
>

export type SourceSyncGetNamespaceResponse =
  SourceSyncApiResponse<SourceSyncNamespace>

export type SourceSyncUpdateNamespaceRequest = {
  fileStorageConfig?: SourceSyncFileStorageConfig
  vectorStorageConfig?: SourceSyncVectorStorageConfig
  embeddingModelConfig?: SourceSyncEmbeddingModelConfig
  webScraperConfig?: SourceSyncWebScraperConfig
  notionConfig?: SourceSyncNotionConfig
  googleDriveConfig?: SourceSyncGoogleDriveConfig
  dropboxConfig?: SourceSyncDropboxConfig
  onedriveConfig?: SourceSyncOnedriveConfig
  boxConfig?: SourceSyncBoxConfig
  sharepointConfig?: SourceSyncSharepointConfig
}

export type SourceSyncUpdateNamespaceResponse =
  SourceSyncApiResponse<SourceSyncNamespace>

export type SourceSyncDeleteNamespaceResponse = SourceSyncApiResponse<{
  identifier: string
}>

// ************************************************************************* //
// ************************** ⬆⬆ NAMESPACES ⬆⬆ ************************** //
// ************************************************************************* //

// ************************************************************************* //
// ************************** ⬇⬇ CONNECTION ⬇⬇ ************************** //
// ************************************************************************* //

export type SourceSyncOAuth2ConnectionConfig = {
  authType: SourceSyncConnectionAuthType.OAUTH2
  credentials: {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string | null
    refreshTokenExpiresAt: number | null
  } | null
}

export type SourceSyncConnectionConfig = SourceSyncOAuth2ConnectionConfig

export type SourceSyncConnection = {
  id: string
  name: string
  connector: SourceSyncConnector
  status: SourceSyncConnectionStatus
  statusReason: string | null
  config: SourceSyncConnectionConfig
  clientRedirectUrl: string | null
  tenantId: string | null
  namespace: SourceSyncNamespaceRef
  organization: SourceSyncFaunaRef
  createdAt: SourceSyncFaunaTime
  updatedAt: SourceSyncFaunaTime
}

export type SourceSyncCreateConnectionRequest = {
  namespaceId: string
  name: string
  connector: SourceSyncConnector
  clientRedirectUrl?: string
}

export type SourceSyncCreateConnectionResponse = SourceSyncApiResponse<{
  connection: SourceSyncFaunaRef
  authorizationUrl: string
}>

export type SourceSyncListConnectionsRequest = {
  connector?: SourceSyncConnector
}

export type SourceSyncListConnectionsResponse = SourceSyncApiResponse<{
  connections: SourceSyncConnection[]
}>

export type SourceSyncGetConnectionRequest = {
  connectionId: string
}

export type SourceSyncGetConnectionResponse = SourceSyncApiResponse<{
  connection: SourceSyncConnection
}>

export type SourceSyncUpdateConnectionRequest = {
  namespaceId: string
  name?: string
  clientRedirectUrl?: string
}

export type SourceSyncUpdateConnectionResponse = SourceSyncApiResponse<{
  connection: SourceSyncConnection
  authorizationUrl: string
}>

export type SourceSyncRevokeConnectionRequest = {
  namespaceId: string
}

export type SourceSyncRevokeConnectionResponse = SourceSyncApiResponse<{
  connection: SourceSyncConnection
}>

// ************************************************************************* //
// ************************** ⬆⬆ CONNECTION ⬆⬆ ************************** //
// ************************************************************************* //

// ************************************************************************* //
// ************************ ⬇⬇ DATA INGESTION ⬇⬇ ************************ //
// ************************************************************************* //

export type SourceSyncScrapeOptions = {
  includeSelectors?: string[]
  excludeSelectors?: string[]
}

export type SourceSyncChunkConfig = {
  chunkSize: number
  chunkOverlap: number
}

export type SourceSyncIngestTextRequest = {
  namespaceId: string
  ingestConfig: {
    source: SourceSyncIngestionSource.TEXT
    config: {
      name?: string
      text: string
      metadata?: Record<string, any>
    }
    chunkConfig?: SourceSyncChunkConfig
  }
}

export type SourceSyncIngestFileRequest = {
  namespaceId: string
  file: File
  metadata?: Record<string, any>
  chunkConfig?: SourceSyncChunkConfig
}

export type SourceSyncIngestUrlsRequest = {
  namespaceId: string
  ingestConfig: {
    source: SourceSyncIngestionSource.URLS_LIST
    config: {
      urls: string[]
      scrapeOptions?: SourceSyncScrapeOptions
      metadata?: Record<string, any>
    }
    chunkConfig?: SourceSyncChunkConfig
  }
}

export type SourceSyncIngestSitemapRequest = {
  namespaceId: string
  ingestConfig: {
    source: SourceSyncIngestionSource.SITEMAP
    config: {
      url: string
      maxLinks?: number
      includePaths?: string[]
      excludePaths?: string[]
      scrapeOptions?: SourceSyncScrapeOptions
      metadata?: Record<string, any>
    }
    chunkConfig?: SourceSyncChunkConfig
  }
}

export type SourceSyncIngestWebsiteRequest = {
  namespaceId: string
  ingestConfig: {
    source: SourceSyncIngestionSource.WEBSITE
    config: {
      url: string
      maxDepth?: number
      maxLinks?: number
      includePaths?: string[]
      excludePaths?: string[]
      scrapeOptions?: SourceSyncScrapeOptions
      metadata?: Record<string, any>
    }
    chunkConfig?: SourceSyncChunkConfig
  }
}

export type SourceSyncIngestConnectorRequest = {
  namespaceId: string
  ingestConfig: {
    source: SourceSyncIngestionSource
    config: {
      connectionId: string
      metadata?: Record<string, any>
    }
    chunkConfig?: SourceSyncChunkConfig
  }
}

export type SourceSyncIngestResponse = SourceSyncApiResponse<{
  ingestJobRunId: string
  documents: {
    id: string
    status: SourceSyncIngestionStatus
    error: string | null
  }[]
}>

export type SourceSyncIngestJobRun = {
  id: string
  status: SourceSyncIngestJobRunStatus
  createdAt: SourceSyncFaunaTime
  updatedAt: SourceSyncFaunaTime
} & (
  | {
      status:
        | SourceSyncIngestJobRunStatus.QUEUED
        | SourceSyncIngestJobRunStatus.PRE_PROCESSING
    }
  | {
      status:
        | SourceSyncIngestJobRunStatus.PROCESSING
        | SourceSyncIngestJobRunStatus.COMPLETED
      documents: {
        queued: {
          id: string
          status: SourceSyncIngestionStatus
          error: string | null
        }[]
        processing: {
          id: string
          status: SourceSyncIngestionStatus
          error: string | null
        }[]
        completed: {
          id: string
          status: SourceSyncIngestionStatus
          error: string | null
        }[]
        failed: {
          id: string
          status: SourceSyncIngestionStatus
          error: string | null
        }[]
        cancelled: {
          id: string
          status: SourceSyncIngestionStatus
          error: string | null
        }[]
      }
    }
)

export type SourceSyncGetIngestJobRunStatusRequest = {
  ingestJobRunId: string
}

export type SourceSyncGetIngestJobRunStatusResponse =
  SourceSyncApiResponse<SourceSyncIngestJobRun>

// ************************************************************************* //
// ************************ ⬆⬆ DATA INGESTION ⬆⬆ ************************ //
// ************************************************************************* //

// ************************************************************************* //
// *************************** ⬇⬇ DOCUMENT ⬇⬇ *************************** //
// ************************************************************************* //

export type SourceSyncDocumentFilterConfig = {
  documentIds?: string[]
  documentExternalIds?: string[]
  documentConnectionIds?: string[]
  documentTypes?: SourceSyncDocumentType[]
  documentIngestionSources?: SourceSyncIngestionSource[]
  documentIngestionStatuses?: SourceSyncIngestionStatus[]
  metadata?: Record<string, any>
}

export type SourceSyncDocumentIncludeConfig = {
  documents?: boolean
  rawFileUrl?: boolean
  parsedTextFileUrl?: boolean
  statsBySource?: boolean
  statsByStatus?: boolean
}

export type SourceSyncDocument = {
  id: string
  name: string | null
  externalId: string
  documentType: SourceSyncDocumentType
  ingestionSource: SourceSyncIngestionSource
  ingestionStatus: SourceSyncIngestionStatus
  ingestionError: string | null
  ingestJob: SourceSyncFaunaRef
  ingestJobRun: SourceSyncFaunaRef
  connection: SourceSyncFaunaRef
  documentProperties: {
    mimeType?: string
    fileSize?: number
    characterCount?: number
    tokenCount?: number
    embeddingCount?: number
  } | null
  embeddingConfig: {
    provider?: SourceSyncEmbeddingModelProvider
    model?:
      | SourceSyncOpenAIEmbeddingModel
      | SourceSyncCohereEmbeddingModel
      | SourceSyncJinaEmbeddingModel
    dimensions?: number
    chunkSize?: number
    chunkOverlap?: number
  } | null
  providers: {
    fileStorage?: SourceSyncFileStorageType
    vectorStorage?: SourceSyncVectorStorageProvider
    embeddingModel?: SourceSyncEmbeddingModelProvider
    webScraper?: SourceSyncWebScraperProvider
  } | null
  metadata: Record<string, string | string[]>
  rawFileUrl: string | null
  parsedTextFileUrl: string | null
  tenantId: string | null
  namespace: SourceSyncNamespaceRef
  organization: SourceSyncFaunaRef
  lastSyncedAt: SourceSyncFaunaTime | null
  createdAt: SourceSyncFaunaTime
  updatedAt: SourceSyncFaunaTime
}

export type SourceSyncGetDocumentsRequest = {
  namespaceId: string
  filterConfig: SourceSyncDocumentFilterConfig
  includeConfig?: SourceSyncDocumentIncludeConfig
  pagination?: SourceSyncPaginationRequest
}

export type SourceSyncGetDocumentsResponse = SourceSyncApiResponse<
  {
    statsBySource: { source: SourceSyncIngestionSource; totalCount: number }[]
    statsByStatus: { status: SourceSyncIngestionStatus; totalCount: number }[]
    documents: SourceSyncDocument[]
  } & SourceSyncPaginationResponse
>

export type SourceSyncUpdateDocumentsRequest = {
  namespaceId: string
  filterConfig: SourceSyncDocumentFilterConfig
  data: {
    metadata: Record<string, string>
    $metadata: {
      $set?: Record<string, string | string[]>
      $append?: Record<string, string[]>
      $remove?: Record<string, string[]>
    }
  }
}

export type SourceSyncUpdateDocumentsResponse = SourceSyncApiResponse<{
  itemsUpdated: number
  documents: SourceSyncDocument[]
}>

export type SourceSyncDeleteDocumentsRequest = {
  namespaceId: string
  filterConfig: SourceSyncDocumentFilterConfig
}

export type SourceSyncDeleteDocumentsResponse = SourceSyncApiResponse<{
  itemsDeleted: number
  documents: SourceSyncFaunaRef[]
}>

export type SourceSyncResyncDocumentsRequest = {
  namespaceId: string
  filterConfig: SourceSyncDocumentFilterConfig
}

export type SourceSyncResyncDocumentsResponse = SourceSyncApiResponse<{
  itemsQueued: number
  itemsSkipped: number
  documents: {
    id: string
    status: 'QUEUED_FOR_RESYNC' | 'NOT_ELIGIBLE_FOR_RESYNC'
    error: string | null
  }[]
}>

// ************************************************************************* //
// *************************** ⬆⬆ DOCUMENT ⬆⬆ *************************** //
// ************************************************************************* //

// ************************************************************************* //
// **************************** ⬇⬇ SEARCH ⬇⬇ **************************** //
// ************************************************************************* //

export type SourceSyncSearchFilter = {
  metadata?: Record<string, string | string[]>
}

export type SourceSyncHybridConfig = {
  semanticWeight: number
  keywordWeight: number
}

export type SourceSyncSearchResult = {
  content: string
  score: number
  metadata: {
    id: string
    source: string
    type: string
  }
  document: Pick<
    SourceSyncDocument,
    'id' | 'name' | 'externalId' | 'documentType'
  > | null
}

export type SourceSyncSemanticSearchRequest = {
  query: string
  namespaceId: string
  topK?: number
  scoreThreshold?: number
  filter?: SourceSyncSearchFilter
  searchType?: SourceSyncSearchType.SEMANTIC
}

export type SourceSyncHybridSearchRequest = {
  query: string
  namespaceId: string
  topK?: number
  scoreThreshold?: number
  filter?: SourceSyncSearchFilter
  hybridConfig: SourceSyncHybridConfig
  searchType?: SourceSyncSearchType.HYBRID
}

export type SourceSyncSearchResponse = SourceSyncApiResponse<{
  results: SourceSyncSearchResult[]
}>

// ************************************************************************* //
// **************************** ⬆⬆ SEARCH ⬆⬆ **************************** //
// ************************************************************************* //

// ************************************************************************* //
// **************************** ⬇⬇ UTILS ⬇⬇ **************************** //
// ************************************************************************* //

export function isSourceSyncDocumentFromWebSource(
  document: SourceSyncDocument,
): boolean {
  return [
    SourceSyncIngestionSource.URLS_LIST,
    SourceSyncIngestionSource.WEBSITE,
    SourceSyncIngestionSource.SITEMAP,
  ].includes(document.ingestionSource)
}

export function isSourceSyncDocumentPending(
  document: SourceSyncDocument,
): boolean {
  return [
    SourceSyncIngestionStatus.PROCESSING,
    SourceSyncIngestionStatus.QUEUED,
  ].includes(document.ingestionStatus)
}

export function isSourceSyncDocumentNotPending(
  document: SourceSyncDocument,
): boolean {
  return !isSourceSyncDocumentPending(document)
}

export function isSourceSyncDocumentFromLocalFileSource(
  document: SourceSyncDocument,
): boolean {
  return document.ingestionSource === SourceSyncIngestionSource.LOCAL_FILE
}

export function isSourceSyncDocumentFromTextSource(
  document: SourceSyncDocument,
): boolean {
  return document.ingestionSource === SourceSyncIngestionSource.TEXT
}

export function isSourceSyncDocumentFromExternalSource(
  document: SourceSyncDocument,
): boolean {
  return (
    !isSourceSyncDocumentFromTextSource(document) &&
    !isSourceSyncDocumentFromWebSource(document) &&
    !isSourceSyncDocumentFromLocalFileSource(document)
  )
}

export function getMemoryName({ brainId }: { brainId: string }): string {
  return `sourcesyncbrain-${brainId}`
}

// ************************************************************************* //
// **************************** ⬆⬆ UTILS ⬆⬆ **************************** //
// ************************************************************************* //
