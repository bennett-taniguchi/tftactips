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
        <CyberPunkTitle text="Items" />
        <div className="flex justify-self-center   w-[80svw] m-5 bg-linear-to-r from-blue-950/50 to-green-900/80 border border-green-700/60  rounded-xl py-3 mb-20">
        <FilterBar
            datasets={items as any}
            query={query}
            setQuery={setQuery}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems as any}
          />
        </div>

        <div className="grid grid-cols-5 gap-4 gap-y-2 w-[90svw] justify-self-center">
          {filteredItems.map((item: any, idx: number) => (
            <div key={idx + ""}>
              <ItemBox item={item} />
            </div>
          ))}
        </div>
      </div>
    );
}
