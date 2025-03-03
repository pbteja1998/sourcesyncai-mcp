#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import wretch from 'wretch'

// Import SourceSync client
import { sourcesync } from './sourcesync.js'
// Import schemas
import {
  validateApiKeySchema,
  createNamespaceSchema,
  listNamespacesSchema,
  getNamespaceSchema,
  updateNamespaceSchema,
  deleteNamespaceSchema,
  ingestTextSchema,
  IngestFileSchema,
  IngestUrlsSchema,
  IngestSitemapSchema,
  IngestWebsiteSchema,
  IngestConnectorSchema,
  IngestJobRunStatusSchema,
  FetchDocumentsSchema,
  UpdateDocumentsSchema,
  DeleteDocumentsSchema,
  ResyncDocumentsSchema,
  SemanticSearchSchema,
  HybridSearchSchema,
  CreateConnectionSchema,
  ListConnectionsSchema,
  GetConnectionSchema,
  UpdateConnectionSchema,
  RevokeConnectionSchema,
  FetchUrlContentSchema,
  ValidateApiKeyParams,
  CreateNamespaceParams,
  ListNamespacesParams,
  GetNamespaceParams,
  UpdateNamespaceParams,
  DeleteNamespaceParams,
  IngestTextParams,
  FetchUrlContentParams,
} from './schemas.js'
// Import types
import {
  SourceSyncIngestionSource,
  SourceSyncChunkConfig,
  SourceSyncConnector,
  SourceSyncSearchType,
  SourceSyncDocumentType,
  SourceSyncIngestionStatus,
} from './sourcesync.types.js'

// Initialize the MCP server
const server = new McpServer({
  name: 'SourceSyncAI',
  version: '1.0.0',
})

/**
 * Helper function to create a SourceSync client with the provided parameters
 */
function createClient({
  apiKey,
  namespaceId,
  tenantId,
}: {
  apiKey?: string
  namespaceId?: string
  tenantId?: string
}) {
  return sourcesync({
    apiKey: apiKey || process.env.SOURCESYNC_API_KEY || '',
    namespaceId: namespaceId || process.env.SOURCESYNC_NAMESPACE_ID || '',
    tenantId: tenantId || process.env.SOURCESYNC_TENANT_ID || '',
  })
}

/**
 * Helper function to safely handle API responses and errors
 * This ensures the response format matches what the MCP SDK expects
 * while preserving the original error messages from SourceSync
 */
async function safeApiCall<T>(apiCall: () => Promise<T>) {
  try {
    const result = await apiCall()
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(result),
        },
      ],
    }
  } catch (error: any) {
    // Preserve the original error structure from SourceSync
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(error),
        },
      ],
      isError: true,
    }
  }
}

// Register authentication tool
server.tool(
  'validateApiKey',
  validateApiKeySchema.shape,
  async (params: ValidateApiKeyParams) => {
    return safeApiCall(async () => {
      // Create a client with the provided API key
      const client = createClient({})

      // Validate the API key by listing namespaces
      // @ts-ignore - Ignoring type error for now to focus on error handling
      return await client.listNamespaces()
    })
  },
)

// Register namespace tools
server.tool(
  'createNamespace',
  createNamespaceSchema.shape,
  async (params: CreateNamespaceParams) => {
    return safeApiCall(async () => {
      const { tenantId, ...createParams } = params

      // Create a client with the provided API key
      const client = createClient({ tenantId })

      return await client.createNamespace(createParams)
    })
  },
)

server.tool(
  'listNamespaces',
  listNamespacesSchema.shape,
  async (params: ListNamespacesParams) => {
    return safeApiCall(async () => {
      const { tenantId } = params

      // Create a client with the provided API key
      const client = createClient({ tenantId })

      return await client.listNamespaces()
    })
  },
)

server.tool(
  'getNamespace',
  getNamespaceSchema.shape,
  async (params: GetNamespaceParams) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.getNamespace()
    })
  },
)

server.tool(
  'updateNamespace',
  updateNamespaceSchema.shape,
  async (params: UpdateNamespaceParams) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, ...updateParams } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.updateNamespace(updateParams)
    })
  },
)

server.tool(
  'deleteNamespace',
  deleteNamespaceSchema.shape,
  async (params: DeleteNamespaceParams) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.deleteNamespace()
    })
  },
)

