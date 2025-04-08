import { cn } from "@/lib/utils"; // Assuming you have this utility

export function AugmentBox({ item }: any) {
  const traitToUrl = (url: string): string => {
    if (!url) return "/images/augment-placeholder.png";
    
    url = url.replace("https://accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint.us-east-2.amazonaws.com/augments/", "");
    url = url.replace("(1).png", "");
    const cleanName = url.replace(/\s+/g, "").toLowerCase();
    return `https://tft-set14.s3.us-east-2.amazonaws.com/augments/${cleanName}+(1).png`;
  };

  // Safely access parsedData
  const augmentData = item?.parsedData || {};
  const { name, desc, effects, imageHighS3 } = augmentData;
 
  function handleRounding (val:any) {
    if ( typeof Number(val) == "number") {
        val = Math.round(Number(val)*100)/100
    }
    return val
  }

  function checkHashEffect(val:string) {
    if(val.includes("{") && val.includes('}')) {
        return true
    }return false
  }
 

  return (
    <div 
      className={cn(
        "h-[400px] w-[400px] overflow-hidden rounded-lg",
        "border border-cyan-500/40",
        "shadow-lg shadow-cyan-400/20",
        "bg-gray-900/90 backdrop-blur-md",
        "relative"
      )}
    >
      {/* Gloss effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10"></div>
      
      {/* Header with image and name */}
      <div className="relative py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-b border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded overflow-hidden border border-cyan-500/40 bg-black/40">
            <img
              src={traitToUrl(imageHighS3)}
              alt={name || "Augment"}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image handling
                const target = e.target as HTMLImageElement;
                target.src = "/images/augment-placeholder.png";
              }}
            />
          </div>
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
            {name || "Unknown Augment"}
          </h2>
        </div>
        
        {/* Glossy highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Content area */}
      <div className="p-4 flex flex-col h-[calc(100%-80px)]">
        {/* Description */}
        <div className=" my-auto pb-1 text-md">
          <p className="text-gray-200 leading-relaxed">{desc || "No description available"}</p>
        </div>
        
        {/* Effects section with glossy style */}
        {effects && Object.keys(effects).length > 0 ? (
          <div className="flex-grow bg-gray-800/50 rounded-md p-3 border border-emerald-500/20 overflow-y-auto">
            <h3 className="text-emerald-300 mb-2 font-medium">Effects</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 justify-items-center ">
              {Object.entries(effects).map(([key, value]) => (
                
                !checkHashEffect(key)
                
                ?
                <div key={key} className="flex justify-between">
                <span className="text-gray-400 text-sm">{key}:</span>
                <span className="text-cyan-300 font-medium  text-md">{String(handleRounding(value))}</span>
              </div>
                :
                <div key={key}></div>
            
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        
        {/* Bottom decorative element */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 rounded-full mt-4"></div>
      </div>
    </div>
  );
}