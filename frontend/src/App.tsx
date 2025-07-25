import {  Route, Routes } from "react-router-dom";
import NavMenu from "./NavMenu";
 
 
import CurrentSet from "./pages/CurrentSet";
 

import Home from "./pages/Home";

import { GlobalProvider } from "./components/context/context";
import { Builds } from "./pages/Builds";
import Champions from "./pages/Champions";
import SingleChampion from "./pages/SingleChampion";
import Traits from "./pages/Traits";
import Items from "./pages/Items";
import NewBuild from "./pages/NewBuild";
import Augments from "./pages/Augments";
import User from "./pages/User";
import SingleBuild from "./pages/SingleBuild";

const PageLayout = ({ children }: any) => (
  <div className="text-gray-100">{children}</div>
);

function App() {
  return (
    <GlobalProvider>
 
        <div className="  min-h-screen bg-gradient-to-b from-gray-950 to-blue-950">
          <NavMenu />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/champions/*" element={<SingleChampion />} />
              <Route path="/traits" element={<Traits />} />
              <Route path="/items" element={<Items />} />
              <Route path="/newbuild" element={<NewBuild />} />
              <Route path="/user/" element={<User/>} />
              <Route
                path="/builds"
                element={
                  <PageLayout>
                    <Builds />
                  </PageLayout>
                }
              />
              <Route 
                path="/builds/*"
                element={
                  <PageLayout>
                    <SingleBuild />
                  </PageLayout>
                }
              />
                <Route
                path="/augments"
                element={
                  <PageLayout>
                    <Augments />
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
           
            </Routes>
          </div>
        </div>
  
    </GlobalProvider>
  );
}

export default App;
