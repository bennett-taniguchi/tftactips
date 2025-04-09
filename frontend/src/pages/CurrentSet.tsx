 
import CyberpunkPCB from "@/components/background/CyberpunkPCB";
import TftacLogo from "@/components/logo/LoadingLogo";
 
import TraitBox from "@/components/set/TraitBox";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";
 
import { cn } from "@/lib/utils";
import { useContext, useEffect } from "react";
 
import { useGlobalContext } from "@/components/context/context";
import { AugmentBox } from "@/components/set/AugmentBox";
import ChampionHierarchy from "@/components/champion/ChampionHierarchy";
import ChampionBox from "@/components/champion/ChampionBox";
 

export default function CurrentSet() {
 
  const { champions, augments, traits, traitChampionsMap } =
    useGlobalContext();
  useEffect(() => {
 
  }, [champions, augments, traits, traitChampionsMap]);
 
  let isLoading =
    traits.length == 0 ||
    champions.length == 0 ||
    traitChampionsMap.length == 0;

  if (isLoading)
    return (
      <div className="h-[90svh] flex items-center justify-center">
        <TftacLogo />
      </div>
    );

  return (
    <div className="text-center  justify-self-center">
      <div className="pb-10">
        <CyberPunkTitle text="Traits" />
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
            <div className="mt-[-15svh]">
              <CyberpunkPCB />
            </div>
            <div className="mt-[-15svh]">
              <CyberpunkPCB />
            </div>
          </div>

          {/* Trait grid content - positioned above the hexagonal background */}
          <div className=" bg-cyan-900/50 relative z-30 p-5 grid grid-cols-2 gap-8 mt-4 ">
            {traits.map((trait: any, idx: number) => (
              <div
                key={idx}
                className={cn(
                  "",
                  " drop-shadow-2xl shadow-amber-500 border  border-none  bg-transparent  "
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
      </div>

      <div className="py-[10px]  ">
        {" "}
        <CyberPunkTitle text="Champions" />
      </div>

      {/* Second section - Champions */}
      <div className="  mx-auto w-[95svw] flex-grow rounded-lg  bg-gradient-to-b from-emerald-950/10 from-50% via-purple-800 via-60% to-orange-800">
        <div className="   mx-auto w-[95svw] flex-grow rounded-lg  ">
          <div className="text-left pl-[20px] ">
            <div className="py-5 m-5 grid grid-cols-4 gap-4">
              {champions.map((champion: any, idx: number) => (
                <div key={idx} className="h-[675px]  ">
                  <ChampionBox item={champion} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-[20px]"></div>

      <div className="grid grid-cols-4 gap-4">
        {augments.map((augment: any, idx: any) => (
          <AugmentBox item={augment} key={idx} />
        ))}
      </div>
    </div>
  );
}
