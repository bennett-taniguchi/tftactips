import CrudService, { Item } from "@/api/crudapiservice";
import CyberpunkCircuit from "@/components/background/CyberPunkCircuit";
import CyberpunkPCB from "@/components/background/CyberpunkPCB";
import TftacLogo from "@/components/logo/LoadingLogo";
import ChampionBox from "@/components/set/ChampionBox";
import TraitBox from "@/components/set/TraitBox";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";

import TraitIcon from "@/components/trait/TraitIcon";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CurrentSet() {
  let numbers = [1, 2, 3, 4, 5];
  let [traitResult, setTraitResult] = useState<Item[]>([]);
  let [championResult, setChampionResult] = useState<Item[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        let traitRes = await CrudService.getAll("tft_traits");
        let championResult = await CrudService.getAll("tft_champions");
        let sortedChampionResult = championResult.sort((a,b) => JSON.parse(a.data).cost - JSON.parse(b.data).cost)
        setTraitResult(traitRes as Item[]);
        setChampionResult(sortedChampionResult as Item[]);
      } catch (e) {
        console.log(e);
      }
    }
    fetch();
  }, []);

  function getBgColor(idx: number) {
    if (idx == 1) return "bg-zinc-500 hover:bg-zinc-700 cursor-pointer";
    if (idx == 2) return "bg-green-500 hover:bg-green-700 cursor-pointer";
    if (idx == 3) return "bg-blue-600 hover:bg-blue-800 cursor-pointer";
    if (idx == 4) return "bg-purple-500 hover:bg-purple-700 cursor-pointer";
    if (idx == 5) return "bg-orange-500 hover:bg-orange-700 cursor-pointer";
  }
let isLoading = (traitResult.length ==0 || championResult.length==0);
 
if(isLoading)
 return(
<div className="h-[90svh] flex items-center justify-center">
<TftacLogo/>
</div>
 )
  return (
    <div className="text-center  justify-self-center">
      <div className="pb-10">
      <CyberPunkTitle text='Traits'/>

      </div>

      {/* First section - Traits */}
      <div className="  relative mx-auto w-[90svw] rounded-xl flex-grow     bg-gradient-to-t from-emerald-900 to-green-900 shadow-inner overflow-hidden">
      
        <div className=" mt-[-20px] w-full rounded-2xl ">
         
         <div className=" absolute w-[50svw] opacity-50 h-[200svh] mt-[-36svh] ">
            {" "}
            <CyberpunkPCB />
            <div className="mt-[-15svh]">
            <CyberpunkPCB />
            </div>
          </div>

          {/* Trait grid content - positioned above the hexagonal background */}
          <div className=" bg-cyan-900/50 relative z-30 p-5 grid grid-cols-2 gap-8 mt-4 ">
            {traitResult.map((trait: any, idx: number) => (
              <div
                key={idx}
                className={cn(
                  "",
                  " drop-shadow-2xl shadow-amber-500 border border-lime-700 bg-gray-900  hover:bg-gray-900"
                )}
              > 
             
                <TraitBox item={trait}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-[10px]  ">  <CyberPunkTitle text='Champions'/></div>

      {/* Second section - Champions */}
      <div className="  mx-auto w-[95svw] flex-grow rounded-lg  bg-gradient-to-b from-emerald-950/10 from-50% via-purple-800 via-60% to-orange-800">
       

        <div className="   mx-auto w-[95svw] flex-grow rounded-lg  ">
         
      

          <div className="text-left pl-[20px] ">
            <div className="py-5 m-5 grid grid-cols-4 gap-4">
              {championResult.map((champion: any, idx: number) => (
                <div key={idx} className="h-[675px]  ">
                  <ChampionBox item={champion}  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-[20px]"></div>
    </div>
  );
}
