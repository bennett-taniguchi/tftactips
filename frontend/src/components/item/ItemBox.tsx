import { formatEffectKey, formatEffectValue, getItemImage, ItemData, replaceTFTTags } from "../../../utils/items";
import { ScrollArea } from "../ui/scroll-area";

type ItemBoxProps = {
  item: ItemData;
};

function RenderEffects({ effects }: any) {
  if (!effects || Object.keys(effects).length === 0) {
    return <div></div>;
  }

  // Create filtered effects object that removes hash keys
  const filteredEffects = Object.entries(effects).reduce((acc, [key, value]) => {
    const formattedKey = formatEffectKey(key);
    if (formattedKey !== null) {
      acc[formattedKey] = formatEffectValue(value);
    }
    return acc;
  }, {} as Record<string, string>);
  
  // Check if we have any effects left after filtering
  if (Object.keys(filteredEffects).length === 0) {
    return <div></div>;
  }

  // Function to determine background color based on effect importance or type
  const getEffectColor = (key: string) => {
    if (key.toLowerCase().includes("unique")) return "bg-purple-700/80";
    if (key.toLowerCase().includes("special")) return "bg-amber-600/80";
    if (key.toLowerCase().includes("bonus")) return "bg-cyan-700/80";
    if (key.toLowerCase().includes("stat")) return "bg-blue-700/80";
    return "bg-gray-700/80";
  };

  // Calculate the dynamic height for each effect row
  const effectsCount = Object.keys(filteredEffects).length;
  const containerHeight = 200; // Your fixed container height
  const rowHeight = Math.floor(containerHeight / effectsCount);
  
  // Set a minimum row height to prevent rows from becoming too small
  const finalRowHeight = Math.max(rowHeight, 20);
 
  return (
    <div 
      className="w-full bg-gradient-to-b from-gray-900/90 via-gray-800/80 to-gray-700/80 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
      style={{ height: "200px" }}
    >
      <div className="h-full">
        {Object.entries(filteredEffects).map(([key, value], idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-800/60 border-b border-cyan-600/10 last:border-b-0"
            style={{ height: `${finalRowHeight}px` }}
          >
            {/* Left side with key label */}
            <div className={`${getEffectColor(key)} m-1 p-1 border-cyan-400/50 border text-xs shrink flex items-center justify-center min-w-[80px]`}>
              <p className="text-white font-medium truncate">{key}</p>
            </div>
            
            {/* Right side with value */}
            <p className="text-xs text-gray-200 mx-auto truncate px-2">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function ItemBox({ item }: ItemBoxProps) {
  if (!item || !item.parsedData || !(item.parsedData as any).name) {
    return <div></div>;
  }

  const data = item.parsedData;

  return (
    <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 drop-shadow-lg shadow-gray-700 p-6 rounded-lg mx-auto flex flex-col items-center w-full h-full max-w-md">
      <div className="flex flex-col items-center w-full mb-4 gap-3">
        <div className="flex-shrink-0 border-cyan-600/20 border inner-shadow shadow-black rounded-xl p-2 bg-gray-900/50">
          <img
            className="w-16 h-16 object-contain filter drop-shadow-glow"
            src={getItemImage(data.imageLowS3)}
            alt={data.name}
          />
        </div>

        <div className="flex flex-col text-center w-full">
          <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-gradient py-2">
            {data.name}
          </h1>
          {/* Description container with fixed height and proper text handling */}
          <div className="text-xs font-light text-gray-300 mt-1  overflow-hidden relative w-full px-2">
            <div 
              className="break-words text-center w-full" 
              dangerouslySetInnerHTML={{ 
                __html: data.desc ? replaceTFTTags(data.desc) : "" 
              }} 
            />
          </div>
        </div>
      </div>

      <div className="w-full mx-auto flex flex-col">
        <RenderEffects effects={data.effects} />
      </div>
      
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .drop-shadow-glow {
            filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.6));
          }
          .inner-shadow {
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          /* Add these styles for the TFT tags */
          .tft-keyword {
            color: #4ade80;
            font-weight: bold;
          }
          
          .tft-item-rules {
            text-align: left;
            padding: 4px;
            margin-top: 4px;
          }
          
          .tft-bold {
            font-weight: bold;
            color: #f59e0b;
          }
        `}
      </style>
    </div>
  );
}
