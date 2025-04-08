import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMenu from "./NavMenu";
import Builds from "./pages/Builds";
import CrudTester from "./pages/CrudTester";
import CurrentSet from "./pages/CurrentSet";
import { PopulateData } from "./pages/PopulateData";
 
import Home from "./components/home/Home";
 
import {   useEffect, useRef, useState } from "react";
import CrudService, { Item } from "./api/crudapiservice";
import { initializeTraitChampionData } from "../utils/champions";
import { GlobalProvider } from "./components/context/context";
 
const PageLayout = ({ children }: any) => (
  <div className="text-gray-100">{children}</div>
);

function App() {
  // const [traits,setTraits] = useState<Item[]>([])
  // const [augments,setAugments] = useState<Item[]>([])
  // const [champions,setChampions] = useState<Item[]>([])
  // const [items,setItems] = useState<Item[]>([])
  // const [traitChampionsMap, setTraitsChampionsMap] = useState<any>([])
  // const fetched = useRef(false)
 
  // useEffect(() => {
  //   console.log("App state check:", {
  //     traitsLength: traits.length,
  //     augmentsLength: augments.length,
  //     championsLength: champions.length,
  //     itemsLength: items.length,
  //     traitChampionsMapLength: traitChampionsMap.length
  //   });

  //   async function fetch() {
  //     if(fetched.current) return;
  //     try {
  //       let traitResult = await CrudService.getAll("tft_traits");
  //       let championResult = await CrudService.getAll("tft_champions");
  //       let augmentResult = await CrudService.getAll("tft_augments")
  //       let itemResult = await CrudService.getAll("tft_items")

  //       let sortedChampionResult = championResult.sort(
  //         (a, b) => JSON.parse(a.data).cost - JSON.parse(b.data).cost
  //       );
  //       setTraits(traitResult as Item[]);
  //       setChampions(sortedChampionResult as Item[]);
  //       setItems(itemResult as Item[])
  //       setTraitsChampionsMap(initializeTraitChampionData(sortedChampionResult as any[],traitResult).traitChampionsMap)

  //       let augmentedAugments =  [] as Item[]
  //       augmentResult.forEach((aug) => {
  //         augmentedAugments.push({...aug, parsedData:JSON.parse(aug.data)})
  //       })
  //       setAugments(augmentedAugments)

  //       fetched.current = true;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
   
  //   fetch();
    
  // }, []);

 
  
  return ( <GlobalProvider >
    <BrowserRouter>
   
      <div className="  min-h-screen bg-gradient-to-b from-gray-950 to-blue-900">
        <NavMenu />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/builds"
              element={
                <PageLayout>
                  <Builds />
                </PageLayout>
              }
            />
            <Route
              path="/currentset"
              element={
                <PageLayout>
                  <CurrentSet />
                </PageLayout>
              }
            />
            <Route
              path="/crudtester"
              element={
                <PageLayout>
                  <CrudTester />
                </PageLayout>
              }
            />
            <Route
              path="/populatedata"
              element={
                <PageLayout>
                  <PopulateData />
                </PageLayout>
              }
            />
          </Routes>
        </div>
      </div>
   
    </BrowserRouter>   </GlobalProvider>
  );
}

export default App;
