// Load environment variables from .env file
import 'dotenv/config';

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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

// Create an MCP server
const server = new McpServer({
  name: "sourcesyncai-mcp",
  version: "1.0.0"
});

// Register authentication tools
server.tool(
  "validate_api_key",
  ValidateApiKeySchema.shape,
  async (params) => {
    try {
      const result = await validateApiKey(params.apiKey);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register namespace tools
server.tool(
  "create_namespace",
  CreateNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await createNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "list_namespaces",
  ListNamespacesSchema.shape,
  async (params) => {
    try {
      const result = await listNamespaces(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "get_namespace",
  GetNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await getNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "update_namespace",
  UpdateNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await updateNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "delete_namespace",
  DeleteNamespaceSchema.shape,
  async (params) => {
    try {
      const result = await deleteNamespace(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register ingestion tools
server.tool(
  "ingest_text",
  IngestTextSchema.shape,
  async (params) => {
    try {
      const result = await ingestText(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_urls",
  IngestUrlsSchema.shape,
  async (params) => {
    try {
      const result = await ingestUrls(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_sitemap",
  IngestSitemapSchema.shape,
  async (params) => {
    try {
      const result = await ingestSitemap(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_website",
  IngestWebsiteSchema.shape,
  async (params) => {
    try {
      const result = await ingestWebsite(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_notion",
  IngestNotionSchema.shape,
  async (params) => {
    try {
      const result = await ingestNotion(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_google_drive",
  IngestGoogleDriveSchema.shape,
  async (params) => {
    try {
      const result = await ingestGoogleDrive(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_dropbox",
  IngestDropboxSchema.shape,
  async (params) => {
    try {
      const result = await ingestDropbox(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_onedrive",
  IngestOneDriveSchema.shape,
  async (params) => {
    try {
      const result = await ingestOneDrive(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "ingest_box",
  IngestBoxSchema.shape,
  async (params) => {
    try {
      const result = await ingestBox(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register document tools
server.tool(
  "fetch_documents",
  FetchDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await fetchDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "update_documents",
  UpdateDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await updateDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "delete_documents",
  DeleteDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await deleteDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "resync_documents",
  ResyncDocumentsSchema.shape,
  async (params) => {
    try {
      const result = await resyncDocuments(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register search tools
server.tool(
  "semantic_search",
  SemanticSearchSchema.shape,
  async (params) => {
    try {
      const result = await semanticSearch(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "hybrid_search",
  HybridSearchSchema.shape,
  async (params) => {
    try {
      const result = await hybridSearch(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register connection tools
server.tool(
  "create_connection",
  CreateConnectionSchema.shape,
  async (params) => {
    try {
      const result = await createConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "list_connections",
  ListConnectionsSchema.shape,
  async (params) => {
    try {
      const result = await listConnections(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "get_connection",
  GetConnectionSchema.shape,
  async (params) => {
    try {
      const result = await getConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "update_connection",
  UpdateConnectionSchema.shape,
  async (params) => {
    try {
      const result = await updateConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "revoke_connection",
  RevokeConnectionSchema.shape,
  async (params) => {
    try {
      const result = await revokeConnection(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

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

