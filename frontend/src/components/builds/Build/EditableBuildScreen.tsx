import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect, JSX } from "react";
import { useGlobalContext } from "@/components/context/context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DraggableChampion,
  TFTBoardContainer,
} from "@/components/hexes/TFTBoard";
import { ChampionRow } from "@/components/champion/ChampionHierarchy";
import { Link } from "react-router-dom";

// Type definitions
interface Champion {
  id?: string;
  name: string;
  imageUrl?: string;
  cost?: number;
  traits?: string[];
  [key: string]: any; // Allow for additional properties
}

interface PlacedChampions {
  [position: string]: Champion;
}

interface PhaseState {
  boardChampions: PlacedChampions;
  selectedChampions: Champion[];
}

interface GlobalContext {
  champions: Champion[];
  augments: any[];
  [key: string]: any;
}

type GamePhaseType = "early" | "mid" | "late";

export default function EditableBuildScreen(): JSX.Element {
  const { champions, augments } = useGlobalContext() as GlobalContext;
  const [buildName, setBuildName] = useState<string>("My TFT Build");
  const [selectedPhase, setSelectedPhase] = useState<GamePhaseType>("mid");
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardChampions, setBoardChampions] = useState<PlacedChampions>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  // Keep track of champions for each game phase
  const [phaseState, setPhaseState] = useState<
    Record<GamePhaseType, PhaseState>
  >({
    early: { boardChampions: {}, selectedChampions: [] },
    mid: { boardChampions: {}, selectedChampions: [] },
    late: { boardChampions: {}, selectedChampions: [] },
  });

  // Effect to save current state when phase changes
  useEffect(() => {
    // Save current state to the phase
    setPhaseState((prev) => ({
      ...prev,
      [selectedPhase]: {
        boardChampions: boardChampions,
        selectedChampions: selectedChampions,
      },
    }));
  }, [selectedPhase]);

  // Effect to load state when phase changes
  useEffect(() => {
    // Load state from the phase
    setBoardChampions(phaseState[selectedPhase].boardChampions || {});
    setSelectedChampions(phaseState[selectedPhase].selectedChampions || []);
  }, [selectedPhase, phaseState]);

  // Filter champions based on search query
  const filteredChampions = champions.filter((champion) =>
    champion.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle champion selection from search
  const handleChampionSelect = (champion: Champion): void => {
    setSelectedChampions((prev) => {
      const isAlreadySelected = prev.some(
        (c) => c.parsedData.name === champion.parsedData.name
      );

      if (isAlreadySelected) {
        // Remove the champion
        return prev.filter((c) => c.id !== champion.id);
      } else {
        // Add the champion
        console.log([...prev, champion]);
        return [...prev, champion];
      }
    });
  };

  // Handle removing a champion from selection
  const handleRemoveChampion = (name: string | undefined): void => {
    setSelectedChampions((prev) =>
      prev.filter((c) => c.parsedData.name !== name)
    );
  };

  // Handle dropping a champion on the board
  const handleDropChampion = (
    row: number,
    col: number,
    champion: Champion
  ): void => {
    setBoardChampions((prev) => ({
      ...prev,
      [`${row},${col}`]: champion,
    }));
  };

  // Handle removing a champion from the board
  const handleRemoveFromBoard = (row: number, col: number): void => {
    setBoardChampions((prev) => {
      const updated = { ...prev };
      delete updated[`${row},${col}`];
      return updated;
    });
  };

  // Champion selection dialog component
  function ChampionsDialog({ dialogOpen, setDialogOpen }: any): JSX.Element {
    const [dialogSearchQuery, setDialogSearchQuery] = useState<string>("");

    console.log(champions);
    const filteredDialogChampions = champions.filter((champion) =>
      champion["CHAMPION#"]
        ?.toLowerCase()
        .includes(dialogSearchQuery.toLowerCase())
    );

    return (
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setDialogOpen(true)}
            variant="ghost"
            size="sm"
            className="text-white font-inter font-light text-sm hover:text-black hover:bg-white/50 bg-white/10"
          >
            <Search className="w-4 h-4 mr-1 " />
            Add Champion
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80svw] bg-gray-800">
          <DialogHeader>
            <DialogTitle>Select Champions</DialogTitle>
            <DialogDescription>
              Search and select champions for your build.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full mb-4">
            <Input
              placeholder="Search champions..."
              value={dialogSearchQuery}
              onChange={(e) => setDialogSearchQuery(e.target.value)}
              className="  text-black border-gray-700"
            />
          </div>

          <div className="grid gap-4 py-4 h-[60svh] w-full ">
            <ScrollArea className="h-[60svh] w-full ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {filteredDialogChampions.map((champion, idx) => (
                  <div
                    key={champion.parsedData.name + idx + ""}
                    className="cursor-pointer hover:bg-gray-700/50 p-2 rounded-md transition-colors"
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
          <div className="mb-4  w-full  ml-[20svw] ">
            <Tabs
              value={selectedPhase}
              onValueChange={(value) =>
                setSelectedPhase(value as GamePhaseType)
              }
              className="w-full   flex "
            >
              <TabsList className="bg-orange-900/20 w-2/5 grid grid-cols-3   ">
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
            <h2 className="text-white text-2xl font-semibold    font-inter p-2 bg-orange-700 text-center ">
              Board Positioning -{" "}
              {selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)}{" "}
              Game
            </h2>
            <div className="h-full w-full   ">
              <TFTBoardContainer
                champions={champions}
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
              <ChampionsDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
              />
            </div>

            {/* Search input for filtering selected champions */}
            {/* <div className="mb-3">
              <Input
                placeholder="Filter champions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/50 text-white border-gray-700"
              />
            </div> */}

            {/* Display selected champions as draggable elements */}
            <div className="grid grid-cols-5 gap-3  bg-orange-500/10 border-2 border-orange-400/80 [border-style:dashed] p-2 rounded-md min-h-[150px]">
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
                <div className="col-span-5 flex items-center justify-center h-full ">
                  <div className="text-white/50 font-bold text-center ">
                    No champions added yet, click Add Champion
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Augments */}
          <div className="mb-4 mx-[2svw]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white text-2xl font-bold font-inter">
                Augments
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-black font-inter font-light text-sm  hover:bg-white/50 bg-white/10"
              >
                <Search className="w-4 h-4 mr-2 " />
                Add Augment
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Augment slots will go here */}
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
    </div>
  );
}
