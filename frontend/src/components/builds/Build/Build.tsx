import { useState } from "react";

import BuildRow from "./BuildRow";
import BuildScreen from "./BuildScreen";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define types
export type ViewType = "Row" | "Screen";
export type GamePhase = "early" | "mid" | "late";
export type TraitType = {
  [key: string]: number;
};
export type ChampionType = {
  name: string;
  cost?: number;
  parsedData?: string;
  traits?: any;
  isCarry?: boolean;
  isTank?: boolean;
  items?: string[];
};
export type ItemType = string;
export type AugmentType = {
  name: string;
  description: string;
};

interface BuildProps {
  title: string;
  traits: TraitType;
  champions: ChampionType[];
  type: string;
  difficulty: string;
  description: string;
  augments?: AugmentType[];
  build:any;
}

export default function Build({
  title,
  traits,
  champions,
  type,
  difficulty,
  description,
  augments = [],
  build
}: BuildProps) {
  const [view, setView] = useState<ViewType>("Row");

  // upvote downvote tbd
  if (view === "Row") {
    return (
      <div className="overflow-hidden flex flex-row  py-3 rounded-t-xl shadow-emerald-500/10 shadow-xl rounded-b-xl pr-[5svw] w-[80svw] border-t border-emerald-400/20  bg-gradient-to-r from-emerald-600 from-10% via-indigo-500 via-30% to-emerald-600 to-90% ">
        <div className="  ml-2     mr-2 flex flex-col bg-black/40  gap-2 rounded-xl     ">
          <ChevronUp className="w-10 h-10 stroke-emerald-400 " />
          <div className="   text-2xl text-white font-inter font-medium  rounded-full  mx-auto  ">
            {" "}
            0
          </div>
          <ChevronDown className="w-10 h-10 stroke-emerald-400" />
        </div>
        <div className="ml-2 mt-[12px]">
          <BuildRow
            view={view}
            setView={setView}
            title={title}
            traits={traits}
            champions={champions}
            type={type}
            augments={augments}
            difficulty={difficulty}
          />
        </div>
      </div>
    );
  }

  // Expanded Screen view
  return (
    <BuildScreen
      title={title}
      view={view}
      setView={setView}
      champions={champions}
      traits={traits}
      description={description}
      build={build}
    />
  );
}
// Helper function to get champion image URL
export const getChampionImage = (champion: ChampionType) => {
  const imageName =
    champion.parsedData ||
    champion.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_${imageName}_small.png`;
};

// Helper function to get trait image URL
export const getTraitImage = (traitName: string) => {
  if (traitName.toLowerCase() == "a.m.p.") {
    traitName = "amp";
  }
  if(traitName.toLowerCase().includes("boom")) {
    traitName+="s"
  }
console.log(traitName)
  const formattedTraitName = traitName.toLowerCase().replace(/\s+/g, "");
  return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${formattedTraitName}.png`;
};