// Register ingestion tools
server.tool(
  'ingestText',
  ingestTextSchema.shape,
  async (params: IngestTextParams) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, ingestConfig } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Direct passthrough to the API
      return await client.ingestText({
        ingestConfig,
      })
    })
  },
)

// Add ingestFile tool
server.tool('ingestFile', IngestFileSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const { namespaceId, tenantId, file, metadata, chunkConfig } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Direct passthrough to the API
    return await client.ingestFile({
      file: file as unknown as File, // Type cast to File as required by the client
      metadata,
      chunkConfig,
    })
  })
})

// Add ingestUrls tool
server.tool('ingestUrls', IngestUrlsSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const { namespaceId, tenantId, ingestConfig } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Direct passthrough to the API
    return await client.ingestUrls({
      ingestConfig,
    })
  })
})

// Add ingestSitemap tool
server.tool('ingestSitemap', IngestSitemapSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const { namespaceId, ingestConfig, tenantId } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Direct passthrough to the API
    return await client.ingestSitemap({
      ingestConfig,
    })
  })
})

// Add ingestWebsite tool
server.tool('ingestWebsite', IngestWebsiteSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const { namespaceId, ingestConfig, tenantId } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Direct passthrough to the API
    return await client.ingestWebsite({
      ingestConfig,
    })
  })
})

// Add ingestConnector tool
server.tool(
  'ingestConnector',
  'Ingests all documents in the connector that are in backlog or failed status. No need to provide the document ids or file ids for the ingestion. Ids are already in the backlog when picked thorough the picker. If not, the user has to go through the authorization flow again, where they will be asked to pick the documents again.',
  IngestConnectorSchema.shape,
  async (params) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, ingestConfig } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.ingestConnector({
        ingestConfig: {
          ...ingestConfig,
          source: ingestConfig.source as unknown as SourceSyncIngestionSource,
        },
      })
    })
  },
)

// Add getIngestJobRunStatus tool
server.tool(
  'getIngestJobRunStatus',
  IngestJobRunStatusSchema.shape,
  async (params) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, ingestJobRunId } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.getIngestJobRunStatus({
        ingestJobRunId,
      })
    })
  },
)

// Register document tools
server.tool(
  'fetchDocuments',
  FetchDocumentsSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const {
        namespaceId,
        documentIds,
        pagination,
        tenantId,
        filterConfig,
        includeConfig,
      } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Create a proper filter config if not provided
      const finalFilterConfig = filterConfig || {}

      // Add documentIds to filter if provided and not already in filter
      if (
        documentIds &&
        documentIds.length > 0 &&
        !finalFilterConfig.documentIds
      ) {
        finalFilterConfig.documentIds = documentIds
      }

      // Call the getDocuments method with properly structured parameters
      return await client.getDocuments({
        filterConfig: {
          ...finalFilterConfig,
          // Convert string enum values to their SourceSync enum equivalents
          documentTypes: finalFilterConfig.documentTypes?.map(
            (type: string) =>
              SourceSyncDocumentType[
                type as keyof typeof SourceSyncDocumentType
              ],
          ),
          documentIngestionSources:
            finalFilterConfig.documentIngestionSources?.map(
              (source: string) =>
                SourceSyncIngestionSource[
                  source as keyof typeof SourceSyncIngestionSource
                ],
            ),
          documentIngestionStatuses:
            finalFilterConfig.documentIngestionStatuses?.map(
              (status: string) =>
                SourceSyncIngestionStatus[
                  status as keyof typeof SourceSyncIngestionStatus
                ],
            ),
        },
        pagination,
        includeConfig: includeConfig || { documents: true },
      })
    })
  },
)

// Add document management tools
server.tool('getDocuments', FetchDocumentsSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const {
      namespaceId,
      tenantId,
      documentIds,
      pagination,
      filterConfig,
      includeConfig,
    } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Add documentIds to filterConfig if provided
    if (documentIds && documentIds.length > 0 && !filterConfig.documentIds) {
      filterConfig.documentIds = documentIds
    }

    // Call the getDocuments method with properly structured parameters
    return await client.getDocuments({
      filterConfig: {
        ...filterConfig,
        // Convert string enum values to their SourceSync enum equivalents
        documentTypes: filterConfig.documentTypes?.map(
          (type: string) =>
            SourceSyncDocumentType[type as keyof typeof SourceSyncDocumentType],
        ),
        documentIngestionSources: filterConfig.documentIngestionSources?.map(
          (source: string) =>
            SourceSyncIngestionSource[
              source as keyof typeof SourceSyncIngestionSource
            ],
        ),
        documentIngestionStatuses: filterConfig.documentIngestionStatuses?.map(
          (status: string) =>
            SourceSyncIngestionStatus[
              status as keyof typeof SourceSyncIngestionStatus
            ],
        ),
      },
      pagination,
      includeConfig: includeConfig || { documents: true },
    })
  })
})

