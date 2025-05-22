/**
 * CRUD API Service
 *
 * This service provides functions to interact with the backend API
 * for performing CRUD operations on various tables.
 */

// Base API URL - adjust to match your Go backend

const API_BASE_URL = "http://127.0.0.1:8787";

// Table names that can be used with the API
export type TableName =
  | "tft_augments"
  | "tft_builds"
  | "tft_champions"
  | "tft_items"
  | "tft_traits"
  | "tft_users";

// Generic item interface for any table data
export interface Item {
  id?: string | number;
  name: string;
  [key: string]: any;
}

// Primary key for DynamoDB operations
export interface Key {
  id: string | number;
  [key: string]: any; // For composite keys if needed
}

// API response types
interface ApiResponse {
  message?: string;
  error?: string;
}

interface GetItemsResponse extends ApiResponse {
  Items: Item[];
  Count: number;
  ScannedCount: number;
  $metadata: {
    attempts: number;
    httpStatusCode: number;
    requestID: string;
    totalRetryDelay: number;
  };
}

// Error class for API errors
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Service for CRUD API operations
 */
export const CrudService = {
  getByPartitionKey: async (
    tableName: TableName,
    pkey: string,
    pval: string,
    email: string,
    token: string
  ): Promise<Item[]> => {
    let table = tableName.split("_")[1];
    let queryString = `${API_BASE_URL}/${table}/GET?TableName=${tableName}&email=${email}&${pkey}=${pval}&token=${token}`;
    console.log(queryString);
    try {
      const response = await fetch(queryString, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to fetch items",
          response.status
        );
      }

      const data = (await response.json()) as GetItemsResponse;
      console.log("data");
      return data["Items"] || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },

  getByEmail: async (
    tableName: TableName,
    email: string,
    token:string,
    flags?: Record<string, string>
  ): Promise<Item[]> => {
    let table = tableName.split("_")[1];
    let queryString = `${API_BASE_URL}/${table}/?GET?TableName=${tableName}&email=${email}&token=${token}`;
    if (flags) {
      Object.entries(flags).forEach(([key, value]) => {
        queryString += `&${key}=${value}`;
      });
    }
    console.log(queryString);
    try {
      const response = await fetch(queryString, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to fetch items",
          response.status
        );
      }

      const data = (await response.json()) as GetItemsResponse;
      console.log("data", data);
      return data["Items"] || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },
  /**
   * Get all items from a table
   * @param tableName The table to fetch from
   * @returns Promise with array of items
   */
  getAll: async (tableName: TableName): Promise<Item[]> => {
    let table = tableName.split("_")[1];
    console.log(`${API_BASE_URL}/${table}/GET?TableName=${tableName}`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/${table}/GET?TableName=${tableName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to fetch items",
          response.status
        );
      }

      const data = (await response.json()) as GetItemsResponse;

      console.log("data", data);
      return data["Items"] || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },

  /**
   * Create a new item in the specified table
   * @param tableName The table to add the item to
   * @param item The item data to create
   * @returns Promise that resolves when creation is successful
   */
  create: async (
    tableName: TableName,
    item: Item,
    token: string
  ): Promise<void> => {
    try {
      // Ensure the item has a unique ID if not provided
      if (!item.id) {
        item.id = Date.now().toString();
      }
      let table = tableName.split("_")[1];

      const response = await fetch(
        `${API_BASE_URL}/${table}/GET?TableName=${tableName}&token=${token}&email=${item.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to create item",
          response.status
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },

  /**
   * Update an existing item
   * @param tableName The table containing the item
   * @param key The primary key of the item to update
   * @param updates The fields to update
   * @returns Promise that resolves when update is successful
   */
  update: async (
    tableName: TableName,
    key: Key,
    updates: Item,
    token: String
  ): Promise<void> => {
    token;
    try {
      // Format for DynamoDB update operation
      const updateExpressionParts: string[] = [];
      const expressionAttributeValues: Record<string, any> = {};

      Object.entries(updates).forEach(([field, value], index) => {
        // Skip id and other key fields
        if (field === "id" || Object.keys(key).includes(field)) {
          return;
        }

        const placeholder = `:val${index}`;
        updateExpressionParts.push(`${field} = ${placeholder}`);
        expressionAttributeValues[placeholder] = value;
      });

      // If nothing to update, return early
      if (updateExpressionParts.length === 0) {
        return;
      }

      const updatePayload = {
        Key: key,
        UpdateExpression: `SET ${updateExpressionParts.join(", ")}`,
        ExpressionAttributeValues: expressionAttributeValues,
      };
      let table = tableName.split("_")[1];
      const response = await fetch(
        `${API_BASE_URL}/${table}/UPDATE?TableName=${tableName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to update item",
          response.status
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },

  /**
   * Delete an item from a table
   * @param tableName The table containing the item
   * @param key The primary key of the item to delete
   * @returns Promise that resolves when deletion is successful
   */
  delete: async (
    tableName: TableName,
    key: Key,
    email: string,
    token: string,
    metadata: string
  ): Promise<void> => {
    let table = tableName.split("_")[1];
    try {
      const response = await fetch(
        `${API_BASE_URL}/${table}/DELETE?TableName=${tableName}&email=${email}&token=${token}&pkey=BUILD%23&pval=${key}&metadata=${metadata}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "delete request:",
        `${API_BASE_URL}/${table}/DELETE?TableName=${tableName}&email=${email}&token=${token}&pkey=BUILD%23&pval=${key}&metadata=${metadata}`
      );
      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to delete item",
          response.status
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },
};

export default CrudService;
