import { useState } from "react";
import {
  AugmentType,
  ChampionType,
  GamePhase,
  getChampionImage,
  getTraitImage,
  TraitType,
} from "./Build";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import TFTBoardContainer, { TFTBoard } from "@/components/hexes/TFTBoard";
import { cn } from "@/lib/utils";

type BuildScreenProps = {
  build?: any;
  title: string;
  view: any;
  setView: any;
  champions: ChampionType[];
  traits: TraitType;
  augments?: AugmentType[];
  description: string;
};

export default function BuildScreen({
  build,
  title,
  view,
  setView,
  champions,
  traits,
  description,
  augments = [],
}: BuildScreenProps) {
  const [currentPhase, setCurrentPhase] = useState<GamePhase>("mid");
  
  // Toggle view when clicked
  const toggleView = () => {
    setView(view === "Row" ? "Screen" : "Row");
  };
  
  // Filter champions by role
  const carryChampions = champions.filter((champ) => champ.isCarry);
  const tankChampions = champions.filter((champ) => champ.isTank);
//console.log(build.data.mid.boardChampions)
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 flex flex-col bg-radial-[at_50%_75%] from-cyan-600/50 via-emerald-900/70 to-indigo-800/50 to-90%"
      style={{
        // background:
        //   "linear-gradient(135deg, rgba(20, 10, 0, 0.95) 0%, rgba(50, 25, 10, 0.98) 100%)",
        backdropFilter: "blur(40px)",
      }}
    >
      {/* Header with title and close button */}
      <div className="relative w-full py-4 px-8 flex justify-between items-center border-b border-white/30">
        <h1
          className="text-4xl font-bold text-white"
          style={{
            textShadow: `
              0 1px 0 rgba(255, 255, 255, 0.3), 
              0 2px 3px rgba(0, 0, 0, 0.5),
              0 0 10px rgba(255, 50, 0, 0.2)
            `,
          }}
        >
          {title}
        </h1>
        <button
          onClick={toggleView}
          className="bg-red-800/50 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          Close
        </button>
      </div>

      {/* Main content - split into two panes */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Game phases, board positioning, carries, tanks, augments */}
        <div className="w-2/3 p-4 border-r border-white/30 flex flex-col">
          {/* Game Phase Selector */}
          <div className="mb-4 w-full ml-[20svw] ">
            <Tabs
              defaultValue="mid"
              className="w-full"
              onValueChange={(value) => setCurrentPhase(value as GamePhase)}
            >
              <TabsList className="  bg-emerald-900/50 w-2/5 grid grid-cols-3">
                <TabsTrigger
                  value="early"
                  className="cursor-pointer text-white/50 data-[state=active]:text-white data-[state=active]:bg-emerald-600/50"
                >
                  Early Game
                </TabsTrigger>
                <TabsTrigger
                  value="mid"
                  className="cursor-pointer text-white/50 data-[state=active]:text-white data-[state=active]:bg-emerald-600/50"
                >
                  Mid Game
                </TabsTrigger>
                <TabsTrigger
                  value="late"
                  className="cursor-pointer text-white/50 data-[state=active]:text-white data-[state=active]:bg-emerald-600/50"
                >
                  Late Game
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Board Positioning */}
          <div
            className="border border-emerald-400/50 flex-1 mb-4 bg-black/30 rounded-md relative overflow-hidden"
            style={{
              
            }}
          >
            <h2 className="text-white text-xl font-bold p-2 bg-black/50">
              Board Positioning
            </h2>
            <div className=" h-full w-full">
               <TFTBoardContainer champions={champions} onDropChampion={null as any} onRemoveChampion={null as any} placedChampions={build.data[currentPhase+""].boardChampions} containerRef={null as any}/>
            </div>
          </div>

          {/* Carry Champions */}
          <div className="mb-4">
            <h2 className="text-white text-xl font-bold mb-2">Carry</h2>
            <div className="flex gap-4">
              {/* Carry champions */}
              {carryChampions.map((champion, index) => (
                <div key={index} className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/30 to-emerald-700/30 rounded-md flex items-center justify-center border border-yellow-500/50">
                    <img
                      src={getChampionImage(champion)}
                      alt={champion.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                  {/* Items for this carry */}
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((itemIndex) => (
                      <div
                        key={itemIndex}
                        className="w-8 h-8 bg-black/40 rounded-md flex items-center justify-center border border-yellow-500/20"
                      >
                        {champion.items && champion.items[itemIndex] && (
                          <span className="text-xs text-white">
                            {champion.items[itemIndex]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Add placeholder carry slots if needed */}
              {carryChampions.length === 0 && (
                <div className="w-16 h-16 bg-black/30 rounded-md flex items-center justify-center border border-yellow-500/30">
                  <span className="text-yellow-500 text-xs">No Carry</span>
                </div>
              )}
            </div>
          </div>

          {/* Tank Champions */}
          <div className="mb-4">
            <h2 className="text-white text-xl font-bold mb-2">Tank</h2>
            <div className="flex gap-4">
              {/* Tank champions */}
              {tankChampions.map((champion, index) => (
                <div key={index} className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-900/30 rounded-md flex items-center justify-center border border-blue-500/50">
                    <img
                      src={getChampionImage(champion)}
                      alt={champion.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                  {/* Items for this tank */}
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((itemIndex) => (
                      <div
                        key={itemIndex}
                        className="w-8 h-8 bg-black/40 rounded-md flex items-center justify-center border border-blue-500/20"
                      >
                        {champion.items && champion.items[itemIndex] && (
                          <span className="text-xs text-white">
                            {champion.items[itemIndex]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Add placeholder tank slots if needed */}
              {tankChampions.length === 0 && (
                <div className="w-16 h-16 bg-black/30 rounded-md flex items-center justify-center border border-blue-500/30">
                  <span className="text-blue-500 text-xs">No Tank</span>
                </div>
              )}
            </div>
          </div>

          {/* Augments */}
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Augments</h2>
            <div className="grid grid-cols-3 gap-4">
              {augments && augments.length > 0 ? (
                augments.map((augment, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 rounded-md p-2 border border-purple-500/30"
                  >
                    <div className="w-full h-12 bg-black/30 flex items-center justify-center mb-2 rounded border border-purple-500/20">
                      <span className="text-purple-300 font-medium">
                        {augment.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">{augment.description || (augment as any).desc}</p>
                  </div>
                ))
              ) : (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-black/30 rounded-md p-2 border border-purple-500/20 h-24 flex items-center justify-center"
                  >
                    <span className="text-purple-400 text-xs">
                      No Augment {index + 1}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Pane - Description */}
        <div className="w-1/3 p-4">
          <h2 className="text-white text-xl font-bold mb-2">Build Guide</h2>
          <ScrollArea className="h-[calc(100vh-140px)] pr-4">
            <div className="text-gray-300 space-y-4">
              {description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {/* Trait breakdown */}
              <div className="mt-6 border-t border-white/30 pt-4">
                <h3 className="text-white text-lg font-bold mb-2">
                  Trait Breakdown
                </h3>
                <div className="space-y-2">
                  {Object.entries(traits).map(([traitName, count], index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                      <div className={cn(traitName==("Strategist") ? `  mr-[3px] ml-[6px] ` : `ml-1 `)}>
                        <img
                          src={getTraitImage(traitName)}
                          alt={traitName}
                          className="w-4/5 h-4/5 object-contain"
                        />
                        </div>
                      </div>
                      <span className="text-white">
                        {traitName}:{" "}
                        <span className="text-emerald-400">{count}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Champion list */}
              <div className="mt-6 border-t border-white/30 pt-4">
                <h3 className="text-white text-lg font-bold mb-2">
                  All Champions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {champions.map((champion, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-black/20 p-2 rounded"
                    >
                      <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                        <img
                          src={getChampionImage(champion)}
                          alt={champion.name}
                          className="w-4/5 h-4/5 object-contain rounded-full"
                        />
                      </div>
                      <div>
                        <span className="text-white text-sm">
                          {champion.name}
                        </span>
                        {champion.isCarry && (
                          <span className="text-yellow-400 text-xs ml-2">
                            (Carry)
                          </span>
                        )}
                        {champion.isTank && (
                          <span className="text-blue-400 text-xs ml-2">
                            (Tank)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}