const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
export type TableName = 'tft_augments' | 'tft_builds' | 'tft_champions' | 'tft_items' | 'tft_traits' | 'tft_users';

type partitionKey = "AUGMENT#" | "ITEM#" | 'CHAMPION#' | 'TRAIT#'
type sortingKey = 'METADATA'
/** EXAMPLE USAGE:
 * Item.partitionKey['AUGMENT#'] = {AugmentName}
 * Item.sortingKey['METADATA'] = 'augment_1'
 */
type Item = {
   partitionKey : Record<partitionKey,string>;
   sortingKey : Record<sortingKey,string>;
   data        : string; 
}

interface ApiResponse {
    message?: string;
    error?: string;
}

interface GetItemsResponse extends ApiResponse{
    items: Item[];
}

export class ApiError extends Error {
    status: number;
    
    constructor(message: string, status: number = 500) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
}

export const CrudApi = {
    /**
      * Get all items from a table
      * @param tableName The table to fetch from
      * @returns Promise with array of items
      */
     getAll: async (tableName: TableName): Promise<Item[]> => {
       console.log(`${API_BASE_URL}/api/crud/?table=${tableName}`)
       try {
         const response = await fetch(`${API_BASE_URL}/api/crud/?table=${tableName}`, {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
           },
         });
         
         if (!response.ok) {
           const error = await response.json();
           throw new ApiError(error.error || 'Failed to fetch items', response.status);
         }
         
         const data = await response.json() as GetItemsResponse;
         console.log('data',)
         return data.items || [];
       } catch (error) {
         if (error instanceof ApiError) {
           throw error;
         }
         throw new ApiError((error as Error).message);
       }
     },
}