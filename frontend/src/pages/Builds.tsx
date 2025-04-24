 
import Build from "@/components/builds/Build/Build";
import { WelcomeGlass } from "@/components/home/WelcomeGlass";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// const buildData = {
//   title: "Anima Squad Vertical",
//   traits: {
//     "AnimaSquad": 6,
//     "Amp": 2,
//     "Rapidfire": 2,
//     "Vanguard": 2
//   },
//   champions: [
//     { 
//       name: "Miss Fortune", 
//       parsedData: "missfortune", 
//       isCarry: true,
//       items: ["IE", "LW", "DB"]
//     },
//     { 
//       name: "Sylas", 
//       parsedData: "sylas", 
//       isTank: true,
//       items: ["Warmog", "Dragon's Claw", "Gargoyle"]
//     },
//     { 
//       name: "Aurora", 
//       parsedData: "aurora"
//     },
//     { 
//       name: "Leona", 
//       parsedData: "leona",
//       isTank: true
//     },
//     { 
//       name: "Viego", 
//       parsedData: "viego"
//     },
//     { 
//       name: "Urgot", 
//       parsedData: "urgot"
//     }
//   ],
//   type: "Vertical",
//   difficulty: "Easy",
//   description: "This build focuses on maximizing the Anima Squad trait to empower your carries. It's particularly strong in the mid to late game when you can get all 6 Anima Squad members.\n\nIn the early game, focus on collecting Anima Squad units and pair them with Quickdraw or Duelist to create a solid foundation. Miss Fortune should be your primary item holder and main carry throughout the game.\n\nSylas and Leona serve as your frontline tanks, while Aurora provides valuable utility. Position your backline carries safely behind the tanks to maximize their damage output.\n\nFor augments, prioritize trait-specific options like Anima Squad Heart/Crest, or look for options that enhance your carries like Jeweled Lotus or Combat Training.",
//   augments: [
//     {
//       name: "Anima Squad Heart",
//       description: "Gain an Anima Squad emblem and +1 to the Anima Squad trait."
//     },
//     {
//       name: "Jeweled Lotus",
//       description: "Your units' Ability Power can critically strike."
//     },
//     {
//       name: "Cybernetic Shell 2",
//       description: "Champions holding an item gain 200 Health and 25 Armor."
//     }
//   ]
// };
export function Builds() {
  return (
    <div className="justify-items-center     ">
       <BuildsWithTabs/>
    </div>
  );
}
 
import { useState } from 'react';
import YourBuilds from "@/components/builds/YourBuilds/YourBuilds";
import BuildPlaceholder from "@/components/builds/BuildPlaceholder";

const BuildTabs = () => {
  const [activeTab, setActiveTab] = useState('pro');

  const tabs = [
    { id: 'pro', label: 'Pro Builds' },
    { id: 'user', label: 'User Builds' },
    { id: 'your', label: 'Your Builds' }
  ];

  const handleTabClick = (tabId:any) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full mt-24">
      {/* Tab Navigation with Blurred Backdrop */}
      <div className="relative flex space-x-12 mb-8 px-6 py-3">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-md rounded-lg border border-emerald-400/50"></div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative z-10 cursor-pointer text-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-emerald-400 brightness-125    ' 
                : 'text-emerald-400/70'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="h-0.5 bg-emerald-400 mt-1 rounded-full shadow-lg shadow-emerald-400/40"></div>
            )}
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="w-full">
        {activeTab === 'pro' && <ProBuildsSection />}
        {activeTab === 'user' && <UserBuildsSection />}
        {activeTab === 'your' && <YourBuildsSection />}
      </div>
    </div>
  );
};


// Individual section components
const BuildSection = ({ title, children }:any) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

const ProBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Popular Pro Builds">
      <div className="text-white  ">
      <BuildPlaceholder type={"loading"}/>
      </div>
    </BuildSection>
  );
};

const UserBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Trending User Builds">
      <div className="text-white  ">
         <BuildPlaceholder type={"loading"}/>
      </div>
    </BuildSection>
  );
};

const YourBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Your Saved Builds">
      <div className="text-white flex justify-center">
      <YourBuilds/>
      </div>
    </BuildSection>
  );
};

// Modified Builds component to include the tabs
const BuildsWithTabs = () => {
  return (
    <div className="justify-items-center">
      <div className="mb-20 font-inter text-7xl font-bold text-emerald-400 justify-self-left absolute">Builds</div>
       
      <div className="flex flex-col ">
      <BuildTabs />
 

 
        
      </div>

      <div className="">
        <Link to="/newbuild">
          <Button className="right-10 bottom-10 absolute w-20 h-20 border borde-rwhite rounded-full cursor-pointer bg-green-400">
            <div className="text-6xl text-center mb-3">+</div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BuildTabs;