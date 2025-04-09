import ChampionBox from "@/components/champion/ChampionBox"
import { useGlobalContext } from "@/components/context/context"
import SearchBar from "@/components/search/SearchBar"
 
import CyberPunkTitle from "@/components/text/CyberPunkTitle"
import { Link } from "react-router-dom"

export default function Champions() {
const {champions} = useGlobalContext()

    return (
         
              <div className=" flex w-[100svw] justify-self-center  flex-col flex-grow rounded-lg  bg-gradient-to-b from-emerald-950/10 from-50% via-purple-800 via-60% to-orange-800">
                <div className="h-90 z-11 overflow-hidden">
                <CyberPunkTitle text={"Champions"}/>
                <SearchBar/>
                </div>
                <div className="   mx-auto w-[95svw] flex-grow rounded-lg  ">
                  <div className="text-left   ">
                    <div className="py-5 m-5 grid grid-cols-5 gap-4">
                      {champions.map((champion: any, idx: number) => (
                        <div key={idx} className="h-[675px]  ">
                          
                          <ChampionBox item={champion} />
                          
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
    )
}