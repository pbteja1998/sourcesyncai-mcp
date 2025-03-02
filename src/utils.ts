import { z } from "zod";

export const ApiKeySchema = z.string().min(1, "API key is required");
export const NamespaceIdSchema = z.string().min(1, "Namespace ID is required");
export const OrgIdSchema = z.string().min(1, "Organization ID is required");

// Default values from environment variables
const DEFAULT_API_URL = process.env.SOURCESYNC_API_URL || "https://api.sourcesync.ai";
const DEFAULT_REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT_MS || "30000", 10);
const DEFAULT_API_KEY = process.env.SOURCESYNC_DEFAULT_API_KEY;
const DEFAULT_ORG_ID = process.env.SOURCESYNC_DEFAULT_ORG_ID;
const DEFAULT_NAMESPACE_ID = process.env.SOURCESYNC_DEFAULT_NAMESPACE_ID;

export interface ApiRequestOptions {
  method: string;
  path: string;
  apiKey?: string;
  body?: any;
  tenantId?: string;
  queryParams?: Record<string, string>;
}

export class SourceSyncError extends Error {
  status?: number;
  error?: string;
  details?: any;

  constructor(message: string, details?: { status?: number; error?: string; details?: any }) {
    super(message);
    this.name = "SourceSyncError";
    if (details) {
      this.status = details.status;
      this.error = details.error;
      this.details = details.details;
    }
  }
}

export async function makeApiRequest({
  method,
  path,
  apiKey,
  body,
  tenantId,
  queryParams,
}: ApiRequestOptions) {
  // Use the default API key from environment if none provided
  const effectiveApiKey = apiKey || DEFAULT_API_KEY;
  
  if (!effectiveApiKey) {
    throw new SourceSyncError("API key is required. Provide it in the request or set SOURCESYNC_DEFAULT_API_KEY environment variable.");
  }
  
  const url = new URL(`${DEFAULT_API_URL}${path}`);
  
  // Add query parameters if provided
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
  }

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${effectiveApiKey}`,
    "Accept": "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  if (tenantId) {
    headers["X-Tenant-ID"] = tenantId;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_REQUEST_TIMEOUT);
    
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new SourceSyncError(
        `SourceSync API error: ${data.error || response.statusText}`,
        {
          status: response.status,
          error: data.error,
          details: data.details,
        }
      );
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof SourceSyncError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new SourceSyncError(`Request timed out after ${DEFAULT_REQUEST_TIMEOUT}ms`);
    }
    throw new SourceSyncError(`Failed to make API request: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Helper function to get default namespace ID or throw if not available
export function getDefaultNamespaceId(providedNamespaceId?: string): string {
  const namespaceId = providedNamespaceId || DEFAULT_NAMESPACE_ID;
  if (!namespaceId) {
    throw new SourceSyncError("Namespace ID is required. Provide it in the request or set SOURCESYNC_DEFAULT_NAMESPACE_ID environment variable.");
  }
  return namespaceId;
}

// Helper function to get default organization ID or throw if not available
export function getDefaultOrgId(providedOrgId?: string): string {
  const orgId = providedOrgId || DEFAULT_ORG_ID;
  if (!orgId) {
    throw new SourceSyncError("Organization ID is required. Provide it in the request or set SOURCESYNC_DEFAULT_ORG_ID environment variable.");
  }
  return orgId;
} 