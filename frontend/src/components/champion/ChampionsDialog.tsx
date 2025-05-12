import { JSX, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ChampionRow } from "./ChampionHierarchy";
import { Champion } from "utils/champions";
 
  // Champion selection dialog component
  export function ChampionsDialog({ dialogOpen, setDialogOpen, selectedChampions, setSelectedChampions,champions }: any): JSX.Element {
    const [dialogSearchQuery, setDialogSearchQuery] = useState<string>("");

 console.log(champions)
    // Advanced: Configurable fields to search
    const searchableFields = ["CHAMPION#", "traits" ];
  
    const filteredDialogChampions = (champions: Champion[], searchQuery: string) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return champions;
      
      // Filter champions that match in their direct properties
      const directMatches = champions.filter(champion => 
        searchableFields.some(field => 
          champion[field as keyof Champion]?.toString().toLowerCase().includes(query)
        )
      );
      
      // Filter champions that match in their parsedData properties
      const parsedDataMatches = champions.filter(champion => 
        searchableFields.some(field => 
          champion?.parsedData?.[field as any]?.toString().toLowerCase().includes(query) 
        )
      );
      
      // Combine results without duplicates
      const allMatches = [...directMatches,...parsedDataMatches];
      
     
      return allMatches;
    };
    const filteredChampions = filteredDialogChampions(champions, dialogSearchQuery);
  
 // Handle champion selection from search
 const handleChampionSelect = (champion: Champion): void => {
    setSelectedChampions((prev:any) => {
      const isAlreadySelected = prev.some(
        (c:Champion) => c.parsedData!.name === champion.parsedData!.name
      );

      if (isAlreadySelected) {
        // Remove the champion
        return prev.filter((c:Champion) => c.parsedData!.name!== c.parsedData!.name);
      } else {
        // Add the champion
        console.log([...prev, champion]);
        return [...prev, champion];
      }
    });
  };
    return (
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild  className="  ">

         { 
        selectedChampions && selectedChampions.length == 0
        ?
          <Button
            onClick={() => setDialogOpen(true)}
            variant="ghost"
            size="sm"
            className="text-white font-inter font-light text-sm hover:text-black hover:bg-white/10 bg-black/40 w-[200px] h-[60px] ml-[25svw] mt-[-1svh]   "
          >
            <Search className="w-4 h-4 mr-0" />
            Add Champion
          </Button>
          
          :

          <Button
          onClick={() => setDialogOpen(true)}
          variant="ghost"
          size="sm"
          className="text-white font-inter font-light text-sm hover:text-black hover:bg-white/50 bg-white/20 w-[200px] h-[60px] border-emerald-400 border-dashed border-2"
        >
          <Search className="w-4 h-4 mr-0" />
          Add Champion
        </Button>
        }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80svw] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Select Champions</DialogTitle>
            <DialogDescription className="text-white">
              Search and select champions for your build.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full mb-4">
            <Input
              placeholder="Search champions..."
              value={dialogSearchQuery}
              onChange={(e) => setDialogSearchQuery(e.target.value)}
              className="  text-white bg-white/80 border-gray-700"
            />
          </div>

          <div className="grid gap-4 py-4 h-[60svh] w-full ">
            <ScrollArea className="h-[60svh] w-full ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {filteredChampions?.map((champion:any, idx:number) => (
                  <div
                    key={champion.parsedData.name + idx + ""}
                    className="cursor-pointer hover:bg-gray-700/50 p-2 rounded-md transition-colors mx-4"
                    style={{
                      backgroundColor: selectedChampions.includes(champion)
                        ? "white"
                        : "",
                    }}
                    onClick={() => {
                      handleChampionSelect(champion);
                    }}
                  >
                    <ChampionRow
                      style="w-full h-[60px]"
                      champion={champion as any}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button
                type="button"
                 className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
