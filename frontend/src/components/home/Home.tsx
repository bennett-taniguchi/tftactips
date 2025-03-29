import React, { useEffect, useRef, useState } from "react";
import TraitBoard from "../trait/TraitsBoard";

const Home = () => {
    console.log(window.screen)
  return (
    <div className="h-[200svh]" style={{ height: "200svh", width: "100%" }}>
      <div className="flex flex-col min-h-screen">
        {/* Content container that will appear above the isometric grid */}
        <div className="relative z-10  ">
          {/* Text content section */}
          <div
            style={{
              width: "59%",
              height: "100%",
              backgroundImage: `
              linear-gradient(rgba(150,100,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(150,100,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "48px 48px",
              opacity: 1,
            }}
            className="ml-[-200px] text-left py-5 px-8 bg-gradient-to-b from-gray-900 to-black/90 rounded-lg border-purple-500/50 border-[1px] w-[700px] pointer-events-auto"
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Welcome to tftac.tips ♟️
            </h1>
            <div className="w-full max-w-2xl text-left px-2 rounded">
              <p className="text-gray-100/90 mt-5 font-light text-xl">
                Find the perfect comp to pivot into based on your early game
                items and champions.
              </p>
              <p className="text-gray-100/90 font-light text-xl">
                Easy access to information on augments, traits, champions, and
                top-performing builds in the current meta.
              </p>
              <p className="text-gray-100/90 font-light text-xl">
                Browse our comprehensive guides and tools to climb the ranked
                ladder faster.
              </p>
            </div>
          </div>

         
        </div>
        <TraitBoard />
      </div>
    </div>
  );
};

export default Home;
