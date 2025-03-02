// Load environment variables from .env file
import 'dotenv/config';

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import util from 'util'; // Add util for better logging

// Import utils
import { SourceSyncError } from "./utils.js";

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
  GetIngestJobRunStatusSchema,
  getIngestJobRunStatus,
  // IngestFileSchema,
  // ingestFile,
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

// Create an MCP server
console.error("Initializing SourceSync.ai MCP Server...");
const server = new McpServer({
  name: "sourcesyncai-mcp",
  version: "1.0.0"
});

// Register authentication tools
console.error("Registering validate_api_key tool...");
console.error(`Schema: ${util.inspect(ValidateApiKeySchema.shape, { depth: 2 })}`);
server.tool(
  "validate_api_key",
  "Validate the SourceSync.ai API key set in the SOURCESYNC_DEFAULT_API_KEY environment variable.",
  ValidateApiKeySchema.shape,
  async () => {
    try {
      const result = await validateApiKey();
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Register namespace tools
server.tool(
  "create_namespace",
  "Create a new namespace in SourceSync.ai.",
  CreateNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await createNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "list_namespaces",
  "List all namespaces in SourceSync.ai.",
  ListNamespacesSchema.shape,
  async (params) => {
    try {
      const result = await listNamespaces(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "get_namespace",
  "Get details of a specific namespace in SourceSync.ai.",
  GetNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await getNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "update_namespace",
  "Update a namespace in SourceSync.ai.",
  UpdateNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await updateNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "delete_namespace",
  "Delete a namespace in SourceSync.ai.",
  DeleteNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await deleteNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Register ingestion tools
server.tool(
  "ingest_text",
  "Ingest text content into a SourceSync.ai namespace.",
  IngestTextSchema.shape,
  async (params) => {
    try {
      const result = await ingestText(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_urls",
  "Ingest content from URLs into a SourceSync.ai namespace.",
  IngestUrlsSchema.shape,
  async (params) => {
    try {
      const result = await ingestUrls(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_sitemap",
  "Ingest content from a sitemap into a SourceSync.ai namespace.",
  IngestSitemapSchema.shape,
  async (params) => {
    try {
      const result = await ingestSitemap(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_website",
  "Ingest content from a website into a SourceSync.ai namespace.",
  IngestWebsiteSchema.shape,
  async (params) => {
    try {
      const result = await ingestWebsite(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_notion",
  "Ingest content from Notion into a SourceSync.ai namespace.",
  IngestNotionSchema.shape,
  async (params) => {
    try {
      const result = await ingestNotion(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_google_drive",
  "Ingest content from Google Drive into a SourceSync.ai namespace.",
  IngestGoogleDriveSchema.shape,
  async (params) => {
    try {
      const result = await ingestGoogleDrive(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_dropbox",
  "Ingest content from Dropbox into a SourceSync.ai namespace.",
  IngestDropboxSchema.shape,
  async (params) => {
    try {
      const result = await ingestDropbox(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_onedrive",
  "Ingest content from OneDrive into a SourceSync.ai namespace.",
  IngestOneDriveSchema.shape,
  async (params) => {
    try {
      const result = await ingestOneDrive(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "ingest_box",
  "Ingest content from Box into a SourceSync.ai namespace.",
  IngestBoxSchema.shape,
  async (params) => {
    try {
      const result = await ingestBox(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// server.tool(
//   "ingest_file",
//   "Ingest a file into a SourceSync.ai namespace.",
//   IngestFileSchema.shape,
//   async (params) => {
//     try {
//       const result = await ingestFile(params);
//       return {
//         content: [{ type: "text", text: JSON.stringify(result) }]
//       };
//     } catch (error) {
//       return handleToolError(error);
//     }
//   }
// );

server.tool(
  "get_ingest_job_run_status",
  "Get the status of an ingestion job run. API key and namespace ID are optional if SOURCESYNC_DEFAULT_API_KEY and SOURCESYNC_DEFAULT_NAMESPACE_ID environment variables are set.",
  GetIngestJobRunStatusSchema.shape,
  async (params) => {
    try {
      const result = await getIngestJobRunStatus(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Register document tools
server.tool(
  "fetch_documents",
  "Fetch documents from a SourceSync.ai namespace with optional filters.",
  FetchDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await fetchDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "update_documents",
  "Update documents in a SourceSync.ai namespace.",
  UpdateDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await updateDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "delete_documents",
  "Delete documents from a SourceSync.ai namespace.",
  DeleteDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await deleteDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "resync_documents",
  "Resync documents in a SourceSync.ai namespace.",
  ResyncDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await resyncDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Register search tools
server.tool(
  "semantic_search",
  "Perform semantic search in a SourceSync.ai namespace.",
  SemanticSearchSchema.shape,
  async (params) => {
    try {
      const result = await semanticSearch(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "hybrid_search",
  "Perform hybrid search (semantic + keyword) in a SourceSync.ai namespace.",
  HybridSearchSchema.shape,
  async (params) => {
    try {
      const result = await hybridSearch(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Register connection tools
server.tool(
  "create_connection",
  "Create a new connection to an external service in SourceSync.ai.",
  CreateConnectionSchema.shape,
  async (params) => {
    try {
      const result = await createConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "list_connections",
  "List all connections in a SourceSync.ai namespace.",
  ListConnectionsSchema.shape,
  async (params) => {
    try {
      const result = await listConnections(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "get_connection",
  "Get details of a specific connection in SourceSync.ai.",
  GetConnectionSchema.shape,
  async (params) => {
    try {
      const result = await getConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "update_connection",
  "Update a connection in SourceSync.ai.",
  UpdateConnectionSchema.shape,
  async (params) => {
    try {
      const result = await updateConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

server.tool(
  "revoke_connection",
  "Revoke a connection in SourceSync.ai.",
  RevokeConnectionSchema.shape,
  async (params) => {
    try {
      const result = await revokeConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return handleToolError(error);
    }
  }
);

// Add a simple test tool
console.error("Registering test_tool...");
server.tool(
  "test_tool",
  "A simple test tool to verify MCP server connection.",
  { message: z.string() },
  async (params) => {
    return {
      content: [{ type: "text", text: `Test tool received: ${params.message}` }]
    };
  }
);

// Helper function for consistent error handling
function handleToolError(error: unknown) {
  if (error instanceof SourceSyncError) {
    return {
      content: [{ 
        type: "text" as const, 
        text: JSON.stringify({
          message: error.message,
          status: error.status,
          error: error.error
        }, null, 2) 
      }],
      isError: true
    };
  } else {
    return {
      content: [{ type: "text" as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
      isError: true
    };
  }
}

async function main() {
  console.error("Starting SourceSync.ai MCP Server...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SourceSync.ai MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

