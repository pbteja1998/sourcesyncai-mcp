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

## Configuration

The server can be configured using environment variables. Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=3000                      # Port for HTTP server (if needed)
LOG_LEVEL=info                 # Logging level (debug, info, warn, error)

# SourceSync.ai Configuration
SOURCESYNC_API_URL=https://api.sourcesync.ai  # API URL (default)
SOURCESYNC_DEFAULT_API_KEY=                   # Default API key (optional)
SOURCESYNC_DEFAULT_ORG_ID=                    # Default organization ID (optional)
SOURCESYNC_DEFAULT_NAMESPACE_ID=              # Default namespace ID (optional)

# Rate Limiting
RATE_LIMIT_MAX=100             # Maximum number of requests per window
RATE_LIMIT_WINDOW_MS=60000     # Time window in milliseconds (1 minute)

# Timeout Configuration
REQUEST_TIMEOUT_MS=30000       # API request timeout in milliseconds
```

You can also set these variables in your environment or pass them when starting the server:

```bash
SOURCESYNC_DEFAULT_API_KEY=your_api_key SOURCESYNC_DEFAULT_NAMESPACE_ID=your_namespace_id node build/index.js
```

### Default Values

Setting default values for API key, organization ID, and namespace ID makes it easier to use the MCP server with AI assistants like Claude Desktop. When these defaults are set, users don't need to specify these values in every request.

#### Example with Default Values

When you have set default values in your environment variables:

```bash
# In your .env file
SOURCESYNC_DEFAULT_API_KEY=your_api_key
SOURCESYNC_DEFAULT_NAMESPACE_ID=your_namespace_id
```

AI models can make simpler requests:

```json
// Without default values
{
  "name": "semantic_search",
  "arguments": {
    "apiKey": "your_api_key",
    "namespaceId": "your_namespace_id",
    "query": "example document",
    "topK": 5
  }
}

// With default values
{
  "name": "semantic_search",
  "arguments": {
    "query": "example document",
    "topK": 5
  }
}
```

This significantly improves the user experience when working with AI assistants, as they don't need to repeatedly ask for or include these values in every request.

## Usage

### Running the Server

You can run the server using one of the following commands:

```bash
# Using npm scripts
npm run start    # Run the server
npm run dev      # Build and run the server

# Or directly
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

5. When chatting with Claude, you can now use SourceSync.ai tools by asking Claude to perform tasks like searching your knowledge base, ingesting content, or managing namespaces.

### Troubleshooting Claude Desktop Integration

If you encounter issues connecting the SourceSync.ai MCP server to Claude Desktop, try these troubleshooting steps:

1. **Verify Paths**: Ensure all paths in your configuration file are absolute paths, not relative. Double-check that the paths to your server's `index.js` file are correct.

2. **Check Permissions**: On Windows, try running Claude Desktop as an administrator. On macOS and Linux, ensure the server file has execution permissions (`chmod +x build/index.js`).

3. **Enable Developer Mode**: In Claude Desktop, go to Help > Enable Developer Mode. Then, in the Developer menu, open the MCP Log File to see detailed information about server connections.

4. **Test the Server Directly**: Run the server directly from the command line to verify it works:
   ```bash
   node /path/to/sourcesyncai-mcp/build/index.js
   ```

5. **Restart Claude Desktop**: After making changes to the configuration file, completely close and restart Claude Desktop.

6. **Environment Variables**: Make sure environment variables are correctly set in the configuration file. If you're using a `.env` file for your server, consider moving those variables to the `env` section in the Claude Desktop configuration.

### Cursor

To use this MCP server with Cursor:

1. Open Cursor and go to Settings > AI > MCP Tools.

2. Add a new MCP tool:
   - **Name**: SourceSync.ai
   - **Path**: `/path/to/sourcesyncai-mcp/build/index.js`
   - **Arguments**: (leave empty)
   - **Environment Variables**: Add your default values:
     ```
     SOURCESYNC_DEFAULT_API_KEY=your_api_key
     SOURCESYNC_DEFAULT_NAMESPACE_ID=your_namespace_id
     ```

3. Save the configuration.

4. When using Cursor's AI features, you can now leverage SourceSync.ai tools to search, ingest, and manage your knowledge base.

### Example Prompts

Here are some example prompts you can use with Claude or Cursor after configuring the MCP server:

- "Search my SourceSync knowledge base for information about machine learning."
- "Ingest this article into my SourceSync knowledge base: [URL]"
- "Create a new namespace in SourceSync for my project documentation."
- "List all the documents in my SourceSync namespace."

The AI will use the configured MCP server to execute these operations, using the default values you've provided in the environment variables.

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

## Integration with AI Clients

### Claude Desktop

To use this MCP server with Claude Desktop:

1. Start the MCP server:
   ```bash
   npm run start
   ```

2. Locate the Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

3. Edit the configuration file to add the SourceSync.ai MCP server:
   ```json
   {
     "mcpServers": {
       "sourcesyncai": {
         "command": "node",
         "args": ["/Users/yourusername/path/to/sourcesyncai-mcp/build/index.js"],
         "env": {
           "SOURCESYNC_DEFAULT_API_KEY": "your_api_key",
           "SOURCESYNC_DEFAULT_NAMESPACE_ID": "your_namespace_id",
           "SOURCESYNC_DEFAULT_ORG_ID": "your_org_id"
         }
       }
     }
   }
   ```

   Replace `/Users/yourusername/path/to/sourcesyncai-mcp` with the absolute path to your project directory. Make sure to use:
   - Forward slashes (`/`) on macOS and Linux
   - Double backslashes (`\\`) on Windows (e.g., `C:\\Users\\yourusername\\path\\to\\sourcesyncai-mcp`)

   **Example based on Firecrawl configuration:**
   ```json
   {
     "mcpServers": {
       "sourcesyncai": {
         "command": "node",
         "args": ["/Users/yourusername/workspace/sourcesyncai-mcp/build/index.js"],
         "env": {
           "SOURCESYNC_DEFAULT_API_KEY": "your_api_key",
           "SOURCESYNC_DEFAULT_NAMESPACE_ID": "your_namespace_id",
           "SOURCESYNC_DEFAULT_ORG_ID": "your_org_id"
         }
       }
     }
   }
   ```

4. Save the configuration file and completely restart Claude Desktop.

5. When chatting with Claude, you can now use SourceSync.ai tools by asking Claude to perform tasks like searching your knowledge base, ingesting content, or managing namespaces.

### Cursor

To use this MCP server with Cursor:

1. Open Cursor and go to Settings > AI > MCP Tools.

2. Add a new MCP tool:
   - **Name**: SourceSync.ai
   - **Path**: `/path/to/sourcesyncai-mcp/build/index.js`
   - **Arguments**: (leave empty)
   - **Environment Variables**: Add your default values:
     ```
     SOURCESYNC_DEFAULT_API_KEY=your_api_key
     SOURCESYNC_DEFAULT_NAMESPACE_ID=your_namespace_id
     ```

3. Save the configuration.

4. When using Cursor's AI features, you can now leverage SourceSync.ai tools to search, ingest, and manage your knowledge base.

### Example Prompts

Here are some example prompts you can use with Claude or Cursor after configuring the MCP server:

- "Search my SourceSync knowledge base for information about machine learning."
- "Ingest this article into my SourceSync knowledge base: [URL]"
- "Create a new namespace in SourceSync for my project documentation."
- "List all the documents in my SourceSync namespace."

The AI will use the configured MCP server to execute these operations, using the default values you've provided in the environment variables.
