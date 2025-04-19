import ChampionBox from "@/components/champion/ChampionBox";
import { useGlobalContext } from "@/components/context/context";
import FilterBar from "@/components/filter/FilterBar";
import SearchBar from "@/components/search/SearchBar";

import CyberPunkTitle from "@/components/text/CyberPunkTitle";
import { useState } from "react";
// import { Link } from "react-router-dom"

export default function Champions() {
  const { champions } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  return (
    <div className=" flex w-[100svw] justify-self-center  flex-col flex-grow rounded-lg  bg-gradient-to-b from-emerald-950/10 from-50% via-purple-800 via-60% to-orange-800">
      
      <div className="flex flex-row -mb-10 mx-20 ml-40 rounded-xl  ">
        <div className="mb-20 font-inter text-7xl font-bold text-emerald-400 justify-self-left  ">
          {" "}
          Champions
        </div>

        <div className="ml-15 w-[60svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60 rounded-xl py-3 mb-20">
          <FilterBar
            datasets={champions as any}
            query={query}
            setQuery={setQuery}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems as any}
          />
        </div>
      </div>
      
      <div className="   mx-auto w-[95svw] flex-grow rounded-lg  ">
        <div className="text-left   ">
          <div className="py-5 m-5 grid grid-cols-4 gap-4">
            {filteredItems.map((champion: any, idx: number) => (
              <div key={idx} className="h-[675px]  ">
                <ChampionBox item={champion} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