server.tool(
  'updateDocuments',
  UpdateDocumentsSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const { namespaceId, documents, tenantId, filterConfig, data } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Extract document IDs and add to filter if not already present
      if (documents && documents.length > 0 && !filterConfig.documentIds) {
        filterConfig.documentIds = documents.map((doc: any) => doc.documentId)
      }

      // Prepare metadata for update
      const metadata: Record<string, any> = {}

      if (documents) {
        documents.forEach((doc: any) => {
          if (doc.metadata) {
            // Combine all document metadata
            Object.assign(metadata, doc.metadata)
          }
        })
      }

      // Prepare the data object
      if (Object.keys(metadata).length > 0) {
        data.metadata = metadata
      }

      // Call the updateDocuments method with properly structured parameters
      return await client.updateDocuments({
        filterConfig: {
          ...filterConfig,
          // Convert string enum values to their SourceSync enum equivalents
          documentTypes: filterConfig.documentTypes?.map(
            (type: string) =>
              SourceSyncDocumentType[
                type as keyof typeof SourceSyncDocumentType
              ],
          ),
          documentIngestionSources: filterConfig.documentIngestionSources?.map(
            (source: string) =>
              SourceSyncIngestionSource[
                source as keyof typeof SourceSyncIngestionSource
              ],
          ),
          documentIngestionStatuses:
            filterConfig.documentIngestionStatuses?.map(
              (status: string) =>
                SourceSyncIngestionStatus[
                  status as keyof typeof SourceSyncIngestionStatus
                ],
            ),
        },
        data: {
          metadata: data?.metadata || {},
          $metadata: data?.$metadata || {
            $set: {},
            $append: {},
            $remove: {},
          },
        },
      })
    })
  },
)

server.tool(
  'deleteDocuments',
  DeleteDocumentsSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const { namespaceId, documentIds, tenantId, filterConfig } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Add documentIds to filter if provided and not already in filter
      if (documentIds && documentIds.length > 0 && !filterConfig.documentIds) {
        filterConfig.documentIds = documentIds
      }

      // Call the deleteDocuments method with properly structured parameters
      return await client.deleteDocuments({
        filterConfig: {
          ...filterConfig,
          // Convert string enum values to their SourceSync enum equivalents
          documentTypes: filterConfig.documentTypes?.map(
            (type: string) =>
              SourceSyncDocumentType[
                type as keyof typeof SourceSyncDocumentType
              ],
          ),
          documentIngestionSources: filterConfig.documentIngestionSources?.map(
            (source: string) =>
              SourceSyncIngestionSource[
                source as keyof typeof SourceSyncIngestionSource
              ],
          ),
          documentIngestionStatuses:
            filterConfig.documentIngestionStatuses?.map(
              (status: string) =>
                SourceSyncIngestionStatus[
                  status as keyof typeof SourceSyncIngestionStatus
                ],
            ),
        },
      })
    })
  },
)

server.tool(
  'resyncDocuments',
  ResyncDocumentsSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const { namespaceId, documentIds, tenantId, filterConfig } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Add documentIds to filter if provided and not already in filter
      if (documentIds && documentIds.length > 0 && !filterConfig.documentIds) {
        filterConfig.documentIds = documentIds
      }

      // Call the resyncDocuments method with properly structured parameters
      return await client.resyncDocuments({
        filterConfig: {
          ...filterConfig,
          // Convert string enum values to their SourceSync enum equivalents
          documentTypes: filterConfig.documentTypes?.map(
            (type: string) =>
              SourceSyncDocumentType[
                type as keyof typeof SourceSyncDocumentType
              ],
          ),
          documentIngestionSources: filterConfig.documentIngestionSources?.map(
            (source: string) =>
              SourceSyncIngestionSource[
                source as keyof typeof SourceSyncIngestionSource
              ],
          ),
          documentIngestionStatuses:
            filterConfig.documentIngestionStatuses?.map(
              (status: string) =>
                SourceSyncIngestionStatus[
                  status as keyof typeof SourceSyncIngestionStatus
                ],
            ),
        },
      })
    })
  },
)

