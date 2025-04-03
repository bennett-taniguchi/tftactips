import { Item } from "@/api/crudapiservice";
import { Button } from "../ui/button";
import { useState } from "react";

type ChampionBoxProps = {
  item: Item;
};

export default function ChampionBox({ item }: ChampionBoxProps) {
  // Tab state management
  const [activeTab, setActiveTab] = useState("ability");

  if (!item) {
    return <div></div>;
  }

  const data = JSON.parse(item.data);

  let champurl =
    "https://tft-set14.s3.us-east-2.amazonaws.com/champions/" +
    data.apiName.toLowerCase() +
    "_small.png";

  // Cost-based theming
  const getCostTheme = (cost: string) => {
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
          textAccent: "text-gray-300",
          buttonActive:
            "hover:bg-gray-800/80 border-gray-500/30 bg-gray-800/80",
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
          buttonActive:
            "hover:bg-green-900/80 border-green-500/30 bg-green-900/80",
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
          buttonActive:
            "hover:bg-blue-900/80 border-blue-500/30 bg-blue-900/80",
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
          buttonActive:
            "hover:bg-purple-900/80 border-purple-500/30 bg-purple-900/80",
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
          buttonActive:
            "hover:bg-amber-900/80 border-amber-500/30 bg-amber-900/80",
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
          buttonActive:
            "hover:bg-emerald-900/80 border-yellow-500/30 bg-emerald-900/80",
          buttonInactive: "hover:bg-emerald-900 border-red-500/30",
        };
    }
  };

  const theme = getCostTheme(data.cost);

  function ChampAbility({ ability }: any) {
    if (!ability || !ability.name) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          No ability data available
        </div>
      );
    }
    let abilityUrl = data.imageAbilityS3.replace(
      "https://accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint.us-east-2.amazonaws.com/",
      ""
    );
    abilityUrl = "https://tft-set14.s3.us-east-2.amazonaws.com/" + abilityUrl;

    // Extract and sort ability fields
    const renderAbilityStats = () => {
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
        const priorityOrder = {
          Damage: 1,
          Shield: 2,
          Mana: 3,
          Heal: 4,
          Duration: 5,
        };
        const aPriority = (priorityOrder as any)[a] || 99;
        const bPriority = (priorityOrder as any)[b] || 99;

        return aPriority - bPriority;
      });

      return sortedKeys.map((key) => {
        // Format the key for display (remove underscores, capitalize)
        const displayKey = key
          .replace(/_/g, " ")
          .replace(/([A-Z])/g, " $1")
          .trim();

        // Capitalize first letter
        const formattedKey =
          displayKey.charAt(0).toUpperCase() + displayKey.slice(1);

        return (
          <p key={key}>
            {formattedKey}:{" "}
            <span className="text-white text-sm">{ability[key]}</span>
          </p>
        );
      });
    };

    return (
      <div
        className={`${theme.textAccent} text-xs p-5 h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left relative pb-10`}
      >
        <div className="flex-grow overflow-y-auto pr-2 max-h-full">
          <p className="text-lg">Ability: {ability.name}</p>
          <div className="font-extralight text-xs">{ability.desc}</div>

          {/* Dynamically render ability stats in priority order */}
          <div className="mt-2 space-y-1">{renderAbilityStats()}</div>
        </div>

        {/* Absolutely positioned ability image at the bottom */}
        <div className="absolute bottom-[10px] right-5 transform  z-20">
          <div
            className={`rounded-full border-2 ${theme.border} w-16 h-16 shadow-lg ${theme.shadow}`}
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

  function ChampStats() {
    return (
      <div
        className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
      >
        <p className="text-lg font-semibold mb-2">Champion Stats</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 flex-grow text-sm overflow-y-auto max-h-full">
          <p>
            Health:{" "}
            <span className="text-white font-medium">
              {data.stats?.hp || "N/A"}
            </span>
          </p>
          <p>
            Mana:{" "}
            <span className="text-white font-medium">
              {data.stats?.mana || "N/A"}
            </span>
          </p>
          <p>
            Armor:{" "}
            <span className="text-white font-medium">
              {data.stats?.armor || "N/A"}
            </span>
          </p>
          <p>
            MR:{" "}
            <span className="text-white font-medium">
              {data.stats?.mr || "N/A"}
            </span>
          </p>
          <p>
            DPS:{" "}
            <span className="text-white font-medium">
              {data.stats?.dps || "N/A"}
            </span>
          </p>
          <p>
            Attack Speed:{" "}
            <span className="text-white font-medium">
              {data.stats?.attackSpeed || "N/A"}
            </span>
          </p>
          <p>
            Range:{" "}
            <span className="text-white font-medium">
              {data.stats?.range || "N/A"}
            </span>
          </p>
          <p>
            Damage:{" "}
            <span className="text-white font-medium">
              {data.stats?.damage || "N/A"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  function ChampPlaystyle() {
    return (
      <div
        className={`${theme.textAccent} h-full flex flex-col font-mono tracking-wide bg-gray-900/50 rounded text-left p-4`}
      >
        <p className="text-lg font-semibold mb-2">Playstyle Tips</p>
        <div className="overflow-y-auto pr-2 max-h-full">
          <ul className="list-disc pl-5 space-y-2 font-extralight">
            <li>
              Best positioned:{" "}
              <span className="text-white">{data.position || "Flexible"}</span>
            </li>
            <li>
              Recommended items:{" "}
              <span className="text-white">
                {data.items?.join(", ") || "Varies based on comp"}
              </span>
            </li>
            <li>
              Synergizes with:{" "}
              <span className="text-white">
                {data.synergies?.join(", ") || "Champions sharing traits"}
              </span>
            </li>
            <li>
              Power spikes:{" "}
              <span className="text-white">
                {data.powerSpikes || "When ability activates"}
              </span>
            </li>
            <li>
              Counter strategies:{" "}
              <span className="text-white">
                {data.counters || "CC and burst damage"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "ability":
        return <ChampAbility ability={data.ability} />;
      case "stats":
        return <ChampStats />;
      case "playstyle":
        return <ChampPlaystyle />;
      default:
        return <ChampAbility ability={data.ability} />;
    }
  };

  const activeButtonStyle = `${theme.buttonActive} underline underline-offset-4 text-amber-100 font-mono rounded-b-none border-t border-x`;
  const inactiveButtonStyle = `cursor-pointer ${theme.buttonInactive} bg-gray-900 text-white/50 font-mono rounded-b-none border-t border-x`;
  function traitNameToUrl(trait: string) {
    trait = trait.replace(" ", "");

    if (trait == "BoomBot") trait += "s";

    if (trait == "A.M.P.") trait = "amp";

    return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${trait.toLowerCase()}.png`;
  }
  let traitsArr = JSON.parse(data.traits) as string[];

  return (
    <div
      className={`border h-full relative overflow-hidden bg-gray-900 ${theme.border} drop-shadow-lg ${theme.shadow} p-5 rounded flex flex-col`}
    >
      {/* Background glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient}`}
      ></div>

      {/* Champion card content */}
      <div className="relative z-10 flex flex-col h-full ">
        <div className="flex justify-between items-start bg-gray-800/30 pt-2 px-5">
          <div>
            <p
              className={`text-4xl font-bold text-white font-mono tracking-tight text-shadow ${theme.shadow}`}
            >
              {data.name}
            </p>
            <p
              className={`text-lg font-light ${theme.textAccent} font-mono mt-1 flex flex-row gap-1`}
            >
              <img src="./img/TFT_Gold.png" className="w-4 h-4 mt-[5px]" />{" "}
              <span className="text-white ">{data.cost}</span>
            </p>
            <p
              className={`text-lg font-light ${theme.textAccent} font-mono mt-1`}
            >
              Role: <span className="text-white">{data.role}</span>
            </p>
          </div>

          {/* Image container with traits below */}
          <div className="flex flex-col items-center ">
            <div className="w-28 h-28 overflow-hidden rounded ">
              <img
                className="w-28 h-28 object-cover saturate-150"
                src={champurl}
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src =
                    "https://tft-set14.s3.us-east-2.amazonaws.com/placeholder.png";
                }}
              />
            </div>
            <div
              className={`text-sm font-light ${theme.textAccent} font-mono mt-1 text-center flex flex-row gap-2`}
            >
              {traitsArr.length != 0 ? (
                traitsArr.map((trait: any, idx: number) => (
                  <div key={idx}>
                    {trait}
                    <img className="h-6 w-6" src={traitNameToUrl(trait)} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-row gap-2 justify-center mt-4">
          <Button
            className={
              activeTab === "ability" ? activeButtonStyle : inactiveButtonStyle
            }
            onClick={() => setActiveTab("ability")}
          >
            Ability
          </Button>
          <Button
            className={
              activeTab === "stats" ? activeButtonStyle : inactiveButtonStyle
            }
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </Button>
          <Button
            className={
              activeTab === "playstyle"
                ? activeButtonStyle
                : inactiveButtonStyle
            }
            onClick={() => setActiveTab("playstyle")}
          >
            Playstyle
          </Button>
        </div>

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
