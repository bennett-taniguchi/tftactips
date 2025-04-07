import React, { useEffect, useRef, useState } from "react";
import TraitBoard from "../trait/TraitsBoard";
import CyberpunkBentoBox, { PanelConfig, CyberPanel } from "./CyberpunkBentoBox";
import SearchBar from "../search/SearchBar";
 
const Home = () => {
  console.log(window.screen);
  
  // Example handler for panel clicks
  const handlePanelClick = (panelId: number) => {
    console.log(`Panel ${panelId} clicked`);
    // You could navigate to different sections or show different content here
  };
  
  // Example custom panel content
  const customPanels: PanelConfig[] = [
    { id: 1, color: "cyan", minSize: 100, defaultSize: 100, content: "Champions" },
    { id: 2, color: "emerald", minSize: 15, defaultSize: 30, content: "Items" },
    { id: 3, color: "purple", minSize: 15, defaultSize: 20, content: "Augments" },
    { id: 4, color: "blue", minSize: 15, defaultSize: 25, content: "Builds" },
    { id: 5, color: "cyan", minSize: 15, defaultSize: 30, content: "Meta Comps" },
    { id: 6, color: "emerald", minSize: 15, defaultSize: 20, content: "Stats" },
    { id: 7, color: "purple", minSize: 15, defaultSize: 25, content: "Guides" },
    { id: 8, color: "blue", minSize: 15, defaultSize: 20, content: "Traits" },
    { id: 9, color: "cyan", minSize: 15, defaultSize: 25, content: "Updates" }
  ];

 
  return (
    <div className="h-[200svh]" style={{ height: "200svh",
  
   }}>
      <div 
      style={{    width: "100vw" ,
        height:'100%',
    
        backgroundImage: `linear-gradient(rgba(150,100,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(150,100,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "48px 48px", }}
      className="flex flex-col min-h-screen justify-self-center mt-[-48px]">
        
        {/* Content container that will appear above the isometric grid */}
        <div className="relative z-1  ">
          {/* Text content section */}
          <div
            className="      py-5 px-8 bg-gradient-to-b rounded-lg pointer-events-auto flex flex-col"
          >
            <div className="bg-linear-to-b from-gray-950 to-gray-950/40   w-[100svw] ml-[-2svw] mt-[-1svh]   text-center py-2 pb-8 flex flex-row  place-content-center">
              <h1 className="pt-4 text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Welcome to tftac.tips♟️
              </h1>
              <h1 className="pt-13 italic  text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-400    ">
                Find your pivot
              </h1>
            </div>
          </div>
        </div>
        
        {/* Search Component */}
        <div   style={{zIndex:1}}  >
          <SearchBar />
        

        </div>
        <div style={{zIndex:0}} className="rounded-xl border border-cyan-400 mx-auto h-[78svh] w-[75svw]   mt-[-65svh]       flex  ">
          <img
           
            src="./img/cybercity_promo.png"
            className="object-cover overflow-hidden  rounded-xl"
          />
        </div>
      
        {/* Bento Box Component */}
        <div className="mt-8 mb-8 mx-auto w-[80svw]">
          <CyberpunkBentoBox 
            panels={customPanels}
            onPanelClick={handlePanelClick}
          />
        </div>
        
        {/* Example of using CyberPanel individually */}
        <div className="mx-auto max-w-6xl mb-8">
          
          <div className="grid grid-cols-2 gap-4">
            
            <CyberPanel glow="purple" size="lg">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-3">
                Featured Build
              </h3>
              <p className="text-gray-300">
                Check out our latest featured TFT build with step-by-step positioning and itemization.
              </p>
            </CyberPanel>
            
            <CyberPanel glow="emerald" size="lg">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-3">
                Patch Notes
              </h3>
              <p className="text-gray-300">
                Stay up to date with the latest balance changes and meta shifts.
              </p>
            </CyberPanel>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Home;