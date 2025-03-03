/* eslint-disable @typescript-eslint/restrict-template-expressions */
import wretch, { WretchError } from 'wretch'
import { WretchClient } from './wretch.js'
import FormDataAddon from 'wretch/addons/formData'
import QueryStringAddon from 'wretch/addons/queryString'

import {
  type SourceSyncApiResponse,
  type SourceSyncCreateConnectionRequest,
  type SourceSyncCreateConnectionResponse,
  type SourceSyncCreateNamespaceRequest,
  type SourceSyncCreateNamespaceResponse,
  type SourceSyncDeleteDocumentsRequest,
  type SourceSyncDeleteDocumentsResponse,
  type SourceSyncDeleteNamespaceResponse,
  type SourceSyncDocumentsPaginatedResult,
  type SourceSyncGetConnectionRequest,
  type SourceSyncGetConnectionResponse,
  type SourceSyncGetDocumentsRequest,
  type SourceSyncGetDocumentsResponse,
  type SourceSyncGetIngestJobRunStatusRequest,
  type SourceSyncGetIngestJobRunStatusResponse,
  type SourceSyncGetNamespaceResponse,
  type SourceSyncHybridSearchRequest,
  type SourceSyncIngestConnectorRequest,
  type SourceSyncIngestFileRequest,
  type SourceSyncIngestResponse,
  type SourceSyncIngestSitemapRequest,
  type SourceSyncIngestTextRequest,
  type SourceSyncIngestUrlsRequest,
  type SourceSyncIngestWebsiteRequest,
  type SourceSyncListConnectionsRequest,
  type SourceSyncListConnectionsResponse,
  type SourceSyncListNamespacesResponse,
  type SourceSyncResyncDocumentsRequest,
  type SourceSyncResyncDocumentsResponse,
  type SourceSyncRevokeConnectionRequest,
  type SourceSyncRevokeConnectionResponse,
  type SourceSyncSearchResponse,
  type SourceSyncSemanticSearchRequest,
  type SourceSyncUpdateConnectionRequest,
  type SourceSyncUpdateConnectionResponse,
  type SourceSyncUpdateDocumentsRequest,
  type SourceSyncUpdateDocumentsResponse,
  type SourceSyncUpdateNamespaceRequest,
  type SourceSyncUpdateNamespaceResponse,
} from './sourcesync.types.js'
import { toLowerKebabCase } from './utils.js'

const SOURCESYNC_API_HOST_URL = 'https://api.sourcesync.ai'

/**
 * Log SourceSync API errors with detailed information
 */
export function logSourceSyncApiError(error: WretchError, message: string) {
  console.error(`SourceSync API Error: ${message}`, {
    status: error.status,
    message: error.message,
    response: error.response,
    text: error.text,
    json: error.json,
  })
}

/**
 * SourceSync API client for interacting with the SourceSync.ai API
 */
export class SourceSyncApiClient {
  private static readonly CHUNK_CONFIG = {
    chunkSize: 400,
    chunkOverlap: 50,
  }

  private readonly namespaceId: string
  private readonly client: ReturnType<typeof WretchClient>

