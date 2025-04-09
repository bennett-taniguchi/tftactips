 

type ParsedData = {
    apiName:string;
    desc:string;
    imageHigh:string;
    imageHighS3:string;
    imageLow:string;
    imageLowS3:string;
    name:string;
    tags:string;
    composition?:string;
    effects?:Object;

}
export type ItemData = {
    data: string;
    METADATA: string;
    'AUGMENT#': string;
    parsedData ?: ParsedData;
}
export const getItemImage = (imageUrl: string) => {
    let formattedTraitName = imageUrl.toLowerCase().replace("accesspoint-jgeyja4kne59ihb37jud8qefh8ytsuse2a-s3alias.s3-accesspoint", "tft-set14.s3");

    return formattedTraitName;
  };
/**
 * 
 * @param items from "tft_items" append parsedData to each
 */
export function parseItems(items: ItemData[]) {
    let arr = [] as any
    items.forEach((item:ItemData)=> {
        let parsedData = JSON.parse(item.data)

        arr.push({...item,parsedData:parsedData})
    })

    return arr;
}