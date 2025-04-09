import { Item } from "@/api/crudapiservice";
// import { Button } from "../ui/button";
import { JSX } from "react";
// import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// === TYPE DEFINITIONS ===

interface ChampionData {
  apiName: string;
  name: string;
  cost: string;
  role: string;
  imageAbilityS3: string;
  ability?: AbilityData;
  stats?: ChampionStats;
  traits: string;
  position?: string;
  items?: string[];
  synergies?: string[];
  powerSpikes?: string;
  counters?: string;
  description?: string;
  data?: any;
}

export type AbilityData = {
  name?: string;
  desc?: string;
  [key: string]: any;
}

interface ChampionStats {
  hp?: number;
  mana?: number;
  armor?: number;
  mr?: number;
  attackSpeed?: number;
  damage?: number;
  range?: number;
  [key: string]: any;
}

interface ThemeStyles {
  gradient: string;
  border: string;
  shadow: string;
  accent1: string;
  accent2: string;
  textAccent: string;
  buttonActive: string;
  buttonInactive: string;
}

interface BuildData {
  name: string;
  units: string[];
  items: { [unit: string]: string[] };
  description: string;
  positioning: PositioningData;
}

interface PositioningData {
  rows: number;
  cols: number;
  placements: { [unit: string]: [number, number] };
}

interface RecommendedItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  stats: { [key: string]: string | number };
}

interface FullScreenChampionDetailProps {
  item: Item;
  builds?: BuildData[];
  items?: RecommendedItem[];
  positioning?: PositioningData;
  onClose: () => void;
}

// === HELPER FUNCTIONS ===

/**
 * Formats a URL for champion images
 * @param apiName Champion API name
 * @returns Formatted URL
 */
export function getChampionImageUrl(apiName: string): string {
  return `https://tft-set14.s3.us-east-2.amazonaws.com/champions/${apiName.toLowerCase()}_small.png`;
}

/**
 * Formats a URL for ability images
 * @param imageUrl Original ability image URL
 * @returns Formatted URL
 */
export function getAbilityImageUrl(imageUrl: string): string {
  return imageUrl
    .replace(
      "https://accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint.us-east-2.amazonaws.com/",
      "https://tft-set14.s3.us-east-2.amazonaws.com/"
    );
}

/**
 * Formats a URL for trait images
 * @param trait Trait name
 * @returns Formatted URL
 */