// Add search tools
server.tool(
  'semanticSearch',
  SemanticSearchSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const {
        namespaceId,
        query,
        topK,
        scoreThreshold,
        filter,
        tenantId,
        searchType,
      } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Call the semanticSearch method with the searchType (default to SEMANTIC if not provided)
      return await client.semanticSearch({
        query,
        topK,
        scoreThreshold,
        filter,
        searchType: searchType || SourceSyncSearchType.SEMANTIC,
      })
    })
  },
)

server.tool('hybridSearch', HybridSearchSchema.shape, async (params: any) => {
  return safeApiCall(async () => {
    const {
      namespaceId,
      query,
      topK,
      scoreThreshold,
      filter,
      hybridConfig,
      tenantId,
      searchType,
    } = params

    // Create a client with the provided parameters
    const client = createClient({ namespaceId, tenantId })

    // Call the hybridSearch method with the searchType (default to HYBRID if not provided)
    return await client.hybridSearch({
      query,
      topK,
      scoreThreshold,
      filter,
      hybridConfig,
      searchType: searchType || SourceSyncSearchType.HYBRID,
    })
  })
})

// Register connection tools
server.tool(
  'createConnection',
  'Creates a new connection to a specific source. The connector parameter should be a valid SourceSync connector enum value. The clientRedirectUrl parameter is optional and can be used to specify a custom redirect URL for the connection. This will give you a authorization url which you can redirect the user to. The user will then be asked to pick the documents they want to ingest.',
  CreateConnectionSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const { namespaceId, name, connector, clientRedirectUrl, tenantId } =
        params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Call the createConnection method with the connector as enum
      return await client.createConnection({
        name,
        connector,
        clientRedirectUrl,
      })
    })
  },
)

server.tool(
  'listConnections',
  ListConnectionsSchema.shape,
  async (params: any) => {
    return safeApiCall(async () => {
      const { namespaceId, connector, tenantId } = params

      // Create a client with the provided parameters
      const client = createClient({ namespaceId, tenantId })

      // Call the listConnections method with the connector as enum if provided
      return await client.listConnections({
        connector: connector || undefined,
      })
    })
  },
)

server.tool('getConnection', GetConnectionSchema.shape, async (params) => {
  return safeApiCall(async () => {
    const { namespaceId, tenantId, connectionId } = params

    // Create a client with the provided API key
    const client = createClient({ namespaceId, tenantId })

    return await client.getConnection({
      connectionId,
    })
  })
})

server.tool(
  'updateConnection',
  'Updates a connection to a specific source. The connector parameter should be a valid SourceSync connector enum value. The clientRedirectUrl parameter is optional and can be used to specify a custom redirect URL for the connection. This will give you a authorization url which you can redirect the user to. The user will then be asked to pick the documents they want to ingest. This is useful if you want to update the connection to a different source or if you want to update the clientRedirectUrl or if you want to pick a different or new set of documents.',
  UpdateConnectionSchema.shape,
  async (params) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, connectionId, name, clientRedirectUrl } =
        params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.updateConnection({
        connectionId,
        name,
        clientRedirectUrl,
      })
    })
  },
)

server.tool(
  'revokeConnection',
  RevokeConnectionSchema.shape,
  async (params) => {
    return safeApiCall(async () => {
      const { namespaceId, tenantId, connectionId } = params

      // Create a client with the provided API key
      const client = createClient({ namespaceId, tenantId })

      return await client.revokeConnection({
        connectionId,
      })
    })
  },
)

// Add a tool to fetch content from a URL, particularly useful for parsed text file URLs
server.tool(
  'fetchUrlContent',
  'Fetches the content of a URL. Particularly useful for fetching parsed text file URLs.',
  FetchUrlContentSchema.shape,
  async (params: FetchUrlContentParams) => {
    return safeApiCall(async () => {
      const { url, apiKey, tenantId } = params

      try {
        // Create a wretch client with authentication if provided
        let client = wretch(url)

        if (apiKey) {
          client = client.auth(`Bearer ${apiKey}`)
        }

        if (tenantId) {
          client = client.headers({
            'X-Tenant-ID': tenantId,
          })
        }

        // Fetch the content from the URL
        const content = await client.get().text()
        return { content }
      } catch (error: any) {
        throw new Error(`Error fetching URL content: ${error.message}`)
      }
    })
  },
)

async function main() {
  console.error('Starting SourceSync.ai MCP Server...')
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('SourceSync.ai MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
