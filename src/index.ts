// Load environment variables from .env file
import 'dotenv/config';

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Import authentication module
import { ValidateApiKeySchema, validateApiKey } from "./authentication.js";

// Import namespaces module
import {
  CreateNamespaceSchema,
  createNamespace,
  ListNamespacesSchema,
  listNamespaces,
  GetNamespaceSchema,
  getNamespace,
  UpdateNamespaceSchema,
  updateNamespace,
  DeleteNamespaceSchema,
  deleteNamespace,
} from "./namespaces.js";

// Import ingestion module
import {
  IngestTextSchema,
  ingestText,
  IngestUrlsSchema,
  ingestUrls,
  IngestSitemapSchema,
  ingestSitemap,
  IngestWebsiteSchema,
  ingestWebsite,
  IngestNotionSchema,
  ingestNotion,
  IngestGoogleDriveSchema,
  ingestGoogleDrive,
  IngestDropboxSchema,
  ingestDropbox,
  IngestOneDriveSchema,
  ingestOneDrive,
  IngestBoxSchema,
  ingestBox,
} from "./ingestion.js";

// Import documents module
import {
  FetchDocumentsSchema,
  fetchDocuments,
  UpdateDocumentsSchema,
  updateDocuments,
  DeleteDocumentsSchema,
  deleteDocuments,
  ResyncDocumentsSchema,
  resyncDocuments,
} from "./documents.js";

// Import search module
import {
  SemanticSearchSchema,
  semanticSearch,
  HybridSearchSchema,
  hybridSearch,
} from "./search.js";

// Import connections module
import {
  CreateConnectionSchema,
  createConnection,
  ListConnectionsSchema,
  listConnections,
  GetConnectionSchema,
  getConnection,
  UpdateConnectionSchema,
  updateConnection,
  RevokeConnectionSchema,
  revokeConnection,
} from "./connections.js";

