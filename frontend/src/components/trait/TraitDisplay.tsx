import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// TypeScript interface definitions
interface TraitDisplayProps {
  traits: Record<string, number>;
  getTraitImage: (traitName: string) => string;
}

type TraitTier = "bronze" | "silver" | "gold" | "prismatic";

// Trait display component with hover info and color coding based on count
const TraitDisplay: React.FC<TraitDisplayProps> = ({ traits, getTraitImage }) => {
  // Function to determine trait border color based on count
  const getTraitBorderClass = (count: number): TraitTier => {
    if (count >= 8) return "prismatic"; // Prismatic for 9+
    if (count >= 6) return "gold"; // Gold for 6-8
    if (count >= 3) return "silver"; // Silver for 3-5
    return "bronze"; // Bronze for 1-3
  };

  // Prismatic animation effect
  const [rotation, setRotation] = useState<number>(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const getPrismaticStyle = (rotation: number): { background: string } => ({
    background: `conic-gradient(from ${rotation}deg at 50% 50%, 
      rgb(181, 249, 177) -25.61deg, 
      rgb(174, 167, 248) 0.63deg, 
      rgb(185, 232, 188) 27.2deg,
      rgb(246, 254, 216) 56.21deg, 
      rgb(199, 251, 247) 83.01deg, 
      rgb(154, 240, 254) 109.35deg, 
      rgb(245, 236, 255) 129.56deg, 
      rgb(248, 153, 248) 154.85deg, 
      rgb(182, 252, 227) 181.24deg, 
      rgb(126, 147, 242) 210.86deg, 
      rgb(225, 164, 253) 244.3deg, 
      rgb(175, 230, 240) 264.6deg, 
      rgb(243, 241, 199) 287.41deg, 
      rgb(233, 159, 126) 306.52deg, 
      rgb(181, 249, 177) 334.39deg, 
      rgb(174, 167, 248) 360.63deg)`,
  });
  
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(traits).map(([traitName, count], index) => {
        const traitClass = getTraitBorderClass(count);
        const isPrismatic = traitClass === "prismatic";
        
        return (
          <div key={index} className="relative group/icon ">
            {/* Tooltip that appears on hover */}
            <div className="z-100 absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 text-sm whitespace-nowrap ">
              {traitName}
            </div>
            
            {/* Circular background with border color based on trait count */}
            <div 
              className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover/icon:scale-110",
                {
                  "border-2 border-amber-700 bg-amber-900/60": traitClass === "bronze",
                  "border-2 border-gray-400 bg-gray-700/60": traitClass === "silver",
                  "border-2 border-yellow-500 bg-yellow-700/60": traitClass === "gold",
                }
              )}
              style={isPrismatic ? {
               
                borderWidth:'2px',
                background: "rgba(0, 0, 0, 0.6)"
              } : {}}
            >
              {/* Outer glow effect */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-full h-full rounded-full opacity-50 group-hover/icon:opacity-70 transition-opacity duration-300",
                  {
                    "bg-amber-700/30": traitClass === "bronze",
                    "bg-gray-400/30": traitClass === "silver",
                    "bg-yellow-500/30": traitClass === "gold",
                  }
                )}
                style={isPrismatic ? {
                  transform: "scale(1.05)",
                  
                  ...getPrismaticStyle(rotation)
                } : {
                  transform: "scale(1.05)",
                  
                }}
              />
              
              {/* Icon container */}
              <div className={cn(
                " relative z-10 flex items-center justify-center w-8 h-8",
                traitName === "Strategist" ? "mr-1 ml-1 pt-1" : ""
              )}>
                <img
                  src={getTraitImage(traitName)}
                  alt={traitName}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              
              {/* Count indicator */}
              <div className="z-99 absolute -bottom-[10px] -right-[10px] bg-black rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                {count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TraitDisplay;