import {
  TraitType,
  ChampionType,
  AugmentType,
  getChampionImage,
  getTraitImage,
} from "./Build";
interface BuildRowProps {
  title: string;
  traits: TraitType;
  champions: ChampionType[];
  type: string;
  difficulty: string;

  augments?: AugmentType[];
  view: any;
  setView: any;
}
export default function BuildRow({
  title,
  champions,
  traits,
  view,
  setView,
  type,
  difficulty,
}: BuildRowProps) {
  // Find the maximum trait count to calculate scaling

  // Toggle view when clicked
  const toggleView = () => {
    setView(view === "Row" ? "Screen" : "Row");
  };

  return (
    <div >
      <div
        onClick={toggleView}
        className="    border-2 border-white rounded-4xl text-black mt-[-1svh] h-[120px] w-[80svw] relative overflow-hidden group hover:scale-[1.001] transition-all duration-300 ease-in-out hover:z-10 cursor-pointer"
        style={{
          background: "rgba(20, 20, 20, 0.7)",
          boxShadow: `
                    0 8px 32px 0 rgba(0, 0, 0, 0.6), 
                    0 0 0 1px rgba(255, 100, 0, 0.3),
                    0 -1px 0 0 rgba(255, 255, 255, 0.3),
                    0 1px 0 0 rgba(0, 0, 0, 0.6),
                    inset 0 0 15px rgba(0, 0, 0, 0.6),
                    inset 0 1px 5px rgba(255, 255, 255, 0.15)
                  `,
          backdropFilter: "blur(4px)",
          transformOrigin: "center center",
          transition:
            "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
        }}
      >
        {/* Main gradient background with red, orange, yellow - brightened */}
        <div
          className="  absolute inset-0 z-0 opacity-90 saturate-125 group-hover:saturate-[1.2] group-hover:brightness-102 transition-all duration-300  "
          style={{
            background: `
                      radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 1) 0%, transparent 60%),
                      linear-gradient(130deg, rgba(255, 50, 0, 1) 0%, rgba(255, 160, 0, 1) 50%, rgba(255, 220, 0, 1) 100%)
                    `,
            boxShadow:
              "inset 0 0 50px rgba(255, 120, 0, 0.1), inset 0 0 100px rgba(0, 0, 0, 0.1)",
          }}
        />

        {/* Enhanced hover effect layer - only visible on hover */}
        <div
          className="absolute inset-0 z-1 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content container with enhanced 3D raised glass effect - UNIFIED (no interior borders) */}
        <div
          className=" rounded-4xl  inset-0 flex justify-center z-10 absolute m-1   group-hover:brightness-102 transition-all duration-300"
          style={{
       
          }}
        >
          {/* Title section with enhanced 3D text effect */}
          <div
            className="font-bold basis-1/4 text-3xl m-auto ml-5   transition-all duration-300 "
            style={{
              color: "white",
              position: "relative",
              zIndex: 2,
              transform: "translateZ(2px)",
            }}
          >
            {title}
            {/* <span
              className="text-md ml-2 group-hover:text-[#ff6666] transition-colors duration-300"
              style={{
                color: "#ff5555",
                textShadow:
                  "0 0 5px rgba(255, 0, 0, 0.5), 0 0 10px rgba(255, 50, 0, 0.3)",
              }}
            >
              ({Object.values(traits).reduce((a, b) => a + b, 0)})
            </span> */}
          </div>

          {/* Trait icon section - no border or separate shading */}
          <div
            className="basis-1/4 my-auto py-4 justify-center flex gap-2 relative   transition-all duration-300"
            style={{
              position: "relative",
              transform: "translateZ(1px)",
            }}
          >
            {/* Map through traits to display icons */}
            {Object.entries(traits).map(([traitName, count], index) => (
              <div key={index} className="relative group/icon">
                {/* Hexagon outer glow */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-50 group-hover/icon:opacity-120 group-hover:saturate-150 transition-opacity duration-300"
                  style={{
                    // clipPath:
                    //   "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background:
                      "radial-gradient(circle, rgba(255, 100, 0, 0.8) 0%, rgba(255, 50, 0, 0.4) 70%)",
                    transform: "scale(1.00) ",
                    filter: "blur(4px)",
                  }}
                />

                {/* Trait icon with scaling based on count/maxTraitCount */}
                <div
                  //   className="relative transform hover:scale-125 group-hover:scale-[1.15] transition-all duration-300 z-10 group-hover:brightness-125 flex items-center justify-center"
                  style={{
                    width: "47px",
                    height: "47px",
                    background: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={getTraitImage(traitName)}
                    alt={traitName}
                    className=" object-contain"
                  />
                  <div className="absolute bottom-[-5px] right-[-5px] bg-black/80 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold">
                    {count}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Champions section - no border or separate shading */}
          <div
            className="basis-1/4 my-auto flex gap-2 py-4 justify-center   transition-all duration-300"
            style={{
              position: "relative",
              
            }}
          >
            {/* Map through champions to display icons */}
            {champions.slice(0, 4).map((champion, index) => (
              <div key={index} className="relative group/icon">
                {/* Hexagon outer glow */}
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-100 group-hover/icon:opacity-80 group-hover:opacity-70 transition-all duration-300"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 220, 0, 0.9) 0%, rgba(255, 120, 0, 0.5) 70%)",
                    transform: "scale(1.001)",
                    filter: "blur(4px)",
                  }}
                />

                {/* Hexagon effect layers */}
                <div
                  className="absolute top-[-1px] left-0 w-full h-full rounded-full "
                  style={{
                    // clipPath:
                    //   "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: "rgba(255, 255, 255, .1)",
                    transform: "scale(1.01) translateY(1px)",
                    filter: "blur(0px)",
                  }}
                />

                {/* Champion image */}
                <div
                  className=" h-15 w-15 relative  border-[2px]  rounded-full border-white transform hover:scale-125 group-hover:scale-[1.01] transition-all duration-300 z-10 group-hover:brightness-101 flex items-center justify-center"
                  style={{
                  
                  }}
                >
                  <img
                    src={getChampionImage(champion)}
                    alt={champion.name}
                    className=" object-contain rounded-full"
                  />
                  {/* Indicator for carry or tank */}
                  {champion.isCarry && (
                    <div className="absolute top-[-4px] right-[-4px] bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center text-black text-xs font-bold">
                      C
                    </div>
                  )}
                  {champion.isTank && (
                    <div className="absolute top-[-4px] right-[-4px] bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">
                      T
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Show a + indicator if there are more champions */}
            {champions.length > 4 && (
              <div className="flex items-center justify-center text-white font-bold bg-black/50 rounded-full px-1 mt-[2px]">
                +{champions.length - 4}
              </div>
            )}
          </div>

          {/* Type and Difficulty section */}
          <div
            className="basis-1/4 my-auto flex flex-col justify-center text-lg font-bold py-5   transition-all duration-300"
            style={{
              position: "relative",
     
            }}
          >
            <span
              className="ml-5   transition-transform duration-300 group-hover:drop-shadow-lg text-white drop-shadow-sm shadow-black"
              style={{
             
              }}
            >
              {type}
            </span>
            <span
              className="ml-5  transition-transform duration-300 group-hover:drop-shadow-lg text-white drop-shadow-sm shadow-black"
              style={{
              
          
              }}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {/* Enhanced box shadow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `
                      0 12px 40px 5px rgba(255, 100, 0, 0.3),
                      0 0 20px 2px rgba(255, 180, 0, 0.2),
                      0 0 0 1px rgba(255, 255, 255, 0.2)
                    `,
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
