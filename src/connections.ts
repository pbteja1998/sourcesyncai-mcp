import { z } from "zod";
import { makeApiRequest, ApiKeySchema, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const ConnectorEnum = z.enum([
  "NOTION", "GOOGLE_DRIVE", "DROPBOX", "ONEDRIVE", "BOX"
]);

// Create Connection
export const CreateConnectionSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  name: z.string().min(1, "Connection name is required"),
  connector: ConnectorEnum,
  clientRedirectUrl: z.string().url().optional(),
  tenantId: z.string().optional(),
});

export async function createConnection(params: z.infer<typeof CreateConnectionSchema>) {
  const { apiKey, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/connections",
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// List Connections
export const ListConnectionsSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  connector: ConnectorEnum.optional(),
  tenantId: z.string().optional(),
});

export async function listConnections(params: z.infer<typeof ListConnectionsSchema>) {
  const { apiKey, namespaceId, connector, tenantId } = params;
  
  const queryParams: Record<string, string> = {};
  
  // Use default namespace ID if none provided
  const effectiveNamespaceId = getDefaultNamespaceId(namespaceId);
  queryParams.namespaceId = effectiveNamespaceId;
  
  if (connector) {
    queryParams.connector = connector;
  }
  
  return makeApiRequest({
    method: "GET",
    path: "/v1/connections",
    apiKey,
    tenantId,
    queryParams,
  });
}

// Get Connection
export const GetConnectionSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  tenantId: z.string().optional(),
});

export async function getConnection(params: z.infer<typeof GetConnectionSchema>) {
  const { apiKey, namespaceId, connectionId, tenantId } = params;
  
  return makeApiRequest({
    method: "GET",
    path: `/v1/connections/${connectionId}`,
    apiKey,
    tenantId,
    queryParams: {
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Update Connection
export const UpdateConnectionSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  name: z.string().optional(),
  clientRedirectUrl: z.string().url().optional(),
  tenantId: z.string().optional(),
});

export async function updateConnection(params: z.infer<typeof UpdateConnectionSchema>) {
  const { apiKey, connectionId, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "PATCH",
    path: `/v1/connections/${connectionId}`,
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Revoke Connection
export const RevokeConnectionSchema = z.object({
  apiKey: ApiKeySchema.optional(),
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  tenantId: z.string().optional(),
});

export async function revokeConnection(params: z.infer<typeof RevokeConnectionSchema>) {
  const { apiKey, connectionId, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: `/v1/connections/${connectionId}/revoke`,
    apiKey,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 