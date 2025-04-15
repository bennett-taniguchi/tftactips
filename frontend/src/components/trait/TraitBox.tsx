 
export type Effect = {
  count: string;
  effect: string;
};

export default function TraitBox({ item, children }: any) {
  console.log('trait')
  if (!item || !item['TRAIT#']) {
    return <div></div>;
  }

  function RenderEffect({ effect, height = 250 }: any) {
    let effectArr: Effect[] = JSON.parse(effect);
  
    // Function to determine background color based on trait activation level
    const getTraitColor = (count: number) => {
      if(count === 1) return "bg-red-400/80";
      if (count >= 9) return "bg-purple-700/80";
      if (count >= 7) return "bg-amber-600/80";
      if (count >= 5) return "bg-cyan-700/80";
      if (count >= 3) return "bg-blue-700/80";
      return "bg-gray-700/20";
    };
    
    // Calculate scaling factors based on height
    let headerHeight = 0;
    const contentHeight = height - headerHeight;
    const itemHeight = Math.max(36, contentHeight / effectArr.length);
    // const iconSize = Math.max(24, Math.min(36, itemHeight * 0.7)); // Scale icon between 24-36px
    // const fontSize = height < 200 ? 'text-xs' : height < 300 ? 'text-sm' : 'text-base';
    
     
    return (
      <div 
        className="w-full bg-gradient-to-b from-gray-900/90 via-gray-800/80 to-gray-700/80 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10 overflow-hidden text-white"
        style={{ height: `${height}px` }}
      >
        {/* Effects list - using a scrollable container if needed */}
        <div 
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-800"
          style={{ height: `${contentHeight}px` }}
        >
          {effectArr.map((eff: Effect, idx: number) => {
            const count = Number(eff.count);
            return (
              <div
                key={idx}
                className="  flex items-center bg-gray-800/60 border-b border-cyan-600/10 last:border-b-0 overflow-hidden"
                style={{ height: `${itemHeight}px`, maxHeight: `${itemHeight}px` }}
              >
                {/* Left side with hexagon */}
                <div className={`${getTraitColor(count)} m-5 p-2   border-cyan-400/50 border    text-sm flex-shrink-0 flex items-center justify-center min-w-[30px] min-h-[30px]`}>
                 
                  <p  >{count}</p>
                </div>
                
                {/* Right side with effect description */}
               <p className="text-sm   mx-auto">{eff.effect}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function traitNameToUrl(trait: string) {
    trait = trait.replace(" ", "");

    if (trait == "BoomBot" || data.apiName?.includes("Ballis"))
      trait = "BoomBots";
    if (trait.toLowerCase().includes("god")) trait = "netgod";
    if (trait == "A.M.P.") trait = "amp";

    return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${trait.toLowerCase()}.png`;
  }

  const data = JSON.parse(item.data);

  return (
    <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 drop-shadow-lg shadow-gray-700 p-6 rounded-lg mx-auto flex flex-col items-center w-full h-full max-w-2xl ">
      <div className="flex flex-col md:flex-row items-center w-full mb-6 gap-4 ">
        <div className="flex-shrink-0 border-cyan-600/20 border inner-shadow shadow-black rounded-3xl ">
          <img
            className="w-20 h-20 object-contain filter drop-shadow-glow"
            src={traitNameToUrl(data.name + "")}
            alt={data.name}
          />
        </div>

        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 animate-gradient py-5">
            {data.name}
          </h1>
          <p className="text-lg font-light text-gray-300 mt-1">{data.desc}</p>
        </div>
      </div>

      <div className="w-full mx-auto flex flex-col">
        <RenderEffect effect={data.bonus} data={data} />
        {children}
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
`}
      </style>
    </div>
  );
}