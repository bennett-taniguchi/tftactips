import { Item } from "@/api/crudapiservice";
import { Button } from "../ui/button";
import { JSX, useState } from "react";
import { cn } from "@/lib/utils";

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
}

interface AbilityStatsProps {
  ability: AbilityData;
  isPopup?: boolean; // New boolean flag for popup mode
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
      {(sortedKeys.length==0)
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

interface ChampAbilityProps {
  ability?: AbilityData;
  theme: ThemeStyles;
  imageAbilityS3: string;
}

/**
 * Renders champion's ability information
 */
function ChampAbility({ ability, theme, imageAbilityS3 }: ChampAbilityProps): JSX.Element {
  if (!ability || !ability.name) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No ability data available
      </div>
    );
  }
  
  const abilityUrl = getAbilityImageUrl(imageAbilityS3);
  let topP = "pt-5"
  if(ability.desc!.length >= 320) {
    
    topP= "pt-[-20px]"
  }
  return (
    <div
      className={cn(topP,`${theme.textAccent} text-xs   px-5 pb-5 h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left relative pb-10`)}
    >
      <div className="flex-grow overflow-y-auto pr-2 max-h-full">
        <p className="text-lg">Ability: {ability.name}</p>
        <div className="font-extralight text-xs">{ability.desc}</div>

        {/* Dynamically render ability stats in priority order */}
        <div className="mt-2 space-y-1">
          <AbilityStats ability={ability} />
        </div>
      </div>

      {/* Absolutely positioned ability image at the bottom */}
      <div className="absolute bottom-[10px] right-5 transform z-20">
        <div
          className={`rounded-full border-2 ${theme.border} w-16 h-16 shadow-md ${theme.shadow}`}
        >
          <img
            src={abilityUrl}
            className="w-full h-full object-cover saturate-150 rounded-full"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src =
                "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  iconSrc: string;
  value?: string | number;
}

/**
 * Renders a single champion stat
 */
function StatItem({ iconSrc, value }: StatItemProps): JSX.Element {
  return (
    <div className="flex flex-row gap-2">
      <img className="h-3 w-3 mt-1" src={iconSrc} />
      <span className="text-white font-medium">
        {value || "N/A"}
      </span>
    </div>
  );
}

interface ChampStatsProps {
  stats?: ChampionStats;
  theme: ThemeStyles;
}

/**
 * Renders champion's stats information
 */
function ChampStats({ stats, theme }: ChampStatsProps): JSX.Element {
  if (!stats) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No stats data available
      </div>
    );
  }

  const { hp, mana, armor, mr, attackSpeed, damage, range } = stats;
  const dps = calculateDPS(attackSpeed, damage);
  const formattedAttackSpeed = attackSpeed ? Math.round(attackSpeed * 100) / 100 : undefined;

  return (
    <div
      className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
    >
      <p className="text-lg font-semibold mb-2">Champion Stats</p>
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 flex-grow text-sm overflow-y-auto max-h-full">
        <StatItem iconSrc="./img/TFT_Health.png" value={hp} />
        <StatItem iconSrc="./img/TFT_Mana.png" value={mana} />
        <StatItem iconSrc="./img/TFT_Armor.png" value={armor} />
        <StatItem iconSrc="./img/TFT_MR.png" value={mr} />
        
        <p>
          DPS: <span className="text-white font-medium">{dps || "N/A"}</span>
        </p>
        
        <div className="flex flex-row gap-2">
          <img className="h-3 w-3 mt-1" src="./img/TFT_AS.png" />
          <span className="text-white font-medium">
            {formattedAttackSpeed || "N/A"}
          </span>
        </div>
        
        <StatItem iconSrc="./img/TFT_Range.png" value={range} />
        <StatItem iconSrc="./img/TFT_AD.png" value={damage} />
      </div>
    </div>
  );
}

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
    <li>
      {label}: <span className="text-white">{value || defaultValue}</span>
    </li>
  );
}

interface ChampPlaystyleProps {
  champData: ChampionData;
  theme: ThemeStyles;
}

/**
 * Renders champion's playstyle information
 */
