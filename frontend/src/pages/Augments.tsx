import { AugmentBox } from "@/components/augment/AugmentBox";
import { useGlobalContext } from "@/components/context/context";
import FilterBar from "@/components/filter/FilterBar";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";
import { useState } from "react";

export default function Augments() {
  const { augments } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <div className="flex w-[100svw] justify-self-center  flex-col flex-grow  ">
      <div className="   ">
        <CyberPunkTitle text={"Augments"} />
      </div>
      <div className="  mx-auto w-[80svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60  rounded-xl py-3 mb-20">
        <FilterBar
          datasets={augments as any}
          query={query}
          setQuery={setQuery}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems as any}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 gap-x-0 mx-auto w-[90svw] ">
        {filteredItems ? (
          filteredItems.map((augment) => (
            <div className="w-[20svw]  ">
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
