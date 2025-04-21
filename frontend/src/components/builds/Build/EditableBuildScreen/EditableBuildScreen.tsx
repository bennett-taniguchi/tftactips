// Example implementation showing how to import and use both components

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect, JSX } from "react";
import { useGlobalContext } from "@/components/context/context";
import {
  DraggableChampion,
  TFTBoardContainer,
} from "@/components/hexes/TFTBoard";
 
import { Link } from "react-router-dom";
import { ChampionsDialog } from "@/components/champion/ChampionsDialog"; import { SmallAugmentBox } from "@/components/augment/SmallAugmentBox";
import { AugmentsDialog } from "@/components/augment/AugmentDialog";

// Type definitions
interface Champion {
  id?: string;
  name: string;
  imageUrl?: string;
  cost?: number;
  traits?: string[];
  [key: string]: any; // Allow for additional properties
}

interface Augment {
 
    name: string;
    desc?: string;
    effects?: Record<string, any>;
    imageHighS3?: string;
 
}

interface PlacedChampions {
  [position: string]: Champion;
}

interface PhaseState {
  boardChampions: PlacedChampions;
  selectedChampions: Champion[];
  selectedAugments: Augment[];
}

 
type GamePhaseType = "early" | "mid" | "late";

export default function EditableBuildScreen(): JSX.Element {
  const [description,setDescription] = useState("")

  const { champions, augments } = useGlobalContext() ;
  const [buildName, setBuildName] = useState<string>("My TFT Build");
  const [selectedPhase, setSelectedPhase] = useState<GamePhaseType>("mid");

  const [selectedAugments, setSelectedAugments] = useState<Augment[]>([]);
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>([]);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardChampions, setBoardChampions] = useState<PlacedChampions>({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [augmentDialogOpen, setAugmentDialogOpen] = useState(false);
  
  // Keep track of champions and augments for each game phase
  const [phaseState, setPhaseState] = useState<
    Record<GamePhaseType, PhaseState>
  >({
    early: { boardChampions: {}, selectedChampions: [], selectedAugments: [] },
    mid: { boardChampions: {}, selectedChampions: [], selectedAugments: [] },
    late: { boardChampions: {}, selectedChampions: [], selectedAugments: [] },
  });

  // Keep track of the previous phase to use in our save effect
  const previousPhaseRef = useRef<GamePhaseType>(selectedPhase);

  // Effect to save current state BEFORE phase changes
  useEffect(() => {
    // Only execute this effect if we're changing phases (skip on first render)
    if (previousPhaseRef.current !== selectedPhase) {
      // Save the current state to the PREVIOUS phase first
      setPhaseState((prev) => ({
        ...prev,
        [previousPhaseRef.current]: {
          boardChampions: boardChampions,
          selectedChampions: selectedChampions,
          selectedAugments: selectedAugments,
        },
      }));
      
      // Then update the ref for the next change
      previousPhaseRef.current = selectedPhase;
      
      // Load the new phase's state
      setBoardChampions(phaseState[selectedPhase].boardChampions || {});
      setSelectedChampions(phaseState[selectedPhase].selectedChampions || []);
      setSelectedAugments(phaseState[selectedPhase].selectedAugments || []);
    }
  }, [selectedPhase]);

  // Effect to track changes to the current phase's state
  useEffect(() => {
    // This effect will save changes within the same phase
    // Only run if we're not in the initial render
    if (previousPhaseRef.current === selectedPhase) {
      setPhaseState((prev) => ({
        ...prev,
        [selectedPhase]: {
          boardChampions: boardChampions,
          selectedChampions: selectedChampions,
          selectedAugments: selectedAugments,
        },
      }));
    }
  }, [boardChampions, selectedChampions, selectedAugments]);

  // Handle removing a champion from selection
  const handleRemoveChampion = (name: string | undefined): void => {
    setSelectedChampions((prev) =>
      prev.filter((c) => c.parsedData.name !== name)
    );
  };

  // Handle removing an augment from selection
  const handleRemoveAugment = (name: string): void => {
    setSelectedAugments((prev) =>
      prev.filter((a) => a.name !== name)
    );
  };

  // Handle dropping a champion on the board
  const handleDropChampion = (
    row: number,
    col: number,
    champion: Champion
  ): void => {
    // Create a new object instead of mutating the previous state
    setBoardChampions((prev) => {
      const newBoardChampions = { ...prev };
      newBoardChampions[`${row},${col}`] = champion;
      return newBoardChampions;
    });
  };

  // Handle removing a champion from the board
  const handleRemoveFromBoard = (row: number, col: number): void => {
    setBoardChampions((prev) => {
      const updated = { ...prev };
      delete updated[`${row},${col}`];
      return updated;
    });
  };


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
          value={buildName}
          onChange={(e) => setBuildName(e.target.value)}
          placeholder="Build Name"
          className="font-bold bg-transparent border-none text-white w-2/3 focus:outline-none ring ring-white/50"
          style={{
            fontSize: 25,
            textShadow: `
              0 1px 0 rgba(255, 255, 255, 0.3), 
              0 2px 3px rgba(0, 0, 0, 0.5),
              0 0 10px rgba(255, 50, 0, 0.2)
            `,
          }}
        />
        <Link to="/builds">
          <button className="bg-red-800/50 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Save & Close
          </button>
        </Link>
      </div>

      {/* Main content - split into two panes */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane - Game phases, board positioning, carries, tanks, augments */}
        <div className="w-2/3 p-4 border-r border-orange-800/30 flex flex-col">
          {/* Game Phase Selector */}
          <div className="mb-4 w-full ml-[20svw]">
            <Tabs
              value={selectedPhase}
              onValueChange={(value) =>
                setSelectedPhase(value as GamePhaseType)
              }
              className="w-full flex"
            >
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
            className="mb-4 bg-gray-950/50 rounded-md relative overflow-hidden basis-11/20 w-9/10 mx-auto"
            style={{
              boxShadow:
                "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 100, 0, 0.2)",
              border: "1px solid rgba(255, 100, 0, 0.3)",
            }}
            ref={boardContainerRef}
          >
            <h2 className="text-white/90 text-2xl font-bold font-inter p-2 bg-black text-center">
              Board Positioning -{" "}
              {selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)}{" "}
              Game
            </h2>
            <div className="h-full w-full">
              <TFTBoardContainer
                champions={champions as any}
                onDropChampion={handleDropChampion}
                onRemoveChampion={handleRemoveFromBoard}
                placedChampions={boardChampions}
                containerRef={boardContainerRef as any}
              />
            </div>
          </div>

          {/* Selected Champions section */}
          <div className="mb-2 mx-[2svw]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white ml-3 text-2xl font-bold font-inter">
                Selected Champions
              </h2>
            </div>

            {/* Display selected champions as draggable elements */}
            <div className="grid grid-cols-5 gap-3 bg-orange-500/10 border-2 border-orange-400/80 [border-style:dashed] p-2 rounded-md min-h-[150px]">
              {selectedChampions.length !== 0 ? (
                selectedChampions.map((champion) => (
                  <div key={champion.parsedData.name} className="relative">
                    <DraggableChampion champion={champion} />
                    <button
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-[2px] hover:bg-red-800"
                      onClick={() =>
                        handleRemoveChampion(champion.parsedData.name)
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-5 flex items-center justify-center h-full">
                  <div className="text-white/50 font-bold text-center">
                    No champions added yet, click Add Champion
                  </div>
                </div>
              )}
              <div>
                <ChampionsDialog
                  dialogOpen={dialogOpen}
                  setDialogOpen={setDialogOpen}
                  selectedChampions={selectedChampions}
                  setSelectedChampions={setSelectedChampions}
                  champions={champions}
                />
              </div>
            </div>
          </div>

          {/* Augments */}
          <div className="mb-4 mx-[2svw]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white text-2xl font-bold font-inter">
                Augments
              </h2>
              
            </div>
            <div className="grid grid-cols-5 gap-3 text-white bg-blue-500/20 border-2 border-cyan-400/80 [border-style:dashed] p-2 rounded-md min-h-[100px]">
              {selectedAugments.length !== 0 ? (
                selectedAugments.map((augment) => (
                  <div key={augment.name} className="relative">
                    <div className="h-[100px]">
                      <SmallAugmentBox item={augment} />
                    </div>
                    <button
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-[2px] hover:bg-red-800"
                      onClick={() => handleRemoveAugment(augment.name)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-5 flex items-center justify-center h-full">
                  <div className="text-white/50 font-bold text-center">
                    No augments added yet, click Add Augment
                  </div>
                </div>
              )}
              <div>
                <AugmentsDialog
                  dialogOpen={augmentDialogOpen}
                  setDialogOpen={setAugmentDialogOpen}
                  selectedAugments={selectedAugments as any}
                  setSelectedAugments={setSelectedAugments}
                  augments={augments}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Editable Description */}
        <div className="w-1/3 p-4">
          <h2 className="text-white text-xl font-bold mb-2">Build Guide</h2>
          <textarea
          
          onChange={(e)=>setDescription(e.target.value)}
            className="w-full h-[calc(100vh-140px)] bg-black/20 border border-orange-800/30 rounded-md p-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            placeholder="Write your build guide here..."
          />
        </div>
      </div>
    </div>
  );
}