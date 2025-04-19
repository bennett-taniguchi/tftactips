import { useGlobalContext } from "@/components/context/context";
import FilterBar from "@/components/filter/FilterBar";
import ItemBox from "@/components/item/ItemBox";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";
import { useState } from "react";

export default function Items() {
  const { items } = useGlobalContext();
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState("");
  if (items)
    return (
      <div>
          <div className="flex flex-row -mb-10 mx-20 -ml-10 rounded-xl  ">
        <div className="mb-20 font-inter text-7xl font-bold text-emerald-400 justify-self-left  ">
          {" "}
          Items
        </div>

        <div className="ml-15 w-[60svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60 rounded-xl py-3 mb-20">
          <FilterBar
            datasets={items as any}
            query={query}
            setQuery={setQuery}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems as any}
          />
        </div>
      </div>

        <div className="grid grid-cols-4 gap-4 gap-y-2 w-[90svw] justify-self-center">
          {filteredItems.map((item: any, idx: number) => (
            <div key={idx + ""}>
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>
    );
}
