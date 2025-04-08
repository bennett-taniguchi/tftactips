import {  useState, JSX, FC } from "react"; // Removed unused useEffect, kept JSX/RefObject for clarity if needed elsewhere, added FC

// Define interfaces for component props
interface TraitHexProps {
  size: number;
  bgColor: string; // Pass the actual color class used
  src: string;
  traitName: string;
  index: number; // Keep index if needed for other logic, but don't rely on it for color
  onClick: (traitName: string, index: number, bgColor: string) => void; // Pass bgColor back up
}

// Define interface for structured trait information (IMPROVEMENT)
interface TraitData {
  name: string; // e.g., "Rapidfire" (display name)
  id: string; // e.g., "rapidfire" (lowercase key)
  description: string;
  iconUrl: string;
  colorClass: string; // Store the color class
  synergy: {
    levels: number[];
    effects: string[];
  };
  tags?: { // Optional tags
    origin?: string;
    tier?: string;
  };
  // Add champions directly here or keep the separate championsByTrait map
}

// Define interface for champion information
interface Champion {
  name: string;
  cost: number; // 1-5 cost
  traits: string[]; // Array of trait IDs (lowercase)
  imageUrl: string;
}

// --- TraitHex Component ---
// Simplified stack, only render image once, added accessibility attributes
const TraitHex: FC<TraitHexProps> = ({ size, bgColor, src, traitName, index, onClick }) => {
  const hexagonClipPath: string =
    "polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)";

  // Capitalize trait name for alt text
  const capitalizedTraitName = traitName.charAt(0).toUpperCase() + traitName.slice(1);

  return (
    <div
      className="stack hover:z-50"
      onClick={() => onClick(traitName, index, bgColor)} // Pass bgColor back
      role="button" // Accessibility: Indicate it's interactive
      tabIndex={0} // Accessibility: Make it focusable
      onKeyDown={(e) => { // Accessibility: Allow activation with Enter/Space
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(traitName, index, bgColor);
        }
      }}
      aria-label={`Select trait: ${capitalizedTraitName}`} // Accessibility: Clear label
    >
      {/* Top card - The main visible layer with image */}
      <div
        className={`card top ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          boxShadow:
            "inset 0 0 15px rgba(255,255,255,0.3), inset 0 0 5px rgba(255,255,255,0.5)",
        }}
      >
        <img
          src={src}
          width={size * 0.8} // Slightly smaller image to fit padding/border effect
          height={size * 0.8}
          alt={`${capitalizedTraitName} Trait Icon`}
          className="object-contain max-w-full max-h-full"
          loading="lazy" // Optimization: Lazy load images
        />
      </div>

      {/* Middle card - Simplified stack (adjust opacity/shadows as needed) */}
      <div
        className={`card mid ${bgColor} transition-all duration-300`}
        style={{
          clipPath: hexagonClipPath,
          opacity: 0.75,
          boxShadow: "inset 0 0 8px rgba(255,255,255,0.15)",
        }}
        aria-hidden="true" // Accessibility: Hide decorative elements
      ></div>

      {/* Bottom card - Simplified stack */}
      <div
        className={`card bottom ${bgColor} transition-all duration-300`}
        style={{
          clipPath: hexagonClipPath,
          opacity: 0.55,
          boxShadow: "inset 0 0 4px rgba(255,255,255,0.05)",
        }}
        aria-hidden="true" // Accessibility: Hide decorative elements
      ></div>

      {/* Base card - deepest layer */}
       <div
         className={`card base ${bgColor} transition-all duration-300`}
         style={{
           clipPath: hexagonClipPath,
           opacity: 0.4,
           boxShadow: "inset 0 0 3px rgba(0,0,0,0.5)",
         }}
         aria-hidden="true" // Accessibility: Hide decorative elements
       ></div>

      {/* Shadow - also with hexagon shape */}
      <div
        className="card shadow transition-all duration-300"
        style={{
          clipPath: hexagonClipPath,
          filter: "blur(2px)",
        }}
        aria-hidden="true" // Accessibility: Hide decorative elements
      ></div>
    </div>
  );
};


// --- TraitBoard Component ---
const TraitBoard: FC = () => {
  // Removed unused cardsRef
  const [selectedTraitData, setSelectedTraitData] = useState<TraitData | null>(null); // Use structured TraitData
  const [infoBoxVisible, setInfoBoxVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'info' | 'champions'>('info');

  // --- Data Setup (IMPROVEMENT: More structured data) ---

  // Example of a more structured trait data approach
  const allTraitsData: Record<string, TraitData> = {
    rapidfire: {
      name: "Rapidfire",
      id: "rapidfire",
      description: "Increases attack speed of nearby allies. Units with this trait deal more damage with consecutive attacks.",
      iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/rapidfire.png",
      colorClass: "bg-amber-500", // Store color here
      synergy: {
        levels: [2, 4, 6],
        effects: [
          "+10% Attack Speed",
          "+25% Attack Speed",
          "+40% Attack Speed and abilities cost 15% less mana" // Example
        ]
      },
      tags: { origin: "Tech", tier: "S" } // Example tags
    },
    strategist: {
      name: "Strategist",
      id: "strategist",
      description: "Enables strategic planning. Place units carefully to gain tactical advantages on the battlefield.",
      iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/strategist.png",
      colorClass: "bg-purple-500",
       synergy: {
         levels: [2, 3, 4], // Example different levels
         effects: [
           "Allies in the back 2 rows gain 100 Health.",
           "Allies in the back 2 rows gain 15 AP.",
           "Frontline units gain 20 Armor/MR."
         ]
       },
       tags: { origin: "Shurima", tier: "A" }
    },
     slayer: {
        name: "Slayer",
        id: "slayer",
        description: "Specializes in taking down high-health targets. Gains bonus damage against units with high maximum health.",
        iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/slayer.png",
        colorClass: "bg-blue-500",
        synergy: { levels: [2, 4, 6], effects: ["+X% Damage", "+Y% Damage", "+Z% Damage & Omnivamp"] },
        tags: { tier: "B" }
    },
     goldenox: {
        name: "Golden Ox",
        id: "goldenox",
        description: "Generates additional gold over time. Units with this trait have abilities that can create economic advantages.",
        iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/goldenox.png",
        colorClass: "bg-green-500",
        synergy: { levels: [3, 5], effects: ["Gain gold orb", "Gain better gold orb & luck"] },
        tags: { origin: "Lunar", tier: "A"}
    },
     bruiser: {
        name: "Bruiser",
        id: "bruiser",
        description: "Gains bonus health and regeneration. These durable frontline units can withstand significant damage.",
        iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/bruiser.png",
        colorClass: "bg-red-500",
        synergy: { levels: [2, 4, 6, 8], effects: ["+Health %", "+Health %", "+Health %", "+Health % & Team Health"] },
        tags: { tier: "S" }
    },
    // ... Add ALL other traits here in the same structured format
    // Make sure keys (e.g., 'bastion', 'cypher') match the lowercase names used elsewhere
     bastion: { name: "Bastion", id: "bastion", description: "Provides shields to nearby allies.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/bastion.png", colorClass: "bg-amber-500", synergy: { levels: [2,4,6], effects: ["+Armor/MR", "+Armor/MR", "+Armor/MR"] } },
     cypher: { name: "Cypher", id: "cypher", description: "Decodes enemy strategies.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/cypher.png", colorClass: "bg-purple-500", synergy: { levels: [2,3], effects: ["Info", "Better Info"] } },
     boombots: { name: "Boombots", id: "boombots", description: "Creates explosive minions.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/boombots.png", colorClass: "bg-blue-500", synergy: { levels: [1], effects: ["Spawn bots"] } },
     netgod: { name: "Netgod", id: "netgod", description: "Controls the battlefield through technology.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/netgod.png", colorClass: "bg-green-500", synergy: { levels: [2,4], effects: ["Hack", "Better Hack"] } },
     marksman: { name: "Marksman", id: "marksman", description: "Specializes in long-range attacks.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/marksman.png", colorClass: "bg-red-500", synergy: { levels: [2,4,6], effects: ["+Damage %", "+Damage %", "+Damage %"] } },
     syndicate: { name: "Syndicate", id: "syndicate", description: "Operates in the shadows.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/syndicate.png", colorClass: "bg-amber-500", synergy: { levels: [3,5,7], effects: ["+Stats", "+Stats & Shield", "+Stats & Shield & Omnivamp"] } },
     techie: { name: "Techie", id: "techie", description: "Enhances nearby technological units.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/techie.png", colorClass: "bg-purple-500", synergy: { levels: [2,4], effects: ["Spawn Turret", "Upgrade Turret"] } },
     cyberboss: { name: "Cyberboss", id: "cyberboss", description: "Commands respect and resources.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/cyberboss.png", colorClass: "bg-blue-500", synergy: { levels: [1], effects: ["Unique Boss Mechanic"] } },
     vanguard: { name: "Vanguard", id: "vanguard", description: "Leads the frontline defense.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/vanguard.png", colorClass: "bg-green-500", synergy: { levels: [2,4,6], effects: ["+Armor/MR", "+Armor/MR", "+Armor/MR"] } },
     amp: { name: "Amp", id: "amp", description: "Amplifies nearby abilities.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/amp.png", colorClass: "bg-red-500", synergy: { levels: [2,4], effects: ["+AP %", "+AP %"] } },
     dynamo: { name: "Dynamo", id: "dynamo", description: "Generates energy for allies.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/dynamo.png", colorClass: "bg-amber-500", synergy: { levels: [2,3,4], effects: ["+Mana/sec", "+Mana/sec", "+Mana/sec"] } },
     executioner: { name: "Executioner", id: "executioner", description: "Specializes in finishing low-health targets.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/executioner.png", colorClass: "bg-purple-500", synergy: { levels: [2,4], effects: ["Crit low HP", "Crit lower HP & gain mana"] } },
     exotech: { name: "Exotech", id: "exotech", description: "Utilizes advanced external technology.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/exotech.png", colorClass: "bg-blue-500", synergy: { levels: [3,5], effects: ["Spawn Mech", "Upgrade Mech"] } },
     divinicorp: { name: "Divinicorp", id: "divinicorp", description: "Channels divine power through corporate efficiency.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/divinicorp.png", colorClass: "bg-green-500", synergy: { levels: [2,4], effects: ["Gain bonuses", "Better bonuses"] } },
     virus: { name: "Virus", id: "virus", description: "Spreads debilitating effects.", iconUrl: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/virus.png", colorClass: "bg-red-500", synergy: { levels: [2,4,6], effects: ["Apply debuff", "Stronger debuff", "Strongest debuff"] } },
  };

  // Mock champion data associated with traits (using trait IDs)
  const championsByTrait: Record<string, Champion[]> = {
     rapidfire: [ { name: "Jinx", cost: 4, traits: ["rapidfire", "cyberboss"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     strategist: [ { name: "Azir", cost: 5, traits: ["strategist", "divinicorp"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     slayer: [ { name: "Kayn", cost: 4, traits: ["slayer", "executioner"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     goldenox: [ { name: "TF", cost: 2, traits: ["goldenox", "techie"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     bruiser: [ { name: "Sett", cost: 3, traits: ["bruiser", "exotech"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     bastion: [ { name: "Braum", cost: 2, traits: ["bastion", "vanguard"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     cypher: [ { name: "Akali", cost: 5, traits: ["cypher", "executioner"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     boombots: [ { name: "Ziggs", cost: 1, traits: ["boombots", "techie"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     netgod: [ { name: "Viktor", cost: 5, traits: ["netgod", "techie"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     marksman: [ { name: "Ashe", cost: 2, traits: ["marksman", "syndicate"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     syndicate: [ { name: "Pyke", cost: 3, traits: ["syndicate", "executioner"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     techie: [ { name: "Jayce", cost: 4, traits: ["techie", "vanguard"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     cyberboss: [ { name: "Senna", cost: 5, traits: ["cyberboss", "marksman"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     vanguard: [ { name: "Leona", cost: 1, traits: ["vanguard", "divinicorp"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     amp: [ { name: "Karma", cost: 3, traits: ["amp", "divinicorp"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     dynamo: [ { name: "Kennen", cost: 2, traits: ["dynamo", "exotech"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     executioner: [ { name: "Evelynn", cost: 3, traits: ["executioner", "virus"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     exotech: [ { name: "Rumble", cost: 1, traits: ["exotech", "boombots"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     divinicorp: [ { name: "Kayle", cost: 4, traits: ["divinicorp", "vanguard"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ],
     virus: [ { name: "Singed", cost: 1, traits: ["virus", "techie"], imageUrl: "/api/placeholder/60/60" }, /* ... */ ]
    // Populate with the rest of your champion data...
  };


  // Handle trait click - Use the structured data
  const handleTraitClick = (traitId: string ): void => {
    const traitData = allTraitsData[traitId]; // Find trait data using the lowercase id

    if (traitData) {
        // You could add the index if needed for some specific reason, but it's often better
        // not to rely on visual index for data lookup.
        // const traitDataWithIndex = { ...traitData, displayIndex: index };
        setSelectedTraitData(traitData);
        setInfoBoxVisible(true);
        setActiveTab('info'); // Reset to info tab
    } else {
        console.warn(`Trait data not found for id: ${traitId}`);
        // Optionally show an error or clear selection
        setSelectedTraitData(null);
        setInfoBoxVisible(false);
    }
  };

  // Close info box
  const closeInfoBox = (): void => {
    setInfoBoxVisible(false);
    // Optionally add a small delay before nulling data for smoother animation out
    // setTimeout(() => setSelectedTraitData(null), 300);
  };

  // Get cost color
  const getCostColor = (cost: number): string => {
    switch (cost) {
      case 1: return "bg-gray-500";
      case 2: return "bg-green-600";
      case 3: return "bg-blue-600";
      case 4: return "bg-purple-600";
      case 5: return "bg-amber-400";
      default: return "bg-gray-600";
    }
  };

  // Generate icons for grid
  const generateIcons = (): JSX.Element[] => {
    // Get trait keys (ids) from our structured data
    const traitIds = Object.keys(allTraitsData);
    // You might want a specific order rather than object key order
    // const orderedTraitIds = ["rapidfire", "strategist", ...];

    // Limit to 24 items or however many you want to display
    const itemsToDisplay = traitIds.slice(0, 24);

    return itemsToDisplay.map((traitId, index) => {
      const traitData = allTraitsData[traitId];
      if (!traitData) return null; // Should not happen if keys are correct

      return (
        <TraitHex
          key={traitData.id} // Use stable ID for key
          size={100}
          bgColor={traitData.colorClass} // Use color from data
          src={traitData.iconUrl}
          traitName={traitData.id} // Pass lowercase id
          index={index} // Pass index if needed elsewhere
          onClick={handleTraitClick}
        />
      );
    }).filter(Boolean) as JSX.Element[]; // Filter out potential nulls and assert type
  };

  // bg-gradient-to-r from-red-900 from-1% via-purple-900 via-25% to-blue-900 to-60%
  return (
    <div className="relative min-h-screen  overflow">
      
      <div className=" h-[200svh] w-[200svw] absolute top-[-50svh] left-[-20svw]"/>

      {/* Background isometric grid container (Keep existing structure) */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ padding: "0 10% 0 0" }}>
            <main className="w-full h-full relative">
              {/* Isometric floor */}
              <div
                className="floor"
                style={{
                  position: "absolute", width: "700px", height: "450px",
                  top: "20%", left: "62%",
                  transform: "translateX(-30%) rotateX(45deg) rotateZ(45deg)",
                  transformOrigin: "50% 50%", transformStyle: "preserve-3d",
                  background: "linear-gradient(135deg, rgba(30,30,50,0.8), rgba(10,10,20,0.9))",
                  boxShadow: "inset 0 0 60px rgba(100,70,200,0.2)",
                  borderRadius: "8px", zIndex: 0,
                }}
              >
                {/* Grid lines */}
                <div
                  className="grid-lines"
                  style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundImage: `linear-gradient(rgba(150,100,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(150,100,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px", opacity: 0.4,
                  }}
                ></div>
                {/* Glow */}
                <div
                   className="floor-glow"
                   style={{
                     position: "absolute", top: "40%", left: "40%", width: "20%", height: "20%",
                     background: "radial-gradient(circle, rgba(150,100,255,0.2) 0%, transparent 70%)",
                     filter: "blur(30px)",
                   }}
                ></div>
              </div>

              {/* Cards container - Removed ref as it wasn't used */}
              <div
                className="cards"
                style={{
                  display: "grid", gridTemplateColumns: "repeat(4, 6em)", gridTemplateRows: "repeat(6, 5em)", // Adjusted rows for 24 items
                  gridGap: ".5em", position: "absolute", top: "35%", left: "70%",
                  transform: "translateX(-50%) rotateX(45deg) rotateZ(45deg)",
                  transformOrigin: "50% 50%", transformStyle: "preserve-3d",
                  pointerEvents: "auto", cursor: "pointer", zIndex: 2,
                }}
              >
                {generateIcons()}
              </div>
            </main>
          </div>
        </div>
        {/* Edge mask */}
        <div
           className="absolute top-0 bottom-0 right-0 w-5 bg-gradient-to-l from-black to-transparent pointer-events-none"
           style={{ zIndex: 10 }}
        ></div>
      </div>

      {/* Trait Info Box - Reads from selectedTraitData */}
      {infoBoxVisible && selectedTraitData && (
        <div
          className="fixed left-20 top-4/9 w-96 bg-gray-800/40 bg-opacity-90 text-white rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-out"
          style={{
            boxShadow: "0 0 20px rgba(150,100,255,0.3), 0 0 40px rgba(100,70,200,0.1)",
            animation: "slideIn 0.3s ease-out forwards",
            maxHeight: "70vh", // Limit height
            overflowY: "auto" // Enable scrolling within the box
          }}
          role="dialog"
          aria-labelledby="trait-info-title"
          aria-modal="true"
        >
          <button
            onClick={closeInfoBox}
            className="absolute top-3 right-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            aria-label="Close trait information"
          >
             {/* SVG remains the same */}
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <line x1="18" y1="6" x2="6" y2="18"></line>
               <line x1="6" y1="6" x2="18" y2="18"></line>
             </svg>
          </button>

          {/* Trait Header - Use data for color and image */}
          <div className="flex items-center p-6 pb-3">
            <div
              className={`w-12 h-12 rounded flex items-center justify-center mr-4 ${selectedTraitData.colorClass}`} // Use colorClass from data
            >
              <img
                src={selectedTraitData.iconUrl}
                alt="" // Alt is decorative here as name is adjacent
                className="w-10 h-10 object-contain"
                aria-hidden="true"
              />
            </div>
            <h3 id="trait-info-title" className="text-2xl font-bold">{selectedTraitData.name}</h3> {/* Use display name */}
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 px-6"> {/* Added padding to align */}
             <button
                className={`flex-1 py-2 font-medium ${activeTab === 'info' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'} transition-colors duration-150`}
                onClick={() => setActiveTab('info')}
                role="tab"
                aria-selected={activeTab === 'info'}
                aria-controls="trait-info-panel"
             >
               Trait Info
             </button>
             <button
                className={`flex-1 py-2 font-medium ${activeTab === 'champions' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'} transition-colors duration-150`}
                onClick={() => setActiveTab('champions')}
                role="tab"
                aria-selected={activeTab === 'champions'}
                aria-controls="trait-champions-panel"
             >
               Champions
             </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Info Panel */}
            <div id="trait-info-panel" role="tabpanel" hidden={activeTab !== 'info'}>
                <p className="text-gray-300">{selectedTraitData.description}</p>

                {/* Synergy Bonuses - Read from data */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                    <h4 className="font-medium text-lg mb-2">Synergy Bonuses</h4>
                    <div className="space-y-2">
                    {selectedTraitData.synergy.levels.map((level, idx) => (
                        <div key={level} className="flex justify-between">
                            <span className="text-gray-400">{level} Units</span>
                            <span className="text-gray-300 text-right">{selectedTraitData.synergy.effects[idx] || 'Effect missing'}</span>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Tags - Read from data */}
                {selectedTraitData.tags && (Object.keys(selectedTraitData.tags).length > 0) && (
                  <div className="mt-6">
                    <div className="flex gap-2 flex-wrap">
                        {/* Display synergy levels directly */}
                         <div className="bg-gray-700 px-3 py-1 rounded text-sm">
                           Synergy: {selectedTraitData.synergy.levels.join('/')}
                         </div>
                      {selectedTraitData.tags.origin && (
                        <div className="bg-gray-700 px-3 py-1 rounded text-sm">Origin: {selectedTraitData.tags.origin}</div>
                      )}
                      {selectedTraitData.tags.tier && (
                        <div className="bg-gray-700 px-3 py-1 rounded text-sm">Tier: {selectedTraitData.tags.tier}</div>
                      )}
                    </div>
                  </div>
                )}
            </div> {/* End Info Panel */}

            {/* Champions Panel */}
             <div id="trait-champions-panel" role="tabpanel" hidden={activeTab !== 'champions'}>
                 <div className="space-y-4">
                    <h4 className="font-medium text-lg mb-2">Champions with {selectedTraitData.name}</h4>

                    {/* Use lowercase ID to look up champions */}
                    {(championsByTrait[selectedTraitData.id] || []).map((champion, idx) => (
                        <div key={champion.name + idx} className="bg-gray-900 rounded-lg p-3 flex items-center">
                            <div className={`w-12 h-12 rounded flex-shrink-0 flex items-center justify-center mr-3 ${getCostColor(champion.cost)}`}>
                                <img
                                    src={champion.imageUrl}
                                    alt={champion.name} // Add alt text
                                    className="w-10 h-10 object-contain rounded"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <h5 className="font-bold">{champion.name}</h5>
                                    <div className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-700 flex-shrink-0">
                                        {champion.cost} Cost {/* More descriptive */}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {champion.traits.map((traitId) => {
                                        // Get display name from allTraitsData if possible, fallback to capitalized id
                                        const traitDisplayName = allTraitsData[traitId]?.name || traitId.charAt(0).toUpperCase() + traitId.slice(1);
                                        return (
                                            <span
                                                key={traitId}
                                                className={`text-xs px-2 py-0.5 rounded-full ${
                                                    traitId === selectedTraitData.id
                                                        ? 'bg-purple-700' // Highlight selected trait
                                                        : 'bg-gray-700'
                                                }`}
                                            >
                                                {traitDisplayName}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!championsByTrait[selectedTraitData.id] || championsByTrait[selectedTraitData.id].length === 0) && (
                         <p className="text-gray-400 italic">No champions listed for this trait.</p>
                     )}

                    {/* Optimal Team Comps - Placeholder (Ideally data-driven) */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="font-medium mb-2">Team Building Notes</h4>
                        <div className="bg-gray-900 rounded-lg p-3">
                            <div className="text-sm text-gray-300">
                                <p className="mb-2">General tips for using {selectedTraitData.name}:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {/* Keep these generic or drive them from data */}
                                    <li>Consider pairing with complementary traits.</li>
                                    <li>Itemization depends on the carry units.</li>
                                    <li>Positioning can be crucial based on synergy effects.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 </div>
             </div> {/* End Champions Panel */}
          </div> {/* End Tab Content */}
        </div>
      )}

      {/* CSS styles - Fixed syntax error, simplified stack styles */}
      <style>{`
        .stack {
          display: grid; /* Use grid for easier centering */
          place-items: center; /* Center content in the grid area */
          position: relative;
          transform-style: preserve-3d;
          cursor: pointer;
          /* z-index handled by hover */
          /* Add focus state for accessibility */
          outline: none; /* Remove default */
        }
        .stack:focus-visible { /* Style for keyboard focus */
           outline: 2px solid #a855f7; /* Example purple focus ring */
           outline-offset: 2px;
           border-radius: 2px; /* Optional: slightly round the outline */
        }

        .card {
          /* All cards share the grid cell */
          grid-column: 1 / -1;
          grid-row: 1 / -1;
          /* Use width/height % relative to the grid cell size */
          width: 100%;
          height: 100%;
          position: absolute; /* Needed for translateZ and stacking */
          transition: all 0.3s ease-out; /* Smoother transition */
          /* Base shadow, adjust per layer via inline style or specific classes if needed */
          box-shadow: -1px -1px 0 rgba(0,0,0,0.2) inset;
        }

        /* Define Z-index and base transforms for each layer */
        .top { transform: translateZ(8px); z-index: 5; } /* Reduced Z distance */
        .mid { transform: translateZ(5px); z-index: 4; }
        .bottom { transform: translateZ(3px); z-index: 3; }
        .base { transform: translateZ(1px); z-index: 2; }
        .shadow { background: black; opacity: 0.6; transform: translateZ(0); z-index: 1; }

        /* Floor reflection effect */
        .stack::after {
          content: '';
          position: absolute;
          bottom: 5px; /* Adjust position */
          left: 15%; /* Center it more */
          width: 70%;
          height: 10px;
          background: linear-gradient(to bottom, rgba(150,100,255,0.15), transparent);
          transform: translateY(100%) translateZ(-2px) rotateX(90deg) ; /* Simulate reflection */
          transform-origin: bottom center;
          filter: blur(3px);
          opacity: 0.5;
          z-index: 0;
          transition: all 0.3s ease-out;
        }

        /* Hover states - Kept !important for now, test removal */
        .stack:hover { z-index: 50; } /* Bring whole stack up */
        .stack:hover .top { transform: translateZ(15px) !important; } /* Increase lift */
        .stack:hover .mid { transform: translateZ(12px) !important; }
        .stack:hover .bottom { transform: translateZ(9px) !important; }
        .stack:hover .base { transform: translateZ(6px) !important; }
        .stack:hover .shadow {
           filter: blur(5px) !important;
           opacity: 0.4 !important;
           transform: translateZ(0) scale(1.03) !important; /* Slightly larger shadow */
        }
        .stack:hover::after { /* Enhance reflection on hover */
            opacity: 0.7;
            filter: blur(4px);
            transform: translateY(100%) translateZ(-2px) rotateX(90deg) scale(1.05);
        }

        /* Animation for info box */
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Scrollbar styling (keep existing) */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(150, 100, 255, 0.4); border-radius: 10px; } /* Slightly more visible */
        ::-webkit-scrollbar-thumb:hover { background: rgba(150, 100, 255, 0.6); }

        /* Base body styles (keep existing) */
        html, body {
          overflow-x: hidden; /* Prevent horizontal scroll */
          height: 100%; margin: 0; padding: 0;
          background-color: #111827; /* Tailwind bg-gray-900 */
        }
        /* Ensure root takes full height for positioning */
        #root { height: 100%; }
      `}</style> {/* Removed syntax error and misplaced rules */}
    </div>
  );
};

export default TraitBoard; // Assuming this is the main export
