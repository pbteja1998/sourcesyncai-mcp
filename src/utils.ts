import { z } from "zod";

export const ApiKeySchema = z.string().min(1, "API key is required");
export const NamespaceIdSchema = z.string().min(1, "Namespace ID is required");

export interface ApiRequestOptions {
  method: string;
  path: string;
  apiKey: string;
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
  const url = new URL(`https://api.sourcesync.ai${path}`);
  
  // Add query parameters if provided
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
  }

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${apiKey}`,
    "Accept": "application/json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  if (tenantId) {
    headers["X-Tenant-ID"] = tenantId;
  }

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

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
  } catch (error) {
    if (error instanceof SourceSyncError) {
      throw error;
    }
    throw new SourceSyncError(`Failed to make API request: ${(error as Error).message}`);
  }
} 