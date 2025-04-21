import { cn } from "@/lib/utils";

export function SmallAugmentBox({ item }: any) {
  const traitToUrl = (url: string): string => {
    if (!url) return "/images/augment-placeholder.png";
    
    url = url.replace("https://accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint.us-east-2.amazonaws.com/augments/", "");
    url = url.replace("(1).png", "");
    const cleanName = url.replace(/\s+/g, "").toLowerCase();
    return `https://tft-set14.s3.us-east-2.amazonaws.com/augments/${cleanName}+(1).png`;
  };

  // Safely access data
  const augmentData = item || {};
  const { name, desc, effects, imageHighS3 } = augmentData;
 
  function handleRounding(val: any) {
    if (typeof Number(val) === "number") {
      val = Math.round(Number(val) * 100) / 100;
    }
    return val;
  }

  function checkHashEffect(val: string) {
    if (val.includes("{") && val.includes('}')) {
      return true;
    }
    return false;
  }

  // Get only the most important effects (limit to 4 for compact display)
  const keyEffects = effects ? 
    Object.entries(effects)
      .filter(([key]) => !checkHashEffect(key))
      .slice(0, 4) 
    : [];

  return (
    <div 
      className={cn(
        "w-full h-full overflow-hidden rounded-lg",
        "border border-cyan-500/40",
        "shadow-lg shadow-cyan-400/10",
        "bg-gray-900/90 backdrop-blur-md",
        "relative flex flex-col"
      )}
    >
      {/* Gloss effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10"></div>
      
      {/* Header with image and name */}
      <div className="relative py-2 px-3 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-b border-cyan-500/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded overflow-hidden border border-cyan-500/40 bg-black/40 flex-shrink-0">
            <img
              src={traitToUrl(imageHighS3)}
              alt={name || "Augment"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/augment-placeholder.png";
              }}
            />
          </div>
          <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 truncate max-w-[calc(100%-3rem)]">
            {name || "Unknown Augment"}
          </h3>
        </div>
      </div>
      
      {/* Content area - compact layout */}
      <div className="p-2 flex-1 flex flex-col min-h-0">
        {/* Description - truncated for compact view */}
        <div className="mb-2 bg-gray-950/40 border-[1px] border-green-600/10 rounded-md p-1.5">
          <p className="text-gray-200 text-xs line-clamp-2 text-center">
            {desc || "No description available"}
          </p>
        </div>
        
        {/* Effects section - simplified for compact view */}
        {keyEffects.length > 0 ? (
          <div className="flex-1 min-h-0 bg-gray-800/50 rounded-md p-1.5 border border-emerald-500/20">
            <h4 className="text-emerald-300 text-xs font-medium text-center mb-1">Effects</h4>
            <div className="grid grid-cols-1 gap-y-1 text-xs">
              {keyEffects.map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-400 truncate max-w-[60%]">{key}:</span>
                  <span className="text-cyan-300 font-medium">{String(handleRounding(value))}</span>
                </div>
              ))}
            </div>
            {Object.keys(effects).length > 4 && (
              <div className="text-center text-gray-400 text-xs mt-1">+{Object.keys(effects).length - 4} more</div>
            )}
          </div>
        ) : null}
        
        {/* Bottom decorative element */}
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 rounded-full mt-1"></div>
      </div>
    </div>
  );
}