function ChampPlaystyle({ champData, theme }: ChampPlaystyleProps): JSX.Element {
  const { position, items, synergies, powerSpikes, counters } = champData;
  
  return (
    <div
      className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
    >
      <p className="text-lg font-semibold mb-2">Playstyle Tips</p>
      <div className="overflow-y-auto pr-2 max-h-full">
        <ul className="list-disc pl-5 space-y-2 font-extralight">
          <PlaystyleTip 
            label="Best positioned" 
            value={position} 
            defaultValue="Flexible" 
          />
          <PlaystyleTip 
            label="Recommended items" 
            value={items?.join(", ")} 
            defaultValue="Varies based on comp" 
          />
          <PlaystyleTip 
            label="Synergizes with" 
            value={synergies?.join(", ")} 
            defaultValue="Champions sharing traits" 
          />
          <PlaystyleTip 
            label="Power spikes" 
            value={powerSpikes} 
            defaultValue="When ability activates" 
          />
          <PlaystyleTip 
            label="Counter strategies" 
            value={counters} 
            defaultValue="CC and burst damage" 
          />
        </ul>
      </div>
    </div>
  );
}

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: ThemeStyles;
}

/**
 * Renders tab navigation buttons
 */
function TabNavigation({ activeTab, setActiveTab, theme }: TabNavigationProps): JSX.Element {
  const activeButtonStyle = `${theme.buttonActive} underline underline-offset-4 text-amber-100 font-mono rounded-b-none border-t border-x`;
  const inactiveButtonStyle = `cursor-pointer ${theme.buttonInactive} bg-gray-900 text-white/50 font-mono rounded-b-none border-t border-x`;
  
  return (
    <div className="flex flex-row gap-2 justify-center mt-4">
      <Button
        className={activeTab === "ability" ? activeButtonStyle : inactiveButtonStyle}
        onClick={() => setActiveTab("ability")}
      >
        Ability
      </Button>
      <Button
        className={activeTab === "stats" ? activeButtonStyle : inactiveButtonStyle}
        onClick={() => setActiveTab("stats")}
      >
        Stats
      </Button>
      <Button
        className={activeTab === "playstyle" ? activeButtonStyle : inactiveButtonStyle}
        onClick={() => setActiveTab("playstyle")}
      >
        Playstyle
      </Button>
    </div>
  );
}

interface ChampionTraitsProps {
  traits: string[];
}

/**
 * Renders champion traits as hoverable icons
 * @param props - Component props
 * @param props.traits - Array of trait names
 * @returns Rendered trait icons with hover tooltips or null if no traits
 */
