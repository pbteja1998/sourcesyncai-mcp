import { z } from "zod";
import { makeApiRequest, NamespaceIdSchema, getDefaultNamespaceId } from "./utils.js";

// Common schemas
const ConnectorEnum = z.enum([
  "NOTION", "GOOGLE_DRIVE", "DROPBOX", "ONEDRIVE", "BOX"
]);

// Create Connection
export const CreateConnectionSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  name: z.string().min(1, "Connection name is required"),
  connector: ConnectorEnum,
  clientRedirectUrl: z.string().url().optional(),
  tenantId: z.string().optional(),
});

export async function createConnection(params: z.infer<typeof CreateConnectionSchema>) {
  const { namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: "/v1/connections",
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// List Connections
export const ListConnectionsSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  connector: ConnectorEnum.optional(),
  tenantId: z.string().optional(),
});

export async function listConnections(params: z.infer<typeof ListConnectionsSchema>) {
  const { namespaceId, connector, tenantId } = params;
  
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
    tenantId,
    queryParams,
  });
}

// Get Connection
export const GetConnectionSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  tenantId: z.string().optional(),
});

export async function getConnection(params: z.infer<typeof GetConnectionSchema>) {
  const { namespaceId, connectionId, tenantId } = params;
  
  return makeApiRequest({
    method: "GET",
    path: `/v1/connections/${connectionId}`,
    tenantId,
    queryParams: {
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Update Connection
export const UpdateConnectionSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  name: z.string().optional(),
  clientRedirectUrl: z.string().url().optional(),
  tenantId: z.string().optional(),
});

export async function updateConnection(params: z.infer<typeof UpdateConnectionSchema>) {
  const { connectionId, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "PATCH",
    path: `/v1/connections/${connectionId}`,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
}

// Revoke Connection
export const RevokeConnectionSchema = z.object({
  namespaceId: NamespaceIdSchema.optional(),
  connectionId: z.string().min(1, "Connection ID is required"),
  tenantId: z.string().optional(),
});

export async function revokeConnection(params: z.infer<typeof RevokeConnectionSchema>) {
  const { connectionId, namespaceId, tenantId, ...requestBody } = params;
  
  return makeApiRequest({
    method: "POST",
    path: `/v1/connections/${connectionId}/revoke`,
    tenantId,
    body: {
      ...requestBody,
      namespaceId: getDefaultNamespaceId(namespaceId),
    },
  });
} 