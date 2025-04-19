import { useGlobalContext } from "@/components/context/context";
import CyberpunkBentoBox, {
  PanelConfig,
  CyberPanel,
} from "../components/home/CyberpunkBentoBox";
import SearchBar from "../components/search/SearchBar";
import { useEffect } from "react";
import { WelcomeGlass } from "@/components/home/WelcomeGlass";
import OrbitingHexagons from "@/components/home/OrbitingHexagons";
 

const Home = () => {
  const { traits, champions, augments, items } = useGlobalContext();
  useEffect(() => {}, [traits, champions, augments, items]);

  // Example handler for panel clicks
  const handlePanelClick = (panelId: number) => {
    console.log(`Panel ${panelId} clicked`);
    // You could navigate to different sections or show different content here
  };

  // Example custom panel content
  const customPanels: PanelConfig[] = [
    {
      id: 1,
      color: "cyan",
      minSize: 100,
      defaultSize: 100,
      content: "Champions",
    },
    { id: 2, color: "emerald", minSize: 15, defaultSize: 30, content: "Items" },
    {
      id: 3,
      color: "purple",
      minSize: 15,
      defaultSize: 20,
      content: "Augments",
    },
    { id: 4, color: "blue", minSize: 15, defaultSize: 25, content: "Builds" },
    {
      id: 5,
      color: "cyan",
      minSize: 15,
      defaultSize: 30,
      content: "Meta Comps",
    },
    { id: 6, color: "emerald", minSize: 15, defaultSize: 20, content: "Stats" },
    { id: 7, color: "purple", minSize: 15, defaultSize: 25, content: "Guides" },
    { id: 8, color: "blue", minSize: 15, defaultSize: 20, content: "Traits" },
    { id: 9, color: "cyan", minSize: 15, defaultSize: 25, content: "Updates" },
  ];
  // rgba(150,100,255,0.2)
  return (
    <div className="h-[200svh]" style={{ height: "300svh" }}>
      <div
        style={{
          width: "100vw",
          height: "100%",

          backgroundImage: `linear-gradient(rgba(150,100,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(150,100,255,0.7) 1px, transparent 1px)`,
          backgroundSize: "140px 140px",
        }}
        className="flex flex-col min-h-screen justify-self-center mt-[-40px]"
      >
        {/* Content container that will appear above the isometric grid */}

        <div className="relative  opacity-80" style={{ zIndex: 1, mixBlendMode:"color-dodge" }}>
          <img
            src="./img/cybercity_promo.png"
            className="h-[103svh] w-[100svw] absolute opacity-70 saturate-40  "
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl  ">
          <WelcomeGlass />
        </div>
        <div   >
          <OrbitingHexagons />
        </div>
      
        {/* <div className="relative h-[100svh] w-[100svw] overflow-hiden">
          

          <div
            className="absolute top-0 mt-[-20svh] left-0 ml-[-25svw] w-[40%] h-[80%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,232,255,0.5) 0%, rgba(80,70,225,0.3) 50%, rgba(250,100,255,0.5) 100%)",
              transform: "rotate(190deg) translateX(-25%) translateY(-25%)",
              filter: "blur(30px)",
              zIndex: 0,
              opacity: 0.8,
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)",
            }}
          />
          
          

          <div
            className="absolute top-0 mt-[-20svh] left-0 ml-[15svw] w-[40%] h-[80%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,232,255,0.5) 0%, rgba(80,70,225,0.3) 50%, rgba(250,100,255,0.5) 100%)",
              transform: "rotate(145deg) translateX(-25%) translateY(-25%)",
              filter: "blur(30px)",
              zIndex: 0,
              opacity: 0.8,
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)",
            }}
          />
              <div
            className="absolute top-0 mt-[-110svh] left-0 ml-[30svw] w-[40%] h-[80%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,232,255,0.5) 0%, rgba(80,70,225,0.3) 50%, rgba(250,100,255,0.5) 100%)",
              transform: "rotate(100deg) translateX(-25%) translateY(-25%)",
              filter: "blur(30px)",
              zIndex: 0,
              opacity: 0.8,
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)",
            }}
          />

          <div
            className="absolute top-0 mt-[-30svh] left-0 ml-[60svw] w-[40%] h-[80%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(250,232,255,0.5) 0%, rgba(80,70,225,0.3) 50%, rgba(250,100,255,0.5) 100%)",
              transform: "rotate(100deg) translateX(-25%) translateY(-25%)",
              filter: "blur(30px)",
              zIndex: 0,
              opacity: 0.8,
              clipPath:
                "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)",
            }}
          />
          
         
         
        </div> */}
        {/* Search Component */}
        <div
          className="py-[4svh] mt-[-140svh] ml-[6svw] flex flex-row"
          style={{ zIndex: 10 }}
        >
          <SearchBar />
        </div>

        <div className="relative mt-44 justify-self-center flex flex-col  w-[100svw] h-[220svh] bg-gray-950/90">
          {/* Bento Box Component */}
          <div
            style={{ zIndex: 1 }}
            className="absolute   mx-auto   mb-8   mt-[0svh]  ml-[10svw]  h-[40svh] w-[80svw]  "
          >
            <CyberpunkBentoBox
              panels={customPanels}
              onPanelClick={handlePanelClick}
            />
          </div>
          {/* Example of using CyberPanel individually */}
          <div className=" ml-[17svw] max-w-6xl mb-8   mt-[80svh]">
            <div className="grid grid-cols-2 gap-4">
              <CyberPanel glow="purple" size="lg">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-3">
                  Featured Build
                </h3>
                <p className="text-gray-300">
                  Check out our latest featured TFT build with step-by-step
                  positioning and itemization.
                </p>
              </CyberPanel>

              <CyberPanel glow="emerald" size="lg">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3">
                  Patch Notes
                </h3>
                <p className="text-gray-300">
                  Stay up to date with the latest balance changes and meta
                  shifts.
                </p>
              </CyberPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
