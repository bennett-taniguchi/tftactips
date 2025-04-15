import {
  AugmentType,
  ChampionType,
  GamePhase,
  getChampionImage,
  TraitType,
} from "./Build";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ChampionParsedData } from "utils/champions";
import { Item, Key } from "@/api/crudapiservice";
import {
  useState,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useRef,
  SetStateAction,
  useEffect,
} from "react";
import { useGlobalContext } from "@/components/context/context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChampionBox from "@/components/champion/ChampionBox";
import { ChampionRow } from "@/components/champion/ChampionHierarchy";
import { cn } from "@/lib/utils";

export default function EditableBuildScreen({}: any) {
  const { champions, augments } = useGlobalContext();

  function ChampionsDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-gray-200"
          >
            <Search className="w-4 h-4" />
            Add Champion
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80svw]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 h-[80svh] w-[40svw] ">
            <ScrollArea className="h-[80svh] w-full">
            {champions.map((champion:any,idx:number) => (
              <div key={idx+""}  >
             <ChampionRow
           style=" w-[40svw]"
            key={champion["CHAMPION#"] || champion.id || champion.name}
            champion={champion as any}
          />
               
              </div>
            ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, rgba(20, 10, 0, 0.95) 0%, rgba(50, 25, 10, 0.98) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header with editable title and close button */}
      <div className="relative w-full py-4 px-8 flex justify-between items-center border-b border-orange-800/30">
        <Input
          placeholder="Build Name"
          className="   font-bold bg-transparent border-none text-white w-2/3 focus:outline-none ring ring-white/50"
          style={{
            fontSize: 25,
            textShadow: `
              0 1px 0 rgba(255, 255, 255, 0.3), 
              0 2px 3px rgba(0, 0, 0, 0.5),
              0 0 10px rgba(255, 50, 0, 0.2)
            `,
          }}
        />
        <button className="bg-red-800/50 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
          Save & Close
        </button>
      </div>

      {/* Main content - split into two panes */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Game phases, board positioning, carries, tanks, augments */}
        <div className="w-2/3 p-4 border-r border-orange-800/30 flex flex-col">
          {/* Game Phase Selector */}
          <div className="mb-4">
            <Tabs defaultValue="mid" className="w-full">
              <TabsList className="bg-orange-900/20 w-2/5 grid grid-cols-3">
                <TabsTrigger
                  value="early"
                  className="text-white/50 data-[state=active]:text-white data-[state=active]:bg-orange-600/50"
                >
                  Early Game
                </TabsTrigger>
                <TabsTrigger
                  value="mid"
                  className="text-white/50 data-[state=active]:text-white data-[state=active]:bg-orange-600/50"
                >
                  Mid Game
                </TabsTrigger>
                <TabsTrigger
                  value="late"
                  className="text-white/50 data-[state=active]:text-white data-[state=active]:bg-orange-600/50"
                >
                  Late Game
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Board Positioning */}
          <div
            className="  mb-4 bg-black/30 rounded-md relative overflow-hidden  basis-2/5"
            style={{
              boxShadow:
                "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 100, 0, 0.2)",
              border: "1px solid rgba(255, 100, 0, 0.3)",
            }}
          >
            <h2 className="text-white text-xl font-bold p-2 bg-black/50">
              Board Positioning
            </h2>
            <div className="grid grid-cols-7 grid-rows-4 gap-2 p-4 h-full">
              {/* Generate 28 board slots (7x4) */}
              {/* {Array.from({ length: 28 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-md border border-orange-800/30 bg-black/20 hover:bg-orange-800/20 transition-colors duration-200 flex items-center justify-center"
                >
                  This is where you'd place champions 
                </div>
              ))} */}
            </div>
          </div>
          {/* All Champions section with search */}
          <div>
            <div className=" flex flex-row    mb-2">
              <h2 className="text-white text-xl font-bold">All Champions</h2>

              <ChampionsDialog />
            </div>
            <div className="grid grid-cols-5 gap-3"></div>
          </div>

          {/* Augments */}
          <div className="mb-4">
            <div className="flex flex-row mb-2">
              <h2 className="text-white text-xl font-bold">Augments</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-400 hover:text-purple-300"
              >
                <Search className="w-4 h-4 mr-1 ml-10" />
                Add Augment
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Add placeholder augment slots if needed */}
            </div>
          </div>
        </div>

        {/* Right Pane - Editable Description */}
        <div className="w-1/3 p-4">
          <h2 className="text-white text-xl font-bold mb-2">Build Guide</h2>
          <textarea
            className="w-full h-[calc(100vh-140px)] bg-black/20 border border-orange-800/30 rounded-md p-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            placeholder="Write your build guide here..."
          />
        </div>
      </div>

      {/* Search modal components */}
      {/* <ChampionSearch 
        isOpen={showChampionSearch} 
        onSelect={handleChampionSelect} 
        onClose={() => setShowChampionSearch(false)} 
        allChampions={allChampions}
      />
      
      <ItemSearch 
        isOpen={showItemSearch} 
        onSelect={handleItemSelect} 
        onClose={() => setShowItemSearch(false)} 
        allItems={allItems}
      />
      
      <AugmentSearch 
        isOpen={showAugmentSearch} 
        onSelect={handleAugmentSelect} 
        onClose={() => setShowAugmentSearch(false)} 
        allAugments={allAugments}
      /> */}
    </div>
  );
}
