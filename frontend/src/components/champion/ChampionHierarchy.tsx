import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import {
  AbilityData,
 
  AbilityStats,
 
  getAbilityImageUrl,
  getChampionImageUrl,
} from "./ChampionBox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
 

// --- Assume these types/functions exist based on your context ---
// Define or import your Champion type based on the sample data
interface Champion {
  "CHAMPION#": string;
  METADATA?: string;
  data?: string; // JSON string
  parsedData?: ChampionParsedData; // Pre-parsed object
  id?: string; // Add if potentially used as key fallback
  name?: string; // Add if potentially used as key fallback
}

interface ChampionParsedData {
  cost: string | number; // Cost can be string or number
  apiName: string;
  name: string;
  ability: AbilityData;
  parsedTraits?: string[]; // Use this if available
  traits?: string[] | string; // Fallback: might be array or JSON string
  imageAbilityS3: string;
  imageHighS3: string;
  imageLowS3: string;
  // ... other potential fields from your data (image URLs etc.)
}

// Assume getChampionImageUrl exists

// --- End Assumptions ---

// --- Constants --- (Keep COST_COLORS and traitToUrl as before)
const COST_COLORS: Record<
  number,
  { border: string; bg: string; text: string; line: string; glow: string }
> = {
  1: {
    border: "border-zinc-400",
    bg: "bg-zinc-800/80",
    text: "text-zinc-200",
    line: "bg-gradient-to-r from-zinc-600 to-zinc-400",
    glow: "shadow-zinc-400/40",
  },
  2: {
    border: "border-green-500",
    bg: "bg-green-900/80",
    text: "text-green-300",
    line: "bg-gradient-to-r from-green-700 to-green-500",
    glow: "shadow-green-500/40",
  },
  3: {
    border: "border-blue-500",
    bg: "bg-blue-900/80",
    text: "text-blue-300",
    line: "bg-gradient-to-r from-blue-700 to-blue-500",
    glow: "shadow-blue-500/40",
  },
  4: {
    border: "border-purple-500",
    bg: "bg-purple-900/80",
    text: "text-purple-300",
    line: "bg-gradient-to-r from-purple-700 to-purple-500",
    glow: "shadow-purple-500/40",
  },
  5: {
    border: "border-orange-500",
    bg: "bg-orange-900/80",
    text: "text-orange-300",
    line: "bg-gradient-to-r from-orange-700 to-orange-500",
    glow: "shadow-orange-500/40",
  },
};
const DEFAULT_COLORS = COST_COLORS[1];

