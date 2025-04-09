import { Item } from "@/api/crudapiservice";
 
import FullScreenChampionDetail from "@/components/champion/FullScreenChampionDetail";
import { useGlobalContext } from "@/components/context/context";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleChampion() {
  const { champions, traitChampionsMap } = useGlobalContext();
  const params = useParams();
  let champname = params["*"];
  const [champion, setChampion] = useState<Item>();

  if(!champname || champname=="") return (<div></div>)

  useEffect(() => {
 
    for (let i = 0; i < champions.length; i++) {
      let curr = champions[i];
      if (curr.parsedData.name.toLowerCase() == champname!.toLowerCase()) {
   
        setChampion(curr);
        break;
      }
    }
  }, [,champions]);
 
  useEffect(() => {}, [champion]);

  if (champion && champion != undefined)
    return (
      <div className="w-[40svw] h-[100svh]">
        <FullScreenChampionDetail
          item={champion as  Item}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    );

  return <div className="text-4xl text-white">Nothing found</div>;
}
