// src/contexts/GlobalContext.tsx
import CrudService, { Item } from '@/api/crudapiservice';
import { createContext, ReactNode, useContext, useState, useEffect, useRef } from 'react';
import { initializeTraitChampionData } from '../../../utils/champions'
import { ItemData, parseItems } from '../../../utils/items'
 
 
 
interface GlobalContextType {
  champions: Item[];
  augments: Item[];
  traits: Item[];
  items: Item[];
  traitChampionsMap: any[];
  isLoading: boolean;
}

// Create with default values
const GlobalContext = createContext<GlobalContextType>({
  champions: [],
  augments: [],
  traits: [],
  items: [],
  traitChampionsMap: [],
  isLoading: true
});

// Create a stable provider that won't recreate during navigation
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    champions: Item[];
    augments: Item[];
    traits: Item[];
    items: Item[];
    traitChampionsMap: any[];
    isLoading: boolean;
  }>({
    champions: [],
    augments: [],
    traits: [],
    items: [],
    traitChampionsMap: [],
    isLoading: true
  });
  
  // Use ref to track initialization
  const initialized = useRef(false);
  
  // Add backup storage to persevere through navigation
  useEffect(() => {
    // Try to load from sessionStorage first (if available)
    const storedState = sessionStorage.getItem('tftAppState');
    if (storedState && !initialized.current) {
      try {
        const parsed = JSON.parse(storedState);
        setState(parsed);
        console.log(parsed)
        initialized.current = true;
        console.log("Restored state from session storage");
        return; // Skip fetching if we restored from storage
      } catch (e) {
        console.log("Error restoring from session storage:", e);
      }
    }
    
    // Fetch data if not initialized
    if (!initialized.current) {
      fetchAllData();
    }
  }, []);
  
  // Save to sessionStorage when data changes
  useEffect(() => {
    if (state.champions.length > 0) {
      try {
        sessionStorage.setItem('tftAppState', JSON.stringify(state));
        console.log("Saved state to session storage");
      } catch (e) {
        console.log("Error saving to session storage:", e);
      }
    }
  }, [state]);
  
  // Data fetching function
  async function fetchAllData() {
    try {
      console.log("Fetching all data...");
      setState(prev => ({ ...prev, isLoading: true }));
      
      const [traitResult, championResult, augmentResult, itemResult] = await Promise.all([
        CrudService.getAll("tft_traits"),
        CrudService.getAll("tft_champions"),
        CrudService.getAll("tft_augments"),
        CrudService.getAll("tft_items")
      ]);
      
      const sortedChampionResult = championResult.sort(
        (a : Item, b: Item) => JSON.parse(a.data).cost - JSON.parse(b.data).cost
      );
      
      const augmentedAugments = augmentResult.map((aug: Item) => ({
          ...JSON.parse(aug.data)
      }));
      
      const { traitChampionsMap } = initializeTraitChampionData(
        sortedChampionResult as any[], 
        traitResult
      );
      const parsedItems = parseItems(itemResult as any[]);
      
      setState({
        champions: sortedChampionResult as Item[],
        augments: augmentedAugments as Item[],
        traits: traitResult as Item[],
        items: parsedItems as Item[],
        traitChampionsMap: traitChampionsMap as any,
        isLoading: false
      });
      
      initialized.current = true;
      console.log("All data fetched successfully");
    } catch (e) {
      console.error("Error fetching data:", e);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }
  
  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook
export function useGlobalContext() {
  return useContext(GlobalContext);
}