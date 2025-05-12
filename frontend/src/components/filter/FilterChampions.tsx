// TypeScript approach for filtering champions by multiple fields
interface Champion {
    "CHAMPION#": string;
    name?: string;
    class?: string;
    origin?: string;
    cost?: number;
    // Add other champion properties as needed
  }
  
  // Function to filter champions based on multiple fields
  export const filterChampionsByMultipleFields = (
    champions: Champion[],
    searchQuery: string
  ): Champion[] => {
    // Convert search query to lowercase for case-insensitive matching
    const query = searchQuery.toLowerCase().trim();
    
    // Return all champions if search query is empty
    if (!query) return champions;
    
    return champions.filter((champion) => {
      // Check multiple fields for matches
      return (
        // Check champion ID/number
        (champion["CHAMPION#"]?.toLowerCase().includes(query)) ||
        
        // Check champion name
        (champion.name?.toLowerCase().includes(query)) ||
        
        // Check champion class
        (champion.class?.toLowerCase().includes(query)) ||
        
        // Check champion origin
        (champion.origin?.toLowerCase().includes(query))
        
        // Add more fields to check as needed:
        // || (champion.someOtherField?.toLowerCase().includes(query))
      );
    });
  };
  
//   // Example usage
//   const filteredDialogChampions = filterChampionsByMultipleFields(champions, dialogSearchQuery);
  
//   // If you prefer the inline approach:
//   const filteredChampionsInline = champions.filter((champion: Champion) => 
//     champion["CHAMPION#"]?.toLowerCase().includes(dialogSearchQuery.toLowerCase()) ||
//     champion.name?.toLowerCase().includes(dialogSearchQuery.toLowerCase()) ||
//     champion.class?.toLowerCase().includes(dialogSearchQuery.toLowerCase()) ||
//     champion.origin?.toLowerCase().includes(dialogSearchQuery.toLowerCase())
//   );
  
