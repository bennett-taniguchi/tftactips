/**
 * CRUD API Service
 *
 * This service provides functions to interact with the backend API
 * for performing CRUD operations on various tables.
 */

// Base API URL - adjust to match your Go backend

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

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
  items: Item[];
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
    pval: string
  ): Promise<Item[]> => {
    console.log(
      `${API_BASE_URL}/api/crud/?table=${tableName}&pkey=${pkey}&pval=${pval}`
    );
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}&pkey=${pkey}&pval=${pval}`,
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
      console.log("data");
      return data.items || [];
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError((error as Error).message);
    }
  },

  getByEmail: async(tableName:TableName,email:string): Promise<Item[]> => {

    console.log(`${API_BASE_URL}/api/crud/?table=${tableName}&email=${email}`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}&email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response",response)
      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.error || "Failed to fetch items",
          response.status
        );
      }
     
      const data = (await response.json()) as GetItemsResponse;
      console.log("data",data);
      return data.items || [];
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
    console.log(`${API_BASE_URL}/api/crud/?table=${tableName}`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}`,
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
      console.log("data");
      return data.items || [];
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
  create: async (tableName: TableName, item: Item): Promise<void> => {
    try {
      // Ensure the item has a unique ID if not provided
      if (!item.id) {
        item.id = Date.now().toString();
      }

      
      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}`,
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
    updates: Item
  ): Promise<void> => {
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

      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}`,
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
  delete: async (tableName: TableName, key: Key): Promise<void> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/crud/?table=${tableName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key }),
        }
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
