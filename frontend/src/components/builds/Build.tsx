import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
 

// Define types
type ViewType = "Row" | "Screen";
type GamePhase = "early" | "mid" | "late";
type TraitType = {
  [key: string]: number;
};
type ChampionType = {
  name: string;
  cost?: number;
  parsedData?: string;
  isCarry?: boolean;
  isTank?: boolean;
  items?: string[];
};
type ItemType = string;
type AugmentType = {
  name: string;
  description: string;
};

interface BuildProps {
  title: string;
  traits: TraitType;
  champions: ChampionType[];
  type: string;
  difficulty: string;
  description: string;
  augments?: AugmentType[];
}

export default function Build({
  title,
  traits,
  champions,
  type,
  difficulty,
  description,
  augments = [],
}: BuildProps) {
  const [view, setView] = useState<ViewType>("Row");
  const [currentPhase, setCurrentPhase] = useState<GamePhase>("mid");
  
  // Find the maximum trait count to calculate scaling
  const maxTraitCount = Math.max(...Object.values(traits));
  
  // Filter champions by role
  const carryChampions = champions.filter(champ => champ.isCarry);
  const tankChampions = champions.filter(champ => champ.isTank);
  
  // Toggle view when clicked
  const toggleView = () => {
    setView(view === "Row" ? "Screen" : "Row");
  };
  
  // Helper function to get champion image URL
  const getChampionImage = (champion: ChampionType) => {
    const imageName = champion.parsedData || champion.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_${imageName}_small.png`;
  };
  
  // Helper function to get trait image URL
  const getTraitImage = (traitName: string) => {
    const formattedTraitName = traitName.toLowerCase().replace(/\s+/g, '');
    return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${formattedTraitName}.png`;
  };
  
  if (view === "Row") {
    return (
      <div>
        <div
          onClick={toggleView}
          className="text-black mt-[-1svh] h-[100px] w-[80svw] relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 ease-in-out hover:z-10 cursor-pointer"
          style={{
            background: "rgba(20, 20, 20, 0.7)",
            boxShadow: `
              0 8px 32px 0 rgba(0, 0, 0, 0.6), 
              0 0 0 1px rgba(255, 100, 0, 0.3),
              0 -1px 0 0 rgba(255, 255, 255, 0.3),
              0 1px 0 0 rgba(0, 0, 0, 0.6),
              inset 0 0 15px rgba(0, 0, 0, 0.6),
              inset 0 1px 5px rgba(255, 255, 255, 0.15)
            `,
            backdropFilter: "blur(4px)",
            transformOrigin: "center center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
          }}
        >
          {/* Main gradient background with red, orange, yellow - brightened */}
          <div 
            className="absolute inset-0 z-0 opacity-90 saturate-125 group-hover:saturate-[2.5] group-hover:brightness-110 transition-all duration-300"
            style={{
              background: `
                radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 1) 0%, transparent 60%),
                linear-gradient(130deg, rgba(255, 50, 0, 1) 0%, rgba(255, 160, 0, 1) 50%, rgba(255, 220, 0, 1) 100%)
              `,
              boxShadow: "inset 0 0 50px rgba(255, 120, 0, 0.1), inset 0 0 100px rgba(0, 0, 0, 0.1)"
            }}
          />
          
          {/* Enhanced hover effect layer - only visible on hover */}
          <div 
            className="absolute inset-0 z-1 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />
          
          {/* Content container with enhanced 3D raised glass effect - UNIFIED (no interior borders) */}
          <div 
            className="inset-2 flex justify-center z-10 absolute m-1 rounded-md group-hover:brightness-110 transition-all duration-300" 
            style={{
              backdropFilter: "blur(10px)",
              boxShadow: `
                inset 0 2px 5px rgba(255, 255, 255, 0.2), 
                inset 0 -2px 5px rgba(0, 0, 0, 0.9),
                inset 50px 20px 100px -50px rgba(255, 200, 100, 0.1)
              `,
              borderTop: "1px solid rgba(255, 255, 255, 0.25)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
              borderRight: "1px solid rgba(0, 0, 0, 0.4)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
              transform: "perspective(500px) rotateX(2deg)",
              transformOrigin: "center bottom",
              background: "linear-gradient(to bottom, rgba(60, 30, 10, 0.5), rgba(40, 20, 10, 0.3))",
            }}>
            
            {/* Title section with enhanced 3D text effect */}
            <div 
              className="basis-1/4 text-3xl m-auto ml-5 hover:bg-white/10 transition-all duration-300" 
              style={{
                color: "white",
                textShadow: `
                  0 1px 0 rgba(255, 255, 255, 0.3), 
                  0 2px 3px rgba(0, 0, 0, 0.5),
                  0 0 10px rgba(255, 50, 0, 0.2)
                `,
                position: "relative",
                zIndex: 2,
                transform: "translateZ(2px)",
              }}
            >
              {title}
              <span 
                className="text-md ml-2 group-hover:text-[#ff6666] transition-colors duration-300"
                style={{
                  color: "#ff5555",
                  textShadow: "0 0 5px rgba(255, 0, 0, 0.5), 0 0 10px rgba(255, 50, 0, 0.3)"
                }}
              >({Object.values(traits).reduce((a, b) => a + b, 0)})</span>
            </div>

            {/* Trait icon section - no border or separate shading */}
            <div 
              className="basis-1/4 my-auto py-4 justify-center flex gap-2 relative hover:bg-white/10 transition-all duration-300" 
              style={{
                position: "relative",
                transform: "translateZ(1px)",
              }}
            >
              {/* Map through traits to display icons */}
              {Object.entries(traits).map(([traitName, count], index) => (
                <div key={index} className="relative group/icon">
                  {/* Hexagon outer glow */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full opacity-50 group-hover/icon:opacity-80 group-hover:opacity-80 transition-opacity duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "radial-gradient(circle, rgba(255, 100, 0, 0.8) 0%, rgba(255, 50, 0, 0.4) 70%)",
                      transform: "scale(1.3) ",
                      filter: "blur(4px)",
                    }}
                  />
                  
                  {/* Hexagon drop shadow for raised effect */}
                  <div 
                    className="absolute top-2 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "rgba(0, 0, 0, 0.6)",
                      transform: "scale(1.1) translateY(1px)",
                      filter: "blur(2px)",
                    }}
                  />
                  
                  {/* Hexagon bevel and main surface effects */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full group-hover:brightness-125 transition-all duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 150, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(100% 75%, 50% 100%, 0% 75%, 50% 50%)",
                      background: "linear-gradient(315deg, rgba(0, 0, 0, 0.6) 0%, rgba(100, 50, 0, 0.3) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(0% 25%, 50% 50%, 0% 75%)",
                      background: "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(150, 75, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(100% 25%, 100% 75%, 50% 50%)",
                      background: "linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(150, 75, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full group-hover:brightness-125 transition-all duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "linear-gradient(135deg, rgba(200, 100, 0, 0.3) 0%, rgba(100, 50, 0, 0.5) 100%)",
                      transform: "scale(1)",
                      boxShadow: "inset 0 0 10px rgba(255, 150, 0, 0.5)",
                    }}
                  />
                  
                  {/* Trait icon with scaling based on count/maxTraitCount */}
                  <div
                    className="relative transform hover:scale-125 group-hover:scale-[1.15] transition-all duration-300 z-10 group-hover:brightness-125 flex items-center justify-center"
                    style={{
                      width: 40 * (0.7 + (count / maxTraitCount) * 0.3) + "px", 
                      height: 40 * (0.7 + (count / maxTraitCount) * 0.3) + "px",
                      background: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "50%",
                    }}
                  >
                    <img 
                      src={getTraitImage(traitName)}
                      alt={traitName}
                      className="w-4/5 h-4/5 object-contain"
                    />
                    <div className="absolute bottom-0 right-0 bg-black/80 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">{count}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Champions section - no border or separate shading */}
            <div 
              className="basis-1/4 my-auto flex gap-2 py-4 justify-center hover:bg-white/10 transition-all duration-300"
              style={{
                position: "relative",
                transform: "translateZ(1px)",
              }}
            >
              {/* Map through champions to display icons */}
              {champions.slice(0, 4).map((champion, index) => (
                <div key={index} className="relative group/icon">
                  {/* Hexagon outer glow */}
                  <div 
                    className="absolute top-0 left-0 w-full h-full opacity-40 group-hover/icon:opacity-80 group-hover:opacity-70 transition-all duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "radial-gradient(circle, rgba(255, 220, 0, 0.9) 0%, rgba(255, 120, 0, 0.5) 70%)",
                      transform: "scale(1.3)",
                      filter: "blur(4px)",
                    }}
                  />
                  
                  {/* Hexagon effect layers */}
                  <div 
                    className="absolute top-2 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "rgba(0, 0, 0, 0.6)",
                      transform: "scale(1.1) translateY(1px)",
                      filter: "blur(2px)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full group-hover:brightness-125 transition-all duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%)",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 150, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(100% 75%, 50% 100%, 0% 75%, 50% 50%)",
                      background: "linear-gradient(315deg, rgba(0, 0, 0, 0.6) 0%, rgba(100, 50, 0, 0.3) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(0% 25%, 50% 50%, 0% 75%)",
                      background: "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(150, 75, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full" 
                    style={{
                      clipPath: "polygon(100% 25%, 100% 75%, 50% 50%)",
                      background: "linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(150, 75, 0, 0.2) 100%)",
                      transform: "scale(1.05)",
                    }}
                  />
                  
                  <div 
                    className="absolute top-0 left-0 w-full h-full group-hover/icon:brightness-125 group-hover:brightness-125 transition-all duration-300" 
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: "linear-gradient(135deg, rgba(255, 150, 0, 0.4) 0%, rgba(180, 80, 0, 0.5) 100%)",
                      transform: "scale(1)",
                      boxShadow: "inset 0 0 10px rgba(255, 180, 0, 0.6)",
                    }}
                  />
                  
                  {/* Champion image */}
                  <div
                    className="relative transform hover:scale-125 group-hover:scale-[1.15] transition-all duration-300 z-10 group-hover:brightness-125 flex items-center justify-center"
                    style={{
                      width: "40px", 
                      height: "40px",
                      background: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "50%",
                    }}
                  >
                    <img 
                      src={getChampionImage(champion)}
                      alt={champion.name}
                      className="w-4/5 h-4/5 object-contain"
                    />
                    {/* Indicator for carry or tank */}
                    {champion.isCarry && (
                      <div className="absolute top-0 right-0 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-black text-xs font-bold">C</div>
                    )}
                    {champion.isTank && (
                      <div className="absolute top-0 right-0 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">T</div>
                    )}
                  </div>
                </div>
              ))}
              {/* Show a + indicator if there are more champions */}
              {champions.length > 4 && (
                <div className="flex items-center justify-center text-white font-bold">
                  +{champions.length - 4}
                </div>
              )}
            </div>

            {/* Type and Difficulty section */}
            <div 
              className="basis-1/4 my-auto flex flex-col justify-center text-lg font-bold py-5 hover:bg-white/10 transition-all duration-300"
              style={{
                position: "relative",
                transform: "translateZ(1px)",
              }}
            >
              <span 
                className="ml-5 hover:scale-110 transition-transform duration-300 group-hover:text-[#6aff9a]"
                style={{
                  color: "#5aff90",
                  textShadow: `
                    0 0 5px rgba(0, 255, 0, 0.5), 
                    0 1px 2px rgba(0, 0, 0, 0.5),
                    0 3px 5px rgba(0, 0, 0, 0.3)
                  `,
                  transform: "translateZ(2px)",
                }}
              >{type}</span>
              <span 
                className="ml-5 hover:scale-110 transition-transform duration-300 group-hover:text-[#6aff9a]"
                style={{
                  color: "#5aff90",
                  textShadow: `
                    0 0 5px rgba(0, 255, 0, 0.5), 
                    0 1px 2px rgba(0, 0, 0, 0.5),
                    0 3px 5px rgba(0, 0, 0, 0.3)
                  `,
                  transform: "translateZ(2px)",
                }}
              >{difficulty}</span>
            </div>
          </div>
          
          {/* Enhanced box shadow on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `
                0 12px 40px 5px rgba(255, 100, 0, 0.3),
                0 0 20px 2px rgba(255, 180, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.2)
              `,
              zIndex: -1,
            }}
          />
        </div>
      </div>
    );
  }

  // Expanded Screen view
  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-50 flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(20, 10, 0, 0.95) 0%, rgba(50, 25, 10, 0.98) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header with title and close button */}
      <div className="relative w-full py-4 px-8 flex justify-between items-center border-b border-orange-800/30">
        <h1 
          className="text-4xl font-bold"
          style={{
            color: "white",
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
        <div className="w-2/3 p-4 border-r border-orange-800/30 flex flex-col">
          {/* Game Phase Selector */}
          <div className="mb-4">
            <Tabs defaultValue="mid" className="w-full" onValueChange={(value) => setCurrentPhase(value as GamePhase)}>
              <TabsList className="bg-orange-900/30 w-full grid grid-cols-3">
                <TabsTrigger value="early" className="data-[state=active]:bg-orange-600/50">Early Game</TabsTrigger>
                <TabsTrigger value="mid" className="data-[state=active]:bg-orange-600/50">Mid Game</TabsTrigger>
                <TabsTrigger value="late" className="data-[state=active]:bg-orange-600/50">Late Game</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Board Positioning */}
          <div 
            className="flex-1 mb-4 bg-black/30 rounded-md relative overflow-hidden"
            style={{
              boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 100, 0, 0.2)",
              border: "1px solid rgba(255, 100, 0, 0.3)",
            }}
          >
            <h2 className="text-white text-xl font-bold p-2 bg-black/50">Board Positioning</h2>
            <div className="grid grid-cols-7 grid-rows-4 gap-2 p-4 h-full">
              {/* Generate 28 board slots (7x4) */}
              {Array.from({ length: 28 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-md border border-orange-800/30 bg-black/20 hover:bg-orange-800/20 transition-colors duration-200 flex items-center justify-center"
                >
                  {/* This is where you'd place champions */}
                </div>
              ))}
            </div>
          </div>
          
          {/* Carry Champions */}
          <div className="mb-4">
            <h2 className="text-white text-xl font-bold mb-2">Carry</h2>
            <div className="flex gap-4">
              {/* Carry champions */}
              {carryChampions.map((champion, index) => (
                <div key={index} className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/30 to-orange-700/30 rounded-md flex items-center justify-center border border-yellow-500/50">
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
                          <span className="text-xs text-white">{champion.items[itemIndex]}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Add placeholder carry slots if needed */}
              {carryChampions.length === 0 && (
                <div className="w-16 h-16 bg-black/30 rounded-md flex items-center justify-center border border-yellow-500/30">
                  <span className="text-yellow-500 text-xs">Carry</span>
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
                          <span className="text-xs text-white">{champion.items[itemIndex]}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Add placeholder tank slots if needed */}
              {tankChampions.length === 0 && (
                <div className="w-16 h-16 bg-black/30 rounded-md flex items-center justify-center border border-blue-500/30">
                  <span className="text-blue-500 text-xs">Tank</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Augments */}
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Augments</h2>
            <div className="grid grid-cols-3 gap-4">
              {augments.map((augment, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 rounded-md p-2 border border-purple-500/30">
                  <div className="w-full h-12 bg-black/30 flex items-center justify-center mb-2 rounded border border-purple-500/20">
                    <span className="text-purple-300 font-medium">{augment.name}</span>
                  </div>
                  <p className="text-xs text-gray-300">{augment.description}</p>
                </div>
              ))}
              {/* Add placeholder augment slots if needed */}
              {augments.length === 0 && (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-black/30 rounded-md p-2 border border-purple-500/20 h-24 flex items-center justify-center">
                    <span className="text-purple-400 text-xs">Augment {index + 1}</span>
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
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              
              {/* Trait breakdown */}
              <div className="mt-6 border-t border-orange-800/30 pt-4">
                <h3 className="text-white text-lg font-bold mb-2">Trait Breakdown</h3>
                <div className="space-y-2">
                  {Object.entries(traits).map(([traitName, count], index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center"
                      >
                        <img 
                          src={getTraitImage(traitName)}
                          alt={traitName}
                          className="w-4/5 h-4/5 object-contain"
                        />
                      </div>
                      <span className="text-white">{traitName}: <span className="text-orange-400">{count}</span></span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Champion list */}
              <div className="mt-6 border-t border-orange-800/30 pt-4">
                <h3 className="text-white text-lg font-bold mb-2">All Champions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {champions.map((champion, index) => (
                    <div key={index} className="flex items-center gap-2 bg-black/20 p-2 rounded">
                      <div 
                        className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center"
                      >
                        <img 
                          src={getChampionImage(champion)}
                          alt={champion.name}
                          className="w-4/5 h-4/5 object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-white text-sm">{champion.name}</span>
                        {champion.isCarry && <span className="text-yellow-400 text-xs ml-2">(Carry)</span>}
                        {champion.isTank && <span className="text-blue-400 text-xs ml-2">(Tank)</span>}
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

// Helper component for TraitIcon (to match the original)
function TraitIcon({ src, size = 40, bgColor = "bg-black/60", className = "" }:any) {
  return (
    <div
      className={`${bgColor} rounded-full flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={src}
        alt="Trait"
        className="w-4/5 h-4/5 object-contain"
      />
    </div>
  );
}