import { JSX, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { AugmentBox } from "./AugmentBox";
import { SmallAugmentBox } from "./SmallAugmentBox";
import { cn } from "@/lib/utils";

// Augment type interface
interface Augment {
 
    name: string;
    desc?: string;
    effects?: Record<string, any>;
    imageHighS3?: string;
 
}

// Augment selection dialog component
export function AugmentsDialog({ 
  dialogOpen, 
  setDialogOpen, 
  selectedAugments, 
  setSelectedAugments, 
  augments 
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedAugments: Augment[];
  setSelectedAugments: (augments: any) => void;
  augments: Augment[];
}): JSX.Element {
  const [dialogSearchQuery, setDialogSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

  // Filter augments based on search query
  const filteredDialogAugments = augments.filter((augment: Augment) =>
    augment?.name
      ?.toLowerCase()
      .includes(dialogSearchQuery.toLowerCase())
  );

  // Handle augment selection from search
  const handleAugmentSelect = (augment: Augment): void => {
    setSelectedAugments((prev: Augment[]) => {
      const isAlreadySelected = prev.some(
        (a: Augment) => a.name === augment.name
      );

      if (isAlreadySelected) {
        // Remove the augment
        return prev.filter((a: Augment) => a.name !== augment.name);
      } else {
        // Add the augment
        return [...prev, augment];
      }
    });
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        {selectedAugments && selectedAugments.length === 0 ? (
          <Button
            onClick={() => setDialogOpen(true)}
            variant="ghost"
            size="sm"
            className="text-white font-inter font-light text-sm hover:text-black hover:bg-white/10 bg-black/40 w-[200px] h-[60px] ml-[25svw] mt-[-1svh]    "
          >
            <Search className="w-4 h-4 mr-2" />
            Add Augment
          </Button>
        ) : (
          <Button
            onClick={() => setDialogOpen(true)}
            variant="ghost"
            size="sm"
            className="text-white font-inter font-light text-sm hover:text-black hover:bg-white/50 bg-white/20 w-[200px] h-[60px] border-cyan-400 border-dashed border-2"
          >
            <Search className="w-4 h-4 mr-2" />
            Add Augment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80svw] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Select Augments</DialogTitle>
          <DialogDescription className="text-white">
            Search and select augments for your build.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full mb-4 flex items-center gap-4">
          <Input
            placeholder="Search augments..."
            value={dialogSearchQuery}
            onChange={(e) => setDialogSearchQuery(e.target.value)}
            className="text-white bg-white/80 border-gray-700 flex-1"
          />
          
          <div className="flex bg-gray-700 rounded-md p-0.5">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewMode('compact')}
              className={cn(
                "rounded-md text-xs",
                viewMode === 'compact' ? "bg-cyan-500 text-white" : "text-gray-300 hover:text-white"
              )}
            >
              Compact
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewMode('detailed')}
              className={cn(
                "rounded-md text-xs",
                viewMode === 'detailed' ? "bg-cyan-500 text-white" : "text-gray-300 hover:text-white"
              )}
            >
              Detailed
            </Button>
          </div>
        </div>

        <div className="grid gap-4 py-4 h-[60svh] w-full">
          <ScrollArea className="h-[60svh] w-full">
            {viewMode === 'compact' ? (
              // Compact grid view with SmallAugmentBox
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredDialogAugments.map((augment: Augment, idx: number) => (
                  <div
                    key={augment.name + idx + ""}
                    className={cn(
                      "cursor-pointer p-2 rounded-md transition-colors h-[275px]",
                      selectedAugments.some(a => a.name === augment.name) 
                        ? "ring-2 ring-cyan-500 bg-gray-700/50" 
                        : "hover:bg-gray-700/50"
                    )}
                    onClick={() => {
                      handleAugmentSelect(augment);
                    }}
                  >
                    <SmallAugmentBox item={augment} />
                  </div>
                ))}
              </div>
            ) : (
              // Detailed grid view with AugmentBox
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDialogAugments.map((augment: Augment, idx: number) => (
                  <div
                    key={augment.name + idx + ""}
                    className={cn(
                      "cursor-pointer p-2 rounded-md transition-colors mx-4 h-[300px]",
                      selectedAugments.some(a => a.name === augment.name) 
                        ? "ring-2 ring-cyan-500 bg-gray-700/50" 
                        : "hover:bg-gray-700/50"
                    )}
                    onClick={() => {
                      handleAugmentSelect(augment);
                    }}
                  >
                    <AugmentBox item={augment} />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-gray-300">
            {selectedAugments.length} augment{selectedAugments.length !== 1 ? 's' : ''} selected
          </div>
          <DialogClose>
            <Button
              type="button"
              className="bg-cyan-500 hover:bg-cyan-700 cursor-pointer"
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