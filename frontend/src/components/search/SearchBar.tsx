import React, { useState, useRef, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, X, FilterX } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

// Mock data for suggestions - replace with your actual data
const mockSuggestions = {
  champions: ["Ahri", "Akali", "Ekko", "Jinx", "Kaisa", "Vi", "Viktor"],
  items: ["B.F. Sword", "Needlessly Large Rod", "Recurve Bow", "Infinity Edge"],
  augments: ["Cybernetic Implants", "Duelist", "Built Different", "Hyper Roll"],
  builds: ["Cyber Snipers", "Duelist Carry", "Fortune Gamble", "Mage Burst"],
  traits: ["Cybernetic", "Duelist", "Infiltrator", "Brawler", "Blademaster"]
} as Record<string,string[]>;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(["champions", "builds"]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  // Filter suggestions based on active filters and search query
  const filteredSuggestions = Object.entries(mockSuggestions)
    .filter(([category]) => activeFilters.includes(category))
    .reduce((acc : any, [category, items]) => {
      const filtered = items.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category]  = filtered ;
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
  };

  // Reset all filters
  const resetAllFilters = () => {
    setActiveFilters(["champions", "builds", "items", "augments", "traits"]);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4  py-8 ">
      {/* Main search container with glassmorphism effect */}
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          "border border-cyan-500/40 shadow-lg shadow-cyan-400/20",
          "backdrop-blur-md bg-gray-900/60",
          isInputFocused ? "ring-2 ring-emerald-500/40" : ""
        )}
      >
        {/* Gloss effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
        
        {/* Search input with Command component */}
        <Command className="bg-transparent" shouldFilter={false}>
          <div className="flex  items-center px-3 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10">
            <Search className="w-5 h-5 text-cyan-400 mr-2 " />
            <CommandInput
              ref={inputRef}
              value={query}
              onValueChange={setQuery}
              placeholder="Search champions, builds, items..."
              className="flex-1 h-12 bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-gray-400 "
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            {query && (
              <button 
                onClick={clearSearch}
                className="text-gray-400 hover:text-white transition-colors"
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
            {Object.keys(mockSuggestions).map((category) => (
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
                <ScrollArea className="h-[60svh]">
            {Object.entries(filteredSuggestions).map(([category, items]) => (
              <CommandGroup key={category} heading={category.charAt(0).toUpperCase() + category.slice(1)}>
                {(items as any).map((item: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined,idx:number) => (
                  <CommandItem
                    key={idx+""}
                    className="px-4 py-2 cursor-pointer transition-colors hover:bg-cyan-500/10 text-gray-200 hover:text-white"
                    onSelect={() => {
                      console.log(`Selected ${item} from ${category}`);
                      // Handle selection here
                    }}
                  >
                    <div className="flex items-center">
                      {/* Category-specific icon or decoration could go here */}
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

        {/* Bottom decorative element */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500/40 to-emerald-500/40"></div>
      </div>
    </div>
  );
};

export default SearchBar;