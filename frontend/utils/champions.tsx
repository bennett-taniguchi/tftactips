import React from 'react';

// Define types for champion data structure
interface ChampionStats {
  armor: number;
  attackSpeed: string;
  critChance: string;
  critMultiplier: string;
  damage: number;
  hp: number;
  initialMana: number;
  magicResist: number;
  mana: number;
  range: number;
}

interface ChampionAbility {
  name: string;
  desc: string;
  [key: string]: string | number; // For dynamic ability stats like "Damage"
}

interface ChampionParsedData {
  cost: string;
  apiName: string;
  imageLow: string;
  imageHigh: string;
  imageAbility: string;
  imageLowS3: string;
  imageHighS3: string;
  imageAbilityS3: string;
  name: string;
  role: string;
  stats: ChampionStats;
  traits: string | string[]; // Can be a JSON string or already parsed array
  parsedTraits?: string[];   // Will contain the parsed traits array
  ability: ChampionAbility;
  [key: string]: any;        // For any other properties
}

interface Champion {
  "CHAMPION#": string;
  METADATA: string;
  data: string;
  parsedData?: ChampionParsedData;
}

interface TraitItem {
  data: string | {
    name: string;
    desc: string;
    bonus: string;
    [key: string]: any;
  };
}

interface TraitChampionsMap {
  [trait: string]: Champion[];
}

interface ProcessedChampionData {
  champions: Champion[];
  traitChampionsMap: TraitChampionsMap;
}

/**
 * Process champion data and organize by traits
 * @param championResult Array of champion objects with string JSON data
 * @returns Object with traits as keys and arrays of champions as values
 */
function processChampionTraits(championResult: Champion[]): ProcessedChampionData {
  // Initialize trait-to-champions mapping
  const traitChampionsMap: TraitChampionsMap = {};
  
  // Process each champion
  championResult.forEach(champion => {
    if (!champion.data) return;
    
    try {
      // Parse the champion data
      const parsedData: ChampionParsedData = JSON.parse(champion.data);
      
      // Store the parsed data back to the champion object
      champion.parsedData = parsedData;
      
      // Process traits if they exist
      if (parsedData.traits) {
        // Parse traits if they're stored as a JSON string
        let traits: string[] = parsedData.traits as string[];
        if (typeof parsedData.traits === 'string') {
          traits = JSON.parse(parsedData.traits);
        }
        
        // Store the parsed traits back to the champion's parsed data
        parsedData.parsedTraits = traits;
        
        // Add champion to each of its traits in the mapping
        traits.forEach(trait => {
          if (!traitChampionsMap[trait]) {
            traitChampionsMap[trait] = [];
          }
          traitChampionsMap[trait].push(champion);
        });
      }
      
      // Parse any other nested structures that might be JSON strings
      Object.keys(parsedData).forEach(key => {
        if (typeof parsedData[key] === 'string' && 
            (parsedData[key].startsWith('{') || parsedData[key].startsWith('['))) {
          try {
            parsedData[key] = JSON.parse(parsedData[key] as string);
          } catch (e) {
            // Not a valid JSON string, keep as is
          }
        }
      });
      
    } catch (error) {
      console.error(`Error parsing data for champion ${champion["CHAMPION#"]}:`, error);
    }
  });
  
  return {
    champions: championResult,  // Return the champions with parsed data
    traitChampionsMap           // Return the mapping of traits to champions
  };
}

/**
 * Get champions with a specific trait
 * @param trait The trait name to look up
 * @param traitChampionsMap The mapping from processChampionTraits
 * @returns Array of champions with that trait
 */
function getChampionsWithTrait(trait: string, traitChampionsMap: TraitChampionsMap): Champion[] {
  return traitChampionsMap[trait] || [];
}

/**
 * Example usage with TraitBox component
 * @param traitItem The trait item to render
 * @param traitChampionsMap The mapping from processChampionTraits
 * @returns JSX for the TraitBox with associated champions
 */
function renderTraitWithChampions(
  traitItem: TraitItem, 
  traitChampionsMap: TraitChampionsMap
): React.ReactElement {
  // Parse the trait data if needed
  const traitData = typeof traitItem.data === 'string' 
    ? JSON.parse(traitItem.data) 
    : traitItem.data;
  
  // Get the trait name
  const traitName = traitData.name;
  
  // Get champions with this trait
  const champions = getChampionsWithTrait(traitName, traitChampionsMap);
  
  return (
    <div className="trait-with-champions">
      {/* @ts-ignore - Assuming TraitBox is defined elsewhere */}
      <TraitBox item={traitItem} />
      
      {/* Placeholder for champions component */}
      <div className="champions-with-trait mt-4">
        <h3 className="text-xl font-semibold mb-2">Champions with {traitName}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {champions.map(champion => (
            <div key={champion["CHAMPION#"]} className="champion-card p-2 bg-gray-800/50 rounded border border-cyan-500/20">
              {champion["CHAMPION#"]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TraitChampionData {
  processedChampions: Champion[];
  traitChampionsMap: TraitChampionsMap;
  traitResult: any[];  // Update this type based on your actual trait data structure
}

/**
 * Initialize the trait and champion data
 * @param championResult Array of champion objects
 * @param traitResult Array of trait objects
 * @returns Processed data structure with champions and traits
 */
 function initializeTraitChampionData(
  championResult: Champion[], 
  traitResult: any[]
): TraitChampionData {
  // Process all champions and build the trait-champion mapping
  const { champions, traitChampionsMap } = processChampionTraits(championResult);
  
  return {
    processedChampions: champions,
    traitChampionsMap: traitChampionsMap,
    traitResult: traitResult
  };
}

export {
  processChampionTraits,
  getChampionsWithTrait,
  renderTraitWithChampions,
  initializeTraitChampionData,
  // Export types for use elsewhere
  type Champion,
  type ChampionParsedData,
  type TraitChampionsMap,
  type ProcessedChampionData,
  type TraitChampionData
};