import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { Champion, ChampionParsedData } from 'utils/champions';
import { getChampionImageUrl } from './ChampionBox';

// Define types for the component props
interface ChampionCompositionProps {
  champions: Champion[];
  height?: number; // Optional height parameter
}

// Define colors for each cost tier
const COST_COLORS = {
  1: {
    border: 'border-zinc-400',
    bg: 'bg-zinc-800',
    text: 'text-zinc-200',
    line: 'bg-gradient-to-r from-zinc-600 to-zinc-400',
    glow: 'shadow-zinc-400/40'
  },
  2: {
    border: 'border-green-500',
    bg: 'bg-green-900',
    text: 'text-green-300',
    line: 'bg-gradient-to-r from-green-700 to-green-500',
    glow: 'shadow-green-500/40'
  },
  3: {
    border: 'border-blue-500',
    bg: 'bg-blue-900',
    text: 'text-blue-300',
    line: 'bg-gradient-to-r from-blue-700 to-blue-500',
    glow: 'shadow-blue-500/40'
  },
  4: {
    border: 'border-purple-500',
    bg: 'bg-purple-900',
    text: 'text-purple-300',
    line: 'bg-gradient-to-r from-purple-700 to-purple-500',
    glow: 'shadow-purple-500/40'
  },
  5: {
    border: 'border-orange-500',
    bg: 'bg-orange-900',
    text: 'text-orange-300',
    line: 'bg-gradient-to-r from-orange-700 to-orange-500',
    glow: 'shadow-orange-500/40'
  }
};

