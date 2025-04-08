 
import TraitIcon from '../trait/TraitIcon';
import { cn } from '@/lib/utils';

const BuildPreview = ({ tier }:any) => {
  // Sample data
  const compName = "Anima Squad Vertical";
  const traits = [
    { name: "Anima Squad", count: 8 },
    { name: "Challenger", count: 4 },
    { name: "Marksman", count: 2 },
    { name: "Duelist", count: 2 }
  ];
  
  const units = [
    { name: "Riven", cost: "blue", image: "/api/placeholder/60/60" },
    { name: "Jinx", cost: "gold", image: "/api/placeholder/60/60" },
    { name: "Miss Fortune", cost: "purple", image: "/api/placeholder/60/60" },
    { name: "Jhin", cost: "gold", image: "/api/placeholder/60/60" },
    { name: "Kai'Sa", cost: "purple", image: "/api/placeholder/60/60" },
    { name: "Irelia", cost: "green", image: "/api/placeholder/60/60" },
    { name: "Yasuo", cost: "blue", image: "/api/placeholder/60/60" },
    { name: "Neeko", cost: "silver", image: "/api/placeholder/60/60" }
  ];
  
  const placement = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  
  const carries = [
    { 
      name: "Jinx", 
      image: "/api/placeholder/60/60",
      items: [
        { name: "Infinity Edge", filled: true },
        { name: "Last Whisper", filled: true },
        { name: "Giant Slayer", filled: true }
      ]
    },
    { 
      name: "Miss Fortune", 
      image: "/api/placeholder/60/60",
      items: [
        { name: "Jeweled Gauntlet", filled: true },
        { name: "Archangel's Staff", filled: true },
        { name: "Blue Buff", filled: false }
      ]
    }
  ];

  // Cost color mapping
  const getCostColor = (cost:any) => {
    switch(cost) {
      case 'silver': return 'border-gray-400 bg-gray-900/60';
      case 'green': return 'border-green-500/40 bg-green-900/60';
      case 'blue': return 'border-blue-500/40 bg-blue-900/60';
      case 'purple': return 'border-purple-500/40 bg-purple-900/60';
      case 'gold': return 'border-yellow-400/40 bg-yellow-900/60';
      default: return 'border-gray-400 bg-gray-900/60';
    }
  };

  // Tier-based gradient configurations
  const getTierConfig = (tier:any) => {
    switch(tier) {
      case 'S':
        return {
          // gradient: 'from-cyan-400 to-emerald-400',
          gradient: 'from-black to-black',
          //background: 'from-cyan-500/10 to-emerald-500/10',
          background: 'from-black to-black',
          //border: 'border-cyan-500/40'
          border: 'border-black'
        };
      case 'A':
        return {
          gradient: 'from-blue-400 to-purple-400',
          background: 'from-blue-500/10 to-purple-500/10',
          border: 'border-blue-500/40'
        };
      default:
        return {
          gradient: 'from-purple-400 to-emerald-400',
          background: 'from-purple-500/10 to-emerald-500/10',
          border: 'border-purple-500/40'
        };
    }
  };

  const { gradient, border } = getTierConfig(tier);
 
  return (
    <div className={cn(
      "relative w-full p-6 rounded-xl overflow-hidden transition-all duration-300",
      "border shadow-lg shadow-cyan-400/20", border,
      "  bg-transparent"
    )}>
      {/* Gloss effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-1"></div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"></div>
      
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40"></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Row with all sections */}
        <div className="flex flex-row items-start gap-6">
          {/* Comp Name and Traits */}
          <div className="w-48">
            <h3 className={cn(
              "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-4", 
              gradient
            )}>
              {compName}
            </h3>
            
            <div>
              <h3 className={cn(
                "text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-3",
                gradient
              )}>
                Traits
              </h3>
              <div className="flex flex-wrap gap-2 p-4 rounded-lg backdrop-blur-sm bg-gray-950 border border-cyan-500/20">
                {traits.map((trait, index) => (
                  <div key={index+trait.name} className="relative flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                    <TraitIcon isPrismatic bgColor='bg-black/30' size={50} src="https://tft-set14.s3.us-east-2.amazonaws.com/traits/tft14_emblem_cyberboss-tft_set14+(1).png" />
                  </div>
                ))}
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-cyan-500/40 bg-gray-900/80 text-center z-50 shadow-sm shadow-cyan-500/20">
                  <span className={cn("text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r", gradient)}>3</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Units */}
          <div className="w-60 ">
            <h3 className={cn(
              "text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-3 ",
              gradient
            )}>
              Units
            </h3>
            <div className="flex flex-wrap gap-3 p-4 rounded-lg backdrop-blur-sm bg-gray-950 border border-cyan-500/20">
              {units.map((unit, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "w-12 h-12 rounded-full border-2 overflow-hidden flex items-center justify-center transition-all duration-300",
                    "shadow-md shadow-cyan-500/10 hover:scale-105 hover:shadow-cyan-500/30",
                    getCostColor(unit.cost)
                  )}
                >
                  <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Placement */}
          <div className="w-auto">
            <h3 className={cn(
              "text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-3",
              gradient
            )}>
              Placement
            </h3>
            <div className=" flex flex-col gap-1 p-4 rounded-lg backdrop-blur-sm bg-gray-950 border border-cyan-500/20">
              {placement.map((row, rowIndex) => (
                <div key={rowIndex} className="flex" style={{ marginLeft: rowIndex % 2 === 0 ? '0' : '16px' }}>
                  {row.map((cell, cellIndex) => (
                    <div 
                      key={cellIndex} 
                      className={cn(
                        "w-8 h-8 m-0.5 transition-all duration-300",
                        cell 
                          ? "bg-gradient-to-r  bg-red-400 shadow-sm shadow-cyan-500/20" 
                          : "bg-red-400/30 border border-gray-700/40"
                      )}
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Carries Section */}
        <div>
          <h3 className={cn(
            "text-right text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-3",
            gradient
          )}>
            Carries
          </h3>
          <div className="flex gap-4 justify-end">
            {carries.map((carry, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex bg-gray-950 p-3 rounded-lg transition-all duration-300",
                  "border border-cyan-500/30 backdrop-blur-sm",
                  "shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/40"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full border-2 border-yellow-400/60 bg-yellow-900/60 overflow-hidden mr-3",
                  "shadow-sm shadow-yellow-400/20"
                )}>
                  <img src={carry.image} alt={carry.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className={cn(
                    "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 font-medium mb-2"
                  )}>
                    {carry.name}
                  </p>
                  <div className="flex gap-2">
                    {carry.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className={cn(
                          "w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium",
                          "transition-all duration-300 shadow-sm",
                          item.filled 
                            ? "bg-gradient-to-br from-cyan-500/60 to-emerald-500/60 text-white shadow-cyan-500/20" 
                            : "bg-gray-800/60 border border-cyan-500/20 text-gray-400"
                        )}
                      >
                        {itemIndex + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPreview;