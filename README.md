# SourceSync.ai MCP Server

A Model Context Protocol (MCP) server implementation for the [SourceSync.ai](https://sourcesync.ai) API. This server allows AI models to interact with SourceSync.ai's knowledge management platform through a standardized interface.

## Overview

This MCP server provides AI models with the ability to:

- Manage namespaces for organizing data
- Ingest content from various sources (text, URLs, websites, external services)
- Manage documents within namespaces
- Perform semantic and hybrid searches
- Manage connections to external services

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sourcesyncai-mcp.git
cd sourcesyncai-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Running the Server

```bash
node build/index.js
```

The server runs on stdio, making it compatible with MCP clients that communicate through standard input/output.

### Available Tools

The server exposes the following tools to AI models:

#### Authentication
- `validate_api_key`: Validate a SourceSync.ai API key

#### Namespaces
- `create_namespace`: Create a new namespace
- `list_namespaces`: List all namespaces
- `get_namespace`: Get details of a specific namespace
- `update_namespace`: Update a namespace
- `delete_namespace`: Delete a namespace

#### Data Ingestion
- `ingest_text`: Ingest text content
- `ingest_urls`: Ingest content from URLs
- `ingest_sitemap`: Ingest content from a sitemap
- `ingest_website`: Ingest content from a website
- `ingest_notion`: Ingest content from Notion
- `ingest_google_drive`: Ingest content from Google Drive
- `ingest_dropbox`: Ingest content from Dropbox
- `ingest_onedrive`: Ingest content from OneDrive
- `ingest_box`: Ingest content from Box

#### Documents
- `fetch_documents`: Fetch documents with optional filters
- `update_documents`: Update documents
- `delete_documents`: Delete documents
- `resync_documents`: Resync documents

#### Search
- `semantic_search`: Perform semantic search
- `hybrid_search`: Perform hybrid search (semantic + keyword)

#### Connections
- `create_connection`: Create a new connection to an external service
- `list_connections`: List all connections
- `get_connection`: Get details of a specific connection
- `update_connection`: Update a connection
- `revoke_connection`: Revoke a connection

## Example Usage

Here's an example of how an AI model might use these tools:

1. Validate an API key:
```json
{
  "name": "validate_api_key",
  "arguments": {
    "apiKey": "your_api_key"
  }
}
```

2. Create a namespace:
```json
{
  "name": "create_namespace",
  "arguments": {
    "apiKey": "your_api_key",
    "name": "my-namespace",
    "fileStorageConfig": {
      "provider": "S3_COMPATIBLE",
      "config": {
        "endpoint": "s3.amazonaws.com",
        "accessKey": "your_access_key",
        "secretKey": "your_secret_key",
        "bucket": "your_bucket",
        "region": "us-east-1"
      }
    },
    "vectorStorageConfig": {
      "provider": "PINECONE",
      "config": {
        "apiKey": "your_pinecone_api_key",
        "environment": "your_environment",
        "index": "your_index"
      }
    },
    "embeddingModelConfig": {
      "provider": "OPENAI",
      "config": {
        "apiKey": "your_openai_api_key",
        "model": "text-embedding-3-small"
      }
    }
  }
}
```

3. Ingest text:
```json
{
  "name": "ingest_text",
  "arguments": {
    "apiKey": "your_api_key",
    "namespaceId": "your_namespace_id",
    "ingestConfig": {
      "source": "TEXT",
      "config": {
        "name": "example-document",
        "text": "This is an example document for ingestion.",
        "metadata": {
          "category": "example",
          "author": "AI Assistant"
        }
      }
    }
  }
}
```

4. Perform a semantic search:
```json
{
  "name": "semantic_search",
  "arguments": {
    "apiKey": "your_api_key",
    "namespaceId": "your_namespace_id",
    "query": "example document",
    "topK": 5
  }
}
```

## Development

### Project Structure

- `src/index.ts`: Main entry point and server setup
- `src/authentication.ts`: Authentication-related functions
- `src/namespaces.ts`: Namespace management functions
- `src/ingestion.ts`: Data ingestion functions
- `src/documents.ts`: Document management functions
- `src/search.ts`: Search functions
- `src/connections.ts`: External connection management functions
- `src/utils.ts`: Utility functions and common schemas

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## License

MIT

## Links

- [SourceSync.ai Documentation](https://sourcesync.ai/docs)
- [SourceSync.ai API Reference](https://sourcesync.ai/api-reference)
- [Model Context Protocol](https://github.com/modelcontextprotocol/mcp)