// Component to render a single trait icon with scaled size
const TraitIcon: React.FC<{ traitName: string, size?: number }> = ({ traitName, size = 6 }) => {
  // Function to convert trait name to URL
  const traitToUrl = (trait: string) => {
    const cleanTrait = trait.replace(" ", "").toLowerCase();
    return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${cleanTrait}.png`;
  };

  return (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden border border-cyan-500/40 shadow-lg`}>
      <img 
        src={traitToUrl(traitName)} 
        alt={traitName} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Scaled champion box component
const ScaledChampionBox: any = ({ champion, scale }:any) => {
    const data = champion.parsedData as ChampionParsedData;
    const traits = data.parsedTraits || [];
    
    // Get first, middle (if unique), and last trait
    const firstTrait = traits[0];
    const lastTrait = traits[traits.length - 1];
    // Find a unique trait that's different from first and last
    const middleTrait = traits.length > 2 ? 
      traits.find(t => t !== firstTrait && t !== lastTrait) : 
      null;
  
    const cost = JSON.parse(champion.data).cost;
    const colors = (({
      1: {
        border: 'border-zinc-400',
        bg: 'bg-zinc-800',
        text: 'text-zinc-200',
        line: 'bg-gradient-to-r from-zinc-600 to-zinc-400',
        glow: 'shadow-zinc-400/40',
        topGradient: 'from-zinc-400 to-zinc-600'
      },
      2: {
        border: 'border-green-500',
        bg: 'bg-green-900',
        text: 'text-green-300',
        line: 'bg-gradient-to-r from-green-700 to-green-500',
        glow: 'shadow-green-500/40',
        topGradient: 'from-green-500 to-green-700'
      },
      3: {
        border: 'border-blue-500',
        bg: 'bg-blue-900',
        text: 'text-blue-300',
        line: 'bg-gradient-to-r from-blue-700 to-blue-500',
        glow: 'shadow-blue-500/40',
        topGradient: 'from-blue-500 to-blue-700'
      },
      4: {
        border: 'border-purple-500',
        bg: 'bg-purple-900',
        text: 'text-purple-300',
        line: 'bg-gradient-to-r from-purple-700 to-purple-500',
        glow: 'shadow-purple-500/40',
        topGradient: 'from-purple-500 to-purple-700'
      },
      5: {
        border: 'border-orange-500',
        bg: 'bg-orange-900',
        text: 'text-orange-300',
        line: 'bg-gradient-to-r from-orange-700 to-orange-500',
        glow: 'shadow-orange-500/40',
        topGradient: 'from-orange-500 to-orange-700'
      }
    } as any)[cost as keyof typeof colors] || {
      border: 'border-zinc-400',
      bg: 'bg-zinc-800',
      text: 'text-zinc-200',
      line: 'bg-gradient-to-r from-zinc-600 to-zinc-400',
      glow: 'shadow-zinc-400/40',
      topGradient: 'from-zinc-400 to-zinc-600'
    }  ) as any;
    
    // Determine if we should show traits based on scale
    const showTraits = scale > 0.5;
    // Determine if we should show names based on scale
    const showName = scale > 0.3;
    
    // Calculate the image size based on scale
    const imageSize = Math.max(6, Math.round(15 * scale));
    const traitSize = Math.max(4, Math.round(6 * scale));
    
    // Determine text size based on scale
    const textSize = scale < 0.5 ? 'text-xs' : 'text-sm';
    
    // Calculate skew and top border parameters
    const skewDegree = '-0deg';
    const topBorderStartHeight = Math.max(1/2, Math.round(2 * scale));
    const topBorderEndHeight = Math.max(3, Math.round(6 * scale));
    
    return (
      <div className="relative">
        {/* Top gradient border that increases in height from left to right */}
        <div 
          className={`absolute top-0 left-0 right-0  bg-gradient-to-r ${colors.topGradient} ${colors.glow}`}
          style={{
            left:"15px",
            height: `${topBorderEndHeight}px`,
            clipPath: `polygon(0 0, 100% 0, 100% 300%, 0 ${topBorderStartHeight}px)`,
            transform: `skewX(${skewDegree})`,
            zIndex: 1
          }}
        ></div>
        
        {/* Main parallelogram container */}
        <div 
          className={`shadow-md ${colors.glow} rounded-l-full flex items-center bg-gray-800 px-${Math.max(1, Math.round(3 * scale))} py-${Math.max(1, Math.round(2 * scale))} border-l border-r border-b border-cyan-500/30 hover:shadow-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden`}
          style={{
            transform: `skewX(${skewDegree})`,
            marginTop: `${topBorderEndHeight}px`,
            zIndex: 0
          }}
        >
          {/* Un-skew the content so it appears normal */}
          <div 
            className="flex items-center justify-between w-full"
            style={{ transform: `skewX(calc(${skewDegree} * -1))` }}
          >
            <div className="flex items-center space-x-2">
              {/* Champion image */}
              <div className={`relative w-${imageSize} h-${imageSize} flex-shrink-0`}>
                <img 
                  src={getChampionImageUrl(data.apiName)} 
                  alt={data.name} 
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              
              {/* Champion name */}
              {showName && (
                <span className={`${textSize} font-medium text-gray-200 truncate max-w-${Math.round(40 * scale)}`}>
                  {data.name}
                </span>
              )}
            </div>
            
            {/* Traits */}
            {showTraits && (
              <div className="flex items-center space-x-1">
                {firstTrait && <TraitIcon traitName={firstTrait} size={traitSize} />}
                {scale > 0.7 && middleTrait && <TraitIcon traitName={middleTrait} size={traitSize} />}
                {scale > 0.6 && lastTrait && firstTrait !== lastTrait && <TraitIcon traitName={lastTrait} size={traitSize} />}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

// Scaled cost tier component
const ScaledCostTier: React.FC<{ 
  cost: number, 
  champions: Champion[], 
  maxWidth: string,
  scale: number
}> = ({ cost, champions, maxWidth, scale }) => {
  const colors = COST_COLORS[cost as keyof typeof COST_COLORS] || COST_COLORS[1];
  
  // Calculate sizes based on scale
  const costIndicatorSize = Math.max(8, Math.round(16 * scale));
  const costTextSize = scale < 0.5 ? 'text-sm' : 'text-xl';
  const subtextSize = scale < 0.5 ? 'text-tiny' : 'text-xs';
  const lineHeight = Math.max(1, Math.round(1 * scale));
  const marginBottom = Math.max(2, Math.round(8 * scale));
  
  // Calculate number of columns based on scale and space
  const columns = scale < 0.4 ? 4 : scale < 0.7 ? 3 : 3;
  const gridCols = `grid-cols-${columns}`;
  
  return (
    <div className={`  ml-5 p-5 overflow-hidden relative   last:mb-0 w-1/2 `} style={{ width: maxWidth }}>
      {/* Cost indicator */}
      <div className="absolute left-[20px] top-1/2 transform -translate-y-1/2 z-10">
        <div className={`w-${costIndicatorSize} h-${costIndicatorSize} rounded-full flex items-center justify-center ${colors.bg} ${colors.border} border-2 shadow-md ${colors.glow}`}>
          <div className="flex flex-col items-center">
            <span className={`${costTextSize} font-bold ${colors.text}`}>{cost}</span>
            {scale > 0.4 && <span className={`${subtextSize} text-gray-300`}>Cost</span>}
          </div>
        </div>
      </div>
      
      {/* Horizontal line */}
      <div 
        style={{zIndex: 9, }} 
        
        className={`${colors.border}   ml-[20px] border-b-4 h-${lineHeight*.5}  w-3/4  rounded-tl-sm ${colors.line} drop-shadow-2xl ${colors.glow} mt-[${Math.round(10 * scale)}px] absolute`}
      ></div>
      
      {/* Champions container */}
      <div className={`ml-[-20px]   rounded-l-full border-black/50 border-b-4 border-bl-sm   ${colors.bg}  mt-${Math.max(2, Math.round(1 * scale))} grid ${gridCols} `}>
        
        {champions.map(champion => (
          <div  className="ml-30" key={champion["CHAMPION#"]} style={{zIndex: 10}}>
            <ScaledChampionBox champion={champion} scale={scale} />
          </div>
        ))}
      </div>
      
     
    </div>
  );
};

// Main component
const ChampionHierarchy: React.FC<ChampionCompositionProps> = ({ champions, height = 600 }) => {
  if (!champions) {
    return <div></div>;
  }
  
  // Group champions by cost
  const championsByCost: Record<number, Champion[]> = {};
  
  champions.forEach(champion => {
    if (!champion.parsedData) return;
    
    const cost = parseInt(champion.parsedData.cost);
    if (!championsByCost[cost]) {
      championsByCost[cost] = [];
    }
    championsByCost[cost].push(champion);
  });
  
  // Sort costs in descending order (highest cost at top)
  const sortedCosts = Object.keys(championsByCost)
    .map(Number)
    .sort((a, b) => b - a);
  
  // Calculate the maximum width based on the cost with most champions
  let maxChampionsInTier = 0;
  sortedCosts.forEach(cost => {
    maxChampionsInTier = Math.max(maxChampionsInTier, championsByCost[cost].length);
  });
  
  // Calculate the width with some buffer
  const maxWidth = `${Math.max(800, maxChampionsInTier * 180)}px`;
  
  // Calculate scale factor based on height and number of cost tiers
  // The baseline is 600px height for 5 cost tiers
  const numTiers = sortedCosts.length;
  const baselineHeight =  400;
  const baselineNumTiers = 5;
  
  // Calculate scale as a ratio of provided height to needed height
  const scale = useMemo(() => {
    const normalizedTierCount = Math.max(1, numTiers);
    const neededHeight = (baselineHeight / (baselineNumTiers)) * normalizedTierCount - 100;
    return Math.min(1, (height / neededHeight));
  }, [height, numTiers]);
  
  // Determine if we should show the header based on scale
  const showHeader = height > 100;
  
  // Calculate content height
  const contentHeight = showHeader ? height - 50 : height;
  
  return (
    <div 
      className="overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-cyan-500/20 shadow-xl"
      style={{ height: `${height}px` }}
    >
      {showHeader && (
        <div className="p-3">
          <h2 className={`${height < 200 ? 'text-lg' : 'text-2xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-gradient`}>
            Champions
          </h2>
        </div>
      )}
      
      {/* Animation keyframes for gradient title */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
      <div 
        className=" overflow-y-none scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800 "
        style={{ height: `${contentHeight}px` }}
      >
        {sortedCosts.map(cost => (
          <ScaledCostTier 
            key={cost} 
            cost={cost} 
            champions={championsByCost[cost]} 
            maxWidth={maxWidth}
            scale={scale}
          />
        ))}
      </div>
    </div>
  );
};

export default ChampionHierarchy;
