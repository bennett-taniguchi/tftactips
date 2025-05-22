
export function Builds() {
  return (
    <div className="justify-items-center     ">
      <BuildsWithTabs />
    </div>
  );
}

import { useState } from "react";
import YourBuilds from "@/components/builds/YourBuilds/YourBuilds";
import BuildPlaceholder from "@/components/builds/BuildPlaceholder";
import { useAuth0 } from "@auth0/auth0-react";
 
const BuildTabs = () => {
  const [activeTab, setActiveTab] = useState("your");

  const tabs = [
    // { id: 'pro', label: 'Pro Builds' },
    // { id: 'user', label: 'User Builds' },
    { id: "your", label: "Your Builds" },
  ];

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full mt-24  ">
      {/* Tab Navigation with Blurred Backdrop */}
      <div className="relative flex space-x-12 mb-8 px-6 py-3">
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-md rounded-lg border border-emerald-400/50"></div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative z-10 cursor-pointer text-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? "text-emerald-400 brightness-125    "
                : "text-emerald-400/70"
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
      <div className="w-full ">
        {activeTab === "pro" && <ProBuildsSection />}
        {activeTab === "user" && <UserBuildsSection />}
        {activeTab === "your" && <YourBuildsSection />}
      </div>
    </div>
  );
};

// Individual section components
const BuildSection = ({ title, children }: any) => {
 
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-emerald-400 mb-0 ">{title}

       
        </h3> 
        <div className="w-full ml-[-1svw]    h-[1px] bg-emerald-400"/>
        
      <div className="w-full">{children}</div>
     
    </div>
  );
};

const ProBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Popular Pro Builds">
      <div className="text-white  ">
        <BuildPlaceholder type={"loading"} />
      </div>
    </BuildSection>
  );
};

const UserBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Trending User Builds">
      <div className="text-white  ">
        <BuildPlaceholder type={"loading"} />
      </div>
    </BuildSection>
  );
};

const YourBuildsSection = () => {
  // This would eventually use the querySection function prop
  return (
    <BuildSection title="Your Saved Builds">
  
      <div className="text-white flex justify-center ">
        <YourBuilds />
      </div>
    </BuildSection>
  );
};

// Modified Builds component to include the tabs
const BuildsWithTabs = () => {
  return (
    <div className="justify-items-center">
      <div className=" -mb-20 font-inter text-7xl font-bold text-emerald-400 justify-self-start">
        Builds
      </div>

      <div className="flex flex-col  ">
        <BuildTabs />
      </div>

    
    </div>
  );
};

export default BuildTabs;
