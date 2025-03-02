import { z } from "zod";
import { makeApiRequest, ApiKeySchema } from "./utils.js";

export const ValidateApiKeySchema = z.object({
  apiKey: ApiKeySchema,
});

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    // Make a simple request to check if the API key is valid
    // We'll use the list namespaces endpoint as it's a lightweight call
    await makeApiRequest({
      method: "GET",
      path: "/v1/namespaces",
      apiKey,
    });
    return true;
  } catch (error) {
    return false;
  }
} 