function ChampionTraits({ traits }: ChampionTraitsProps): JSX.Element | null {
  if (!traits || traits.length === 0) return null;
  
  return (
    <div className="flex items-center gap-1">
      {traits.map((trait: string, idx: number) => (
        <div 
          key={idx} 
          className="relative group"
        >
          <img 
            className="h-6 w-6 rounded-full border border-gray-700 cursor-help" 
            src={getTraitImageUrl(trait)} 
            alt={trait}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900/90 text-white text-xs px-2 py-1 rounded pointer-events-none z-20 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            {trait}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ChampionHeaderProps {
  champData: ChampionData;
  theme: ThemeStyles;
  imageUrl: string;
  traits: string[];
}

/**
 * Renders champion header information in a TCG card style
 * @param props - Component props
 * @param props.champData - Champion data object
 * @param props.theme - Theme styling object
 * @param props.imageUrl - URL for champion image
 * @param props.traits - Array of champion traits
 * @returns Rendered champion header in TCG card style
 */
function ChampionHeader({ champData, theme, imageUrl, traits }: ChampionHeaderProps): JSX.Element {
  // Handle image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = "https://tft-set14.s3.us-east-2.amazonaws.com/traits/cybercity.png";
  };
 let topPos = ["Shaco","Zyra", "Seraphine","Morgana","Sylas","Poppy","Dr. Mundo","Jax","Twisted Fate","Rhaast","Vayne","Graves","Ekko","LeBlanc","Jhin","Draven","Illaoi","Darius","Galio","Elise","Senna","Gragas","Fiddlesticks","Jinx","Mordekaiser","Zeri","Zed","Ziggs","Miss Fortune","Xayah","Cho'Gath","Leona"]
  let objPos = "object-top-right"
  let h = "5"
  if(topPos.includes(champData.name)) objPos = "object-top"
  if(champData.cost == "5"    ) {objPos = "object-top"; h="5.5"}
 let roleColor = "bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
 if(champData.role=="ADCarry") roleColor="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text"
  if(champData.role=="ADReaper") roleColor="bg-gradient-to-r from-pink-500 to-lime-500 text-transparent bg-clip-text"
  if(champData.role=="ADTank") roleColor="bg-gradient-to-r from-red-500 to-white text-transparent bg-clip-text"
  if(champData.role=="APCarry") roleColor="bg-gradient-to-r from-purple-500 to-lime-300 text-transparent bg-clip-text"
  if(champData.role=="APCasterHighMana") roleColor="bg-gradient-to-r from-purple-500 to-pink-300 text-transparent bg-clip-text"
  if(champData.role=="APFighter") roleColor="bg-gradient-to-r from-pink-500 to-cyan-300 text-transparent bg-clip-text"
  if(champData.role=="APReaper") roleColor="bg-gradient-to-r from-purple-500 to-red-300 text-transparent bg-clip-text"
  if(champData.role=="ADFighter") roleColor="bg-gradient-to-r from-lime-500 to-cyan-100 text-transparent bg-clip-text"
  
  return (
    <div className="flex flex-col bg-gray-800/30 rounded">
      {/* Champion name & traits bar */}
      <div className="flex items-center px-3 py-2 shadow-inner shadow-black/10 ">
        {/* Cost indicator */}
        <div className={`flex items-center justify-center rounded-full ${theme.accent1} w-8 h-8 mr-2 flex-shrink-0`}>
          {/* <span className="text-white font-bold">{champData.cost}</span> */}
          {champData.cost  == "1"
          ?
          <img className="h-3 w-3 grayscale-100" src={`./img/t2.png `}/>
          :
          <img className={`h-${h} w-5`} src={`./img/t${champData.cost}.png `}/>
          }
         
        </div>
        
        {/* Champion name */}
        <p
          className={`text-2xl font-bold text-white font-mono tracking-tight text-shadow ${theme.shadow} mr-auto truncate `}
        >
          {champData.name}
        </p>
        
        {/* Traits as hoverable icons */}
        <ChampionTraits traits={traits} />
      </div>
      
      {/* Main champion image */}
      <div className="w-full h-48 overflow-hidden border border-black/50  ">
        <img
          className={"w-full h-full object-cover saturate-150  "+ objPos}
          src={imageUrl}
          style={{ objectFit: "cover" }}
          onError={handleImageError}
          alt={champData.name}
        />
      </div>
      
      {/* Role information below the image */}
      <div className={`px-3 py-1 bg-gray-900/50  shadow-xs shadow-white/10 rounded-b`}>
        <p className={`text-sm ${theme.textAccent} font-mono flex justify-between `}>
          <span></span> <span className={cn(roleColor,`rounded  italic font-extrabold  text-xs  `)}>{champData.role}</span>
        </p>
      </div>
    </div>
  );
}

interface ChampionBoxProps {
  item: Item;
}

/**
 * Main ChampionBox component
 */
export default function ChampionBox({ item }: ChampionBoxProps): JSX.Element {
  // Tab state management
  const [activeTab, setActiveTab] = useState<string>("ability");

  if (!item) {
    return <div></div>;
  }

  const data: ChampionData = JSON.parse(item.data);
  const champUrl = getChampionImageUrl(data.apiName);
  const theme = getCostTheme(data.cost);
  const traitsArr: string[] = JSON.parse(data.traits) || [];

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "ability":
        return <ChampAbility 
          ability={data.ability} 
          theme={theme}
          imageAbilityS3={data.imageAbilityS3}
        />;
      case "stats":
        return <ChampStats stats={data.stats} theme={theme} />;
      case "playstyle":
        return <ChampPlaystyle champData={data} theme={theme} />;
      default:
        return <ChampAbility 
          ability={data.ability} 
          theme={theme}
          imageAbilityS3={data.imageAbilityS3}
        />;
    }
  };

  return (
    <div
      className={`border h-full relative overflow-hidden bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-5 rounded flex flex-col`}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}
      ></div>

      {/* Champion card content */}
      <div className="relative z-10 flex flex-col h-full">
        <ChampionHeader 
          champData={data}
          theme={theme}
          imageUrl={champUrl}
          traits={traitsArr}
        />

        {/* Tab navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
        />

        {/* Tab content - flex-grow to take remaining height */}
        <div
          className={`border-t border-x ${theme.border} text-lg font-light rounded-b-none p-0 flex-grow overflow-visible relative`}
        >
          {renderTabContent()}
        </div>

        {/* Cyberpunk accent lines - bottom accent moves based on active tab */}
        <div
          className={`absolute bottom-0 h-1 w-1/3 ${theme.accent1} transition-all duration-300`}
          style={{
            left:
              activeTab === "ability"
                ? "0"
                : activeTab === "stats"
                ? "calc(50% - 16.67%)"
                : "calc(100% - 33.33%)",
          }}
        ></div>
      </div>
    </div>
  );
}