const server = new Server({
  name: "sourcesyncai-mcp",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {}
  }
});

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "validate_api_key",
        description: "Validate a SourceSync.ai API key",
        inputSchema: ValidateApiKeySchema,
      },
      {
        name: "create_namespace",
        description: "Create a new namespace in SourceSync.ai",
        inputSchema: CreateNamespaceSchema,
      },
      {
        name: "list_namespaces",
        description: "List all namespaces in SourceSync.ai",
        inputSchema: ListNamespacesSchema,
      },
      {
        name: "get_namespace",
        description: "Get details of a specific namespace in SourceSync.ai",
        inputSchema: GetNamespaceSchema,
      },
      {
        name: "update_namespace",
        description: "Update a namespace in SourceSync.ai",
        inputSchema: UpdateNamespaceSchema,
      },
      {
        name: "delete_namespace",
        description: "Delete a namespace in SourceSync.ai",
        inputSchema: DeleteNamespaceSchema,
      },
      {
        name: "ingest_text",
        description: "Ingest text content into a SourceSync.ai namespace",
        inputSchema: IngestTextSchema,
      },
      {
        name: "ingest_urls",
        description: "Ingest content from URLs into a SourceSync.ai namespace",
        inputSchema: IngestUrlsSchema,
      },
      {
        name: "ingest_sitemap",
        description: "Ingest content from a sitemap into a SourceSync.ai namespace",
        inputSchema: IngestSitemapSchema,
      },
      {
        name: "ingest_website",
        description: "Ingest content from a website into a SourceSync.ai namespace",
        inputSchema: IngestWebsiteSchema,
      },
      {
        name: "ingest_notion",
        description: "Ingest content from Notion into a SourceSync.ai namespace",
        inputSchema: IngestNotionSchema,
      },
      {
        name: "ingest_google_drive",
        description: "Ingest content from Google Drive into a SourceSync.ai namespace",
        inputSchema: IngestGoogleDriveSchema,
      },
      {
        name: "ingest_dropbox",
        description: "Ingest content from Dropbox into a SourceSync.ai namespace",
        inputSchema: IngestDropboxSchema,
      },
      {
        name: "ingest_onedrive",
        description: "Ingest content from OneDrive into a SourceSync.ai namespace",
        inputSchema: IngestOneDriveSchema,
      },
      {
        name: "ingest_box",
        description: "Ingest content from Box into a SourceSync.ai namespace",
        inputSchema: IngestBoxSchema,
      },
      {
        name: "fetch_documents",
        description: "Fetch documents from a SourceSync.ai namespace with optional filters",
        inputSchema: FetchDocumentsSchema,
      },
      {
        name: "update_documents",
        description: "Update documents in a SourceSync.ai namespace",
        inputSchema: UpdateDocumentsSchema,
      },
      {
        name: "delete_documents",
        description: "Delete documents from a SourceSync.ai namespace",
        inputSchema: DeleteDocumentsSchema,
      },
      {
        name: "resync_documents",
        description: "Resync documents in a SourceSync.ai namespace",
        inputSchema: ResyncDocumentsSchema,
      },
      {
        name: "semantic_search",
        description: "Perform semantic search in a SourceSync.ai namespace",
        inputSchema: SemanticSearchSchema,
      },
      {
        name: "hybrid_search",
        description: "Perform hybrid search (semantic + keyword) in a SourceSync.ai namespace",
        inputSchema: HybridSearchSchema,
      },
      {
        name: "create_connection",
        description: "Create a new connection to an external service in SourceSync.ai",
        inputSchema: CreateConnectionSchema,
      },
      {
        name: "list_connections",
        description: "List all connections in a SourceSync.ai namespace",
        inputSchema: ListConnectionsSchema,
      },
      {
        name: "get_connection",
        description: "Get details of a specific connection in SourceSync.ai",
        inputSchema: GetConnectionSchema,
      },
      {
        name: "update_connection",
        description: "Update a connection in SourceSync.ai",
        inputSchema: UpdateConnectionSchema,
      },
      {
        name: "revoke_connection",
        description: "Revoke a connection in SourceSync.ai",
        inputSchema: RevokeConnectionSchema,
      },
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;
    
    switch (name) {
      case "validate_api_key":
        result = await validateApiKey((args as z.infer<typeof ValidateApiKeySchema>).apiKey);
        break;
      case "create_namespace":
        result = await createNamespace(args as z.infer<typeof CreateNamespaceSchema>);
        break;
      case "list_namespaces":
        result = await listNamespaces(args as z.infer<typeof ListNamespacesSchema>);
        break;
      case "get_namespace":
        result = await getNamespace(args as z.infer<typeof GetNamespaceSchema>);
        break;
      case "update_namespace":
        result = await updateNamespace(args as z.infer<typeof UpdateNamespaceSchema>);
        break;
      case "delete_namespace":
        result = await deleteNamespace(args as z.infer<typeof DeleteNamespaceSchema>);
        break;
      case "ingest_text":
        result = await ingestText(args as z.infer<typeof IngestTextSchema>);
        break;
      case "ingest_urls":
        result = await ingestUrls(args as z.infer<typeof IngestUrlsSchema>);
        break;
      case "ingest_sitemap":
        result = await ingestSitemap(args as z.infer<typeof IngestSitemapSchema>);
        break;
      case "ingest_website":
        result = await ingestWebsite(args as z.infer<typeof IngestWebsiteSchema>);
        break;
      case "ingest_notion":
        result = await ingestNotion(args as z.infer<typeof IngestNotionSchema>);
        break;
      case "ingest_google_drive":
        result = await ingestGoogleDrive(args as z.infer<typeof IngestGoogleDriveSchema>);
        break;
      case "ingest_dropbox":
        result = await ingestDropbox(args as z.infer<typeof IngestDropboxSchema>);
        break;
      case "ingest_onedrive":
        result = await ingestOneDrive(args as z.infer<typeof IngestOneDriveSchema>);
        break;
      case "ingest_box":
        result = await ingestBox(args as z.infer<typeof IngestBoxSchema>);
        break;
      case "fetch_documents":
        result = await fetchDocuments(args as z.infer<typeof FetchDocumentsSchema>);
        break;
      case "update_documents":
        result = await updateDocuments(args as z.infer<typeof UpdateDocumentsSchema>);
        break;
      case "delete_documents":
        result = await deleteDocuments(args as z.infer<typeof DeleteDocumentsSchema>);
        break;
      case "resync_documents":
        result = await resyncDocuments(args as z.infer<typeof ResyncDocumentsSchema>);
        break;
      case "semantic_search":
        result = await semanticSearch(args as z.infer<typeof SemanticSearchSchema>);
        break;
      case "hybrid_search":
        result = await hybridSearch(args as z.infer<typeof HybridSearchSchema>);
        break;
      case "create_connection":
        result = await createConnection(args as z.infer<typeof CreateConnectionSchema>);
        break;
      case "list_connections":
        result = await listConnections(args as z.infer<typeof ListConnectionsSchema>);
        break;
      case "get_connection":
        result = await getConnection(args as z.infer<typeof GetConnectionSchema>);
        break;
      case "update_connection":
        result = await updateConnection(args as z.infer<typeof UpdateConnectionSchema>);
        break;
      case "revoke_connection":
        result = await revokeConnection(args as z.infer<typeof RevokeConnectionSchema>);
        break;
      default:
        throw new Error(`Tool not found: ${name}`);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error: ${(error as Error).message}`
        }
      ]
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("  SourceSync.ai MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