function getTraitImageUrl(trait: string): string {
  trait = trait.replace(" ", "");

  if (trait === "BoomBot") trait += "s";
  if (trait.toLowerCase().includes("god")) trait = "netgod";
  if (trait === "A.M.P.") trait = "amp";

  return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${trait.toLowerCase()}.png`;
}

/**
 * Returns theme styling based on champion cost
 * @param cost Champion cost
 * @returns Theme styling object
 */
function getCostTheme(cost: string): ThemeStyles {
  // Convert cost to number if it's a string
  const costNum = parseInt(cost, 10);

  switch (costNum) {
    case 1:
      // Grey/silver theme for cost 1
      return {
        gradient: "from-gray-500/20 via-gray-400/20 to-transparent",
        border: "border-gray-500/50",
        shadow: "shadow-gray-500/30",
        accent1: "bg-gray-500/70",
        accent2: "bg-gray-400/70",
        textAccent: "text-gray-200",
        buttonActive: "hover:bg-gray-800/80 border-gray-500/30 bg-gray-800/80",
        buttonInactive: "hover:bg-gray-900 border-gray-500/30",
      };
    case 2:
      // Green theme for cost 2
      return {
        gradient: "from-green-500/20 via-green-600/20 to-transparent",
        border: "border-green-500/50",
        shadow: "shadow-green-500/30",
        accent1: "bg-green-500/70",
        accent2: "bg-green-400/70",
        textAccent: "text-green-300",
        buttonActive: "hover:bg-green-900/80 border-green-500/30 bg-green-900/80",
        buttonInactive: "hover:bg-green-900/30 border-green-400/30",
      };
    case 3:
      // Blue theme for cost 3
      return {
        gradient: "from-blue-500/20 via-cyan-500/20 to-transparent",
        border: "border-blue-500/50",
        shadow: "shadow-blue-500/30",
        accent1: "bg-blue-500/70",
        accent2: "bg-cyan-400/70",
        textAccent: "text-cyan-300",
        buttonActive: "hover:bg-blue-900/80 border-blue-500/30 bg-blue-900/80",
        buttonInactive: "hover:bg-blue-900/30 border-blue-400/30",
      };
    case 4:
      // Purple theme for cost 4
      return {
        gradient: "from-purple-500/20 via-fuchsia-500/20 to-transparent",
        border: "border-purple-500/50",
        shadow: "shadow-purple-500/30",
        accent1: "bg-purple-500/70",
        accent2: "bg-fuchsia-400/70",
        textAccent: "text-fuchsia-300",
        buttonActive: "hover:bg-purple-900/80 border-purple-500/30 bg-purple-900/80",
        buttonInactive: "hover:bg-purple-900/30 border-purple-400/30",
      };
    case 5:
      // Gold/orange theme for cost 5
      return {
        gradient: "from-amber-500/20 via-yellow-500/20 to-transparent",
        border: "border-amber-500/50",
        shadow: "shadow-amber-500/30",
        accent1: "bg-amber-500/70",
        accent2: "bg-yellow-400/70",
        textAccent: "text-amber-300",
        buttonActive: "hover:bg-amber-900/80 border-amber-500/30 bg-amber-900/80",
        buttonInactive: "hover:bg-amber-900/30 border-amber-400/30",
      };
    default:
      // Default emerald theme
      return {
        gradient: "from-emerald-500/20 via-emerald-600/20 to-transparent",
        border: "border-emerald-500/50",
        shadow: "shadow-emerald-500/30",
        accent1: "bg-emerald-500/70",
        accent2: "bg-emerald-400/70",
        textAccent: "text-emerald-300",
        buttonActive: "hover:bg-emerald-900/80 border-yellow-500/30 bg-emerald-900/80",
        buttonInactive: "hover:bg-emerald-900 border-red-500/30",
      };
  }
}

/**
 * Calculates DPS from attack speed and damage
 * @param attackSpeed Champion attack speed
 * @param damage Champion damage
 * @returns Calculated DPS
 */
function calculateDPS(attackSpeed?: number, damage?: number): number | undefined {
  if (!attackSpeed || !damage) return undefined;
  return Math.round((attackSpeed * 100) / 100 * damage);
}

// === UI COMPONENTS ===

interface AbilityStatsProps {
  ability: AbilityData;
  isPopup?: boolean;
}

/**
 * Formats ability key names for display
 */
function formatKeyForDisplay(key: string): string {
  // Convert camelCase to Title Case with spaces
  if (/[a-z][A-Z]/.test(key)) {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
  
  // If already has spaces or is single word, just capitalize first letter
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Renders ability stats in a formatted way
 * @param ability - The ability object with stats
 * @param isPopup - Whether this is being rendered in a popup dialog (for compact styling)
 */
export function AbilityStats({ ability, isPopup = false }: AbilityStatsProps): JSX.Element | null {
  if (!ability) return null;

  // Get all keys from the ability object
  const keys = Object.keys(ability).filter(
    (key) =>
      // Filter out name and desc which are handled separately
      key !== "name" && key !== "desc"
  );

  // Sort keys to prioritize damage-related fields
  const sortedKeys = keys.sort((a, b) => {
    // Check if key contains 'damage' (case insensitive)
    const aDamage = a.toLowerCase().includes("damage");
    const bDamage = b.toLowerCase().includes("damage");

    if (aDamage && !bDamage) return -1; // a contains damage, b doesn't -> a comes first
    if (!aDamage && bDamage) return 1; // b contains damage, a doesn't -> b comes first

    // If both or neither contain 'damage', maintain specific priority for common fields
    const priorityOrder: Record<string, number> = {
      Damage: 1,
      Shield: 2,
      Mana: 3,
      Heal: 4,
      Duration: 5,
    };
    const aPriority = priorityOrder[a] || 99;
    const bPriority = priorityOrder[b] || 99;

    return aPriority - bPriority;
  });

  // If no popup (normal mode), render as regular list
  if (!isPopup) {
    
    return (
      <>
        {sortedKeys.map((key) => {
          const formattedKey = formatKeyForDisplay(key);

          return (
            <p key={key}>
              {formattedKey}: <span className="text-white text-sm">{ability[key]}</span>
            </p>
          );
        })}
      </>
    );
  }
  
  // Popup mode - render in a grid with more compact styling
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-1 mt-2 pb-3">
      {(sortedKeys.length === 0)
      ? 
       <div></div>
      :
      sortedKeys.map((key) => {
        const formattedKey = formatKeyForDisplay(key);
        
        return (
          <div key={key} className="flex flex-row justify-between items-baseline">
            <span className="text-emerald-400 font-sm text-sm mr-1">{formattedKey}:</span>
            <span className="text-cyan-200 text-xs font-semibold">{ability[key]}</span>
          </div>
        );
      })
    }
    </div>
  );
}

// interface ChampAbilityProps {
//   ability?: AbilityData;
//   theme: ThemeStyles;
//   imageAbilityS3: string;
// }

/**
 * Renders champion's ability information
 */
// function ChampAbility({ ability, theme, imageAbilityS3 }: ChampAbilityProps): JSX.Element {
//   if (!ability || !ability.name) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No ability data available
//       </div>
//     );
//   }
  
//   const abilityUrl = getAbilityImageUrl(imageAbilityS3);
//   let topP = "pt-5";
//   if(ability.desc && ability.desc.length >= 320) {
//     topP = "pt-0";
//   }
  
//   return (
//     <div
//       className={cn(topP, `${theme.textAccent} text-xs px-5 pb-5 h-1/2 flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left relative  `)}
//     >
//       <div className="flex-grow overflow-y-auto pr-2 max-h-full">
//         <p className="text-lg font-semibold">Ability: {ability.name}</p>
//         <div className="font-extralight text-xs mt-2">{ability.desc}</div>

//         {/* Dynamically render ability stats in priority order */}
//         <div className="mt-2 space-y-1">
//           <AbilityStats ability={ability} />
//         </div>
//       </div>

//       {/* Absolutely positioned ability image at the bottom */}
//       <div className="absolute bottom-3 right-5 transform z-20">
//         <div
//           className={`rounded-full border-2 ${theme.border} w-16 h-16 shadow-md ${theme.shadow}`}
//         >
//           <img
//             src={abilityUrl}
//             className="w-[500px] h-[500px] object-cover saturate-150 rounded-full"
//             onError={(e) => {
//               // Fallback if image fails to load
//               e.currentTarget.src =
//                 "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
//             }}
//             alt="Ability Icon"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

interface StatItemProps {
  iconSrc: string;
  value?: string | number;
  label?: string;
}

/**
 * Renders a single champion stat
 */
function StatItem({ iconSrc, value, label }: StatItemProps): JSX.Element {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img className="h-4 w-4" src={iconSrc} alt={label || "Stat"} />
      {label && <span className="text-gray-300 text-xs">{label}:</span>}
      <span className="text-white font-medium">
        {value || "N/A"}
      </span>
    </div>
  );
}

// interface ChampStatsProps {
//   stats?: ChampionStats;
//   theme: ThemeStyles;
// }

/**
 * Renders champion's stats information
 */
// function ChampStats({ stats, theme }: ChampStatsProps): JSX.Element {
//   if (!stats) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No stats data available
//       </div>
//     );
//   }

//   const { hp, mana, armor, mr, attackSpeed, damage, range } = stats;
//   const dps = calculateDPS(attackSpeed, damage);
//   const formattedAttackSpeed = attackSpeed ? Math.round(attackSpeed * 100) / 100 : undefined;

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-4">Champion Stats</p>
//       <div className="grid grid-cols-2 gap-y-4 gap-x-4 flex-grow text-sm overflow-y-auto max-h-full">
//         <StatItem iconSrc="./img/TFT_Health.png" value={hp} label="Health" />
//         <StatItem iconSrc="./img/TFT_Mana.png" value={mana} label="Mana" />
//         <StatItem iconSrc="./img/TFT_Armor.png" value={armor} label="Armor" />
//         <StatItem iconSrc="./img/TFT_MR.png" value={mr} label="Magic Resist" />
//         <StatItem iconSrc="./img/TFT_AS.png" value={formattedAttackSpeed} label="Attack Speed" />
//         <StatItem iconSrc="./img/TFT_AD.png" value={damage} label="Attack Damage" />
//         <StatItem iconSrc="./img/TFT_Range.png" value={range} label="Range" />
        
//         <div className="flex flex-row gap-2 items-center">
//           <span className="text-gray-300 text-xs">DPS:</span>
//           <span className="text-white font-medium">{dps || "N/A"}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

interface PlaystyleTipProps {
  label: string;
  value?: string;
  defaultValue: string;
}

/**
 * Renders a single playstyle tip
 */
function PlaystyleTip({ label, value, defaultValue }: PlaystyleTipProps): JSX.Element {
  return (
    <li className="mb-2">
      <span className="text-gray-300">{label}:</span> <span className="text-white">{value || defaultValue}</span>
    </li>
  );
}

// interface ChampPlaystyleProps {
//   champData: ChampionData;
//   theme: ThemeStyles;
// }

/**
 * Renders champion's playstyle information
 */
// function ChampPlaystyle({ champData, theme }: ChampPlaystyleProps): JSX.Element {
//   const { position, items, synergies, powerSpikes, counters, description } = champData;
  
//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Playstyle Tips</p>
//       <div className="overflow-y-auto pr-2 max-h-full">
//         {description && (
//           <div className="mb-4 p-3 bg-gray-800/50 rounded">
//             <p className="text-white text-sm">{description}</p>
//           </div>
//         )}
        
//         <ul className="list-disc pl-5 space-y-1 font-extralight">
//           <PlaystyleTip 
//             label="Best positioned" 
//             value={position} 
//             defaultValue="Flexible" 
//           />
//           <PlaystyleTip 
//             label="Recommended items" 
//             value={items?.join(", ")} 
//             defaultValue="Varies based on comp" 
//           />
//           <PlaystyleTip 
//             label="Synergizes with" 
//             value={synergies?.join(", ")} 
//             defaultValue="Champions sharing traits" 
//           />
//           <PlaystyleTip 
//             label="Power spikes" 
//             value={powerSpikes} 
//             defaultValue="When ability activates" 
//           />
//           <PlaystyleTip 
//             label="Counter strategies" 
//             value={counters} 
//             defaultValue="CC and burst damage" 
//           />
//         </ul>
//       </div>
//     </div>
//   );
// }

// interface BuildsProps {
//   builds?: BuildData[];
//   champName: string;
//   theme: ThemeStyles;
// }

/**
 * Renders recommended builds for the champion
 */
// function ChampBuilds({ builds, champName, theme }: BuildsProps): JSX.Element {
//   const [activeBuild, setActiveBuild] = useState<number>(0);

//   if (!builds || builds.length === 0) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No build data available
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Builds</p>
      
//       {/* Build selector */}
//       <div className="flex space-x-2 mb-4">
//         {builds.map((build, index) => (
//           <Button
//             key={index}
//             onClick={() => setActiveBuild(index)}
//             className={index === activeBuild ? theme.buttonActive : theme.buttonInactive}
//           >
//             {build.name}
//           </Button>
//         ))}
//       </div>
      
//       <div className="overflow-y-auto flex-grow">
//         <div className="mb-4">
//           <h3 className="text-md font-semibold mb-2">Composition</h3>
//           <div className="flex flex-wrap gap-2">
//             {builds[activeBuild].units.map((unit, idx) => (
//               <div 
//                 key={idx} 
//                 className={`px-3 py-1 rounded text-xs ${unit === champName ? theme.accent1 : 'bg-gray-800'}`}
//               >
//                 {unit}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <h3 className="text-md font-semibold mb-2">Description</h3>
//           <p className="text-sm text-gray-300">{builds[activeBuild].description}</p>
//         </div>
        
//         <div>
//           <h3 className="text-md font-semibold mb-2">Items per Champion</h3>
//           <div className="grid grid-cols-1 gap-2">
//             {Object.entries(builds[activeBuild].items).map(([unit, itemList], idx) => (
//               <div key={idx} className={`p-2 rounded text-xs ${unit === champName ? 'bg-gray-700' : 'bg-gray-800'}`}>
//                 <span className="font-medium">{unit}:</span> {itemList.join(", ")}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface TraitUnitsProps {
//   traits: string[];
//   champName: string;
//   theme: ThemeStyles;
// }

/**
 * Renders other units with the same traits
 */
// function TraitUnits({ traits, champName, theme }: TraitUnitsProps): JSX.Element {
//   // Mock data - in a real app this would be fetched from your data source
//   const [traitUnits, setTraitUnits] = useState<{[trait: string]: string[]}>({});
//   const [activeTrait, setActiveTrait] = useState<string>(traits[0] || "");
  
//   // Simulating data loading
//   useEffect(() => {
//     // This would be an API call in a real app
//     const mockTraitUnits = {
//       "Boombot": ["Shaco", "Twisted Fate", "Ziggs", "Jinx"],
//       "Cybercity": ["Ekko", "Jhin", "LeBlanc", "Senna", "Zeri"],
//       "Deadeye": ["Caitlyn", "Graves", "Jhin", "Senna"],
//       "Executioner": ["Katarina", "Kha'Zix", "Rek'Sai", "Samira"],
//       "Hacker": ["Ekko", "LeBlanc", "Shaco"],
//       "Punk": ["Jinx", "Yone", "Vi", "Yasuo"],
//       "Edgelord": ["Kayle", "Yone", "Kayn", "Riven", "Yasuo"],
//       "Superfan": ["Jax", "Kennen", "Neeko", "Poppy", "Seraphine"],
//       "K/DA": ["Ahri", "Akali", "Evelynn", "Kai'Sa", "Seraphine"],
//       "Disco": ["Corki", "Nami", "Tahm Kench", "Twisted Fate"],
//       "Sentinel": ["Galio", "Jax", "Shen", "Vi"]
//     };
    
//     setTraitUnits(mockTraitUnits);
//     if (traits && traits.length > 0) {
//       setActiveTrait(traits[0]);
//     }
//   }, [traits]);

//   if (!traits || traits.length === 0) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No trait data available
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Trait Synergies</p>
      
//       {/* Trait selector */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {traits.map((trait, index) => (
//           <Button
//             key={index}
//             onClick={() => setActiveTrait(trait)}
//             className={`flex items-center gap-2 ${activeTrait === trait ? theme.buttonActive : theme.buttonInactive}`}
//           >
//             <img 
//               src={getTraitImageUrl(trait)} 
//               alt={trait} 
//               className="w-5 h-5"
//             />
//             {trait}
//           </Button>
//         ))}
//       </div>
      
//       <div className="overflow-y-auto flex-grow">
//         <h3 className="text-md font-semibold mb-2">Champions with {activeTrait}</h3>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//           {traitUnits[activeTrait]?.map((unit, idx) => (
//             <div 
//               key={idx} 
//               className={`p-2 rounded text-center ${unit === champName ? theme.accent1 : 'bg-gray-800'}`}
//             >
//               {unit}
//             </div>
//           )) || <p className="text-gray-400">No data available</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface ItemsProps {
//   items?: RecommendedItem[];
//   champName: string;
//   theme: ThemeStyles;
//   recommendedItems?: string[];
// }

/**
 * Renders recommended items for the champion
 */
// function RecommendedItems({ items, champName, theme, recommendedItems }: ItemsProps): JSX.Element {
//   // Mock data for items if not provided
//   const mockItems: RecommendedItem[] = [
//     {
//       id: "IE",
//       name: "Infinity Edge",
//       description: "Critical Strikes deal +100% damage.",
//       imageUrl: "./img/items/IE.png",
//       stats: { critDamage: "+100%" }
//     },
//     {
//       id: "BT",
//       name: "Bloodthirster",
//       description: "Heal for 33% of damage dealt. Once per combat, gain a shield at 40% Health.",
//       imageUrl: "./img/items/BT.png",
//       stats: { lifesteal: "33%" }
//     },
//     {
//       id: "GS",
//       name: "Giant Slayer",
//       description: "Deal 20% more damage to enemies with over 1600 Health.",
//       imageUrl: "./img/items/GS.png",
//       stats: { damage: "+20%" }
//     },
//     {
//       id: "JG",
//       name: "Jeweled Gauntlet",
//       description: "Abilities can critically strike. +30% Critical Strike Damage.",
//       imageUrl: "./img/items/JG.png",
//       stats: { critDamage: "+30%" }
//     }
//   ];
  
//   const displayItems = items || mockItems;
  
//   // Filter items to show recommended ones first
//   const sortedItems = [...displayItems].sort((a, b) => {
//     const aRecommended = recommendedItems?.includes(a.name) || false;
//     const bRecommended = recommendedItems?.includes(b.name) || false;
    
//     if (aRecommended && !bRecommended) return -1;
//     if (!aRecommended && bRecommended) return 1;
//     return 0;
//   });

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Items</p>
      
//       <div className="overflow-y-auto flex-grow grid grid-cols-1 gap-3">
//         {sortedItems.map((item, idx) => (
//           <div 
//             key={idx} 
//             className={`p-3 rounded bg-gray-800 border ${recommendedItems?.includes(item.name) ? theme.border : 'border-transparent'}`}
//           >
//             <div className="flex items-center gap-3">
//               <div className={`rounded w-10 h-10 flex-shrink-0 border ${theme.border}`}>
//                 <img
//                   src={item.imageUrl || "/api/placeholder/40/40"}
//                   alt={item.name}
//                   className="w-full h-full rounded"
//                   onError={(e) => {
//                     e.currentTarget.src = "/api/placeholder/40/40";
//                   }}
//                 />
//               </div>
              
//               <div>
//                 <h4 className="font-semibold mb-1">
//                   {item.name}
//                   {recommendedItems?.includes(item.name) && (
//                     <span className={`ml-2 inline-block px-2 text-xs py-1 rounded ${theme.accent1}`}>
//                       Recommended
//                     </span>
//                   )}
//                 </h4>
//                 <p className="text-xs text-gray-300">{item.description}</p>
                
//                 <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
//                   {Object.entries(item.stats).map(([stat, value], statIdx) => (
//                     <span key={statIdx} className="text-xs">
//                       <span className="text-gray-400">{formatKeyForDisplay(stat)}:</span> {value}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface PositioningBoardProps {
//   positioning?: PositioningData;
//   champName: string;
//   theme: ThemeStyles;
// }

/**
 * Renders a TFT positioning board with champion placements
 */
// function PositioningBoard({ positioning, champName, theme }: PositioningBoardProps): JSX.Element {
//   // Default 7x7 board if not provided
//   const defaultPositioning: PositioningData = {
//     rows: 7,
//     cols: 7,
//     placements: {
//       [champName]: [4, 2],
//       "Tank1": [3, 0],
//       "Tank2": [4, 0],
//       "Support": [5, 1],
//       "Carry1": [6, 2],
//       "Carry2": [3, 3]
//     }
//   };
  
//   const boardData = positioning || defaultPositioning;
//   const { rows, cols, placements } = boardData;
  
//   // Create the grid cells
//   const gridCells = [];
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       // Find if any champion is placed in this cell
//       const champion = Object.entries(placements).find(
//         ([, pos]) => pos[0] === row && pos[1] === col
//       );
      
//       // Alternate cell colors for the classic hexagonal effect
//       const isEvenRow = row % 2 === 0;
//       const isEvenCol = col % 2 === 0;
//       const isEven = isEvenRow ? isEvenCol : !isEvenCol;
      
//       // Determine if this cell is on the bench (last row)
//       const isBench = row === rows - 1;
      
//       gridCells.push(
//         <div 
//           key={`${row}-${col}`} 
//           className={`
//             aspect-square flex items-center justify-center text-xs 
//             ${isEven ? 'bg-gray-700/40' : 'bg-gray-800/60'} 
//             ${isBench ? 'border-t-2 border-gray-500' : ''}
//             ${champion ? 'ring-2 ' + theme.border : ''}
//           `}
//         >
//           {champion && (
//             <div className={`
//               w-full h-full flex items-center justify-center text-center p-1
//               ${champion[0] === champName ? theme.accent1 : 'bg-gray-600/70'}
//               font-semibold text-xs
//             `}>
//               {champion[0]}
//             </div>
//           )}
//         </div>
//       );
//     }
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Positioning</p>
      
//       <div className="flex-grow flex flex-col">
//         <div className="bg-gray-900 p-2 mb-4 rounded">
//           <p className="text-sm mb-2">Positioning Strategy:</p>
//           <ul className="text-xs list-disc pl-4 text-gray-300">
//             <li>Place {champName} in the second row for optimal ability usage</li>
//             <li>Frontline tanks should be positioned to absorb damage</li>
//             <li>Keep carries in the backline protected</li>
//             <li>Adjust based on enemy compositions</li>
//           </ul>
//         </div>
        
//         <div className="flex items-center justify-center flex-grow">
//           <div 
//             className="grid border border-gray-600 bg-gray-900/70"
//             style={{ 
//               gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//               gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
//               width: '100%',
//               maxWidth: '400px',
//               maxHeight: '400px'
//             }}
//           >
//             {gridCells}
//           </div>
//         </div>
        
//         <div className="mt-3 text-xs text-gray-400 text-center">
//           Note: Adjust positioning based on enemy threats and team composition
//         </div>
//       </div>
//     </div>
//   );
// }

// interface FullscreenNavigationProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   theme: ThemeStyles;
//   onClose: () => void;
// }

/**
 * Renders navigation for fullscreen champion detail view
 */
// function FullscreenNavigation({ activeTab, setActiveTab, theme, onClose }: FullscreenNavigationProps): JSX.Element {
//   const tabs = [
//     { id: "ability", label: "Ability" },
//     { id: "stats", label: "Stats" },
//     { id: "playstyle", label: "Playstyle" },
//     { id: "builds", label: "Builds" },
//     { id: "traits", label: "Traits" },
//     { id: "items", label: "Items" },
//     { id: "positioning", label: "Positioning" }
//   ];
  
//   const activeButtonStyle = `${theme.buttonActive} text-amber-100 font-mono border-b-2 border-amber-400 px-4 py-2`;
//   const inactiveButtonStyle = `cursor-pointer ${theme.buttonInactive} bg-transparent text-white/70 font-mono hover:bg-gray-800 px-4 py-2`;
  
//   return (
//     <div className="flex items-center border-b border-gray-700 bg-gray-900 sticky top-0 z-20">
//       <div className="flex flex-grow overflow-x-auto scrollbar-hide">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={activeTab === tab.id ? activeButtonStyle : inactiveButtonStyle}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
      
//       <button
//         onClick={onClose}
//         className="p-2 ml-2 text-gray-400 hover:text-white"
//         aria-label="Close"
//       >
//         <X size={24} />
//       </button>
//     </div>
//   );
// }

/**
 * Main fullscreen champion detail component
 */
export default function FullScreenChampionDetail({ 
  item, 
  builds, 
  items,
  positioning,
  onClose 
}: FullScreenChampionDetailProps): JSX.Element {
  if (!item) {
    return <div></div>;
  }

  const data: ChampionData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
  const champUrl = getChampionImageUrl(data.apiName);
  const theme = getCostTheme(data.cost);
  const traitsArr: string[] = typeof data.traits === 'string' ? JSON.parse(data.traits) : data.traits || [];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col overflow-hidden">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-900 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-white flex items-center">
          <div className={`flex items-center justify-center rounded-full ${theme.accent1} w-8 h-8 mr-2 flex-shrink-0`}>
            <img className="h-5 w-5" src={`./img/t${data.cost}.png`} alt={`Tier ${data.cost}`}/>
          </div>
          {data.name} - <span className="ml-2 text-sm font-normal text-gray-300">Champion Details</span>
        </h1>
        
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row h-full overflow-auto p-3 gap-3">
        {/* Left column - Champion info and items */}
        <div className="w-full md:w-1/3 flex flex-col gap-3">
          {/* Champion card */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-4 rounded relative`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
          
            {/* Champion header */}
            <div className="relative flex items-center mb-4">
              <div>
                <h2 className="text-4xl font-bold text-white ml-1    ">{data.name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  {traitsArr.map((trait, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        className="h-6 w-6 rounded-full border border-gray-700" 
                        src={getTraitImageUrl(trait)} 
                        alt={trait}
                      />
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        {trait}
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            
            </div>

            <div className=" grid grid-cols-2 gap-2 ">
              {/* Champion image */}
              <div className="  rounded  ">
              <div className="relative w-full  h-full rounded overflow-hidden   justify-self-center ">
              <img
                className="w-full h-full object-cover saturate-150 border-4 border-gray-800/80"
                src={champUrl}
                alt={data.name}
                onError={(e) => {
                  e.currentTarget.src = "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                <p className={`text-white font-semibold`}>{data.role}</p>
              </div>
              </div>
            </div>
            
              {/* Champion stats - compact grid */}
              <div className="bg-gray-800/80 p-3 rounded">
              <h3 className="text-sm font-semibold mb-2 text-white">Champion Stats</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
                {data.stats?.hp && <StatItem iconSrc="./img/TFT_Health.png" value={data.stats.hp} label="HP" />}
                {data.stats?.mana && <StatItem iconSrc="./img/TFT_Mana.png" value={data.stats.mana} label="Mana" />}
                {data.stats?.armor && <StatItem iconSrc="./img/TFT_Armor.png" value={data.stats.armor} label="Armor" />}
                {data.stats?.mr && <StatItem iconSrc="./img/TFT_MR.png" value={data.stats.mr} label="MR" />}
                {data.stats?.damage && <StatItem iconSrc="./img/TFT_AD.png" value={data.stats.damage} label="AD" />}
                {data.stats?.attackSpeed && (
                  <StatItem 
                    iconSrc="./img/TFT_AS.png" 
                    value={Math.round(data.stats.attackSpeed * 100) / 100} 
                    label="AS"
                  />
                )}
                {data.stats?.range && <StatItem iconSrc="./img/TFT_Range.png" value={data.stats.range} label="Range" />}
                
                {data.stats?.attackSpeed && data.stats?.damage && (
                  <div className="flex flex-row gap-2 items-center col-span-2">
                    <span className="text-gray-300 text-xs">DPS:</span>
                    <span className="text-white font-medium">
                      {calculateDPS(data.stats.attackSpeed, data.stats.damage) || "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Champion ability */}
            {data.ability && (
              <div className="bg-gray-800/80 p-3 rounded mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`rounded-full border ${theme.border} w-8 h-8 overflow-hidden`}>
                    <img
                      src={getAbilityImageUrl(data.imageAbilityS3)}
                      className="w-full h-full object-cover"
                      alt="Ability"
                      onError={(e) => {
                        e.currentTarget.src = "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
                      }}
                    />
                  </div>
                  <h3 className="text-white font-semibold">{data.ability.name}</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">{data.ability.desc}</p>
                {/* Ability stats in compact form */}
                <AbilityStats ability={data.ability} isPopup={true} />
              </div>
            )}
            </div>
          
            
          </div>
          
          {/* Recommended Items Section */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-4 rounded relative overflow-hidden h-full`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="relative z-10">
              <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Items</h2>
              
              <div className="overflow-y-auto max-h-96 pr-1 space-y-2">
                {items && items.length > 0 ? (
                  items.slice(0, 5).map((item, idx) => {
                    const isRecommended = data.items?.includes(item.name);
                    
                    return (
                      <div 
                        key={idx} 
                        className={`p-2 rounded bg-gray-800/80 ${isRecommended ? 'border ' + theme.border : 'border-transparent'}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`rounded w-8 h-8 flex-shrink-0 border ${theme.border}`}>
                            <img
                              src={item.imageUrl || "/api/placeholder/32/32"}
                              alt={item.name}
                              className="w-full h-full rounded"
                              onError={(e) => {
                                e.currentTarget.src = "/api/placeholder/32/32";
                              }}
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between items-baseline">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              {isRecommended && (
                                <span className={`ml-1 inline-block px-1 py-0.5 text-xs rounded ${theme.accent1}`}>
                                  ★
                                </span>
                              )}
                            </div>
                            
                            <div className="group relative">
                              <p className="text-xs text-gray-300 truncate">{item.description}</p>
                              
                              {/* Hover tooltip with full stats */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-30 left-0 -bottom-1 transform translate-y-full bg-gray-900 border border-gray-700 rounded p-2 w-64 pointer-events-none">
                                <p className="text-xs mb-1">{item.description}</p>
                                <div className="grid grid-cols-2 gap-x-2 mt-1">
                                  {Object.entries(item.stats).map(([stat, value], statIdx) => (
                                    <div key={statIdx} className="text-xs">
                                      <span className="text-gray-400">{formatKeyForDisplay(stat)}:</span>{' '}
                                      <span className="text-white">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">No item data available</p>
                )}
              </div>
              
              {items && items.length > 5 && (
                <p className="text-xs text-gray-400 mt-2 text-center">+ {items.length - 5} more items</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Grid layout for other sections */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-auto">
          {/* Playstyle Tips */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="relative z-10 p-4 h-full">
              <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Playstyle Tips</h2>
              
              <div className="overflow-y-auto pr-2 h-full max-h-96">
                {data.description && (
                  <div className="mb-3 p-2 bg-gray-800/50 rounded">
                    <p className="text-white text-sm">{data.description}</p>
                  </div>
                )}
                
                <ul className="list-disc pl-5 space-y-1 font-extralight text-sm">
                  <PlaystyleTip 
                    label="Best positioned" 
                    value={data.position} 
                    defaultValue="Flexible" 
                  />
                  <PlaystyleTip 
                    label="Recommended items" 
                    value={data.items?.join(", ")} 
                    defaultValue="Varies based on comp" 
                  />
                  <PlaystyleTip 
                    label="Synergizes with" 
                    value={data.synergies?.join(", ")} 
                    defaultValue="Champions sharing traits" 
                  />
                  <PlaystyleTip 
                    label="Power spikes" 
                    value={data.powerSpikes} 
                    defaultValue="When ability activates" 
                  />
                  <PlaystyleTip 
                    label="Counter strategies" 
                    value={data.counters} 
                    defaultValue="CC and burst damage" 
                  />
                </ul>
              </div>
            </div>
          </div>
          
          {/* Trait Synergies */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="relative z-10 p-4 h-full">
              <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Trait Synergies</h2>
              
              <div className="overflow-y-auto pr-2 h-full max-h-96">
                {traitsArr.length > 0 ? (
                  <div className="space-y-4">
                    {traitsArr.map((trait, index) => {
                      // Mock data - in a real app this would be fetched from your data source
                      const mockTraitUnits = {
                        "Boombot": ["Shaco", "Twisted Fate", "Ziggs", "Jinx"],
                        "Cybercity": ["Ekko", "Jhin", "LeBlanc", "Senna", "Zeri"],
                        "Deadeye": ["Caitlyn", "Graves", "Jhin", "Senna"],
                        "Executioner": ["Katarina", "Kha'Zix", "Rek'Sai", "Samira"],
                        "Hacker": ["Ekko", "LeBlanc", "Shaco"],
                        "Punk": ["Jinx", "Yone", "Vi", "Yasuo"],
                        "Edgelord": ["Kayle", "Yone", "Kayn", "Riven", "Yasuo"],
                        "Superfan": ["Jax", "Kennen", "Neeko", "Poppy", "Seraphine"],
                        "K/DA": ["Ahri", "Akali", "Evelynn", "Kai'Sa", "Seraphine"],
                        "Disco": ["Corki", "Nami", "Tahm Kench", "Twisted Fate"],
                        "Sentinel": ["Galio", "Jax", "Shen", "Vi"]
                      };
                      
                      const traitUnits = (mockTraitUnits as any)[trait] || [];
                      
                      return (
                        <div key={index} className="bg-gray-800/50 rounded p-2">
                          <div className="flex items-center gap-2 mb-2">
                            <img 
                              src={getTraitImageUrl(trait)} 
                              alt={trait} 
                              className="w-6 h-6 rounded-full"
                            />
                            <h3 className="font-semibold text-white">{trait}</h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {traitUnits.map((unit:any, idx:number) => (
                              <div 
                                key={idx} 
                                className={`px-2 py-1 rounded text-xs ${unit === data.name ? theme.accent1 : 'bg-gray-700'}`}
                              >
                                {unit}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No trait data available</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Builds */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="relative z-10 p-4 h-full">
              <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Builds</h2>
              
              <div className="overflow-y-auto pr-2 h-full max-h-96">
                {builds && builds.length > 0 ? (
                  <div className="space-y-4">
                    {builds.map((build, index) => (
                      <div key={index} className="bg-gray-800/50 rounded p-2">
                        <h3 className="font-semibold text-white mb-2">{build.name}</h3>
                        
                        <div className="mb-2">
                          <p className="text-xs text-gray-300 mb-1">Composition:</p>
                          <div className="flex flex-wrap gap-1">
                            {build.units.map((unit, idx) => (
                              <div 
                                key={idx} 
                                className={`px-2 py-1 rounded text-xs ${unit === data.name ? theme.accent1 : 'bg-gray-700'}`}
                              >
                                {unit}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <p className="text-xs text-gray-300 mb-1">Description:</p>
                          <p className="text-xs text-white">{build.description}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-300 mb-1">Key Items:</p>
                          <div className="text-xs">
                            {Object.entries(build.items)
                              .filter(([unit]) => unit === data.name || index === 0)
                              .map(([unit, itemList], idx) => (
                                <div key={idx} className={`p-1 rounded text-xs ${unit === data.name ? 'bg-gray-700' : 'bg-gray-800'}`}>
                                  <span className="font-medium">{unit}:</span> {itemList.join(", ")}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No build data available</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Positioning */}
          <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
            {/* Background glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
            <div className="relative z-10 p-4 h-full">
              <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Positioning</h2>
              
              <div className="overflow-y-auto pr-2 h-full max-h-96 flex flex-col">
                {/* Default 7x7 board if not provided */}
                {(() => {
                  const defaultPositioning: PositioningData = {
                    rows: 4,
                    cols: 7,
                    placements: {
                      [data.name]: [2, 3],
                      "Tank1": [0, 2],
                      "Tank2": [0, 3],
                      "Support": [1, 4],
                      "Carry1": [2, 5],
                      "Carry2": [2, 1]
                    }
                  };
                  
                  const boardData = positioning || defaultPositioning;
                  const { rows, cols, placements } = boardData;
                  
                  // Create the grid cells
                  const gridCells = [];
                  for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                      // Find if any champion is placed in this cell
                      const champion = Object.entries(placements).find(
                        ([, pos]) => pos[0] === row && pos[1] === col
                      );
                      
                      // Alternate cell colors for the classic hexagonal effect
                      const isEvenRow = row % 2 === 0;
                      const isEvenCol = col % 2 === 0;
                      const isEven = isEvenRow ? isEvenCol : !isEvenCol;
                      
                      // Determine if this cell is on the bench (last row)
                      const isBench = row === rows - 1;
                      
                      gridCells.push(
                        <div 
                          key={`${row}-${col}`} 
                          className={`
                            aspect-square flex items-center justify-center text-xs 
                            ${isEven ? 'bg-gray-700/40' : 'bg-gray-800/60'} 
                            ${isBench ? 'border-t-2 border-gray-500' : ''}
                            ${champion ? 'ring-1 ' + theme.border : ''}
                          `}
                        >
                          {champion && (
                            <div className={`
                              w-full h-full flex items-center justify-center text-center p-1
                              ${champion[0] === data.name ? theme.accent1 : 'bg-gray-600/70'}
                              font-semibold text-xs
                            `}>
                              {champion[0]}
                            </div>
                          )}
                        </div>
                      );
                    }
                  }
                  
                  return (
                    <>
                      <div className="bg-gray-900 p-2 mb-3 rounded text-xs">
                        <p className="mb-1">Positioning Strategy:</p>
                        <ul className="list-disc pl-4 text-gray-300 space-y-1">
                          <li>Place {data.name} in the second row for optimal ability usage</li>
                          <li>Frontline tanks should be positioned to absorb damage</li>
                          <li>Keep carries in the backline protected</li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-center flex-grow">
                        <div 
                          className="grid border border-gray-600 bg-gray-900/70"
                          style={{ 
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                            aspectRatio: `${cols}/${rows}`
                          }}
                        >
                          {gridCells}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { Item } from "@/api/crudapiservice";
// import { Button } from "../ui/button";
// import { JSX, useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { X } from "lucide-react";

// // === TYPE DEFINITIONS ===

// interface ChampionData {
//   apiName: string;
//   name: string;
//   cost: string;
//   role: string;
//   imageAbilityS3: string;
//   ability?: AbilityData;
//   stats?: ChampionStats;
//   traits: string;
//   position?: string;
//   items?: string[];
//   synergies?: string[];
//   powerSpikes?: string;
//   counters?: string;
//   description?: string;
//   data?: any;
// }

// export type AbilityData = {
//   name?: string;
//   desc?: string;
//   [key: string]: any;
// }

// interface ChampionStats {
//   hp?: number;
//   mana?: number;
//   armor?: number;
//   mr?: number;
//   attackSpeed?: number;
//   damage?: number;
//   range?: number;
//   [key: string]: any;
// }

// interface ThemeStyles {
//   gradient: string;
//   border: string;
//   shadow: string;
//   accent1: string;
//   accent2: string;
//   textAccent: string;
//   buttonActive: string;
//   buttonInactive: string;
// }

// interface BuildData {
//   name: string;
//   units: string[];
//   items: { [unit: string]: string[] };
//   description: string;
//   positioning: PositioningData;
// }

// interface PositioningData {
//   rows: number;
//   cols: number;
//   placements: { [unit: string]: [number, number] };
// }

// interface RecommendedItem {
//   id: string;
//   name: string;
//   description: string;
//   imageUrl: string;
//   stats: { [key: string]: string | number };
// }

// interface FullScreenChampionDetailProps {
//   item: Item;
//   builds?: BuildData[];
//   items?: RecommendedItem[];
//   positioning?: PositioningData;
//   onClose: () => void;
// }

// // === HELPER FUNCTIONS ===

// /**
//  * Formats a URL for champion images
//  * @param apiName Champion API name
//  * @returns Formatted URL
//  */
// export function getChampionImageUrl(apiName: string): string {
//   return `https://tft-set14.s3.us-east-2.amazonaws.com/champions/${apiName.toLowerCase()}_small.png`;
// }

// /**
//  * Formats a URL for ability images
//  * @param imageUrl Original ability image URL
//  * @returns Formatted URL
//  */
// export function getAbilityImageUrl(imageUrl: string): string {
//   return imageUrl
//     .replace(
//       "https://accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint.us-east-2.amazonaws.com/",
//       "https://tft-set14.s3.us-east-2.amazonaws.com/"
//     );
// }

// /**
//  * Formats a URL for trait images
//  * @param trait Trait name
//  * @returns Formatted URL
//  */
// function getTraitImageUrl(trait: string): string {
//   trait = trait.replace(" ", "");

//   if (trait === "BoomBot") trait += "s";
//   if (trait.toLowerCase().includes("god")) trait = "netgod";
//   if (trait === "A.M.P.") trait = "amp";

//   return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${trait.toLowerCase()}.png`;
// }

// /**
//  * Returns theme styling based on champion cost
//  * @param cost Champion cost
//  * @returns Theme styling object
//  */
// function getCostTheme(cost: string): ThemeStyles {
//   // Convert cost to number if it's a string
//   const costNum = parseInt(cost, 10);

//   switch (costNum) {
//     case 1:
//       // Grey/silver theme for cost 1
//       return {
//         gradient: "from-gray-500/20 via-gray-400/20 to-transparent",
//         border: "border-gray-500/50",
//         shadow: "shadow-gray-500/30",
//         accent1: "bg-gray-500/70",
//         accent2: "bg-gray-400/70",
//         textAccent: "text-gray-200",
//         buttonActive: "hover:bg-gray-800/80 border-gray-500/30 bg-gray-800/80",
//         buttonInactive: "hover:bg-gray-900 border-gray-500/30",
//       };
//     case 2:
//       // Green theme for cost 2
//       return {
//         gradient: "from-green-500/20 via-green-600/20 to-transparent",
//         border: "border-green-500/50",
//         shadow: "shadow-green-500/30",
//         accent1: "bg-green-500/70",
//         accent2: "bg-green-400/70",
//         textAccent: "text-green-300",
//         buttonActive: "hover:bg-green-900/80 border-green-500/30 bg-green-900/80",
//         buttonInactive: "hover:bg-green-900/30 border-green-400/30",
//       };
//     case 3:
//       // Blue theme for cost 3
//       return {
//         gradient: "from-blue-500/20 via-cyan-500/20 to-transparent",
//         border: "border-blue-500/50",
//         shadow: "shadow-blue-500/30",
//         accent1: "bg-blue-500/70",
//         accent2: "bg-cyan-400/70",
//         textAccent: "text-cyan-300",
//         buttonActive: "hover:bg-blue-900/80 border-blue-500/30 bg-blue-900/80",
//         buttonInactive: "hover:bg-blue-900/30 border-blue-400/30",
//       };
//     case 4:
//       // Purple theme for cost 4
//       return {
//         gradient: "from-purple-500/20 via-fuchsia-500/20 to-transparent",
//         border: "border-purple-500/50",
//         shadow: "shadow-purple-500/30",
//         accent1: "bg-purple-500/70",
//         accent2: "bg-fuchsia-400/70",
//         textAccent: "text-fuchsia-300",
//         buttonActive: "hover:bg-purple-900/80 border-purple-500/30 bg-purple-900/80",
//         buttonInactive: "hover:bg-purple-900/30 border-purple-400/30",
//       };
//     case 5:
//       // Gold/orange theme for cost 5
//       return {
//         gradient: "from-amber-500/20 via-yellow-500/20 to-transparent",
//         border: "border-amber-500/50",
//         shadow: "shadow-amber-500/30",
//         accent1: "bg-amber-500/70",
//         accent2: "bg-yellow-400/70",
//         textAccent: "text-amber-300",
//         buttonActive: "hover:bg-amber-900/80 border-amber-500/30 bg-amber-900/80",
//         buttonInactive: "hover:bg-amber-900/30 border-amber-400/30",
//       };
//     default:
//       // Default emerald theme
//       return {
//         gradient: "from-emerald-500/20 via-emerald-600/20 to-transparent",
//         border: "border-emerald-500/50",
//         shadow: "shadow-emerald-500/30",
//         accent1: "bg-emerald-500/70",
//         accent2: "bg-emerald-400/70",
//         textAccent: "text-emerald-300",
//         buttonActive: "hover:bg-emerald-900/80 border-yellow-500/30 bg-emerald-900/80",
//         buttonInactive: "hover:bg-emerald-900 border-red-500/30",
//       };
//   }
// }

// /**
//  * Calculates DPS from attack speed and damage
//  * @param attackSpeed Champion attack speed
//  * @param damage Champion damage
//  * @returns Calculated DPS
//  */
// function calculateDPS(attackSpeed?: number, damage?: number): number | undefined {
//   if (!attackSpeed || !damage) return undefined;
//   return Math.round((attackSpeed * 100) / 100 * damage);
// }

// // === UI COMPONENTS ===

// interface AbilityStatsProps {
//   ability: AbilityData;
//   isPopup?: boolean;
// }

// /**
//  * Formats ability key names for display
//  */
// function formatKeyForDisplay(key: string): string {
//   // Convert camelCase to Title Case with spaces
//   if (/[a-z][A-Z]/.test(key)) {
//     return key
//       .replace(/([a-z])([A-Z])/g, '$1 $2')
//       .replace(/\b\w/g, char => char.toUpperCase());
//   }
  
//   // If already has spaces or is single word, just capitalize first letter
//   return key.charAt(0).toUpperCase() + key.slice(1);
// }

// /**
//  * Renders ability stats in a formatted way
//  * @param ability - The ability object with stats
//  * @param isPopup - Whether this is being rendered in a popup dialog (for compact styling)
//  */
// export function AbilityStats({ ability, isPopup = false }: AbilityStatsProps): JSX.Element | null {
//   if (!ability) return null;

//   // Get all keys from the ability object
//   const keys = Object.keys(ability).filter(
//     (key) =>
//       // Filter out name and desc which are handled separately
//       key !== "name" && key !== "desc"
//   );

//   // Sort keys to prioritize damage-related fields
//   const sortedKeys = keys.sort((a, b) => {
//     // Check if key contains 'damage' (case insensitive)
//     const aDamage = a.toLowerCase().includes("damage");
//     const bDamage = b.toLowerCase().includes("damage");

//     if (aDamage && !bDamage) return -1; // a contains damage, b doesn't -> a comes first
//     if (!aDamage && bDamage) return 1; // b contains damage, a doesn't -> b comes first

//     // If both or neither contain 'damage', maintain specific priority for common fields
//     const priorityOrder: Record<string, number> = {
//       Damage: 1,
//       Shield: 2,
//       Mana: 3,
//       Heal: 4,
//       Duration: 5,
//     };
//     const aPriority = priorityOrder[a] || 99;
//     const bPriority = priorityOrder[b] || 99;

//     return aPriority - bPriority;
//   });

//   // If no popup (normal mode), render as regular list
//   if (!isPopup) {
    
//     return (
//       <>
//         {sortedKeys.map((key) => {
//           const formattedKey = formatKeyForDisplay(key);

//           return (
//             <p key={key}>
//               {formattedKey}: <span className="text-white text-sm">{ability[key]}</span>
//             </p>
//           );
//         })}
//       </>
//     );
//   }
  
//   // Popup mode - render in a grid with more compact styling
//   return (
//     <div className="grid grid-cols-1 gap-x-4 gap-y-1 mt-2 pb-3">
//       {(sortedKeys.length === 0)
//       ? 
//        <div></div>
//       :
//       sortedKeys.map((key) => {
//         const formattedKey = formatKeyForDisplay(key);
        
//         return (
//           <div key={key} className="flex flex-row justify-between items-baseline">
//             <span className="text-emerald-400 font-sm text-sm mr-1">{formattedKey}:</span>
//             <span className="text-cyan-200 text-xs font-semibold">{ability[key]}</span>
//           </div>
//         );
//       })
//     }
//     </div>
//   );
// }

// interface ChampAbilityProps {
//   ability?: AbilityData;
//   theme: ThemeStyles;
//   imageAbilityS3: string;
// }

// /**
//  * Renders champion's ability information
//  */
// function ChampAbility({ ability, theme, imageAbilityS3 }: ChampAbilityProps): JSX.Element {
//   if (!ability || !ability.name) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No ability data available
//       </div>
//     );
//   }
  
//   const abilityUrl = getAbilityImageUrl(imageAbilityS3);
//   let topP = "pt-5";
//   if(ability.desc && ability.desc.length >= 320) {
//     topP = "pt-0";
//   }
  
//   return (
//     <div
//       className={cn(topP, `${theme.textAccent} text-xs px-5 pb-5 h-1/2 flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left relative  `)}
//     >
//       <div className="flex-grow overflow-y-auto pr-2 max-h-full">
//         <p className="text-lg font-semibold">Ability: {ability.name}</p>
//         <div className="font-extralight text-xs mt-2">{ability.desc}</div>

//         {/* Dynamically render ability stats in priority order */}
//         <div className="mt-2 space-y-1">
//           <AbilityStats ability={ability} />
//         </div>
//       </div>

//       {/* Absolutely positioned ability image at the bottom */}
//       <div className="absolute bottom-3 right-5 transform z-20">
//         <div
//           className={`rounded-full border-2 ${theme.border} w-16 h-16 shadow-md ${theme.shadow}`}
//         >
//           <img
//             src={abilityUrl}
//             className="w-[500px] h-[500px] object-cover saturate-150 rounded-full"
//             onError={(e) => {
//               // Fallback if image fails to load
//               e.currentTarget.src =
//                 "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
//             }}
//             alt="Ability Icon"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// interface StatItemProps {
//   iconSrc: string;
//   value?: string | number;
//   label?: string;
// }

// /**
//  * Renders a single champion stat
//  */
// function StatItem({ iconSrc, value, label }: StatItemProps): JSX.Element {
//   return (
//     <div className="flex flex-row gap-2 items-center">
//       <img className="h-4 w-4" src={iconSrc} alt={label || "Stat"} />
//       {label && <span className="text-gray-300 text-xs">{label}:</span>}
//       <span className="text-white font-medium">
//         {value || "N/A"}
//       </span>
//     </div>
//   );
// }

// interface ChampStatsProps {
//   stats?: ChampionStats;
//   theme: ThemeStyles;
// }

// /**
//  * Renders champion's stats information
//  */
// function ChampStats({ stats, theme }: ChampStatsProps): JSX.Element {
//   if (!stats) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No stats data available
//       </div>
//     );
//   }

//   const { hp, mana, armor, mr, attackSpeed, damage, range } = stats;
//   const dps = calculateDPS(attackSpeed, damage);
//   const formattedAttackSpeed = attackSpeed ? Math.round(attackSpeed * 100) / 100 : undefined;

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-4">Champion Stats</p>
//       <div className="grid grid-cols-2 gap-y-4 gap-x-4 flex-grow text-sm overflow-y-auto max-h-full">
//         <StatItem iconSrc="./img/TFT_Health.png" value={hp} label="Health" />
//         <StatItem iconSrc="./img/TFT_Mana.png" value={mana} label="Mana" />
//         <StatItem iconSrc="./img/TFT_Armor.png" value={armor} label="Armor" />
//         <StatItem iconSrc="./img/TFT_MR.png" value={mr} label="Magic Resist" />
//         <StatItem iconSrc="./img/TFT_AS.png" value={formattedAttackSpeed} label="Attack Speed" />
//         <StatItem iconSrc="./img/TFT_AD.png" value={damage} label="Attack Damage" />
//         <StatItem iconSrc="./img/TFT_Range.png" value={range} label="Range" />
        
//         <div className="flex flex-row gap-2 items-center">
//           <span className="text-gray-300 text-xs">DPS:</span>
//           <span className="text-white font-medium">{dps || "N/A"}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface PlaystyleTipProps {
//   label: string;
//   value?: string;
//   defaultValue: string;
// }

// /**
//  * Renders a single playstyle tip
//  */
// function PlaystyleTip({ label, value, defaultValue }: PlaystyleTipProps): JSX.Element {
//   return (
//     <li className="mb-2">
//       <span className="text-gray-300">{label}:</span> <span className="text-white">{value || defaultValue}</span>
//     </li>
//   );
// }

// interface ChampPlaystyleProps {
//   champData: ChampionData;
//   theme: ThemeStyles;
// }

// /**
//  * Renders champion's playstyle information
//  */
// function ChampPlaystyle({ champData, theme }: ChampPlaystyleProps): JSX.Element {
//   const { position, items, synergies, powerSpikes, counters, description } = champData;
  
//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Playstyle Tips</p>
//       <div className="overflow-y-auto pr-2 max-h-full">
//         {description && (
//           <div className="mb-4 p-3 bg-gray-800/50 rounded">
//             <p className="text-white text-sm">{description}</p>
//           </div>
//         )}
        
//         <ul className="list-disc pl-5 space-y-1 font-extralight">
//           <PlaystyleTip 
//             label="Best positioned" 
//             value={position} 
//             defaultValue="Flexible" 
//           />
//           <PlaystyleTip 
//             label="Recommended items" 
//             value={items?.join(", ")} 
//             defaultValue="Varies based on comp" 
//           />
//           <PlaystyleTip 
//             label="Synergizes with" 
//             value={synergies?.join(", ")} 
//             defaultValue="Champions sharing traits" 
//           />
//           <PlaystyleTip 
//             label="Power spikes" 
//             value={powerSpikes} 
//             defaultValue="When ability activates" 
//           />
//           <PlaystyleTip 
//             label="Counter strategies" 
//             value={counters} 
//             defaultValue="CC and burst damage" 
//           />
//         </ul>
//       </div>
//     </div>
//   );
// }

// interface BuildsProps {
//   builds?: BuildData[];
//   champName: string;
//   theme: ThemeStyles;
// }

// /**
//  * Renders recommended builds for the champion
//  */
// function ChampBuilds({ builds, champName, theme }: BuildsProps): JSX.Element {
//   const [activeBuild, setActiveBuild] = useState<number>(0);

//   if (!builds || builds.length === 0) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No build data available
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Builds</p>
      
//       {/* Build selector */}
//       <div className="flex space-x-2 mb-4">
//         {builds.map((build, index) => (
//           <Button
//             key={index}
//             onClick={() => setActiveBuild(index)}
//             className={index === activeBuild ? theme.buttonActive : theme.buttonInactive}
//           >
//             {build.name}
//           </Button>
//         ))}
//       </div>
      
//       <div className="overflow-y-auto flex-grow">
//         <div className="mb-4">
//           <h3 className="text-md font-semibold mb-2">Composition</h3>
//           <div className="flex flex-wrap gap-2">
//             {builds[activeBuild].units.map((unit, idx) => (
//               <div 
//                 key={idx} 
//                 className={`px-3 py-1 rounded text-xs ${unit === champName ? theme.accent1 : 'bg-gray-800'}`}
//               >
//                 {unit}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="mb-4">
//           <h3 className="text-md font-semibold mb-2">Description</h3>
//           <p className="text-sm text-gray-300">{builds[activeBuild].description}</p>
//         </div>
        
//         <div>
//           <h3 className="text-md font-semibold mb-2">Items per Champion</h3>
//           <div className="grid grid-cols-1 gap-2">
//             {Object.entries(builds[activeBuild].items).map(([unit, itemList], idx) => (
//               <div key={idx} className={`p-2 rounded text-xs ${unit === champName ? 'bg-gray-700' : 'bg-gray-800'}`}>
//                 <span className="font-medium">{unit}:</span> {itemList.join(", ")}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface TraitUnitsProps {
//   traits: string[];
//   champName: string;
//   theme: ThemeStyles;
// }

// /**
//  * Renders other units with the same traits
//  */
// function TraitUnits({ traits, champName, theme }: TraitUnitsProps): JSX.Element {
//   // Mock data - in a real app this would be fetched from your data source
//   const [traitUnits, setTraitUnits] = useState<{[trait: string]: string[]}>({});
//   const [activeTrait, setActiveTrait] = useState<string>(traits[0] || "");
  
//   // Simulating data loading
//   useEffect(() => {
//     // This would be an API call in a real app
//     const mockTraitUnits = {
//       "Boombot": ["Shaco", "Twisted Fate", "Ziggs", "Jinx"],
//       "Cybercity": ["Ekko", "Jhin", "LeBlanc", "Senna", "Zeri"],
//       "Deadeye": ["Caitlyn", "Graves", "Jhin", "Senna"],
//       "Executioner": ["Katarina", "Kha'Zix", "Rek'Sai", "Samira"],
//       "Hacker": ["Ekko", "LeBlanc", "Shaco"],
//       "Punk": ["Jinx", "Yone", "Vi", "Yasuo"],
//       "Edgelord": ["Kayle", "Yone", "Kayn", "Riven", "Yasuo"],
//       "Superfan": ["Jax", "Kennen", "Neeko", "Poppy", "Seraphine"],
//       "K/DA": ["Ahri", "Akali", "Evelynn", "Kai'Sa", "Seraphine"],
//       "Disco": ["Corki", "Nami", "Tahm Kench", "Twisted Fate"],
//       "Sentinel": ["Galio", "Jax", "Shen", "Vi"]
//     };
    
//     setTraitUnits(mockTraitUnits);
//     if (traits && traits.length > 0) {
//       setActiveTrait(traits[0]);
//     }
//   }, [traits]);

//   if (!traits || traits.length === 0) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-500">
//         No trait data available
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Trait Synergies</p>
      
//       {/* Trait selector */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {traits.map((trait, index) => (
//           <Button
//             key={index}
//             onClick={() => setActiveTrait(trait)}
//             className={`flex items-center gap-2 ${activeTrait === trait ? theme.buttonActive : theme.buttonInactive}`}
//           >
//             <img 
//               src={getTraitImageUrl(trait)} 
//               alt={trait} 
//               className="w-5 h-5"
//             />
//             {trait}
//           </Button>
//         ))}
//       </div>
      
//       <div className="overflow-y-auto flex-grow">
//         <h3 className="text-md font-semibold mb-2">Champions with {activeTrait}</h3>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//           {traitUnits[activeTrait]?.map((unit, idx) => (
//             <div 
//               key={idx} 
//               className={`p-2 rounded text-center ${unit === champName ? theme.accent1 : 'bg-gray-800'}`}
//             >
//               {unit}
//             </div>
//           )) || <p className="text-gray-400">No data available</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface ItemsProps {
//   items?: RecommendedItem[];
//   champName: string;
//   theme: ThemeStyles;
//   recommendedItems?: string[];
// }

// /**
//  * Renders recommended items for the champion
//  */
// function RecommendedItems({ items, champName, theme, recommendedItems }: ItemsProps): JSX.Element {
//   // Mock data for items if not provided
//   const mockItems: RecommendedItem[] = [
//     {
//       id: "IE",
//       name: "Infinity Edge",
//       description: "Critical Strikes deal +100% damage.",
//       imageUrl: "./img/items/IE.png",
//       stats: { critDamage: "+100%" }
//     },
//     {
//       id: "BT",
//       name: "Bloodthirster",
//       description: "Heal for 33% of damage dealt. Once per combat, gain a shield at 40% Health.",
//       imageUrl: "./img/items/BT.png",
//       stats: { lifesteal: "33%" }
//     },
//     {
//       id: "GS",
//       name: "Giant Slayer",
//       description: "Deal 20% more damage to enemies with over 1600 Health.",
//       imageUrl: "./img/items/GS.png",
//       stats: { damage: "+20%" }
//     },
//     {
//       id: "JG",
//       name: "Jeweled Gauntlet",
//       description: "Abilities can critically strike. +30% Critical Strike Damage.",
//       imageUrl: "./img/items/JG.png",
//       stats: { critDamage: "+30%" }
//     }
//   ];
  
//   const displayItems = items || mockItems;
  
//   // Filter items to show recommended ones first
//   const sortedItems = [...displayItems].sort((a, b) => {
//     const aRecommended = recommendedItems?.includes(a.name) || false;
//     const bRecommended = recommendedItems?.includes(b.name) || false;
    
//     if (aRecommended && !bRecommended) return -1;
//     if (!aRecommended && bRecommended) return 1;
//     return 0;
//   });

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Items</p>
      
//       <div className="overflow-y-auto flex-grow grid grid-cols-1 gap-3">
//         {sortedItems.map((item, idx) => (
//           <div 
//             key={idx} 
//             className={`p-3 rounded bg-gray-800 border ${recommendedItems?.includes(item.name) ? theme.border : 'border-transparent'}`}
//           >
//             <div className="flex items-center gap-3">
//               <div className={`rounded w-10 h-10 flex-shrink-0 border ${theme.border}`}>
//                 <img
//                   src={item.imageUrl || "/api/placeholder/40/40"}
//                   alt={item.name}
//                   className="w-full h-full rounded"
//                   onError={(e) => {
//                     e.currentTarget.src = "/api/placeholder/40/40";
//                   }}
//                 />
//               </div>
              
//               <div>
//                 <h4 className="font-semibold mb-1">
//                   {item.name}
//                   {recommendedItems?.includes(item.name) && (
//                     <span className={`ml-2 inline-block px-2 text-xs py-1 rounded ${theme.accent1}`}>
//                       Recommended
//                     </span>
//                   )}
//                 </h4>
//                 <p className="text-xs text-gray-300">{item.description}</p>
                
//                 <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
//                   {Object.entries(item.stats).map(([stat, value], statIdx) => (
//                     <span key={statIdx} className="text-xs">
//                       <span className="text-gray-400">{formatKeyForDisplay(stat)}:</span> {value}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// interface PositioningBoardProps {
//   positioning?: PositioningData;
//   champName: string;
//   theme: ThemeStyles;
// }

// /**
//  * Renders a TFT positioning board with champion placements
//  */
// function PositioningBoard({ positioning, champName, theme }: PositioningBoardProps): JSX.Element {
//   // Default 7x7 board if not provided
//   const defaultPositioning: PositioningData = {
//     rows: 7,
//     cols: 7,
//     placements: {
//       [champName]: [4, 2],
//       "Tank1": [3, 0],
//       "Tank2": [4, 0],
//       "Support": [5, 1],
//       "Carry1": [6, 2],
//       "Carry2": [3, 3]
//     }
//   };
  
//   const boardData = positioning || defaultPositioning;
//   const { rows, cols, placements } = boardData;
  
//   // Create the grid cells
//   const gridCells = [];
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       // Find if any champion is placed in this cell
//       const champion = Object.entries(placements).find(
//         ([, pos]) => pos[0] === row && pos[1] === col
//       );
      
//       // Alternate cell colors for the classic hexagonal effect
//       const isEvenRow = row % 2 === 0;
//       const isEvenCol = col % 2 === 0;
//       const isEven = isEvenRow ? isEvenCol : !isEvenCol;
      
//       // Determine if this cell is on the bench (last row)
//       const isBench = row === rows - 1;
      
//       gridCells.push(
//         <div 
//           key={`${row}-${col}`} 
//           className={`
//             aspect-square flex items-center justify-center text-xs 
//             ${isEven ? 'bg-gray-700/40' : 'bg-gray-800/60'} 
//             ${isBench ? 'border-t-2 border-gray-500' : ''}
//             ${champion ? 'ring-2 ' + theme.border : ''}
//           `}
//         >
//           {champion && (
//             <div className={`
//               w-full h-full flex items-center justify-center text-center p-1
//               ${champion[0] === champName ? theme.accent1 : 'bg-gray-600/70'}
//               font-semibold text-xs
//             `}>
//               {champion[0]}
//             </div>
//           )}
//         </div>
//       );
//     }
//   }

//   return (
//     <div
//       className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
//     >
//       <p className="text-lg font-semibold mb-2">Recommended Positioning</p>
      
//       <div className="flex-grow flex flex-col">
//         <div className="bg-gray-900 p-2 mb-4 rounded">
//           <p className="text-sm mb-2">Positioning Strategy:</p>
//           <ul className="text-xs list-disc pl-4 text-gray-300">
//             <li>Place {champName} in the second row for optimal ability usage</li>
//             <li>Frontline tanks should be positioned to absorb damage</li>
//             <li>Keep carries in the backline protected</li>
//             <li>Adjust based on enemy compositions</li>
//           </ul>
//         </div>
        
//         <div className="flex items-center justify-center flex-grow">
//           <div 
//             className="grid border border-gray-600 bg-gray-900/70"
//             style={{ 
//               gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//               gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
//               width: '100%',
//               maxWidth: '400px',
//               maxHeight: '400px'
//             }}
//           >
//             {gridCells}
//           </div>
//         </div>
        
//         <div className="mt-3 text-xs text-gray-400 text-center">
//           Note: Adjust positioning based on enemy threats and team composition
//         </div>
//       </div>
//     </div>
//   );
// }

// interface FullscreenNavigationProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   theme: ThemeStyles;
//   onClose: () => void;
// }

// /**
//  * Renders navigation for fullscreen champion detail view
//  */
// function FullscreenNavigation({ activeTab, setActiveTab, theme, onClose }: FullscreenNavigationProps): JSX.Element {
//   const tabs = [
//     { id: "ability", label: "Ability" },
//     { id: "stats", label: "Stats" },
//     { id: "playstyle", label: "Playstyle" },
//     { id: "builds", label: "Builds" },
//     { id: "traits", label: "Traits" },
//     { id: "items", label: "Items" },
//     { id: "positioning", label: "Positioning" }
//   ];
  
//   const activeButtonStyle = `${theme.buttonActive} text-amber-100 font-mono border-b-2 border-amber-400 px-4 py-2`;
//   const inactiveButtonStyle = `cursor-pointer ${theme.buttonInactive} bg-transparent text-white/70 font-mono hover:bg-gray-800 px-4 py-2`;
  
//   return (
//     <div className="flex items-center border-b border-gray-700 bg-gray-900 sticky top-0 z-20">
//       <div className="flex flex-grow overflow-x-auto scrollbar-hide">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={activeTab === tab.id ? activeButtonStyle : inactiveButtonStyle}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
      
//       <button
//         onClick={onClose}
//         className="p-2 ml-2 text-gray-400 hover:text-white"
//         aria-label="Close"
//       >
//         <X size={24} />
//       </button>
//     </div>
//   );
// }

// /**
//  * Main fullscreen champion detail component
//  */
// export default function FullScreenChampionDetail({ 
//   item, 
//   builds, 
//   items,
//   positioning,
//   onClose 
// }: FullScreenChampionDetailProps): JSX.Element {
//   if (!item) {
//     return <div></div>;
//   }

//   const data: ChampionData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
//   const champUrl = getChampionImageUrl(data.apiName);
//   const theme = getCostTheme(data.cost);
//   const traitsArr: string[] = typeof data.traits === 'string' ? JSON.parse(data.traits) : data.traits || [];

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 flex flex-col overflow-hidden">
//       {/* Header with close button */}
//       <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-900 sticky top-0 z-20">
//         <h1 className="text-xl font-bold text-white flex items-center">
//           <div className={`flex items-center justify-center rounded-full ${theme.accent1} w-8 h-8 mr-2 flex-shrink-0`}>
//             <img className="h-5 w-5" src={`./img/t${data.cost}.png`} alt={`Tier ${data.cost}`}/>
//           </div>
//           {data.name} - <span className="ml-2 text-sm font-normal text-gray-300">Champion Details</span>
//         </h1>
        
//         <button
//           onClick={onClose}
//           className="p-2 text-gray-400 hover:text-white"
//           aria-label="Close"
//         >
//           <X size={24} />
//         </button>
//       </div>
      
//       {/* Main content */}
//       <div className="flex flex-col md:flex-row h-full overflow-auto p-3 gap-3">
//         {/* Left column - Champion info and items */}
//         <div className="w-full md:w-1/3 flex flex-col gap-3">
//           {/* Champion card */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-4 rounded relative`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
          
//             {/* Champion header */}
//             <div className="relative flex items-center mb-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">{data.name}</h2>
//                 <div className="flex items-center gap-1 mt-1">
//                   {traitsArr.map((trait, idx) => (
//                     <div key={idx} className="relative group">
//                       <img 
//                         className="h-6 w-6 rounded-full border border-gray-700" 
//                         src={getTraitImageUrl(trait)} 
//                         alt={trait}
//                       />
//                       <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
//                         {trait}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//               </div>
            
//             </div>

//             <div className=" grid grid-cols-2 gap-y-2">
//               {/* Champion image */}
//               <div className="relative w-3/4 aspect-square rounded overflow-hidden mb-4  ">
//               <img
//                 className="w-full h-full object-cover saturate-150"
//                 src={champUrl}
//                 alt={data.name}
//                 onError={(e) => {
//                   e.currentTarget.src = "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
//                 }}
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
//                 <p className={`text-white font-semibold`}>{data.role}</p>
//               </div>
//             </div>
            
//               {/* Champion stats - compact grid */}
//               <div className="bg-gray-800/80 p-3 rounded">
//               <h3 className="text-sm font-semibold mb-2 text-white">Champion Stats</h3>
//               <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
//                 {data.stats?.hp && <StatItem iconSrc="./img/TFT_Health.png" value={data.stats.hp} label="HP" />}
//                 {data.stats?.mana && <StatItem iconSrc="./img/TFT_Mana.png" value={data.stats.mana} label="Mana" />}
//                 {data.stats?.armor && <StatItem iconSrc="./img/TFT_Armor.png" value={data.stats.armor} label="Armor" />}
//                 {data.stats?.mr && <StatItem iconSrc="./img/TFT_MR.png" value={data.stats.mr} label="MR" />}
//                 {data.stats?.damage && <StatItem iconSrc="./img/TFT_AD.png" value={data.stats.damage} label="AD" />}
//                 {data.stats?.attackSpeed && (
//                   <StatItem 
//                     iconSrc="./img/TFT_AS.png" 
//                     value={Math.round(data.stats.attackSpeed * 100) / 100} 
//                     label="AS"
//                   />
//                 )}
//                 {data.stats?.range && <StatItem iconSrc="./img/TFT_Range.png" value={data.stats.range} label="Range" />}
                
//                 {data.stats?.attackSpeed && data.stats?.damage && (
//                   <div className="flex flex-row gap-2 items-center col-span-2">
//                     <span className="text-gray-300 text-xs">DPS:</span>
//                     <span className="text-white font-medium">
//                       {calculateDPS(data.stats.attackSpeed, data.stats.damage) || "N/A"}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Champion ability */}
//             {data.ability && (
//               <div className="bg-gray-800/80 p-3 rounded mb-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className={`rounded-full border ${theme.border} w-8 h-8 overflow-hidden`}>
//                     <img
//                       src={getAbilityImageUrl(data.imageAbilityS3)}
//                       className="w-full h-full object-cover"
//                       alt="Ability"
//                       onError={(e) => {
//                         e.currentTarget.src = "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
//                       }}
//                     />
//                   </div>
//                   <h3 className="text-white font-semibold">{data.ability.name}</h3>
//                 </div>
//                 <p className="text-xs text-gray-300 mb-2">{data.ability.desc}</p>
//                 {/* Ability stats in compact form */}
//                 <AbilityStats ability={data.ability} isPopup={true} />
//               </div>
//             )}
//             </div>
          
            
//           </div>
          
//           {/* Recommended Items Section */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-4 rounded relative overflow-hidden h-full`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
//             <div className="relative z-10">
//               <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Items</h2>
              
//               <div className="overflow-y-auto max-h-96 pr-1 space-y-2">
//                 {items && items.length > 0 ? (
//                   items.slice(0, 5).map((item, idx) => {
//                     const isRecommended = data.items?.includes(item.name);
                    
//                     return (
//                       <div 
//                         key={idx} 
//                         className={`p-2 rounded bg-gray-800/80 ${isRecommended ? 'border ' + theme.border : 'border-transparent'}`}
//                       >
//                         <div className="flex items-center gap-2">
//                           <div className={`rounded w-8 h-8 flex-shrink-0 border ${theme.border}`}>
//                             <img
//                               src={item.imageUrl || "/api/placeholder/32/32"}
//                               alt={item.name}
//                               className="w-full h-full rounded"
//                               onError={(e) => {
//                                 e.currentTarget.src = "/api/placeholder/32/32";
//                               }}
//                             />
//                           </div>
                          
//                           <div className="flex-grow">
//                             <div className="flex justify-between items-baseline">
//                               <h4 className="font-semibold text-sm">{item.name}</h4>
//                               {isRecommended && (
//                                 <span className={`ml-1 inline-block px-1 py-0.5 text-xs rounded ${theme.accent1}`}>
//                                   ★
//                                 </span>
//                               )}
//                             </div>
                            
//                             <div className="group relative">
//                               <p className="text-xs text-gray-300 truncate">{item.description}</p>
                              
//                               {/* Hover tooltip with full stats */}
//                               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-30 left-0 -bottom-1 transform translate-y-full bg-gray-900 border border-gray-700 rounded p-2 w-64 pointer-events-none">
//                                 <p className="text-xs mb-1">{item.description}</p>
//                                 <div className="grid grid-cols-2 gap-x-2 mt-1">
//                                   {Object.entries(item.stats).map(([stat, value], statIdx) => (
//                                     <div key={statIdx} className="text-xs">
//                                       <span className="text-gray-400">{formatKeyForDisplay(stat)}:</span>{' '}
//                                       <span className="text-white">{value}</span>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p className="text-sm text-gray-400">No item data available</p>
//                 )}
//               </div>
              
//               {items && items.length > 5 && (
//                 <p className="text-xs text-gray-400 mt-2 text-center">+ {items.length - 5} more items</p>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Right column - Grid layout for other sections */}
//         <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-auto">
//           {/* Playstyle Tips */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
//             <div className="relative z-10 p-4 h-full">
//               <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Playstyle Tips</h2>
              
//               <div className="overflow-y-auto pr-2 h-full max-h-96">
//                 {data.description && (
//                   <div className="mb-3 p-2 bg-gray-800/50 rounded">
//                     <p className="text-white text-sm">{data.description}</p>
//                   </div>
//                 )}
                
//                 <ul className="list-disc pl-5 space-y-1 font-extralight text-sm">
//                   <PlaystyleTip 
//                     label="Best positioned" 
//                     value={data.position} 
//                     defaultValue="Flexible" 
//                   />
//                   <PlaystyleTip 
//                     label="Recommended items" 
//                     value={data.items?.join(", ")} 
//                     defaultValue="Varies based on comp" 
//                   />
//                   <PlaystyleTip 
//                     label="Synergizes with" 
//                     value={data.synergies?.join(", ")} 
//                     defaultValue="Champions sharing traits" 
//                   />
//                   <PlaystyleTip 
//                     label="Power spikes" 
//                     value={data.powerSpikes} 
//                     defaultValue="When ability activates" 
//                   />
//                   <PlaystyleTip 
//                     label="Counter strategies" 
//                     value={data.counters} 
//                     defaultValue="CC and burst damage" 
//                   />
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//           {/* Trait Synergies */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
//             <div className="relative z-10 p-4 h-full">
//               <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Trait Synergies</h2>
              
//               <div className="overflow-y-auto pr-2 h-full max-h-96">
//                 {traitsArr.length > 0 ? (
//                   <div className="space-y-4">
//                     {traitsArr.map((trait, index) => {
//                       // Mock data - in a real app this would be fetched from your data source
//                       const mockTraitUnits = {
//                         "Boombot": ["Shaco", "Twisted Fate", "Ziggs", "Jinx"],
//                         "Cybercity": ["Ekko", "Jhin", "LeBlanc", "Senna", "Zeri"],
//                         "Deadeye": ["Caitlyn", "Graves", "Jhin", "Senna"],
//                         "Executioner": ["Katarina", "Kha'Zix", "Rek'Sai", "Samira"],
//                         "Hacker": ["Ekko", "LeBlanc", "Shaco"],
//                         "Punk": ["Jinx", "Yone", "Vi", "Yasuo"],
//                         "Edgelord": ["Kayle", "Yone", "Kayn", "Riven", "Yasuo"],
//                         "Superfan": ["Jax", "Kennen", "Neeko", "Poppy", "Seraphine"],
//                         "K/DA": ["Ahri", "Akali", "Evelynn", "Kai'Sa", "Seraphine"],
//                         "Disco": ["Corki", "Nami", "Tahm Kench", "Twisted Fate"],
//                         "Sentinel": ["Galio", "Jax", "Shen", "Vi"]
//                       };
                      
//                       const traitUnits = (mockTraitUnits as any)[trait] || [];
                      
//                       return (
//                         <div key={index} className="bg-gray-800/50 rounded p-2">
//                           <div className="flex items-center gap-2 mb-2">
//                             <img 
//                               src={getTraitImageUrl(trait)} 
//                               alt={trait} 
//                               className="w-6 h-6 rounded-full"
//                             />
//                             <h3 className="font-semibold text-white">{trait}</h3>
//                           </div>
                          
//                           <div className="flex flex-wrap gap-1">
//                             {traitUnits.map((unit:any, idx:number) => (
//                               <div 
//                                 key={idx} 
//                                 className={`px-2 py-1 rounded text-xs ${unit === data.name ? theme.accent1 : 'bg-gray-700'}`}
//                               >
//                                 {unit}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-400">No trait data available</p>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Builds */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
//             <div className="relative z-10 p-4 h-full">
//               <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Builds</h2>
              
//               <div className="overflow-y-auto pr-2 h-full max-h-96">
//                 {builds && builds.length > 0 ? (
//                   <div className="space-y-4">
//                     {builds.map((build, index) => (
//                       <div key={index} className="bg-gray-800/50 rounded p-2">
//                         <h3 className="font-semibold text-white mb-2">{build.name}</h3>
                        
//                         <div className="mb-2">
//                           <p className="text-xs text-gray-300 mb-1">Composition:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {build.units.map((unit, idx) => (
//                               <div 
//                                 key={idx} 
//                                 className={`px-2 py-1 rounded text-xs ${unit === data.name ? theme.accent1 : 'bg-gray-700'}`}
//                               >
//                                 {unit}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
                        
//                         <div className="mb-2">
//                           <p className="text-xs text-gray-300 mb-1">Description:</p>
//                           <p className="text-xs text-white">{build.description}</p>
//                         </div>
                        
//                         <div>
//                           <p className="text-xs text-gray-300 mb-1">Key Items:</p>
//                           <div className="text-xs">
//                             {Object.entries(build.items)
//                               .filter(([unit]) => unit === data.name || index === 0)
//                               .map(([unit, itemList], idx) => (
//                                 <div key={idx} className={`p-1 rounded text-xs ${unit === data.name ? 'bg-gray-700' : 'bg-gray-800'}`}>
//                                   <span className="font-medium">{unit}:</span> {itemList.join(", ")}
//                                 </div>
//                               ))}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-400">No build data available</p>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Positioning */}
//           <div className={`border bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} rounded relative overflow-hidden`}>
//             {/* Background glow effect */}
//             <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}></div>
            
//             <div className="relative z-10 p-4 h-full">
//               <h2 className={`text-lg font-semibold mb-3 ${theme.textAccent}`}>Recommended Positioning</h2>
              
//               <div className="overflow-y-auto pr-2 h-full max-h-96 flex flex-col">
//                 {/* Default 7x7 board if not provided */}
//                 {(() => {
//                   const defaultPositioning: PositioningData = {
//                     rows: 4,
//                     cols: 7,
//                     placements: {
//                       [data.name]: [2, 3],
//                       "Tank1": [0, 2],
//                       "Tank2": [0, 3],
//                       "Support": [1, 4],
//                       "Carry1": [2, 5],
//                       "Carry2": [2, 1]
//                     }
//                   };
                  
//                   const boardData = positioning || defaultPositioning;
//                   const { rows, cols, placements } = boardData;
                  
//                   // Create the grid cells
//                   const gridCells = [];
//                   for (let row = 0; row < rows; row++) {
//                     for (let col = 0; col < cols; col++) {
//                       // Find if any champion is placed in this cell
//                       const champion = Object.entries(placements).find(
//                         ([, pos]) => pos[0] === row && pos[1] === col
//                       );
                      
//                       // Alternate cell colors for the classic hexagonal effect
//                       const isEvenRow = row % 2 === 0;
//                       const isEvenCol = col % 2 === 0;
//                       const isEven = isEvenRow ? isEvenCol : !isEvenCol;
                      
//                       // Determine if this cell is on the bench (last row)
//                       const isBench = row === rows - 1;
                      
//                       gridCells.push(
//                         <div 
//                           key={`${row}-${col}`} 
//                           className={`
//                             aspect-square flex items-center justify-center text-xs 
//                             ${isEven ? 'bg-gray-700/40' : 'bg-gray-800/60'} 
//                             ${isBench ? 'border-t-2 border-gray-500' : ''}
//                             ${champion ? 'ring-1 ' + theme.border : ''}
//                           `}
//                         >
//                           {champion && (
//                             <div className={`
//                               w-full h-full flex items-center justify-center text-center p-1
//                               ${champion[0] === data.name ? theme.accent1 : 'bg-gray-600/70'}
//                               font-semibold text-xs
//                             `}>
//                               {champion[0]}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     }
//                   }
                  
//                   return (
//                     <>
//                       <div className="bg-gray-900 p-2 mb-3 rounded text-xs">
//                         <p className="mb-1">Positioning Strategy:</p>
//                         <ul className="list-disc pl-4 text-gray-300 space-y-1">
//                           <li>Place {data.name} in the second row for optimal ability usage</li>
//                           <li>Frontline tanks should be positioned to absorb damage</li>
//                           <li>Keep carries in the backline protected</li>
//                         </ul>
//                       </div>
                      
//                       <div className="flex items-center justify-center flex-grow">
//                         <div 
//                           className="grid border border-gray-600 bg-gray-900/70"
//                           style={{ 
//                             gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//                             gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
//                             aspectRatio: `${cols}/${rows}`
//                           }}
//                         >
//                           {gridCells}
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }