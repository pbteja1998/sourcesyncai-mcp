import { z } from "zod";
import { makeApiRequest } from "./utils.js";

export const ValidateApiKeySchema = z.object({});

export async function validateApiKey(): Promise<boolean> {
  try {
    // Make a simple request to check if the default API key is valid
    // We'll use the list namespaces endpoint as it's a lightweight call
    await makeApiRequest({
      method: "GET",
      path: "/v1/namespaces",
    });
    return true;
  } catch (error) {
    return false;
  }
} 