const traitToUrl = (trait: string): string => {
  if (trait === "BoomBot") trait += "s";
  if (trait.toLowerCase().includes("god")) trait = "netgod";
  if (trait === "A.M.P.") trait = "amp";
  const cleanTrait = trait.replace(/\s+/g, "").toLowerCase();
  return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${cleanTrait}.png`;
};

// --- Child Components ---

// TraitIcon remains the same
const TraitIcon: React.FC<{ traitName: string }> = ({ traitName }) => (
  <div className="w-5 h-5 flex-shrink-0 rounded-full overflow-hidden border border-cyan-500/40 shadow-md">
    <img
      src={traitToUrl(traitName)}
      alt={traitName}
      className="w-full h-full object-cover"
      // onError={(e) => {
      //   /* Optional error handling */
      // }}
    />
  </div>
);

type HoverableChampionAbilityProps = {
    champion: Champion;
    colors?: any; // Made optional since we're not using tier-based colors anymore
  };
  
 
  function HoverableChampionAbility({ champion }: HoverableChampionAbilityProps) {
    if (!champion.parsedData || !champion.parsedData.ability) return <div></div>;
    
    const name = champion.parsedData?.ability.name || "";
    const desc = champion.parsedData?.ability.desc || "";
  
    return (
      <HoverCard openDelay={0} closeDelay={1}>
        <HoverCardTrigger asChild>
          <div
            style={{ zIndex: 11 }}
            className={cn(
              "relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-full",
              "border border-cyan-500/40",
              "shadow-lg shadow-cyan-400/20",
              "transition-all duration-300",
              "hover:border-emerald-500/60 hover:shadow-emerald-400/30",
              "cursor-pointer",
              "backdrop-blur-sm"
            )}
          >
            {/* Gloss effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>
            
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"></div>
            
            <img
              src={getAbilityImageUrl(champion.parsedData!.imageAbilityS3)}
              alt={champion.parsedData!.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                // Fallback image handling
                const target = e.target as HTMLImageElement;
                target.src = "/images/champion-placeholder.png";
              }}
            />
          </div>
        </HoverCardTrigger>
        
        <HoverCardContent className="w-80 bg-gray-900/90 backdrop-blur-md border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
          <div className="space-y-3">
            {/* Ability header with glossy effect */}
            <div className="relative py-2 px-3 -mx-3 -mt-3 mb-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-b border-cyan-500/30">
              <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                {name}
              </h4>
              
              {/* Glossy highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Description with subtle highlight */}
            <div className="relative px-1">
              <p className="text-gray-200 leading-relaxed">{desc}</p>
              
              {/* Ability stats with glossy style */}
              {
               
               Object.keys(champion.parsedData!.ability ).length <= 2
                ?
<div></div>
:
                <div className="text-sm mt-4 bg-gray-800/50 rounded-md p-3 border border-emerald-500/20  ">
                <AbilityStats ability={champion.parsedData!.ability} isPopup />
                
                
                </div>
              } 
            </div>
            
            {/* Bottom decorative element */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 rounded-full mt-2"></div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

export const ChampionRow: React.FC<{ champion: Champion,style:string}> = ({ champion,style="" }) => {
  // Extract data, prioritizing parsedData
  const { name, apiName, cost, traits } = useMemo(() => {
    let name = "Unknown";
    let apiName = "";
    let cost: string | number = 1; // Default cost
    let traits: string[] = [];

    if (champion.parsedData) {
      name = champion.parsedData.name || name;
      apiName = champion.parsedData.apiName || apiName;
      cost =
        champion.parsedData.cost !== undefined
          ? champion.parsedData.cost
          : cost;
      // Prefer parsedTraits, fallback to traits (checking if it's already an array)
      if (Array.isArray(champion.parsedData.parsedTraits)) {
        traits = champion.parsedData.parsedTraits;
      } else if (Array.isArray(champion.parsedData.traits)) {
        traits = champion.parsedData.traits;
      }
    } else if (champion.data) {
      // Fallback to parsing the 'data' string if parsedData is missing
      try {
        const parsed = JSON.parse(champion.data);
        name = parsed.name || name;
        apiName = parsed.apiName || apiName;
        cost = parsed.cost !== undefined ? parsed.cost : cost;
        // Handle traits potentially being a JSON string within the data string
        if (typeof parsed.traits === "string") {
          try {
            traits = JSON.parse(parsed.traits);
          } catch {
            traits = [];
          } // Handle double-parsing error
        } else if (Array.isArray(parsed.traits)) {
          traits = parsed.traits;
        }
      } catch (e) {
        console.error("Failed to parse champion.data:", e);
      }
    }

    // Ensure cost is a number for lookup
    const numericCost = typeof cost === "string" ? parseInt(cost, 10) : cost;
    const finalCost =
      isNaN(numericCost) || numericCost < 1 || numericCost > 5
        ? 1
        : numericCost;

    return { name, apiName, cost: finalCost, traits };
  }, [champion]);

  const colors = COST_COLORS[cost] || DEFAULT_COLORS;
  const displayedTraits = traits.slice(0, 3); // Show first 3 traits

  return (
    <div
      className={cn( 
        "flex flex-grow-2 items-center p-1  w-[9.5svw] rounded-lg backdrop-blur-lg",
        "transition-all duration-900 space-x-1",
        colors.bg,
        "border border-t-0 border-l-0",
        colors.border,
        "shadow-md",
        colors.glow,
        style,
        "relative overflow-hidden group"
      )}
    >
      {/* Glass overlay effect */}
      <div className="mr-[-0px]    absolute inset-1 bg-white/5 rounded-lg pointer-events-none"></div>

      {/* Image with border matching cost */}
      <div
        className={cn(
          "relative w-15 h-9/10   rounded-md overflow-hidden ml-2 mt-1",
          `border border-${colors.border.split("-")[1]}`,
          "shadow-sm",
          colors.glow
        )}
      >
        <img
          src={getChampionImageUrl(apiName)}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image handling
            const target = e.target as HTMLImageElement;
            target.src = "/images/champion-placeholder.png";
          }}
        />
      </div>

      {/* Info */}
      <div className="    flex-grow flex flex-col justify-center mx-auto overflow-hidden min-w-0 z-10 -ml-2">
        <span
          className={cn(
            "text-sm font-medium truncate text-left ml-[.5svw]",
            colors.text
          )}
        >
          {name}
        </span>
        {displayedTraits.length > 0 && (
          <div className="flex items-center space-x-1 mt-0.5 ml-[.5svw] p-1 bg-black/20 rounded mx-auto">
            {displayedTraits.map((trait) => (
          
              <TraitIcon key={trait} traitName={trait} />
              
            ))}
          </div>
        )}
      </div>
       
      <HoverableChampionAbility champion={champion} colors={colors} />
      
    </div>
  );
};

// CostTier remains the same
const CostTier: React.FC<{ cost: number; champions: Champion[] }> = ({
  cost,
  champions,
}) => {
  const colors = COST_COLORS[cost] || DEFAULT_COLORS;
  let singleItemSpacing = "";
  if (champions.length == 1) singleItemSpacing = "ml-[0svw]";
  return (
    <div className="flex items-start space-x-1 p-1 mx-auto overflow-x-hidden">
      <div className={`flex-shrink-0 sticky top-4 left-0 z-10 ${colors.bg} ${colors.glow} border-2 ${colors.border} rounded-4xl p-1`}>
        <div
          className={cn(
            " w-14 h-14 rounded-full flex flex-col items-center justify-center  border-transparent shadow-md",
            colors.bg,
            colors.border,
            colors.glow
          )}
        >
          <span className={cn("text-xl font-bold", colors.text)}>{cost}</span>
          <span className="text-xs text-gray-300">Cost</span>
        </div>
      </div>
      <div
  style={{ zIndex: 9, position: 'absolute' }}
  className={`${
    colors.border
  } ml-[-10px] border-y-4 h-14 w-3/4 rounded-l-md border-line-4 ${
    colors.line
  } drop-shadow-2xl ${colors.glow} mt-0 absolute  ${colors.line} transform translate-x-[10px]  -skew-x-20  `}
>
</div>
      <div
        style={{ zIndex: 10 }}
        className={`${singleItemSpacing} mx-auto overflow-x-hidden flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-43`}
      >
        {champions.map((champion) => (
          <ChampionRow
          style="min-w-[10svw]]"
            key={champion["CHAMPION#"] || champion.id || champion.name}
            champion={champion}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
interface ChampionHierarchyProps {
  champions: Champion[] | null | undefined;
  height?: number;
}

const ChampionHierarchy: React.FC<ChampionHierarchyProps> = ({
  champions,
  height = 600,
}) => {
  // Updated grouping logic to prioritize parsedData and handle cost types
  const championsByCost = useMemo(() => {
    if (!champions) return {};

    const grouped: Record<number, Champion[]> = {};
    champions.forEach((champion) => {
      let costRaw: string | number | undefined;

      // Prioritize parsedData
      if (champion.parsedData?.cost !== undefined) {
        costRaw = champion.parsedData.cost;
      } else if (champion.data) {
        // Fallback: parse data string
        try {
          const parsed = JSON.parse(champion.data);
          costRaw = parsed.cost;
        } catch {
          // Ignore if data string is invalid
        }
      }

      if (costRaw !== undefined) {
        // Convert string/number to number
        const costNum =
          typeof costRaw === "string" ? parseInt(costRaw, 10) : costRaw;

        // Validate cost is a number between 1 and 5
        if (!isNaN(costNum) && costNum >= 1 && costNum <= 5) {
          if (!grouped[costNum]) {
            grouped[costNum] = [];
          }
          grouped[costNum].push(champion);
        } else {
          // console.warn("Champion with invalid cost:", costRaw, champion);
        }
      } else {
        // console.warn("Champion missing cost data:", champion);
      }
    });
    return grouped;
  }, [champions]);

  const sortedCosts = useMemo(() => {
    return Object.keys(championsByCost)
      .map(Number)
      .sort((a, b) => b - a);
  }, [championsByCost]);

  // Rest of the component remains largely the same...

  if (!champions || sortedCosts.length === 0) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="flex items-center justify-center bg-gray-800 rounded-lg border border-cyan-500/20 text-gray-500"
      >
        No champions to display.
      </div>
    );
  }

  const showHeader = height > 100;
  const headerHeight = showHeader ? 50 : 0;
  const contentHeight = height - headerHeight;

  return (
    <div
      className="flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-cyan-500/20 shadow-xl overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {/* Header */}
      {showHeader && (
        <div
          className="p-3 flex-shrink-0"
          style={{ height: `${headerHeight}px` }}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-gradient">
            Champion Composition
          </h2>
        </div>
      )}
      {/* Gradient Style */}
      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
      {/* Scrollable Content */}
      <div
        className="content-center flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800/50"
        style={{ height: `${contentHeight}px` }}
      >
        <div className="flex flex-col space-y-4 p-2 overflow-x-hidden ml-2">
          {sortedCosts.map((cost) => (
            <CostTier
              key={cost}
              cost={cost}
              champions={championsByCost[cost]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionHierarchy;