  /**
   * Create a new SourceSync API client
   */
  public constructor({
    apiKey,
    tenantId,
    namespaceId,
    baseUrl = SOURCESYNC_API_HOST_URL,
  }: {
    apiKey: string
    tenantId: string | null
    namespaceId: string
    baseUrl?: string
  }) {
    this.namespaceId = namespaceId
    this.client = WretchClient(baseUrl)
      .auth(`Bearer ${apiKey}`)
      .headers(tenantId ? { 'X-Tenant-ID': tenantId } : {})
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(400, (error: WretchError) => {
        logSourceSyncApiError(error, 'Validation Error')
        throw new Error('Validation Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(401, (error: WretchError) => {
        logSourceSyncApiError(error, 'Authentication Error')
        throw new Error('Authentication Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(403, (error: WretchError) => {
        logSourceSyncApiError(error, 'Forbidden Error')
        throw new Error('Forbidden Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(404, (error: WretchError) => {
        logSourceSyncApiError(error, 'Not Found Error')
        throw new Error('Not Found Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(405, (error: WretchError) => {
        logSourceSyncApiError(error, 'Method Not Allowed Error')
        throw new Error('Method Not Allowed Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(429, (error: WretchError) => {
        logSourceSyncApiError(error, 'Too Many Requests Error')
        throw new Error('Too Many Requests Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcher(500, (error: WretchError) => {
        logSourceSyncApiError(error, 'Server Error')
        throw new Error('Server Error')
      })
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .catcherFallback((error: WretchError) => {
        logSourceSyncApiError(error, 'Server Error')
        throw new Error('Server Error')
      })
  }

  /**
   * Get a namespace identifier from a brand ID
   */
  public static getNamespaceIdentifier({
    brandId,
  }: {
    brandId: string
  }): string {
    return `sitegpt_${brandId}`
  }

  /**
   * Create a new namespace
   */
  public async createNamespace({
    name,
    fileStorageConfig,
    vectorStorageConfig,
    embeddingModelConfig,
    webScraperConfig,
  }: SourceSyncCreateNamespaceRequest): Promise<SourceSyncCreateNamespaceResponse> {
    return this.client
      .url('/v1/namespaces')
      .json({
        name,
        fileStorageConfig,
        vectorStorageConfig,
        embeddingModelConfig,
        webScraperConfig,
      } satisfies SourceSyncCreateNamespaceRequest)
      .post()
      .json<SourceSyncCreateNamespaceResponse>()
  }

  /**
   * List all namespaces
   */
  public async listNamespaces(): Promise<SourceSyncListNamespacesResponse> {
    return this.client
      .url('/v1/namespaces')
      .get()
      .json<SourceSyncListNamespacesResponse>()
  }

  /**
   * Get a namespace by ID
   */
  public async getNamespace(): Promise<SourceSyncGetNamespaceResponse> {
    return this.client
      .url(`/v1/namespaces/${this.namespaceId}`)
      .get()
      .json<SourceSyncGetNamespaceResponse>()
  }

  /**
   * Update a namespace
   */
  public async updateNamespace({
    fileStorageConfig,
    vectorStorageConfig,
    embeddingModelConfig,
    webScraperConfig,
    notionConfig,
    googleDriveConfig,
    dropboxConfig,
    onedriveConfig,
    boxConfig,
    sharepointConfig,
  }: SourceSyncUpdateNamespaceRequest): Promise<SourceSyncUpdateNamespaceResponse> {
    return this.client
      .url(`/v1/namespaces/${this.namespaceId}`)
      .json({
        fileStorageConfig,
        vectorStorageConfig,
        embeddingModelConfig,
        webScraperConfig,
        notionConfig,
        googleDriveConfig,
        dropboxConfig,
        onedriveConfig,
        boxConfig,
        sharepointConfig,
      } satisfies SourceSyncUpdateNamespaceRequest)
      .patch()
      .json<SourceSyncUpdateNamespaceResponse>()
  }

  /**
   * Delete a namespace
   */
  public async deleteNamespace(): Promise<SourceSyncDeleteNamespaceResponse> {
    return this.client
      .url(`/v1/namespaces/${this.namespaceId}`)
      .delete()
      .json<SourceSyncDeleteNamespaceResponse>()
  }

  /**
   * Create a new connection
   */
  public async createConnection({
    name,
    connector,
    clientRedirectUrl,
  }: Omit<
    SourceSyncCreateConnectionRequest,
    'namespaceId'
  >): Promise<SourceSyncCreateConnectionResponse> {
    return this.client
      .url('/v1/connections')
      .json({
        namespaceId: this.namespaceId,
        name,
        connector,
        clientRedirectUrl,
      } satisfies SourceSyncCreateConnectionRequest)
      .post()
      .json<SourceSyncCreateConnectionResponse>()
  }

  /**
   * List all connections
   */
  public async listConnections({
    connector,
  }: SourceSyncListConnectionsRequest): Promise<SourceSyncListConnectionsResponse> {
    return this.client
      .url('/v1/connections')
      .query({ namespaceId: this.namespaceId, connector })
      .get()
      .json<SourceSyncListConnectionsResponse>()
  }

  /**
   * Get a connection by ID
   */
  public async getConnection({
    connectionId,
  }: SourceSyncGetConnectionRequest): Promise<SourceSyncGetConnectionResponse> {
    return this.client
      .url(`/v1/connections/${connectionId}`)
      .query({ namespaceId: this.namespaceId })
      .get()
      .json<SourceSyncGetConnectionResponse>()
  }

  /**
   * Update a connection
   */
  public async updateConnection({
    connectionId,
    name,
    clientRedirectUrl,
  }: Omit<SourceSyncUpdateConnectionRequest, 'namespaceId'> & {
    connectionId: string
  }): Promise<SourceSyncUpdateConnectionResponse> {
    return this.client
      .url(`/v1/connections/${connectionId}`)
      .json({
        namespaceId: this.namespaceId,
        name,
        clientRedirectUrl,
      } satisfies SourceSyncUpdateConnectionRequest)
      .patch()
      .json<SourceSyncUpdateConnectionResponse>()
  }

  /**
   * Revoke a connection
   */
  public async revokeConnection({
    connectionId,
  }: Omit<SourceSyncRevokeConnectionRequest, 'namespaceId'> & {
    connectionId: string
  }): Promise<SourceSyncRevokeConnectionResponse> {
    return this.client
      .url(`/v1/connections/${connectionId}/revoke`)
      .json({
        namespaceId: this.namespaceId,
      } satisfies SourceSyncRevokeConnectionRequest)
      .post()
      .json<SourceSyncRevokeConnectionResponse>()
  }

  /**
   * Ingest text content
   */
  public async ingestText({
    ingestConfig,
  }: Omit<
    SourceSyncIngestTextRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url('/v1/ingest/text')
      .json({
        namespaceId: this.namespaceId,
        ingestConfig: {
          ...ingestConfig,
          chunkConfig: SourceSyncApiClient.CHUNK_CONFIG,
        },
      } satisfies SourceSyncIngestTextRequest)
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Ingest a file
   */
  public async ingestFile({
    file,
    metadata,
  }: Omit<
    SourceSyncIngestFileRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url('/v1/ingest/file')
      .formData({
        namespaceId: this.namespaceId,
        file,
        metadata: JSON.stringify(metadata),
        chunkConfig: JSON.stringify(SourceSyncApiClient.CHUNK_CONFIG),
      })
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Ingest URLs
   */
  public async ingestUrls({
    ingestConfig,
  }: Omit<
    SourceSyncIngestUrlsRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url('/v1/ingest/urls')
      .json({
        namespaceId: this.namespaceId,
        ingestConfig: {
          ...ingestConfig,
          chunkConfig: SourceSyncApiClient.CHUNK_CONFIG,
        },
      } satisfies SourceSyncIngestUrlsRequest)
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Ingest a sitemap
   */
  public async ingestSitemap({
    ingestConfig,
  }: Omit<
    SourceSyncIngestSitemapRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url('/v1/ingest/sitemap')
      .json({
        namespaceId: this.namespaceId,
        ingestConfig: {
          ...ingestConfig,
          chunkConfig: SourceSyncApiClient.CHUNK_CONFIG,
        },
      } satisfies SourceSyncIngestSitemapRequest)
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Ingest a website
   */
  public async ingestWebsite({
    ingestConfig,
  }: Omit<
    SourceSyncIngestWebsiteRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url('/v1/ingest/website')
      .json({
        namespaceId: this.namespaceId,
        ingestConfig: {
          ...ingestConfig,
          chunkConfig: SourceSyncApiClient.CHUNK_CONFIG,
        },
      } satisfies SourceSyncIngestWebsiteRequest)
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Ingest content from a connector
   */
  public async ingestConnector({
    ingestConfig,
  }: Omit<
    SourceSyncIngestConnectorRequest,
    'namespaceId'
  >): Promise<SourceSyncIngestResponse> {
    return this.client
      .url(`/v1/ingest/${toLowerKebabCase(ingestConfig.source)}`)
      .json({
        namespaceId: this.namespaceId,
        ingestConfig: {
          ...ingestConfig,
          chunkConfig: SourceSyncApiClient.CHUNK_CONFIG,
        },
      } satisfies SourceSyncIngestConnectorRequest)
      .post()
      .json<SourceSyncIngestResponse>()
  }

  /**
   * Get the status of an ingest job run
   */
  public async getIngestJobRunStatus({
    ingestJobRunId,
  }: Omit<
    SourceSyncGetIngestJobRunStatusRequest,
    'namespaceId'
  >): Promise<SourceSyncGetIngestJobRunStatusResponse> {
    return this.client
      .url(`/v1/ingest-job-runs/${ingestJobRunId}`)
      .query({ namespaceId: this.namespaceId })
      .get()
      .json<SourceSyncGetIngestJobRunStatusResponse>()
  }

  /**
   * Get documents
   */
  public async getDocuments({
    filterConfig,
    includeConfig,
    pagination,
  }: Omit<
    SourceSyncGetDocumentsRequest,
    'namespaceId'
  >): Promise<SourceSyncDocumentsPaginatedResult> {
    const response = await this.client
      .url(`/v1/documents`)
      .json({
        namespaceId: this.namespaceId,
        filterConfig,
        includeConfig,
        pagination,
      } satisfies SourceSyncGetDocumentsRequest)
      .post()
      .json<SourceSyncGetDocumentsResponse>()

    return {
      data: response.data.documents,
      hasNextPage: response.data.hasNextPage,
      nextCursor: response.data.nextCursor,
      statsBySource: response.data.statsBySource,
      statsByStatus: response.data.statsByStatus,
    }
  }

  /**
   * Update documents
   */
  public async updateDocuments({
    filterConfig,
    data,
  }: Omit<
    SourceSyncUpdateDocumentsRequest,
    'namespaceId'
  >): Promise<SourceSyncUpdateDocumentsResponse> {
    return this.client
      .url(`/v1/documents`)
      .json({
        namespaceId: this.namespaceId,
        filterConfig,
        data,
      } satisfies SourceSyncUpdateDocumentsRequest)
      .patch()
      .json<SourceSyncUpdateDocumentsResponse>()
  }

  /**
   * Delete documents
   */
  public async deleteDocuments({
    filterConfig,
  }: Omit<
    SourceSyncDeleteDocumentsRequest,
    'namespaceId'
  >): Promise<SourceSyncDeleteDocumentsResponse> {
    return this.client
      .url(`/v1/documents`)
      .json({
        namespaceId: this.namespaceId,
        filterConfig,
      } satisfies SourceSyncDeleteDocumentsRequest)
      .delete()
      .json<SourceSyncDeleteDocumentsResponse>()
  }

  /**
   * Resync documents
   */
  public async resyncDocuments({
    filterConfig,
  }: Omit<
    SourceSyncResyncDocumentsRequest,
    'namespaceId'
  >): Promise<SourceSyncResyncDocumentsResponse> {
    return this.client
      .url(`/v1/documents/resync`)
      .json({
        namespaceId: this.namespaceId,
        filterConfig,
      } satisfies SourceSyncResyncDocumentsRequest)
      .post()
      .json<SourceSyncResyncDocumentsResponse>()
  }

  /**
   * Perform a semantic search
   */
  public async semanticSearch({
    query,
    topK,
    scoreThreshold,
    filter,
    searchType,
  }: Omit<
    SourceSyncSemanticSearchRequest,
    'namespaceId'
  >): Promise<SourceSyncSearchResponse> {
    return this.client
      .url('/v1/search')
      .json({
        query,
        namespaceId: this.namespaceId,
        topK,
        scoreThreshold,
        filter,
        searchType,
      } satisfies SourceSyncSemanticSearchRequest)
      .post()
      .json<SourceSyncSearchResponse>()
  }

  /**
   * Perform a hybrid search
   */
  public async hybridSearch({
    query,
    topK,
    scoreThreshold,
    filter,
    hybridConfig,
    searchType,
  }: Omit<
    SourceSyncHybridSearchRequest,
    'namespaceId'
  >): Promise<SourceSyncSearchResponse> {
    return this.client
      .url('/v1/search/hybrid')
      .json({
        query,
        namespaceId: this.namespaceId,
        topK,
        scoreThreshold,
        filter,
        hybridConfig,
        searchType,
      } satisfies SourceSyncHybridSearchRequest)
      .post()
      .json<SourceSyncSearchResponse>()
  }
}

/**
 * Create a new SourceSync API client
 */
export function sourcesync({
  apiKey,
  tenantId,
  namespaceId,
}: {
  apiKey: string
  namespaceId: string
  tenantId: string | null
}): SourceSyncApiClient {
  return new SourceSyncApiClient({ apiKey, tenantId, namespaceId })
}
