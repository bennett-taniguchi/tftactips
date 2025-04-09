import { useEffect } from "react";
import { Search, X } from "lucide-react";
import { Command, CommandInput } from "../ui/command";
import { cn } from "@/lib/utils";

// Define TypeScript interfaces
interface Item {
  id?: string | number;
  parsedData: {
    name?: string;
    description?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface FilterBarProps {
  datasets: Item[];
  query: string;
  setQuery: (query: string) => void;
  filteredItems: Item[];
  setFilteredItems: (items: Item[]) => void;
}

function FilterBar({
  datasets,
  query,
  setQuery,
  filteredItems,
  setFilteredItems,
}: FilterBarProps) {
  // Filter items whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      // If no query, show all items
      setFilteredItems(datasets);
      return;
    }

    // Split query by spaces to match any part
    const queryParts = query.toLowerCase().trim().split(/\s+/);

    // Filter items based on query parts
    const filtered = datasets.filter((item) => {
      // Fields to search in
      const fieldsToSearch = [
        item.parsedData?.name,
        item.parsedData?.description,
        item['TRAIT#']
        // Add any other fields you want to search here
      ];

      // Check if any query part matches any field
      return queryParts.some(part => 
        fieldsToSearch.some(field => 
          field && field.toLowerCase().includes(part)
        )
      );
    });

    setFilteredItems(filtered);
  }, [query, datasets, setFilteredItems]);

  // Clear search handler
  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {/* Main filter container with glassmorphism effect */}
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          "border border-cyan-500/40 border-y-0 shadow-md shadow-black",
          "backdrop-blur-md bg-gray-900/60"
        )}
      >
        {/* Gloss effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
        
        {/* Search input with Command component */}
        <Command className="bg-transparent">
          <div className="pt-1 flex bg-white items-center px-3 border-b border-cyan-500/30 bg-gradient-to-r">
            <Search className="min-w-5 min-h-5 w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" />
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Filter content..."
              className="w-[60svw] flex-1 h-12 bg-transparent border-none focus:outline-none focus:ring-0 text-black placeholder-cyan-400"
            />
            {query && (
              <button 
                onClick={clearSearch}
                className="text-cyan-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="min-w-5 min-h-5 w-5 h-5" />
              </button>
            )}
          </div>
        </Command>
      </div>
    </div>
  );
}

export default FilterBar;