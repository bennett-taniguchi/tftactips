 
import CyberpunkPCB from "@/components/background/CyberpunkPCB";
import TftacLogo from "@/components/logo/LoadingLogo";
import ChampionBox from "@/components/set/ChampionBox";
import TraitBox from "@/components/set/TraitBox";
import CyberPunkTitle from "@/components/text/CyberPunkTitle";
 
import { cn } from "@/lib/utils";
import { useContext, useEffect } from "react";
import ChampionHierarchy from "@/components/set/ChampionHierarchy";
import { useGlobalContext } from "@/components/context/context";
import { AugmentBox } from "@/components/set/AugmentBox";
 

export default function CurrentSet() {
  // let [traitResult, setTraitResult] = useState<Item[]>([]);
  // let [championResult, setChampionResult] = useState<Item[]>([]);
  // let [augmentResult, setAugmentResult] = useState<Item[]>([]);
  // const [traitChampionMapResult, setTraitChampionMapResult] = useState<any>([]);
  const { champions, augments, traits, traitChampionsMap } =
    useGlobalContext();
  useEffect(() => {
    // if (championResult.length == 0) setChampionResult(champions);

    // if (traitResult.length == 0) setTraitResult(traits);

    // if (augmentResult.length == 0) setAugmentResult(augments);

    // if (traitChampionMapResult.length == 0)
    //   setTraitChampionMapResult(traitChampionsMap);
  }, [champions, augments, traits, traitChampionsMap]);
  // useEffect(() => {
  //   async function fetch() {
  //     try {
  //       let traitResult = await CrudService.getAll("tft_traits");
  //       let championResult = await CrudService.getAll("tft_champions");
  //       let augmentResult = await CrudService.getAll("tft_augments")

  //       let sortedChampionResult = championResult.sort(
  //         (a, b) => JSON.parse(a.data).cost - JSON.parse(b.data).cost
  //       );
  //       setTraitResult(traitResult as Item[]);
  //       setChampionResult(sortedChampionResult as Item[]);
  //       setTraitChampionMap(initializeTraitChampionData(sortedChampionResult as any,traitResult).traitChampionsMap)

  //       let augmentedAugments =  [] as Item[]
  //       augmentResult.forEach((aug) => {
  //         augmentedAugments.push({...aug, parsedData:JSON.parse(aug.data)})
  //       })
  //       setAugmentResult(augmentedAugments)
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetch();

  // }, []);

  // useEffect(() => {

  // },[traitChampionMap])

  // function getBgColor(idx: number) {
  //   if (idx == 1) return "bg-zinc-500 hover:bg-zinc-700 cursor-pointer";
  //   if (idx == 2) return "bg-green-500 hover:bg-green-700 cursor-pointer";
  //   if (idx == 3) return "bg-blue-600 hover:bg-blue-800 cursor-pointer";
  //   if (idx == 4) return "bg-purple-500 hover:bg-purple-700 cursor-pointer";
  //   if (idx == 5) return "bg-orange-500 hover:bg-orange-700 cursor-pointer";
  // }
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
