import { getItemImage, ItemData } from "../../../utils/items";

type ItemBoxProps = {
  item: ItemData;
};

function RenderEffects({ effects }: any) {
  if (!effects || Object.keys(effects).length === 0) {
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

  return (
    <div 
      className="w-full bg-gradient-to-b from-gray-900/90 via-gray-800/80 to-gray-700/80 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 overflow-hidden"
      style={{ height: "200px" }}
    >
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800 h-full">
        {Object.entries(effects).map(([key, value], idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-800/60 border-b border-cyan-600/10 last:border-b-0 overflow-hidden"
            style={{ minHeight: "36px" }}
          >
            {/* Left side with key label */}
            <div className={`${getEffectColor(key)} m-2 p-2 border-cyan-400/50 border text-sm flex-shrink-0 flex items-center justify-center min-w-[80px]`}>
              <p className="text-white font-medium">{key}</p>
            </div>
            
            {/* Right side with value */}
            <p className="text-sm text-gray-200 mx-auto">{value + ""}</p>
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

        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-gradient py-2">
            {data.name}
          </h1>
          <div className="text-sm font-light text-gray-300 mt-1 max-h-16 overflow-y-auto">
            {data.desc}
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
        `}
      </style>
    </div>
  );
}