 

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


/**
 * Replaces custom TFT tags in a string with styled HTML
 * Handles templated variables and rounds long decimal numbers
 * @param text The text containing TFT tags to replace
 * @returns The text with styled HTML replacements
 */
export function replaceTFTTags(text: string): string {
    if (!text) return "";
  
    // Define replacement patterns and their styled equivalents
    const replacements: Record<string, (match: string, content: string) => string> = {
      // Replace <TFTKeyword>Content</TFTKeyword> tags
      "<TFTKeyword>(.*?)</TFTKeyword>": (match, content) =>
        `<span class="tft-keyword">${content}</span>`,
      
      // Replace <tftitemrules>Content</tftitemrules> tags
      "<tftitemrules>(.*?)</tftitemrules>": (match, content) =>
        `<div class="tft-item-rules">${content}</div>`,
      
      // Replace <tftbold>Content</tftbold> tags
      "<tftbold>(.*?)</tftbold>": (match, content) =>
        `<span class="tft-bold">${content}</span>`
    };
  
    let result = text;
    
    // Replace templated variables (handles both simple @Variable@ and complex @Expression*100@ formats)
    result = result.replace(/@[^@]*@/g, '');
  
    // Round long decimal numbers
    // This regex looks for numbers with decimal points followed by many digits
    result = result.replace(/(\d+\.\d{3,})/g, (match) => {
      // Convert to number and round to 1 decimal place
      return parseFloat(match).toFixed(1);
    });
    
    // Apply each tag replacement pattern
    for (const [pattern, replacer] of Object.entries(replacements)) {
      const regex = new RegExp(pattern, "g");
      result = result.replace(regex, (match, ...args) => replacer(match, args[0]));
    }
    
    return result;
  }
  
  // Example usage:
  /*
  const example1 = "**Tornadoes**\nEvery @CastPeriod@ seconds, a random Anima Squad champion spawns a whirl of Tornadoes, dealing magic damage.";
  const example2 = "**Trickster's Glass**\nSummon a clone with 70% base Health and +10.000000149011612% max Mana. You cannot equip items to the clone.\nThe clone benefits from active traits\n[Unique - only 1 per champion]";
  
  console.log(replaceTFTTags(example1));
  // Output: "**Tornadoes**
  // Every seconds, a random Anima Squad champion spawns a whirl of Tornadoes, dealing magic damage."
  
  console.log(replaceTFTTags(example2));
  // Output: "**Trickster's Glass**
  // Summon a clone with 70% base Health and +10.0% max Mana. You cannot equip items to the clone.
  // The clone benefits from active traits
  // [Unique - only 1 per champion]"
  */



  
/**
 * Formats effect keys by removing hash-style keys
 * @param key The effect key to format
 * @returns Formatted key or null if it should be removed
 */
export function formatEffectKey(key: string): string | null {
    // Check if the key is in hash format like {05015c46}
    if (/^\{[a-f0-9]{8}\}$/i.test(key)) {
      return null; // Return null to indicate this effect should be skipped
    }
    
    return key; // Return the key unchanged if it's not a hash
  }
  
  /**
   * Formats effect values by rounding decimal numbers
   * @param value The effect value to format
   * @returns Formatted effect value
   */
  export function formatEffectValue(value: any): string {
    if (value === null || value === undefined) {
      return "";
    }
    
    // Convert to string first (if it's not already a string)
    const stringValue = String(value);
    
    // Check if the value is a number with more than 1 decimal place
    const numericPattern = /^-?\d+\.\d{2,}$/;
    if (numericPattern.test(stringValue)) {
      // Parse as float and round to 1 decimal place
      return parseFloat(stringValue).toFixed(1);
    }
    
    return stringValue;
  }