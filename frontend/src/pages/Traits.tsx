import ChampionHierarchy from "@/components/champion/ChampionHierarchy";
import { useGlobalContext } from "@/components/context/context";

import TraitBox from "@/components/trait/TraitBox";

import CyberPunkTitle from "@/components/text/CyberPunkTitle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FilterBar from "@/components/filter/FilterBar";
// import { Link } from "react-router-dom"

export default function Traits() {
  const { traits, traitChampionsMap } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
  {
    /* Trait grid content - positioned above the hexagonal background */
  }
  return (
    <div className="flex justify-self-center flex-col">
    
    <div>
        <CyberPunkTitle text="Traits" />
      </div>

      <div className=" mx-auto w-[80svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60  rounded-xl py-3 mb-20">
          <FilterBar
            datasets={traits as any}
            query={query}
            setQuery={setQuery}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems as any}
          />
        </div>
      <div className=" bg-cyan-900/50 relative z-30 p-5 grid grid-cols-3 gap-8 mt-4 w-[90svw] ">
        {filteredItems.map((trait: any, idx: number) => (
          <div
            key={idx}
            className={cn(
              "",
              " drop-shadow-2xl shadow-amber-500 border  border-none  bg-transparent  text-white"
            )}
          >
            <TraitBox
              item={trait}
              // children={ChampionHierarchy(traitChampionMap[JSON.parse(trait.data).name])}
            >
              {" "}
              <div className="w-full   mt-[20px]">
                <ChampionHierarchy
                  champions={
                    traitChampionsMap[JSON.parse(trait.data).name] as any
                  }
                />
              </div>
            </TraitBox>
          </div>
        ))}
      </div>
    </div>
  );
}
