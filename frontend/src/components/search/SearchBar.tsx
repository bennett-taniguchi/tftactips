import React, { useState, useRef, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Search, X, FilterX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
 
import { Item } from "@/api/crudapiservice";
import { useGlobalContext } from "../context/context";
import { ScrollArea } from "../ui/scroll-area";
import SearchResult from "./SearchResult"; // Import the new SearchResult component
 
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(["champions", "builds"]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: string; value: string } | undefined>(undefined);
  const inputRef = useRef(null);
 
  const { champions, augments, traits, items, traitChampionsMap, isLoading } = useGlobalContext();
  const [results, setResults] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!isLoading && champions.length > 0) {
      function populateArr(data: Item[], accessor: string) {
        let arr = [] as string[];
        data.forEach((item: Item) => {
          arr.push((item as any)[accessor] + "");
        });
        return arr;
      }
        
      setResults({
        "champions": populateArr(champions, "CHAMPION#"), 
        "traits": populateArr(traits, "TRAIT#"), 
        "augments": populateArr(augments, "name"), 
        "items": populateArr(items, "ITEM#")
      });
    }
  }, [champions, augments, traits, traitChampionsMap, items, isLoading]);
    
  // Filter suggestions based on active filters and search query
  const filteredSuggestions = Object.entries((results))
    .filter(([category]) => activeFilters.includes(category))
    .reduce((acc: any, [category, items]) => {
      const filtered = items.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    }, {});

  // Handle toggling of filters
  const handleFilterToggle = (value: string) => {
    setActiveFilters(prev => {
      if (prev.includes(value)) {
        return prev.filter(filter => filter !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      (inputRef.current as any).focus();
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedItem(undefined)
  };

  // Reset all filters
  const resetAllFilters = () => {
    setActiveFilters(["champions", "builds", "items", "augments", "traits"]);
  };

  // Handle item selection
  const handleItemSelect = (item: string, category: string) => {
    setSelectedItem(undefined);
    setSelectedItem({
      type: category,
      value: item
    });
    console.log(`Selected ${item} from ${category}`);
  };

  // Loading state shimmer effect component
  const Shimmer = ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent bg-[length:50%_100%] bg-no-repeat", className)}></div>
  );

  // Loading UI component
  const LoadingUI = () => (
    <div className="mx-auto w-full max-w-7xl px-4 flex flex-row gap-2">
      {/* Main search container with glassmorphism effect - same as normal mode */}
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
        <Command className="bg-transparent" shouldFilter={false}>
          <div className="pt-1 flex bg-white items-center px-3 border-b border-cyan-500/30 bg-gradient-to-r">
            <Search className="w-5 h-5 text-cyan-400 mr-2" />
            <CommandInput
              disabled
              placeholder="Loading data..."
              className="w-[60svw] flex-1 h-12 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-400 placeholder-cyan-400/50"
            />
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
          </div>

          {/* Filter toggle buttons with shimmer effect */}
          <div className="px-3 py-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cyan-300 font-medium">Filter Results:</span>
              <div className="flex space-x-2">
                <div className="text-xs text-cyan-400/50 flex items-center opacity-50">
                  <FilterX className="w-3 h-3 mr-1" />
                  Loading Filters...
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Champions", "Builds", "Items", "Augments", "Traits"].map((category) => (
                <div
                  key={category}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-all duration-300",
                    "border border-cyan-500/20 bg-gray-800/30",
                    "text-gray-500 opacity-70"
                  )}
                >
                  <Shimmer className="w-full h-full rounded-full" />
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Shimmer loading effect for search results */}
          <CommandList className="max-h-96 overflow-hidden py-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-gray-800/20">
            <ScrollArea className="h-[45svh]">
              {["Champions", "Items", "Augments"].map((category) => (
                <CommandGroup key={category} heading={category}>
                  {Array(category === "Champions" ? 6 : 3).fill(0).map((_, idx) => (
                    <CommandItem
                      key={idx + ""}
                      className="px-4 py-2 text-gray-400"
                    >
                      <div className="flex items-center w-full">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 mr-2"></div>
                        <Shimmer className="h-4 w-32 rounded-md bg-gray-700/30" />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </div>

      {/* Details panel - loading state */}
      <div className="w-160 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md shadow-black bg-gray-900/60">
        <div className="flex items-center justify-center h-full p-8 text-cyan-400/50">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin" />
            <p className="text-lg font-medium">Loading data...</p>
            <div className="w-48 h-2 bg-cyan-500/20 rounded-full overflow-hidden relative">
              <Shimmer className="absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Return loading UI if data is still loading
  if (isLoading || !results['champions'] || results['champions'].length === 0) {
    return <LoadingUI />;
  }

  // Normal component rendering
  return (
    <div className="mx-auto w-full max-w-7xl px-4 flex flex-row gap-2">
      {/* Main search container with glassmorphism effect */}
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          "border border-cyan-500/40 border-y-0 shadow-md shadow-black",
          "backdrop-blur-md bg-gray-900/60",
          isInputFocused ? "ring-2 ring-emerald-500/40" : ""
        )}
      >
        {/* Gloss effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
        
        {/* Search input with Command component */}
        <Command className="bg-transparent" shouldFilter={false}>
          <div className="pt-1 flex bg-white items-center px-3 border-b border-cyan-500/30 bg-gradient-to-r">
            <Search className="w-5 h-5 text-cyan-400 mr-2" />
            <CommandInput
              ref={inputRef}
              value={query}
              onValueChange={setQuery}
              placeholder="Search champions, builds, items..."
              className="w-[60svw] flex-1 h-12 bg-transparent border-none focus:outline-none focus:ring-0 text-black placeholder-cyan-400"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            {query && (
              <button 
                onClick={clearSearch}
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter toggle buttons with cyberpunk styling */}
          <div className="px-3 py-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-cyan-300 font-medium">Filter Results:</span>
              <div className="flex space-x-2">
                {activeFilters.length === 0 ? (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center"
                  >
                    Reset All
                  </button>
                ) : (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                  >
                    <FilterX className="w-3 h-3 mr-1" />
                    Clear All
                  </button>
                )}
              </div>
            </div>
            <ToggleGroup type="multiple" value={activeFilters} className="flex flex-wrap gap-2">
              {Object.keys(results).map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterToggle(category)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-all duration-300",
                    "border border-cyan-500/40 bg-gray-800/50",
                    "hover:bg-emerald-500/20 hover:border-emerald-500/40",
                    activeFilters.includes(category) 
                      ? "bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 text-white shadow-sm shadow-cyan-500/30" 
                      : "text-gray-400"
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </ToggleGroup>
          </div>

          {/* Search results with cyberpunk styling */}
          <CommandList className="max-h-96 overflow-hidden py-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-gray-800/20">
            <CommandEmpty className="py-6 text-center text-gray-400">
              <p>No results found for "{query}"</p>
              <p className="text-sm text-cyan-400 mt-1">Try a different search term or filter</p>
            </CommandEmpty>
            <ScrollArea className="h-[45svh]">
              {Object.entries(filteredSuggestions).map(([category, items]) => (
                <CommandGroup key={category} heading={category.charAt(0).toUpperCase() + category.slice(1)}>
                  {(items as any).map((item: string, idx: number) => (
                    <CommandItem
                      key={idx + ""}
                      className={cn(
                        "px-4 py-2 cursor-pointer transition-colors hover:bg-cyan-500/10 text-gray-400 hover:text-white data-[selected=true]:bg-blue-400/50 data-[selected=true]:text-white",
                        selectedItem?.type === category && selectedItem?.value === item ? "bg-cyan-500/20 text-white" : ""
                      )}
                      onSelect={() => handleItemSelect(item, category)}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 mr-2"></div>
                        <span>{item}</span>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-emerald-500/0 opacity-0 hover:opacity-10 transition-opacity pointer-events-none"></div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </div>

      {/* Details panel */}
      <div className="w-160 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md shadow-black " >
        <SearchResult selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default SearchBar;