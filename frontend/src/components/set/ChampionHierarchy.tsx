import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { getChampionImageUrl } from './ChampionBox';

// --- Assume these types/functions exist based on your context ---
// Define or import your Champion type based on the sample data
interface Champion {
  'CHAMPION#': string;
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
  parsedTraits?: string[]; // Use this if available
  traits?: string[] | string; // Fallback: might be array or JSON string
  // ... other potential fields from your data (image URLs etc.)
}

// Assume getChampionImageUrl exists
 
// --- End Assumptions ---


// --- Constants --- (Keep COST_COLORS and traitToUrl as before)
const COST_COLORS: Record<number, { border: string; bg: string; text: string; line: string; glow: string }> = {
    1: { border: 'border-zinc-400', bg: 'bg-zinc-800/80', text: 'text-zinc-200', line: 'bg-gradient-to-r from-zinc-600 to-zinc-400', glow: 'shadow-zinc-400/40' },
    2: { border: 'border-green-500', bg: 'bg-green-900/80', text: 'text-green-300', line: 'bg-gradient-to-r from-green-700 to-green-500', glow: 'shadow-green-500/40' },
    3: { border: 'border-blue-500', bg: 'bg-blue-900/80', text: 'text-blue-300', line: 'bg-gradient-to-r from-blue-700 to-blue-500', glow: 'shadow-blue-500/40' },
    4: { border: 'border-purple-500', bg: 'bg-purple-900/80', text: 'text-purple-300', line: 'bg-gradient-to-r from-purple-700 to-purple-500', glow: 'shadow-purple-500/40' },
    5: { border: 'border-orange-500', bg: 'bg-orange-900/80', text: 'text-orange-300', line: 'bg-gradient-to-r from-orange-700 to-orange-500', glow: 'shadow-orange-500/40' },
};
const DEFAULT_COLORS = COST_COLORS[1];

 
const traitToUrl = (trait: string): string => {
 
  if (trait === "BoomBot") trait += "s";
  if (trait.toLowerCase().includes("god")) trait = "netgod";
  if (trait === "A.M.P.") trait = "amp";
  const cleanTrait = trait.replace(/\s+/g, '').toLowerCase();
  return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${cleanTrait}.png`;
};


// --- Child Components ---

// TraitIcon remains the same
const TraitIcon: React.FC<{ traitName: string }> = ({ traitName }) => (
    <div className="w-5 h-5 flex-shrink-0 rounded-full overflow-hidden border border-cyan-500/40 shadow-md">
      <img src={traitToUrl(traitName)} alt={traitName} className="w-full h-full object-cover" onError={(e) => { /* Optional error handling */ }} />
    </div>
  );


// Updated ChampionBox to prioritize parsedData
const ChampionBox: React.FC<{ champion: Champion }> = ({ champion }) => {

  // Extract data, prioritizing parsedData
  const { name, apiName, cost, traits } = useMemo(() => {
    let name = 'Unknown';
    let apiName = '';
    let cost: string | number = 1; // Default cost
    let traits: string[] = [];

    if (champion.parsedData) {
        name = champion.parsedData.name || name;
        apiName = champion.parsedData.apiName || apiName;
        cost = champion.parsedData.cost !== undefined ? champion.parsedData.cost : cost;
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
            if (typeof parsed.traits === 'string') {
                try {
                    traits = JSON.parse(parsed.traits);
                } catch { traits = [] } // Handle double-parsing error
            } else if (Array.isArray(parsed.traits)) {
                traits = parsed.traits;
            }
        } catch (e) {
            console.error("Failed to parse champion.data:", e);
        }
    }

    // Ensure cost is a number for lookup
    const numericCost = typeof cost === 'string' ? parseInt(cost, 10) : cost;
    const finalCost = (isNaN(numericCost) || numericCost < 1 || numericCost > 5) ? 1 : numericCost;

    return { name, apiName, cost: finalCost, traits };
  }, [champion]);


  const colors = COST_COLORS[cost] || DEFAULT_COLORS;
  const displayedTraits = traits.slice(0, 3); // Show first 3 traits

  return (
    <div className={cn('flex items-center p-1.5 w-[10svw] rounded-md border hover:shadow-lg transition-all duration-200 space-x-2', colors.bg, colors.border, colors.glow, 'hover:border-cyan-400/60 hover:shadow-cyan-500/30')}>
      {/* Image */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <img src={getChampionImageUrl(apiName)} alt={name} className="w-full h-full object-cover rounded-sm" onError={(e) => { /* Optional error handling */ }}/>
      </div>
      {/* Info */}
      <div className="flex-grow flex flex-col justify-center overflow-hidden min-w-0">
        <span className="text-sm font-medium text-gray-100 truncate">{name}</span>
        {displayedTraits.length > 0 && (
          <div className="flex items-center space-x-1 mt-0.5">
            {displayedTraits.map((trait) => (
              <TraitIcon key={trait} traitName={trait} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// CostTier remains the same
const CostTier: React.FC<{ cost: number; champions: Champion[] }> = ({ cost, champions }) => {
  const colors = COST_COLORS[cost] || DEFAULT_COLORS;
  return (
    <div className="flex items-start space-x-4 p-3">
      <div className="flex-shrink-0 sticky top-4 left-0 z-10">
        <div className={cn('w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 shadow-md', colors.bg, colors.border, colors.glow)}>
          <span className={cn('text-xl font-bold', colors.text)}>{cost}</span>
          <span className="text-xs text-gray-300">Cost</span>
        </div>
      </div>
      <div className="overflow-x-hidden flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[11svw]">
        {champions.map((champion) => (
          <ChampionBox key={champion['CHAMPION#'] || champion.id || champion.name} champion={champion} />
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

const ChampionHierarchy: React.FC<ChampionHierarchyProps> = ({ champions, height = 600 }) => {

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
          const costNum = typeof costRaw === 'string' ? parseInt(costRaw, 10) : costRaw;

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
      <div style={{ height: `${height}px` }} className="flex items-center justify-center bg-gray-800 rounded-lg border border-cyan-500/20 text-gray-500">
        No champions to display.
      </div>
    );
  }

  const showHeader = height > 100;
  const headerHeight = showHeader ? 50 : 0;
  const contentHeight = height - headerHeight;

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-cyan-500/20 shadow-xl overflow-hidden" style={{ height: `${height}px` }}>
      {/* Header */}
      {showHeader && (
        <div className="p-3 flex-shrink-0" style={{ height: `${headerHeight}px` }}>
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
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800/50" style={{ height: `${contentHeight}px` }}>
        <div className="flex flex-col space-y-4 p-2">
          {sortedCosts.map((cost) => (
            <CostTier key={cost} cost={cost} champions={championsByCost[cost]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampionHierarchy;