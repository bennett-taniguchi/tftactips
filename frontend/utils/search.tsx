// not used with homepage search
import {useGlobalContext} from '../src/components/context/context'

 
export default function searchContext(table:string,query:string) {


    const {champions,items,augments,traits} = useGlobalContext()
    let arr = [] as any[];
    if(!champions)return[];
    const championArr = Array.from(champions)
   
    if(table.includes("champions")) {
        for(let i = 0; i < championArr.length;i ++) {
            //console.log((champions as any))
            if(championArr[i].parsedData.name.includes(query)  ) {
                arr.push(championArr[i])
            }
        }
    }

    return arr;
}