import { useState } from "react";
 
import BuildRow from "./BuildRow";
import BuildScreen from "./BuildScreen";
 

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
}

export default function Build({
  title,
  traits,
  champions,
  type,
  difficulty,
  description,
  augments = [],
}: BuildProps) {
  const [view, setView] = useState<ViewType>("Row");

  
  if (view === "Row") {
    return (
   <BuildRow  
        view={view} setView={setView}
        title={title} traits={traits} champions={champions} type={type} augments={augments} difficulty={difficulty}/>
    );
  }

  // Expanded Screen view
  return (
    <BuildScreen title={title} view={view} setView={setView} champions={champions} traits={traits} description={description} />
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
    const formattedTraitName = traitName.toLowerCase().replace(/\s+/g, "");
    return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${formattedTraitName}.png`;
  };