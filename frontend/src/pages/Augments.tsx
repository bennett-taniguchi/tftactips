import { AugmentBox } from "@/components/augment/AugmentBox";
import { useGlobalContext } from "@/components/context/context";
import FilterBar from "@/components/filter/FilterBar";

import { useEffect, useState } from "react";

export default function Augments() {
  const { augments } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <div className="mx-auto -ml-35">
      
      <div className="flex flex-row mb-5 mx-20 ml-10 rounded-xl">
        <div className="mb-20 font-inter text-7xl font-bold text-emerald-400 justify-self-left  ">
          {" "}
          Augments
        </div>

        <div className="ml-15 w-[60svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60 rounded-xl py-3 mb-20">
          <FilterBar
            datasets={augments as any}
            query={query}
            setQuery={setQuery}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems as any}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-y-10 gap-x-0 mx-auto w-[90svw]">
        {filteredItems ? (
          filteredItems.map((augment,idx) => (
            <div
              className="w-[20svw]"
              key={
               idx
              }
            >
              <AugmentBox item={augment} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
